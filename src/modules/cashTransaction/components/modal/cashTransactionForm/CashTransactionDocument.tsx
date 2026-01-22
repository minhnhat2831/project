import { useState } from "react"
import { Icons } from "@/components/common/base/Icon"
import InputField from "@/components/common/form/Input"

export default function CashTransactionFormDocument() {
  const [openForm, setOpenForm] = useState(true)

  return (
    <div
      className={`bg-white rounded-sm mb-5 transition-all duration-500 ease-in-out shadow-xl
        ${openForm ? "h-80" : "h-12"}`}
    >
      <div
        className="flex items-center px-4 h-12 border-b cursor-pointer"
        onClick={() => setOpenForm(!openForm)}
      >
        <p className="font-bold">Document Attachment</p>
        <div className="ml-auto transition-transform duration-200">
          {openForm ? <Icons.ExpandLess /> : <Icons.ExpandMore />}
        </div>
      </div>

      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out
          ${openForm ? "h-64 p-4" : "h-0 p-0"}`}
      >
        <div className="h-full border-2 border-dashed rounded-lg flex flex-col items-center justify-center text-center">
          <p className="text-gray-600 mb-2">
            Drag and drop your files here or
          </p>

          <label className="cursor-pointer">
            <span className="inline-flex items-center px-4 py-2 border border-red-500 text-red-500 rounded-md hover:bg-red-50 transition">
              <Icons.Upload className="mr-2" />
              Browse Files
            </span>
            <InputField
              type="file"
              className="hidden"
            />
          </label>

          <p className="text-xs text-gray-500 mt-4">
            Files has a maximum size of 5MB
          </p>
          <p className="text-xs text-gray-500">
            Upload pdf, docx, doc file type only.
          </p>
        </div>
      </div>
    </div>
  )
}
