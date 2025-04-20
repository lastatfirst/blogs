import { createClient } from "next-sanity";

// Read-only client for client-side operations
export const client = createClient({
  apiVersion: "2024-12-23",
  dataset: "production",
  projectId: "oh713oov",
  useCdn: false,
});

// Write client for server-side operations
export const writeClient = createClient({
  apiVersion: "2024-12-23",
  dataset: "production",
  projectId: "oh713oov",
  useCdn: false,
  token: process.env.SANITY_API_TOKEN, // Using server-side env variable
});
