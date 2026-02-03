interface DateInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  disabled?: boolean,
  error? : any
}

export default function DateInput({
  disabled,
  value,
  error,
  onChange,
  ...rest
}: DateInputProps) {
  const formatDate = (date: Date) =>
    date.toISOString().split("T")[0]

  const today = formatDate(new Date())

  const getMinDate = () => {
    const d = new Date()
    d.setMonth(d.getMonth() - 3)
    return formatDate(d)
  }

  const getMaxDate = () => {
    const d = new Date()
    d.setMonth(d.getMonth() + 3)
    return formatDate(d)
  }

  return (
    <div className="flex flex-col gap-1 w-auto">
      <input
        {...rest}
        type="date"
        value={value ?? today}
        min={getMinDate()}
        max={getMaxDate()}
        disabled={disabled}
        onChange={onChange}
        className={
          disabled
            ? "border w-100 h-10 rounded-md px-3 py-2 text-md shadow-md bg-gray-200 cursor-not-allowed"
            : "border w-100 h-10 rounded-md px-3 py-2 text-md shadow-md"
        }
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  )
}
