import { getPostsPaginated } from "@/data/posts"
import { PostGrid } from "@/components/post-grid";
import { PostPagination } from "@/components/post-pagination";
import { Container } from "@/components/container";

const ArticlesFirstPage = () => {
  const { posts, pagesCount } = getPostsPaginated(1);


  return (
    <Container>
      <PostGrid posts={posts} />
      <PostPagination pagesCount={pagesCount} />
    </Container>
  );
}

export default ArticlesFirstPage;
