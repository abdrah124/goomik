"use client";
import { Add, Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  Modal,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddUserSchema } from "@/models/validationTypeSchema";
import { addUserSchema } from "@/models/validationSchema";
import { useAddUser } from "@/hooks/reactquery/mutation";

const style = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};

export default function UserAddForm() {
  const [open, setOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    handleSubmit,
    reset,
    formState: { errors },
    register,
  } = useForm<AddUserSchema>({ resolver: zodResolver(addUserSchema) });

  const { mutate: addUser, isLoading: loadAddUser } = useAddUser();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const onSubmit: SubmitHandler<AddUserSchema> = (data) => {
    addUser(data, {
      onSuccess: () => {
        setOpen(false);
      },
    });
    reset();
  };
  return (
    <>
      <Button startIcon={<Add />} onClick={() => setOpen(true)}>
        Add user
      </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Paper
          sx={{
            ...style,
            display: "flex",
            gap: 3,
            flexDirection: "column",
            maxWidth: 400,
            p: 2,
            my: 2,
            alignSelf: "end",
            width: "100%",
          }}
          onSubmit={handleSubmit(onSubmit)}
          component="form"
        >
          <Typography variant="h5" component="h2">
            Add User
          </Typography>
          <TextField
            label="Username"
            fullWidth
            {...register("name")}
            id="username"
            aria-label="username"
            error={errors.name !== undefined}
            {...register("name")}
            helperText={errors.name !== undefined ? errors.name.message : ""}
          />
          <TextField
            label="Email"
            fullWidth
            {...register("email")}
            error={errors.email !== undefined}
            id="email"
            {...register("email")}
            helperText={errors.email !== undefined ? errors.email.message : ""}
          />
          <TextField
            label="Password"
            fullWidth
            {...register("password")}
            error={errors.password !== undefined}
            id="password"
            type={showPassword ? "text" : "password"}
            {...register("password")}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={loadAddUser}
            endIcon={
              loadAddUser ? (
                <CircularProgress color="inherit" size={20} sx={{ ml: 2 }} />
              ) : (
                ""
              )
            }
          >
            add user
          </Button>
        </Paper>
      </Modal>
    </>
  );
}
