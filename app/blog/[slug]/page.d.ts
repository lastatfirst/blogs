// Type declaration for Next.js dynamic route pages

// Declare the expected types for dynamic routes
declare module 'next' {
  export interface PageProps {
    params: { [key: string]: string };
    searchParams?: { [key: string]: string | string[] };
  }
}
