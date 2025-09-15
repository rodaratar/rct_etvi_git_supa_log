// supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ygdoofsevlrtfrgshifj.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlnZG9vZnNldmxydGZyZ3NoaWZqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYxNzAwMDIsImV4cCI6MjA3MTc0NjAwMn0.l7pWMPejmO_yRAdg-mMMBezBNQABU0Zwk4P6d9iivvA';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
