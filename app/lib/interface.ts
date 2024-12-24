export interface simpleBlogCard {
    title: string;
    smallDescription: string;
    currentSlug: string;
  }
  
  export interface fullBlog {
    currentSlug: string;
    title: string;
    content: PortableTextBlock[];
  }
  
  // Define the type for PortableText content structure
  export type PortableTextBlock = {
    _key: string;
    _type: string;
    children: { _key: string; _type: string; text: string }[];
    markDefs: MarkDef[];  // Replaced `any[]` with a specific type `MarkDef[]`
    style: string;
  };
  
  // Define the type for marks applied to text
  export type MarkDef = {
    _key: string;
    _type: string;
    href?: string;  // Optional property for links
    [key: string]: any;  // Allow additional properties
  };
  