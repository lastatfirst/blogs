
import { getCliClient } from 'sanity/cli'

// Initialize the Sanity client (make sure to use a token with write access)
// You might need to adjust the apiVersion based on your project
const client = getCliClient({ apiVersion: '2024-05-27' })

async function migrateReadingLists() {
  const query = '*[_type == "readingList" && defined(weekStart)]'
  const documents = await client.fetch(query)

  if (documents.length === 0) {
    console.log('No documents to migrate.')
    return
  }

  console.log(`Found ${documents.length} documents to migrate.`)

  const transaction = client.transaction()

  for (const doc of documents) {
    console.log(`Processing document: ${doc._id}`)
    const weekStartDate = new Date(doc.weekStart)
    
    // Set monthDate to the first day of the month from weekStart
    const monthDate = new Date(weekStartDate.getFullYear(), weekStartDate.getMonth(), 1)
      .toISOString()
      .split('T')[0] // Format as YYYY-MM-DD

    transaction.patch(doc._id, {
      set: { monthDate: monthDate },
      unset: ['weekStart', 'weekEnd'],
    })
  }

  try {
    await transaction.commit()
    console.log('Migration successful! All documents have been updated.')
  } catch (error) {
    console.error('Migration failed:', error)
  }
}

migrateReadingLists().catch((err) => {
  console.error(err)
  process.exit(1)
})
