import fs from 'fs';
import path from 'path';
import { POSTS_PER_PAGE } from './config';

export type PostMetadata = {
  title: string
  publishedAt: string
  summary: string
  image?: string
}

export type Post = {
  metadata: PostMetadata;
  slug: string;
  content: string;
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
    metadata[key.trim() as keyof PostMetadata] = value
  })

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
      return { metadata, content, slug };
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
    pagesCount: Math.ceil(posts.length / POSTS_PER_PAGE),
  };
}

export const getPostsPagesCount = () => {
  const posts = getAllPosts();
  return Math.ceil(posts.length / POSTS_PER_PAGE);
}
