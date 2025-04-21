import { ComponentProps, PropsWithChildren } from "react";

export type ContainerProps = PropsWithChildren<{
  className?: ComponentProps<"main">['className'];
}>;

export const Container = ({ children, className }: ContainerProps) => {

  return (
    <main className={`px-0 lg:px-10 xl:px-40 2xl:px-60 ${className || ''}`}>
      {children}
    </main>
  )
}
