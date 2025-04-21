import Link from 'next/link'
import { Post } from "@/data/posts";
import Image from 'next/image';

export interface PostCardProps {
  post: Post;
}

export const PostCard = ({ post }: PostCardProps) => {
  return (
    <Link
      className="flex flex-col items-stretch rounded-2xl overflow-hidden shadow-md"
      href={`/articles/${post.slug}`}
    >
      {post.metadata.image && (
        <Image
          src={post.metadata.image}
          className='object-cover object-center w-full rounded-2xl transition-transform duration-150 hover:scale-110'
          width={300}
          height={300}
          alt="thumbnail"
          loading="lazy"
        />
      )}
      <div className="w-full z-25 bg-white p-5 -mt-10 rounded-2xl flex flex-col">
        <p className="text-neutral-400 tracking-tight">
          {post.metadata.title}
        </p>
        <p className="text-neutral-400 w-[100px] tabular-nums">
          {post.metadata.publishedAt}
        </p>
        <div className='flex flex-row justify-end'>
          Leia mais
        </div>
      </div>
    </Link>
  )
};
