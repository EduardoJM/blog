import { createElement, PropsWithChildren } from 'react'
import { MDXRemote, MDXRemoteProps } from 'next-mdx-remote/rsc'
import { slugify } from '@/data/posts'

const createHeading = (
  level: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6',
  { children }: PropsWithChildren,
) => {
  const fontSize = {
    'h1': 'text-4xl',
    'h2': 'text-3xl',
    'h3': 'text-2xl',
    'h4': 'text-xl',
    'h5': 'text-lg',
    'h6': 'text-base'
  }[level];
  const HeadingEl = createElement(level, {
    className: `font-bold text-center mb-6 border-b border-b-[#000] ${fontSize}`,
  }, children);

  return (
    <>
      <a
        name={slugify(String(children))}
        className="relative -top-18"
      />
      {HeadingEl}
    </>
  );
}

export const MDX = (props: MDXRemoteProps) => {
  return (
    <MDXRemote
      {...props}
      components={{
        p: ({ children }: PropsWithChildren) => {
          return <p className='text-lg mb-6 indent-20'>{children}</p>
        },
        h1: (props: PropsWithChildren) => {
          return createHeading('h1', props);
        },
        h2: (props: PropsWithChildren) => {
          return createHeading('h2', props);
        },
        h3: (props: PropsWithChildren) => {
          return createHeading('h3', props);
        },
        h4: (props: PropsWithChildren) => {
          return createHeading('h4', props);
        },
        h5: (props: PropsWithChildren) => {
          return createHeading('h5', props);
        },
        h6: (props: PropsWithChildren) => {
          return createHeading('h6', props);
        },
        ...(props.components || {})
      }}
    />
  )
}
