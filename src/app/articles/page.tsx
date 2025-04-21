import { getPostsPaginated } from "@/data/posts"
import { PostGrid } from "@/components/post-grid";
import { PostPagination } from "@/components/post-pagination";

const ArticlesFirstPage = () => {
  const { posts, pagesCount } = getPostsPaginated(1);


  return (
    <>
      <PostGrid posts={posts} />
      <PostPagination pagesCount={pagesCount} />
    </>
  );
}

export default ArticlesFirstPage;
