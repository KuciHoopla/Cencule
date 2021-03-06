export interface Blog {
  id: number;
  url: string;
  title?: string;
  description: string;
  dateAdded: Date;
  publicId: number;
  user: string;
  userId: string;
  mainUrl: string;
  userName: string;
  blocked: string;
}
