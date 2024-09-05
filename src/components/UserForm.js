import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Container, TextField, Button, Typography, Box, Paper } from "@mui/material";

const UserForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = { name, email, phone };

    axios
      .post("https://jsonplaceholder.typicode.com/users", newUser)
      .then((response) => {
        console.log("User created:", response.data);
        navigate("/");
      })
      .catch((error) => {
        setError("Failed to create user");
      });
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: "8px" }}>
        <Typography variant="h4" gutterBottom>
          Create New User
        </Typography>
        {error && <Typography color="error">{error}</Typography>}
        <Box
          component="form"
          onSubmit={handleSubmit}
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
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <TextField
            fullWidth
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            fullWidth
            label="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <Button type="submit" variant="contained" color="primary">
            Create User
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default UserForm;
