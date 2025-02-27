import { twMerge } from "tailwind-merge"

export type ButtonProps = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

const shared = "flex justify-center items-center h-10 p-2.5 rounded bg-gray-50 cursor-pointer"

export const Opacity = (props: ButtonProps) => {
  return (
    <button
      {...props}
      className={twMerge(shared, "hover:opacity-80 active:opacity-50", props?.className)}
      type={props?.type ?? "button"}
    />
  )
}

export const Pressable = (props: ButtonProps) => {
  return <button {...props} className={twMerge(shared, props?.className)} type={props?.type ?? "button"} />
}

export const Spring = (props: ButtonProps) => {
  return (
    <button
      {...props}
      className={twMerge(shared, "active:scale-95", props?.className)}
      type={props?.type ?? "button"}
    />
  )
}
