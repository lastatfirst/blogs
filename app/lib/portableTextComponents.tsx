import React from "react";
import { PortableTextComponents } from "@portabletext/react";
import Image from "next/image";
import katex from "katex";
import "katex/dist/katex.min.css";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import CodeBlock from "../components/CodeBlock";
import HeadingWithUnderline from "../components/HeadingWithUnderline";

export const myPortableTextComponents: PortableTextComponents = {
  list: {
    bullet: ({ children }) => <ul className="blog-content">{children}</ul>,
    number: ({ children }) => <ol className="blog-content">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li className="blog-content">{children}</li>,
    number: ({ children }) => <li className="blog-content">{children}</li>,
  },

  types: {
    math: ({ value }: any) => {
      if (!value?.equation) {
        return <span className="text-red-500">No equation provided</span>;
      }

      try {
        const mathHtml = katex.renderToString(value.equation, {
          throwOnError: false,
          displayMode: !value.inline,
          output: "html",
          trust: true,
          strict: false,
          macros: {
            "\\eqref": "\\href{###1}{(\\text{#1})}",
          },
        });

        return (
          <div
            className={value.inline ? "inline-block" : "my-4 overflow-x-auto"}
          >
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
        <CodeBlock code={value.code} language={value.language || "text"}>
          <SyntaxHighlighter
            language={value.language || "text"}
            style={vscDarkPlus}
            customStyle={{
              margin: 0,
              padding: "1rem",
              borderRadius: "0.5rem",
              backgroundColor: "rgb(30, 30, 30)",
              fontSize: "0.9rem",
              lineHeight: "1.5",
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
              .replace("image-", "")
              .replace("-jpg", ".jpg")
              .replace("-png", ".png")
              .replace("-webp", ".webp")}`}
            alt={value.alt || "Blog image"}
            width={800}
            height={600}
            className="w-full rounded"
          />
        </div>
      );
    },
  },
  block: {
    h1: ({ children }) => (
      <HeadingWithUnderline level={1} className="blog-content">
        {children}
      </HeadingWithUnderline>
    ),
    h2: ({ children }) => (
      <HeadingWithUnderline level={2} className="blog-content">
        {children}
      </HeadingWithUnderline>
    ),
    h3: ({ children }) => (
      <HeadingWithUnderline level={3} className="blog-content">
        {children}
      </HeadingWithUnderline>
    ),
    h4: ({ children }) => <h4 className="blog-content">{children}</h4>,
    normal: ({ children }) => <p className="blog-content">{children}</p>,
    blockquote: ({ children }) => (
      <blockquote className="blog-content">{children}</blockquote>
    ),
  },
  marks: {
    link: ({ children, value }: any) => (
      <a
        href={value?.href}
        className="text-[#79b8ff] hover:text-[#79b8ff]/80 transition-colors duration-200 border-b border-[#79b8ff]/30 hover:border-[#79b8ff]/80"
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
  },
};
