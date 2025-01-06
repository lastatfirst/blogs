import { defineType } from "sanity";

export default defineType({
  name: "blog",
  type: "document",
  title: "Blog",
  fields: [
    {
      name: "title",
      type: "string",
      title: "Title of blog article",
    },
    {
      name: "slug",
      type: "slug",
      title: "Slug of your blog article",
      options: {
        source: "title",
      },
    },
    {
      name: "titleImage",
      type: "image",
      title: "Title Image",
    },
    {
      name: "smallDescription",
      type: "text",
      title: "Small Description",
    },
    {
      name: "content",
      type: "array",
      title: "Content",
      of: [
        { type: "block", title: "Text" },
        { type: "image", title: "Image" },
        {
          name: "code",
          type: "object",
          title: "Code Snippet",
          fields: [
            {
              name: "language",
              type: "string",
              title: "Language",
              options: {
                list: [
                  { title: "JavaScript", value: "javascript" },
                  { title: "TypeScript", value: "typescript" },
                  { title: "Python", value: "python" },
                  { title: "HTML", value: "html" },
                  { title: "CSS", value: "css" },
                ],
              },
            },
            {
              name: "code",
              type: "text",
              title: "Code",
            },
          ],
        },
        {
          name: "math",
          type: "object",
          title: "Math Equation",
          fields: [
            {
              name: "inline",
              type: "boolean",
              title: "Inline",
              description: "Check this box for inline equations.",
            },
            {
              name: "equation",
              type: "string",
              title: "LaTeX Equation",
              description: "Write the LaTeX equation here.",
            },
          ],
        },
      ],
    },
  ],
});
