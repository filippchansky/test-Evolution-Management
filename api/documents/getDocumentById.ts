import { IDocument } from '@/models';
import { api } from './instance';

export const getDocumentById = async (id: number): Promise<IDocument[]> => {
  try {
    const res = await api.get(`documents?id=eq.${id}`);

    return res.data;
  } catch (error: unknown) {
    console.error('Error fetching document', error);
    throw error;
  }
};
