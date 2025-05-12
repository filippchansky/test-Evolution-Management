import { IDocument } from '@/models';
import { api } from './instance';

export const createDocument = async (data: Omit<IDocument, 'id'>): Promise<void> => {
  try {
    await api.post('documents', data);
  } catch (error) {
    console.error('Error', error);
    throw error;
  }
};
