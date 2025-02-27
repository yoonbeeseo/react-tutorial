import { twMerge } from "tailwind-merge"

export type HeadingProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>

export const H1 = (props: HeadingProps) => {
  return <h1 {...props} className={twMerge("text-4xl font-[900]", props?.className)} />
}

export const H2 = (props: HeadingProps) => {
  return <h2 {...props} className={twMerge("text-3xl font-[900]", props?.className)} />
}

export type TextProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>

export const P = (props: TextProps) => {
  return <p {...props} className={twMerge("text-gray-500", props?.className)} />
}
