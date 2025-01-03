import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://ztnnhskjihdrhrxctvmo.supabase.co', // Replace with your Supabase URL
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp0bm5oc2tqaWhkcmhyeGN0dm1vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU4OTg3NjksImV4cCI6MjA1MTQ3NDc2OX0.scFrgBM0M4SK5JuuFt7kQqXo_iJCeKcgsjA1B0vhhjw' // Replace with your Supabase Anon Public Key
);

export default supabase;
