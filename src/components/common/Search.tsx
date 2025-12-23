import InputField from "./form/Input"

type SearchProps = {
  Svalue?: string
  onChange?: ((value: string) => any)
}

export const Search = ({ Svalue, onChange }: SearchProps) => {
  return (
    <InputField
      value={Svalue ?? ""}
      placeholder="Search"
      onChange={(e) => onChange?.(e.target.value)}
    />
  )
}
