import { createClient } from "next-sanity";

export const client = createClient({
  apiVersion: "2024-12-23",
  dataset: "production",
  projectId: "oh713oov",
  useCdn: false,
});
  