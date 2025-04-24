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
      <pre className="bg-[#f8f8f8] rounded p-4 overflow-x-auto my-4 text-[#111]">
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
      <h1 className="text-4xl font-medium tracking-tight mt-12 mb-6 text-[#111] font-['et-book',Palatino,'Palatino_Linotype','Palatino_LT_STD','Book_Antiqua',Georgia,serif]">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-3xl font-medium tracking-tight mt-10 mb-4 text-[#111] font-['et-book',Palatino,'Palatino_Linotype','Palatino_LT_STD','Book_Antiqua',Georgia,serif]">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl font-medium tracking-tight mt-8 mb-4 text-[#111] font-['et-book',Palatino,'Palatino_Linotype','Palatino_LT_STD','Book_Antiqua',Georgia,serif]">
        {children}
      </h3>
    ),
    normal: ({ children }) => (
      <p className="text-[#111] mb-5 leading-relaxed tracking-tight font-['et-book',Palatino,'Palatino_Linotype','Palatino_LT_STD','Book_Antiqua',Georgia,serif]">
        {children}
      </p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-[#e5383b] pl-4 my-6 italic text-[#111]/80 font-['et-book',Palatino,'Palatino_Linotype','Palatino_LT_STD','Book_Antiqua',Georgia,serif]">
        {children}
      </blockquote>
    ),
    bullet: ({ children }) => (
      <ul className="list-disc list-inside mb-5 text-[#111] font-['et-book',Palatino,'Palatino_Linotype','Palatino_LT_STD','Book_Antiqua',Georgia,serif]">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-inside mb-5 text-[#111] font-['et-book',Palatino,'Palatino_Linotype','Palatino_LT_STD','Book_Antiqua',Georgia,serif]">
        {children}
      </ol>
    ),
  },
  marks: {
    link: ({ children, value }: any) => (
      <a
        href={value?.href}
        className="text-[#e5383b] hover:text-[#c72c2f] transition-colors duration-200 border-b border-[#e5383b]/30 hover:border-[#c72c2f]"
        target={value?.blank ? "_blank" : "_self"}
        rel={value?.blank ? "noopener noreferrer" : undefined}
      >
        {children}
      </a>
    ),
    code: ({ children }) => (
      <code className="bg-[#f8f8f8] text-[#e5383b] rounded-md px-3 py-1 text-[0.95em] font-normal">{children}</code>
    ),
  }
};
