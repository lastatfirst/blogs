export default {
  name: 'readingList',
  title: 'Reading List',
  type: 'document',
 
  permissions: [
    {
      update: true
    }
  ],
  fields: [
    {
      name: 'weekStart',
      title: 'Week Start Date',
      type: 'date',
    },
    {
      name: 'weekEnd',
      title: 'Week End Date',
      type: 'date',
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