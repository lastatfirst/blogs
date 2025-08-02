export interface simpleBlogCard {
  title: string;
  currentSlug: string;
  _createdAt: string;
}

export interface fullBlog {
  title: string;
  content: PortableTextBlock[];
  _createdAt: string;
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
