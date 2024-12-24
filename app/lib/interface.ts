export interface simpleBlogCard {
    title: string;
    smallDescription: string;
    currentSlug: string;
  }
  
  export interface fullBlog {
    currentSlug: string;
    title: string;
    content: PortableTextBlock[]; // Replaced `any` with `PortableTextBlock[]`
  }
  
  // Define the type for PortableText content structure
  export type PortableTextBlock = {
    _key: string;
    _type: string;
    children: { _key: string; _type: string; text: string }[];
    markDefs: any[];  // You can keep this as `any[]` for now, or replace with a specific type if needed
    style: string;
  };
  