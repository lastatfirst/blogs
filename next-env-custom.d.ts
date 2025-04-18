// This file contains custom type declarations to fix Next.js TypeScript errors

// Fix for the "Type does not satisfy the constraint 'PageProps'" error
declare namespace NodeJS {
  interface ProcessEnv extends Dict<string> {}
}

// Override Next.js PageProps interface to work with dynamic routes
declare module "next" {
  export interface PageProps {
    params?: Record<string, string>;
    searchParams?: Record<string, string | string[]>;
  }
}
