import React from "react"
import { Container, Form } from "../../ui"

export interface RComProps {
  id: string
  title: string
  value: string | number
  placeholder: string
}

const RComContainer = ({ id, title, children }: { id: string; title: string } & React.PropsWithChildren) => {
  return (
    <Container.Col className="gap-y-1">
      <Form.Label htmlFor={id}>{title}</Form.Label>
      {children}
    </Container.Col>
  )
}

export interface RComInputProps extends RComProps, React.PropsWithChildren {
  ref: React.Ref<HTMLInputElement>
  onChangeText: (value: string) => void
  input?: Form.InputProps
  isShowing?: boolean
}

export const Input = ({
  id,
  onChangeText,
  placeholder,
  ref,
  title,
  value,
  input,
  children,
  isShowing,
}: RComInputProps) => {
  return (
    <RComContainer id={id} title={title}>
      {children}
      {isShowing === undefined ? (
        <Form.Text
          {...input}
          id={id}
          ref={ref}
          value={value}
          onChange={(e) => onChangeText(e.target.value)}
          placeholder={placeholder}
        />
      ) : (
        isShowing && (
          <Form.Text
            {...input}
            id={id}
            ref={ref}
            value={value}
            onChange={(e) => onChangeText(e.target.value)}
            placeholder={placeholder}
          />
        )
      )}
    </RComContainer>
  )
}

export interface RComSelectProps extends RComProps {
  ref: React.Ref<HTMLSelectElement>
  onSelectOption: (value: string) => void
  options: string[]
}

export const Select = ({ id, onSelectOption, options, placeholder, ref, title, value }: RComSelectProps) => {
  return (
    <RComContainer id={id} title={title}>
      <select
        id={id}
        onChange={(e) => onSelectOption(e.target.value)}
        value={value}
        ref={ref}
        className="rounded outline-none bg-gray-100 focus:bg-gray-50 focus:border focus:border-blue-500 h-10 px-2.5 pl-0"
      >
        <option>{placeholder}</option>

        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </RComContainer>
  )
}
