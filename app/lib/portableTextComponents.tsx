import React from "react";
import { PortableTextComponents } from "@portabletext/react";
import Image from "next/image";
import katex from "katex";
import "katex/dist/katex.min.css";

export const myPortableTextComponents: PortableTextComponents = {
  types: {
    math: ({ value }: any) => {
      if (!value?.equation) {
        return <span className="text-red-500">No equation provided</span>;
      }

      try {
        const mathHtml = katex.renderToString(value.equation, {
          throwOnError: false,
          displayMode: !value.inline,
        });

        return (
          <div className={value.inline ? "inline-block" : "my-4 text-center block"}>
            <span dangerouslySetInnerHTML={{ __html: mathHtml }} />
          </div>
        );
      } catch (error) {
        console.error("KaTeX error:", error);
        return <span className="text-red-500">Math rendering error</span>;
      }
    },
    code: ({ value }: any) => (
      <pre className="bg-zinc-900 rounded p-4 overflow-x-auto my-4">
        <code>{value.code}</code>
      </pre>
    ),
    image: ({ value }: any) => {
      if (!value?.asset?._ref) return null;
      return (
        <div className="my-8">
          <Image
            src={`https://cdn.sanity.io/images/oh713oov/production/${value.asset._ref
              .replace('image-', '')
              .replace('-jpg', '.jpg')
              .replace('-png', '.png')
              .replace('-webp', '.webp')}`}
            alt={value.alt || "Blog image"}
            width={800}
            height={600}
            className="w-full rounded"
          />
        </div>
      );
    }
  },
  block: {
    h1: ({ children }) => (
      <h1 className="text-4xl font-medium tracking-tight mt-12 mb-6 text-white underline decoration-[#db0042] decoration-4 underline-offset-4">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-3xl font-medium tracking-tight mt-10 mb-4 text-white underline decoration-[#db0042] decoration-4 underline-offset-4">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl font-medium tracking-tight mt-8 mb-4 text-white underline decoration-[#db0042] decoration-4 underline-offset-4">
        {children}
      </h3>
    ),
    normal: ({ children }) => <p className="text-zinc-300 mb-5 leading-relaxed tracking-tight">{children}</p>,
  },
  marks: {
    link: ({ children, value }: any) => (
      <a
        href={value?.href}
        className="text-[#00ff66] hover:text-[#33ff85] transition-colors duration-200 border-b border-[#00ff66]/30 hover:border-[#33ff85]"
        target={value?.blank ? "_blank" : "_self"}
        rel={value?.blank ? "noopener noreferrer" : undefined}
      >
        {children}
      </a>
    ),
    code: ({ children }) => (
      <code className="bg-zinc-900 text-[#00ff66] rounded-md px-3 py-1 text-[0.95em] font-normal">{children}</code>
    ),
  }
};
