import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  'https://myqgryxbnrbpejqonwur.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im15cWdyeXhibnJicGVqcW9ud3VyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI4ODg0NjgsImV4cCI6MjA4ODQ2NDQ2OH0.QpZUpYE3I3tJzPcB7dduEILyw4RMAfgvhVg5YU_UTi4'
)