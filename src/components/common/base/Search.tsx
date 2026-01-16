import InputField from "../form/Input"

type SearchProps = {
  Svalue?: string
  onChange?: ((value: string) => any),
  hidden?: string
}

export const Search = ({ Svalue, onChange, hidden }: SearchProps) => {
  return (
    <InputField
      className={`sm:w-full lg:w-100 ${hidden}`}
      variant="search"
      value={Svalue ?? ""}
      placeholder="Search"
      onChange={(e) => onChange?.(e.target.value)}
    />
  )
}
