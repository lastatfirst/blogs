import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

export const client = createClient({
  apiVersion: "2024-12-23",
  dataset: "production",
  projectId: "oh713oov",
  useCdn: false,
});
