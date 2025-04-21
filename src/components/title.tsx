import { createElement, PropsWithChildren } from "react"

export type TitleProps = PropsWithChildren<{
  component?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}>;

export const Title = ({ children, component = 'h1' }: TitleProps) => {
  return createElement(
    component,
    {
      className: 'font-bold text-3xl mb-10',
    },
    children,
  );
}
