import { Controller } from "react-hook-form"
import { useEffect, useState } from "react"
import { useMediaData } from "@/hooks/useMediaData"
import { uploadToS3 } from "@/utils/uploadToS3"

interface Props {
  name: string
  control: any
  label?: string
  error?: string
  defaultImage?: string
}

export default function Image({
  name,
  control,
  label,
  error,
  defaultImage,
}: Props) {
  const [preview, setPreview] = useState<string | null>(
  defaultImage ? defaultImage : null
)
  const { getUploadUrl, loading } = useMediaData()

   useEffect(() => {
    if (defaultImage) {
      setPreview(defaultImage)  
    }
  }, [defaultImage])

  return (
    <div className="px-4">
      
      {label && (
        <label className="block mb-1">
          {label}
          <span className="text-red-500"> *</span>
        </label>
      )}

      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <>
            <input
              type="file"
              accept="image/*"
              disabled={loading}
              className="border h-8 px-2 w-full rounded shadow-xl"
              onChange={async (e) => {
                const file = e.target.files?.[0]
                if (!file) return

                try {
                  const media = await getUploadUrl("images")
                  const key = await uploadToS3(media, file)
                  field.onChange(key)
                  setPreview(URL.createObjectURL(file))
                } catch {
                  field.onChange(null)
                  setPreview(null)
                }
              }}
            />

            {!preview && (
              <span className="ml-2 text-gray-500 text-sm">
                No file chosen
              </span>
            )}

            {preview && (
              <div className="mt-3">
                <img
                  src={preview}
                  alt="preview"
                  className="w-60 rounded border shadow"
                />
              </div>
            )}
          </>
        )}
      />

      {loading && (
        <p className="text-sm text-blue-500 mt-1">
          Uploading image...
        </p>
      )}

      {error && (
        <p className="text-red-500 text-sm mt-1">{error}</p>
      )}
    </div>
  )
}
