import { twMerge } from "tailwind-merge"

export type FormProps = React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>

export const Form = (props: FormProps) => (
  <form
    {...props}
    className={twMerge("flex flex-col gap-y-2.5", props?.className)}
    onSubmit={(e) => {
      e.preventDefault()
      props?.onSubmit && props.onSubmit(e)
    }}
  />
)

export type InputProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
export const Text = (props: InputProps) => (
  <input
    {...props}
    type={props?.type ?? "text"}
    className={twMerge(
      "h-10 px-2.5 rounded outline-none bg-gray-100 focus:bg-gray-50 focus:border focus:border-sky-500",
      props?.className
    )}
  />
)

export type LabelProps = React.DetailedHTMLProps<React.LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement>
export const Label = (props: LabelProps) => (
  <label {...props} className={twMerge("text-gray-500 text-xs", props?.className)} />
)
