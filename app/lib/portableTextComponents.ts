import React from "react";

export const myPortableTextComponents = {
  types: {
    code: ({ value }: { value: { code: string; language: string } }) => (
      <pre className="bg-zinc-900 rounded p-4 overflow-x-auto my-4">
        <code className="text-[#00ff66]">{value.code}</code>
      </pre>
    ),
    image: ({ value }: { value: { asset: { url: string }; alt?: string } }) => (
      value?.asset?.url ? (
        <img src={value.asset.url} alt={value.alt || "Image"} className="my-8 rounded" />
      ) : (
        <span className="text-zinc-400">No image available</span>
      )
    ),
  },
  block: {
    h1: ({ children }: { children: React.ReactNode }) => <h1 className="text-4xl font-bold mt-12 mb-4 text-white">{children}</h1>,
    h2: ({ children }: { children: React.ReactNode }) => <h2 className="text-3xl font-bold mt-10 mb-4 text-white">{children}</h2>,
    h3: ({ children }: { children: React.ReactNode }) => <h3 className="text-2xl font-bold mt-8 mb-4 text-white">{children}</h3>,
    normal: ({ children }: { children: React.ReactNode }) => <p className="text-zinc-300 mb-4 leading-relaxed">{children}</p>,
  },
  marks: {
    link: ({ children, value }: { children: React.ReactNode; value: { href: string } }) => (
      <a href={value?.href} className="text-[#00ff66] hover:text-[#33ff85] underline" target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    ),
    code: ({ children }: { children: React.ReactNode }) => (
      <code className="bg-zinc-900 text-[#00ff66] rounded px-1 py-0.5">{children}</code>
    ),
  },
};
