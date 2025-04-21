import { PropsWithChildren } from "react";

export type ContainerProps = PropsWithChildren;

export const Container = ({ children }: ContainerProps) => {

  return (
    <main className="px-0 lg:px-10 xl:px-40 2xl:px-60">
      {children}
    </main>
  )
}
