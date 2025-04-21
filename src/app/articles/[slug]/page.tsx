import { Metadata } from 'next';
import { notFound } from 'next/navigation'
import { getAllPosts, getPost } from '@/data/posts';
import { baseUrl } from '@/app/sitemap'
import { MDX } from '@/components/mdx';
import { Container } from '@/components/container';
import { HeadingsList } from '@/components/headings-list';

export const generateStaticParams = async () => {
  return getAllPosts().map((item) => ({
    slug: item.slug,
  }));
}

interface Params {
  params: Promise<{ slug: string; }>;
}

export const generateMetadata = async ({ params }: Params): Promise<Metadata> => {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) {
    throw new Error(`Post not found for slug: ${slug}`);
  }

  const {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
  } = post.metadata

  const ogImage = image
    ? image
    : `${baseUrl}/og?title=${encodeURIComponent(title)}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime,
      url: `${baseUrl}/articles/${slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  };  
}

const PostPage = async ({ params }: Params) => {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <Container>
      <section>
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'BlogPosting',
              headline: post.metadata.title,
              datePublished: post.metadata.publishedAt,
              dateModified: post.metadata.publishedAt,
              description: post.metadata.summary,
              image: post.metadata.image
                ? `${baseUrl}${post.metadata.image}`
                : `/og?title=${encodeURIComponent(post.metadata.title)}`,
              url: `${baseUrl}/blog/${post.slug}`,
              author: {
                '@type': 'Person',
                name: 'My Portfolio',
              },
            }),
          }}
        />
        <h1 className="font-bold text-3xl text-center">
          {post.metadata.title}
        </h1>
        <div className="flex justify-between items-center mt-2 mb-8 text-sm">
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            {post.metadata.publishedAt}
          </p>
        </div>
        <div className='flex flex-col lg:flex-row-reverse gap-10'>
          <div className='w-full lg:w-[300px] lg:min-w-[300px]'>
            <aside className='w-full sticky top-18 pt-18'>
              <HeadingsList
                headings={post.headings}
              />
            </aside>
          </div>
          <article className='flex-fill pt-18'>
            <MDX source={post.content} />
          </article>
        </div>
      </section>
    </Container>
  )
};

export default PostPage;
