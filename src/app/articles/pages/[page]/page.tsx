import { getPostsPagesCount, getPostsPaginated } from "@/data/posts"
import { PostGrid } from '@/components/post-grid';
import { PostPagination } from '@/components/post-pagination';
import { Container } from "@/components/container";


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
  const { posts, pagesCount } = getPostsPaginated(parseInt(page));


  return (
    <Container>
      <PostGrid posts={posts} />
      <PostPagination pagesCount={pagesCount} />
    </Container>
  );
}

export default ArticlesPage;
