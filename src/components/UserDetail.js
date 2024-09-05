import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Container, TextField, Button, Typography, Box, Paper } from "@mui/material";

const UserDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then((response) => setUser(response.data))
      .catch((error) => setError("Failed to fetch user details"));
  }, [id]);

  const handleUpdate = (e) => {
    e.preventDefault();
    axios
      .put(`https://jsonplaceholder.typicode.com/users/${id}`, user)
      .then((response) => {
        console.log("User updated:", response.data);
        navigate("/");
      })
      .catch((error) => {
        setError("Failed to update user");
      });
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  if (!user) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Container sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: "8px" }}>
        <Typography variant="h4" gutterBottom>
          Edit User
        </Typography>
        <Box
          component="form"
          onSubmit={handleUpdate}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            mt: 2,
          }}
        >
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={user.name}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={user.email}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            label="Phone"
            name="phone"
            value={user.phone}
            onChange={handleChange}
            required
          />
          <Button type="submit" variant="contained" color="primary">
            Update User
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default UserDetail;
