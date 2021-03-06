import { Photo } from './photo';

export interface User {
  id: number;
  username: string;
  knownAs: string;
  age: number;
  gender: string;
  created: Date;
  lastActive: Date;
  photoUrl: string;
  city: string;
  country: string;
  admin?: number;
  interests?: string;
  introduction?: string;
  notes?: string;
  blocked: string;
  photos?: Photo[];
}
