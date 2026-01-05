import type { Media } from "@/types/media/Media.type"

export const uploadToS3 = async (media: Media, file: File) => {
  const formData = new FormData()

  let finalKey = media.fields.key

  Object.entries(media.fields).forEach(([key, value]) => {
    if (key === "key") {
      const replacedKey = String(value).replace(
        "${filename}",
        file.name
      )
      finalKey = replacedKey
      formData.append("key", replacedKey)
    } else {
      formData.append(key, value as any)
    }
  })

  formData.append("file", file)

  const res = await fetch(media.url, {
    method: "POST",
    body: formData,
  })

  if (!res.ok) {
    throw new Error("Upload failed")
  }

  return `${media.url}/${finalKey}`
}
