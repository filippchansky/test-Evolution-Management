export interface IDocument {
  id: number;
  title: string;
  type: DocumentType;
  description: string;
  // created_at: string (ISO)
}

export type DocumentType = 0 | 1 | 2;
