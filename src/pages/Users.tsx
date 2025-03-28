import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Pagination,
  CircularProgress,
  Alert,
} from '@mui/material';
import { toast } from 'react-toastify';
import { getUsers, updateUser, deleteUser } from '../services/api';
import { User } from '../types';

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [editUser, setEditUser] = useState<User | null>(null);
  const [editFormData, setEditFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getUsers(page);
      setUsers(response.data);
      setTotalPages(response.total_pages);
    } catch (error) {
      setError('Failed to fetch users. Please try again later.');
      toast.error('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page]);

  const handleEditClick = (user: User) => {
    setEditUser(user);
    setEditFormData({
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
    });
  };

  const handleEditClose = () => {
    setEditUser(null);
    setEditFormData({
      first_name: '',
      last_name: '',
      email: '',
    });
    setIsSubmitting(false);
  };

  const handleEditSubmit = async () => {
    if (!editUser) return;

    try {
      setIsSubmitting(true);
      await updateUser(editUser.id, editFormData);
      
      // Update local state
      setUsers(prevUsers => 
        prevUsers.map(user => 
          user.id === editUser.id 
            ? { 
                ...user, 
                first_name: editFormData.first_name,
                last_name: editFormData.last_name,
                email: editFormData.email 
              } 
            : user
        )
      );
      
      toast.success('User updated successfully');
      handleEditClose();
    } catch (error) {
      toast.error('Failed to update user');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteClick = async (userId: number) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;

    try {
      setLoading(true);
      await deleteUser(userId);
      
      // Update local state
      setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
      
      toast.success('User deleted successfully');
    } catch (error) {
      toast.error('Failed to delete user');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({ ...prev, [name]: value }));
  };

  if (error) {
    return (
      <Container>
        <Box sx={{ py: 4 }}>
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
          <Button variant="contained" onClick={fetchUsers}>
            Retry
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container>
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom>
          Users
        </Typography>
        {loading && users.length === 0 ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            <Grid container spacing={3}>
              {users.map((user) => (
                <Grid item xs={12} sm={6} md={4} key={user.id}>
                  <Card>
                    <CardMedia
                      component="img"
                      height="200"
                      image={user.avatar}
                      alt={`${user.first_name} ${user.last_name}`}
                    />
                    <CardContent>
                      <Typography variant="h6">
                        {user.first_name} {user.last_name}
                      </Typography>
                      <Typography color="textSecondary">{user.email}</Typography>
                      <Box sx={{ mt: 2 }}>
                        <Button
                          variant="outlined"
                          color="primary"
                          onClick={() => handleEditClick(user)}
                          sx={{ mr: 1 }}
                          disabled={loading}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="outlined"
                          color="error"
                          onClick={() => handleDeleteClick(user.id)}
                          disabled={loading}
                        >
                          Delete
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={(_, value) => setPage(value)}
                color="primary"
                disabled={loading}
              />
            </Box>
          </>
        )}
      </Box>

      <Dialog 
        open={Boolean(editUser)} 
        onClose={!isSubmitting ? handleEditClose : undefined}
        disableEscapeKeyDown={isSubmitting}
      >
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          <TextField
            margin="normal"
            fullWidth
            label="First Name"
            name="first_name"
            value={editFormData.first_name}
            onChange={handleChange}
            disabled={isSubmitting}
            required
          />
          <TextField
            margin="normal"
            fullWidth
            label="Last Name"
            name="last_name"
            value={editFormData.last_name}
            onChange={handleChange}
            disabled={isSubmitting}
            required
          />
          <TextField
            margin="normal"
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={editFormData.email}
            onChange={handleChange}
            disabled={isSubmitting}
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button 
            onClick={handleEditSubmit} 
            color="primary"
            disabled={isSubmitting || !editFormData.first_name || !editFormData.last_name || !editFormData.email}
          >
            {isSubmitting ? 'Saving...' : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Users; 