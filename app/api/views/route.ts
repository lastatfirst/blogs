import { NextResponse } from 'next/server';
import supabase from '@/app/lib/supabaseClient';

export async function POST(req: Request) {
  try {
    const { slug } = await req.json();

    const { error } = await supabase
      .from('views')
      .insert([{ 
        post_id: slug,
        created_at: new Date().toISOString()
      }]);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Get updated count
    const { data, error: countError } = await supabase
      .from('views')
      .select('*', { count: 'exact' })
      .eq('post_id', slug);

    if (countError) {
      return NextResponse.json({ error: countError.message }, { status: 500 });
    }

    return NextResponse.json({ views: data?.length || 0 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const slug = url.searchParams.get('slug');

    if (!slug) {
      return NextResponse.json({ error: 'Slug is required' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('views')
      .select('*', { count: 'exact' })
      .eq('post_id', slug);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ views: data?.length || 0 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
