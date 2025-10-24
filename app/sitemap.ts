import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://aiwpraktyce.vercel.app/", changeFrequency: "weekly", priority: 1.0 },
    { url: "https://aiwpraktyce.vercel.app/biznes", changeFrequency: "weekly", priority: 0.8 },
    { url: "https://aiwpraktyce.vercel.app/osobiste", changeFrequency: "weekly", priority: 0.8 },
    { url: "https://aiwpraktyce.vercel.app/narzedzia", changeFrequency: "weekly", priority: 0.8 },
    { url: "https://aiwpraktyce.vercel.app/zarabianie", changeFrequency: "weekly", priority: 0.8 },
  ]
}
