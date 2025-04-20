import { writeClient } from '@/app/lib/sanity'
import { NextResponse } from 'next/server'

export async function PATCH(request: Request) {
  if (!process.env.SANITY_API_TOKEN) {
    return NextResponse.json({ error: 'Sanity API token not configured' }, { status: 500 })
  }

  try {
    const { weekStart, itemIndex, completed } = await request.json()
    
    // First fetch the document ID
    const query = `*[_type == "readingList" && weekStart == "${weekStart}"][0]._id`
    const documentId = await writeClient.fetch(query)
    
    if (!documentId) {
      return NextResponse.json({ error: 'Reading list not found' }, { status: 404 })
    }

    // Update using the document ID
    await writeClient
      .patch(documentId)
      .set({ [`items[${itemIndex}].completed`]: completed })
      .commit()

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Error updating reading list:', error)
    const message = error.message || 'Failed to update reading list'
    const status = error.statusCode || 500
    return NextResponse.json({ error: message }, { status })
  }
}