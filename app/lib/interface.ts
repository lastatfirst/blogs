export interface simpleBlogCard {
  _createdAt: string | number | Date;
  title: string;
  smallDescription: string;
  currentSlug: string;
}

export interface fullBlog {
  slug: string; // Replace 'any' with 'string' or another appropriate type
  likes: number;
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
  params: Promise<{ slug: string }>;
}
