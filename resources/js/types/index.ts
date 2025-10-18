export interface User {
  id: string;
  name: string;
  email: string;
  created_at: string;
  updated_at: string;
  avatar: string | null;
}

export interface Board {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  user_id: string;
  created_at: string;
  updated_at: string;
  color: string;
}
