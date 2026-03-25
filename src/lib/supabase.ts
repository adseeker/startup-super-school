import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Profile = {
  id: string;
  username: string | null;
  first_name: string | null;
  last_name: string | null;
  role: string | null;
  country: string | null;
  stage: string | null;
  job_title: string | null;
  company: string | null;
  bio: string | null;
  interests: string[] | null;
  website_url: string | null;
  twitter_url: string | null;
  linkedin_url: string | null;
  avatar_url: string | null;
};
