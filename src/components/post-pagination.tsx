import Link from "next/link";
import { Fragment } from "react";

export interface PostPaginationProps {
  pagesCount: number;
  currentPage?: number;
}

export const PostPagination = ({
  pagesCount,
  currentPage,
}: PostPaginationProps) => {
  return (
    <div className="py-10 flex flex-row items-center justify-center gap-2">
      {Array.from({ length: pagesCount }).map((_, index) => (
        <Fragment key={index + 1}>
          {currentPage && currentPage === index + 1 ? (
            <span className="px-3 py-2 rounded bg-primary text-primary-fg">
              {index + 1}
            </span>
          ) : (
            <Link
              href={`/articles/pages/${index + 1}/`}
              className="px-3 py-2 rounded"
            >
              {index + 1}
            </Link>
          )}
        </Fragment>
      ))}
    </div>
  )
}
