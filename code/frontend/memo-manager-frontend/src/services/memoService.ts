import axios from 'axios';

const API_URL = 'http://localhost:8080/api/memos';

interface Memo {
  memoId?: number;
  title: string;
  content: string;
  createdAt?: string;
  updatedAt?: string;
}

export const getMemos = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getMemo = async (id: number) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const createMemo = async (memo: Omit<Memo, 'memoId'>) => {
  const response = await axios.post(API_URL, memo);
  return response.data;
};

export const updateMemo = async (id: number, memo: Partial<Memo>) => {
  const response = await axios.put(`${API_URL}/${id}`, memo);
  return response.data;
};

export const deleteMemo = async (id: number) => {
  await axios.delete(`${API_URL}/${id}`);
};
