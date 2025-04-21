import { Heading } from "@/data/posts";

export interface HeadingsListProps {
  headings: Array<Heading>
}

export const HeadingsList = ({ headings }: HeadingsListProps) => {

  return (
    <ul className="ps-3">
      {headings.map((heading) => (
        <li key={heading.slug}>
          <a href={`#${heading.slug}`}>{heading.title}</a>
          {heading.childs.length > 0 && (
            <HeadingsList headings={heading.childs} />
          )}
        </li>
      ))}
    </ul>
  )
}
