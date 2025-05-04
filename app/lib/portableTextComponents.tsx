import React from "react";
import { PortableTextComponents } from "@portabletext/react";
import Image from "next/image";
import katex from "katex";
import "katex/dist/katex.min.css";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import CodeBlock from "../components/CodeBlock";

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
    code: ({ value }: any) => {
      if (!value?.code) return null;
      
      return (
        <CodeBlock code={value.code} language={value.language || 'text'}>
          <SyntaxHighlighter 
            language={value.language || 'text'} 
            style={vscDarkPlus}
            customStyle={{
              margin: 0,
              padding: '1rem',
              borderRadius: '0.5rem',
              backgroundColor: 'rgb(30, 30, 30)',
              fontSize: '0.9rem',
              lineHeight: '1.5'
            }}
          >
            {value.code}
          </SyntaxHighlighter>
        </CodeBlock>
      );
    },
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
      <code className="bg-[rgb(30,30,30)] text-[rgb(220,220,220)] rounded-md px-3 py-1 text-[0.85rem] font-mono">
        {children}
      </code>
    ),
    note: ({ children }) => (
      <span className="bg-yellow-100 text-yellow-800 px-1 py-0.5 rounded text-[0.85rem]">
        {children}
      </span>
    ),
  }
};
