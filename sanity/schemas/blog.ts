import { defineType, defineField } from "sanity";

export default defineType({
  name: "blog",
  type: "document",
  title: "Blog",
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Title of blog article",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      title: "Slug of your blog article",
      options: {
        source: "title",
        maxLength: 200,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "titleImage",
      type: "image",
      title: "Title Image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "smallDescription",
      type: "text",
      title: "Small Description",
    }),
    defineField({
      name: "content",
      type: "array",
      title: "Content",
      of: [
        {
          type: "block",
          marks: {
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Link",
                fields: [
                  {
                    name: "href",
                    type: "url",
                    title: "URL",
                    validation: (Rule) => Rule.uri({
                      scheme: ["http", "https", "mailto", "tel"]
                    })
                  },
                  {
                    name: "blank",
                    type: "boolean",
                    title: "Open in new tab",
                    initialValue: true
                  }
                ]
              }
            ]
          }
        },
        defineField({
          type: "image",
          name: "image",
          title: "Image",
          options: {
            hotspot: true,
          },
          fields: [
            defineField({
              name: "alt",
              type: "string",
              title: "Alternative text",
            }),
          ],
        }),
        defineField({
          name: "code",
          type: "object",
          title: "Code Snippet",
          fields: [
            defineField({
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
            }),
            defineField({
              name: "code",
              type: "text",
              title: "Code",
            }),
          ],
        }),
        defineField({
          name: "math",
          type: "object",
          title: "Math Equation",
          fields: [
            defineField({
              name: "inline",
              type: "boolean",
              title: "Inline",
              description: "Check this box for inline equations.",
            }),
            defineField({
              name: "equation",
              type: "string",
              title: "LaTeX Equation",
              description: "Write the LaTeX equation here .",
            }),
          ],
        }),
      ],
    }),
  ],
});
