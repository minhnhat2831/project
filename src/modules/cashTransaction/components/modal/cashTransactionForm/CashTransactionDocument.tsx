import { Icons } from "@/components/common/base/Icon"
import InputField from "@/components/common/form/baseForm/Input"
import { useOpenFormStore } from "@/modules/cashTransaction/store/useModalFormStore"
import { Controller, useFormContext } from "react-hook-form"

export default function CashTransactionFormDocument() {
  const { open, setOpen } = useOpenFormStore()
  const { control, watch, setValue } = useFormContext()

  const files = watch("data.files") || []

  const handleAddFiles = (e : React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files ?? [])
    const newFiles = [...files, ...selectedFiles]

    setValue("data.files", newFiles, { shouldDirty: true })
    e.target.value = ""
  }

  const handleRemoveFile = (index : number) => {
    const newFiles = files.filter((_file: File, i: number)  => i !== index)
    setValue("data.files", newFiles, { shouldDirty: true })
  }

  const formatFileSize = (size : number) => {
    if (size < 1024) return `${size} B`
    if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`
    return `${(size / 1024 / 1024).toFixed(1)} MB`
  }

  return (
    <div className={`bg-white rounded-sm mb-5 shadow-xl ${open ? "h-auto" : "h-12"}`}>
      <div
        className="flex items-center px-4 h-12 border-b cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <p className="font-bold">Document Attachment</p>
        <div className="ml-auto">
          {open ? <Icons.ExpandLess /> : <Icons.ExpandMore />}
        </div>
      </div>

      <div className={`${open ? "h-auto p-4" : "h-0 p-0"} overflow-hidden px-4 transition-all duration-400 ease-in-out`}>
        <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center text-center">
          <p className="text-gray-600 mb-2">Drag and drop your files here or</p>

          <Controller
            name="data.files"
            control={control}
            render={() => (
              <label className="cursor-pointer">
                <span className="inline-flex items-center px-4 py-2 border border-red-500 text-red-500 rounded-md">
                  <Icons.Upload className="mr-2" />
                  Browse Files
                </span>
                <InputField
                  type="file"
                  multiple
                  accept=".pdf,.doc,.docx"
                  className="hidden"
                  onChange={handleAddFiles}
                />
              </label>
            )}
          />

          <p className="text-xs text-gray-500 mt-4">Max size: 5MB</p>
        </div>

        {files.length > 0 && (
          <div className="mt-4 space-y-2">
            {files.map((file: File, index: number) => (
              <div
                key={index}
                className="flex items-center px-3 py-2 border rounded-md bg-gray-50"
              >
                <Icons.Upload className="mr-2 text-gray-500" />

                <div className="flex-1">
                  <p className="text-sm font-medium truncate w-50 sm:w-100 md:w-full">{file.name}</p>
                  <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                </div>

                <button
                  type="button"
                  onClick={() => handleRemoveFile(index)}
                  className=" text-gray-400 hover:text-red-500"
                >
                  <Icons.Close />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
