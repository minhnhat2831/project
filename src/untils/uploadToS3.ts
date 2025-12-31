import type { Media } from "@/types/media/Media.type"

export const uploadToS3 = async (media: Media, file: File) => {
  const formData = new FormData()

  Object.entries(media.fields).forEach(([key, value]) => {
    formData.append(key, value as any)
  })

  formData.append("file", file)

  const res = await fetch(media.url, {
    method: "POST",
    body: formData,
  })

  if (!res.ok) {
    throw new Error("Upload failed")
  }

  return media.fields.key 
}
