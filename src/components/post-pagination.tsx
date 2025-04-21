import Link from "next/link";

export interface PostPaginationProps {
  pagesCount: number;
}

export const PostPagination = ({ pagesCount }: PostPaginationProps) => {

  return (
    <div>
      {Array.from({ length: pagesCount }).map((_, index) => (
        <Link key={index + 1} href={`/articles/pages/${index + 1}/`}>
          {index + 1}
        </Link>
      ))}
    </div>
  )
}
