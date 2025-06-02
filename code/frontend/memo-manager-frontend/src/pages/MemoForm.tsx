import { useEffect, useState } from 'react';
import {
  TextField,
  Button,
  Box,
  Typography,
  CircularProgress,
  Alert,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import { createMemo, getMemo, updateMemo } from '../services/memoService';
import type { Memo } from '../services/memoService';

interface MemoFormProps {
  open: boolean;
  onClose: () => void;
  memo: Memo | null;
  onSubmit: () => void;
}

export default function MemoForm({ open, onClose, memo, onSubmit }: MemoFormProps) {
  const [loading, setLoading] = useState(!!memo);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState<Omit<Memo, 'memoId'>>({
    title: '',
    content: ''
  });

  useEffect(() => {
    if (memo) {
      setFormData({
        title: memo.title,
        content: memo.content
      });
    } else {
      setFormData({
        title: '',
        content: ''
      });
    }
  }, [memo]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (memo?.memoId) {
        await updateMemo(memo.memoId, formData);
      } else {
        await createMemo(formData);
      }
      onSubmit();
      onClose();
    } catch (err) {
      setError('Failed to save memo');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Typography variant="h6">
          {memo ? 'Edit Memo' : 'Create New Memo'}
        </Typography>
      </DialogTitle>
      
      <DialogContent>
        {loading ? (
          <Box display="flex" justifyContent="center" mt={4}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        ) : (
          <Box component="form" onSubmit={handleSubmit} mt={2}>
            <Stack spacing={3}>
              <TextField
                label="Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                fullWidth
              />

              <TextField
                label="Content"
                name="content"
                value={formData.content}
                onChange={handleChange}
                required
                multiline
                rows={6}
                fullWidth
              />
            </Stack>
          </Box>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>
          Cancel
        </Button>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          onClick={handleSubmit}
        >
          {memo ? 'Update' : 'Create'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
