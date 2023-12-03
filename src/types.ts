export type Post = {
  id: number;
  title: string;
  text: string;
  image: string;
  url: string;
  active: number;
  sort_order: null | number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
};
