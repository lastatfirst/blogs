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
  
  export type PortableTextBlock = {
    _key: string;
    _type: string;
    children: PortableTextChild[];
    markDefs: MarkDef[];
    style: string;
  };
  
  export type PortableTextChild = {
    _key: string;
    _type: string;
    text: string;
  };
  
  export type MarkDef = {
    _key: string;
    _type: string;
    href?: string;
  };
  
  export interface PageProps {
    params: {
      slug: string;
    };
  }
  