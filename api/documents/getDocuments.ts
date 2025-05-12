import { IDocument } from '@/models';
import { api } from './instance';

export const getDocuments = async (): Promise<IDocument[]> => {
  try {
    const res = await api.get('documents')

    return res.data;
  } catch (error: unknown) {
    console.error('Error fetching documents:', error);
    throw error;
  }
};
