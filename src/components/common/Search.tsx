import InputField from "./form/Input"

type SearchProps = {
  Svalue?: string
  onChange?: ((value: string) => any)
}

export const Search = ({ Svalue, onChange }: SearchProps) => {
  return (
    <InputField
      className="sm:w-full lg:w-150"
      value={Svalue ?? ""}
      placeholder="Search"
      onChange={(e) => onChange?.(e.target.value)}
    />
  )
}
