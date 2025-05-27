export default {
  name: 'readingList',
  title: 'Monthly Reading List',
  type: 'document',
  fields: [
    {
      name: 'monthDate',
      title: 'Month',
      type: 'date',
      description: 'Select the first day of the month for this reading list.',
      options: {
        dateFormat: 'YYYY-MM',
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'items',
      title: 'Reading Items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Title',
              type: 'string',
            },
            {
              name: 'url',
              title: 'URL',
              type: 'url',
            },
            {
              name: 'completed',
              title: 'Completed',
              type: 'boolean',
              initialValue: false,
            }
          ]
        }
      ]
    }
  ]
}