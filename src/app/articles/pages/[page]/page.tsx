import { getPostsPagesCount, getPostsPaginated } from "@/data/posts"
import { PostGrid } from '@/components/post-grid';
import { PostPagination } from '@/components/post-pagination';
import { Container } from "@/components/container";
import { Title } from "@/components/title";


export const generateStaticParams = async () => {
  return Array
    .from({ length : getPostsPagesCount() })
    .map((_, index) => ({
      page: String(index + 1),
    }));
}

interface Params {
  params: Promise<{ page: string; }>;
}
  
const ArticlesPage = async ({ params }: Params) => {
  const { page } = await params;
  const { posts, pagesCount, currentPage } = getPostsPaginated(parseInt(page));

  return (
    <Container>
      <Title>Todas as postagens</Title>
      <PostGrid posts={posts} />
      <PostPagination pagesCount={pagesCount} currentPage={currentPage} />
    </Container>
  );
}

export default ArticlesPage;
