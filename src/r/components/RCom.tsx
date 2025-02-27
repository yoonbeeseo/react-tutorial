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

export interface RComInputProps extends RComProps {
  ref: React.Ref<HTMLInputElement>
  onChangeText: (value: string) => void
}

export const Input = ({ id, onChangeText, placeholder, ref, title, value }: RComInputProps) => {
  return (
    <RComContainer id={id} title={title}>
      <Form.Text
        id={id}
        ref={ref}
        value={value}
        onChange={(e) => onChangeText(e.target.value)}
        placeholder={placeholder}
      />
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
      <select id={id} onChange={(e) => onSelectOption(e.target.value)} value={value} ref={ref}>
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
