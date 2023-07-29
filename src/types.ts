export interface Bookmark {
  id: number;
  url: string;
  title: string;
  description: string;
  notes: string;
  website_title: string | null;
  website_description: string | null;
  is_archived: boolean;
  unread: boolean;
  shared: boolean;
  tag_names: string[];
  date_added: string;
  date_modified: string;
}
