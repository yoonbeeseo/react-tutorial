import { twMerge } from "tailwind-merge"

export type ContainerProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>

export const Col = (props: ContainerProps) => {
  return <div {...props} className={twMerge("flex flex-col gap-y-2.5", props?.className)} />
}

export const Row = (props: ContainerProps) => {
  return <div {...props} className={twMerge("flex gap-x-2.5", props?.className)} />
}
