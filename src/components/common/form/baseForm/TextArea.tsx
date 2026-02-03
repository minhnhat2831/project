interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
}

export default function TextArea({ label, error, ...rest }: Props) {
  return (
    <div className="px-4">
      {label && (
        <label className="block mb-1">
          {label}
          <span className="text-red-500"> *</span>
        </label>
      )}

      <textarea
        {...rest}
        className={`border w-full px-2 py-2 rounded shadow-md
          ${error ? "border-red-500" : ""}`}
        rows={6}
      />

      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  )
}
