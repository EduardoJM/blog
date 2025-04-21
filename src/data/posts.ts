import fs from 'fs';
import path from 'path';
import { POSTS_PER_PAGE } from './config';
import { Tag, tags } from './tags';

export type PostMetadata = {
  title: string;
  publishedAt: string;
  summary: string;
  tags: Tag[];
  image?: string;
}

export type Heading = {
  slug: string;
  title: string;
  level: number;
  childs: Array<Heading>;
}

export type Post = {
  metadata: PostMetadata;
  slug: string;
  content: string;
  headings: Array<Heading>;
}

export const slugify = (str: string) => {
  return str
    .toString()
    .toLowerCase()
    .trim() // Remove whitespace from both ends of a string
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/&/g, '-and-') // Replace & with 'and'
    .replace(/[^\w\-]+/g, '') // Remove all non-word characters except for -
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
}

const parseTags = (value: string): Array<Tag> => {
  return value
    .trim()
    .split(',')
    .map((item) => item.trim())
    .filter((item) => !!item)
    .map((slug) => tags.find((tag) => tag.slug === slug))
    .filter((tag) => !!tag);
}

const parseTitles = (content: string) => {
  const lines = content.replaceAll('\\r', '').split('\n')
  const currentHeadingStack: Array<Heading> = [];
  const headings: Array<Heading> = [];
  for (const line of lines) {
    if (!line.trim().startsWith('#')) {
      continue;
    }
    const levelMatch = line.match(/^#+/);
    if (!levelMatch) {
      continue;
    }
    const level = levelMatch[0].length;
    const title = line.trim().replace(/^#+/, '').trim()
    
    const heading: Heading = {
      slug: slugify(title),
      title: title,
      level,
      childs: [],
    }
    if (!currentHeadingStack.length) {
      currentHeadingStack.push(heading);
      headings.push(heading);
    } else {
      let stacked = currentHeadingStack[currentHeadingStack.length - 1];
      while (level <= stacked.level) {
        currentHeadingStack.pop();
        if (!currentHeadingStack.length) {
          break;
        }
        stacked = currentHeadingStack[currentHeadingStack.length - 1];
      }
      
      if (!currentHeadingStack.length) {
        currentHeadingStack.push(heading);
        headings.push(heading);
      } else {
        const lastStack = currentHeadingStack[currentHeadingStack.length - 1];
        lastStack.childs.push(heading)
        currentHeadingStack.push(heading);
      }
    }
  }
  return headings;
}

const parseFrontmatter = (fileContent: string) => {
  const frontmatterRegex = /---\s*([\s\S]*?)\s*---/
  const match = frontmatterRegex.exec(fileContent)
  const frontMatterBlock = match![1]
  const content = fileContent.replace(frontmatterRegex, '').trim()
  const frontMatterLines = frontMatterBlock.trim().split('\n')
  const metadata: Partial<PostMetadata> = {}

  frontMatterLines.forEach((line) => {
    const [key, ...valueArr] = line.split(': ')
    let value = valueArr.join(': ').trim()
    value = value.replace(/^['"](.*)['"]$/, '$1') // Remove quotes
    
    const parsedKey = key.trim() as keyof PostMetadata;
    if (parsedKey === 'tags') {
      metadata[parsedKey] = parseTags(value);
    } else {
      metadata[parsedKey] = value;
    }
  })

  if (!metadata['tags']) {
    metadata['tags'] = [];
  }

  return { metadata: metadata as PostMetadata, content }
}

const getMDXFiles = (dir: string) => {
  return fs
    .readdirSync(dir)
    .filter((file) => {
      return ['.mdx', '.md'].includes(path.extname(file));
    })
    .sort();
}

const readMDXFile = (filePath: string) => {
  const rawContent = fs.readFileSync(path.join('blog', filePath), 'utf-8')
  return parseFrontmatter(rawContent)
}

export const getAllPosts = (): Array<Post> => {
  return getMDXFiles('blog')
    .map((file) => {
      const { metadata, content } = readMDXFile(file);
      const slug = path.basename(file, path.extname(file));
      const headings = parseTitles(content);
      return { metadata, content, slug, headings };
    })
    .sort((a, b) => {
      if (new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)) {
        return -1
      }
      return 1
    });
};

export const getPost = (slug: string) => {
  return getAllPosts().find((item) => item.slug === slug);
}

export const getPostsPaginated = (page: number) => {
  const posts = getAllPosts();
  const start = (page - 1) * POSTS_PER_PAGE;
  let end = (page * POSTS_PER_PAGE);
  if (end > posts.length) {
    end = posts.length;
  }
  return {
    posts: posts.slice(start, end),
    postsPerPage: POSTS_PER_PAGE,
    currentPage: page,
    pagesCount: Math.ceil(posts.length / POSTS_PER_PAGE),
  };
}

export const getPostsPagesCount = () => {
  const posts = getAllPosts();
  return Math.ceil(posts.length / POSTS_PER_PAGE);
}
