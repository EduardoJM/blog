import { Post } from "@/data/posts";
import { PostCard } from './post-card';

export interface PostGridProps {
  posts: Array<Post>;
}

export const PostGrid = ({ posts }: PostGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-15">
      {posts.map((post) => (
        <PostCard key={post.slug} post={post} />
      ))}
    </div>
  )
};
