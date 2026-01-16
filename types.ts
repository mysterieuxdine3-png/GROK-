
export type Section = 'home' | 'tutoriels' | 'pdfs' | 'directs' | 'premium';

export interface VideoItem {
  id: string;
  youtubeId: string;
  title: string;
  description: string;
  level: string;
}

export interface PDFResource {
  id: string;
  title: string;
  category: string;
  icon: string;
  color: string;
  topics: string[];
  link: string;
}

export interface ChatMessage {
  role: 'user' | 'ai';
  text: string;
}
