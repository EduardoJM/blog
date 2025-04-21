import { MDXRemote, MDXRemoteProps } from 'next-mdx-remote/rsc'
import React from 'react'

export const MDX = (props: MDXRemoteProps) => {
  return (
    <MDXRemote {...props} />
  )
}
