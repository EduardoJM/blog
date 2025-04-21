import { getPostsPaginated } from "@/data/posts"
import { PostGrid } from "@/components/post-grid";
import { PostPagination } from "@/components/post-pagination";
import { Container } from "@/components/container";
import { Title } from "@/components/title";

const ArticlesFirstPage = () => {
  const { posts, pagesCount, currentPage } = getPostsPaginated(1);


  return (
    <Container>
      <Title>Todas as postagens</Title>
      <PostGrid posts={posts} />
      <PostPagination pagesCount={pagesCount} currentPage={currentPage} />
    </Container>
  );
}

export default ArticlesFirstPage;
