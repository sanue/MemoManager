import { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { getMemos, deleteMemo } from '../services/memoService';
import type { Memo } from '../services/memoService';
import MemoForm from './MemoForm';

export default function MemoList() {
  const [memos, setMemos] = useState<Memo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [currentMemo, setCurrentMemo] = useState<Memo | null>(null);

  useEffect(() => {
    console.log('Component mounted, fetching memos...');
    const fetchMemos = async () => {
      try {
        console.log('Calling getMemos()...');
        const data = await getMemos();
        console.log('Received memos:', data);
        setMemos(data);
      } catch (err) {
        console.error('Error fetching memos:', err);
        setError('Failed to load memos');
      } finally {
        setLoading(false);
      }
    };

    fetchMemos();
  }, []);

  const handleDelete = async (id: number | undefined) => {
    if (!id || isNaN(id)) {
      console.error('Invalid memo ID:', id);
      setError('Invalid memo ID - please refresh the list and try again');
      return;
    }
    
    try {
      console.log('Deleting memo with ID:', id, 'Full memo:', memos.find(m => m.memoId === id));
      await deleteMemo(id);
      setMemos(prevMemos => prevMemos.filter(memo => memo.memoId !== id));
    } catch (err) {
      console.error('Delete error:', err);
      setError(`Failed to delete memo: ${err instanceof Error ? err.message : String(err)}`);
      // Refresh the list in case of error
      getMemos().then(data => setMemos(data));
    }
  };

  const handleFormSubmit = () => {
    setOpenModal(false);
    setCurrentMemo(null);
    // Refresh the list
    getMemos().then(data => setMemos(data));
  };

  if (loading) return (
    <Box display="flex" justifyContent="center" mt={4}>
      <CircularProgress />
    </Box>
  );

  if (error) return (
    <Alert severity="error" sx={{ mt: 2 }}>
      {error}
    </Alert>
  );

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4" component="h1">
          My Memos
        </Typography>
        <Button
          onClick={() => {
            setCurrentMemo(null);
            setOpenModal(true);
          }}
          variant="contained"
          color="primary"
        >
          Create New Memo
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Content</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {memos.map((memo, index) => (
              <TableRow key={memo.memoId || `memo-${index}`}>
                <TableCell>{memo.title}</TableCell>
                <TableCell sx={{ maxWidth: 300 }}>
                  <Typography noWrap>
                    {memo.content}
                  </Typography>
                </TableCell>
                <TableCell>
                  {new Date(memo.createdAt!).toLocaleString()}
                </TableCell>
                <TableCell align="right">
                  <IconButton
                    onClick={() => {
                      setCurrentMemo(memo);
                      setOpenModal(true);
                    }}
                    color="primary"
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDelete(memo.memoId!)}
                    color="error"
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <MemoForm 
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          setCurrentMemo(null);
        }}
        memo={currentMemo}
        onSubmit={handleFormSubmit}
      />
    </Box>
  );
}
