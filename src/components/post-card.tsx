import Link from 'next/link'
import { Post } from "@/data/posts";
import Image from 'next/image';
import { MoveRight } from 'lucide-react';

export interface PostCardProps {
  post: Post;
}

export const PostCard = ({ post }: PostCardProps) => {
  return (
    <Link
      className="group flex flex-col items-stretch rounded-2xl overflow-hidden shadow-md"
      href={`/articles/${post.slug}`}
    >
      {post.metadata.image && (
        <Image
          src={post.metadata.image}
          className='object-cover object-center w-full rounded-2xl transition-transform duration-150 group-hover:scale-110'
          width={300}
          height={300}
          alt="thumbnail"
          loading="lazy"
        />
      )}
      <div className="w-full z-10 bg-white p-5 -mt-10 rounded-2xl flex flex-col">
        {post.metadata.tags.length > 0 && (
          <div className='mb-3'>
            <span className='px-2 py-1 bg-primary text-primary-fg rounded font-medium'>
              {post.metadata.tags[0].display}
            </span>
          </div>
        )}
        <p className="font-bold text-lg line-clamp-2 mb-1">
          {post.metadata.title}
        </p>
        <p className="text-neutral-400 mb-3">
          {post.metadata.publishedAt}
        </p>
        <div className='font-bold text-primary flex flex-row gap-2 justify-end transition-transform duration-150 group-hover:-translate-y-0.5 group-hover:-translate-x-0.5'>
          Leia mais <MoveRight />
        </div>
      </div>
    </Link>
  )
};
