"use client";
import { useShowSnackbar } from "@/components/SnackMessage";
import Title from "@/components/dashboard/Title";
import UserAddForm from "@/components/dashboard/UserAddForm";
import { config } from "@/lib/config";
import { Add, Cancel, Delete, Edit, Search } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  CircularProgress,
  FormControl,
  Grid,
  IconButton,
  InputBase,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { $Enums } from "@prisma/client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useConfirm } from "material-ui-confirm";

interface User {
  id: string;
  email: string | null;
  emailVerified: string | null;
  name: string | null;
  image: string | null;
  hashedPassword: string | null;
  createdAt: Date;
  updatedAt: Date;
  role: $Enums.Role;
}

type Users = User[];

export default function Page() {
  const confirm = useConfirm();
  const {
    data: users,
    isLoading,
    isSuccess,
  } = useQuery<Users>({
    queryKey: ["Users"],
    queryFn: () =>
      axios
        .get(`${config.baseWebUrl}/api/auth/account/all`)
        .then((res) => res.data)
        .catch((err) => Promise.reject(err)),
    refetchOnWindowFocus: false,
  });
  const [searchInput, setSearchInput] = useState("");
  const [selectedEditId, setSelectedEditId] = useState("");
  const selectedUser = users?.find((user) => user.id === selectedEditId);

  const [showAddForm, setShowAddForm] = useState(false);

  const [selectRole, setSelectRole] = useState<"admin" | "user" | "">("");
  const [editName, setEditName] = useState("");

  useEffect(() => {
    if (selectedUser) {
      setEditName(selectedUser?.name ?? "");
      setSelectRole(selectedUser?.role ?? "");
    }
  }, [selectedUser]);

  const queryClient = useQueryClient();
  const snackMessage = useShowSnackbar();

  const { mutate: editUser, isLoading: loadEditUser } = useMutation({
    mutationFn: (data: {
      id: string;
      username: string;
      role: "admin" | "user";
    }) =>
      axios
        .patch(`${config.baseWebUrl}/api/auth/account/${data.id}`, {
          username: data.username,
          role: data.role,
        })
        .then((res) => res.data)
        .catch((err) => {
          throw new Error(err);
        }),
  });

  const { mutate, isLoading: loadDelete } = useMutation({
    mutationFn: (id: string) =>
      axios
        .delete(`${config.baseWebUrl}/api/auth/account/${id}`)
        .then((res) => res.data)
        .catch((err) => {
          throw new Error(err);
        }),
  });

  const handleDelete = async (id: string) => {
    await confirm({
      description: "Delete this account?",
      title: "Delete account",
      confirmationText: "Delete",
      cancellationText: "Cancel",
      cancellationButtonProps: { variant: "outlined" },
      confirmationButtonProps: { color: "error", variant: "contained" },
    });
    mutate(id, {
      onSuccess: () => {
        snackMessage("Account successfully deleted", 3000);
        queryClient.invalidateQueries(["Users"]);
      },
      onError: (err: any) => {
        snackMessage("Something went wrong!", 3000);
      },
    });
  };

  const handleEdit = (id: string) => {
    if (id === selectedEditId) {
      setSelectedEditId("");
      return;
    }
    setSelectedEditId(id);
  };

  const handleNameEdit = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    e.preventDefault();
    setEditName(e.target.value);
  };

  const handleSelectEdit = (e: SelectChangeEvent<string>) => {
    e.preventDefault();
    setSelectRole(e.target.value as "admin" | "user");
  };

  const resetEdit = () => {
    setEditName("");
    setSelectRole("");
  };

  const handleCancelEdit = (id: string) => {
    resetEdit();
    handleEdit(id);
  };

  const handleEditSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    id: string
  ) => {
    e.preventDefault();
    await confirm({
      description: "Save changes for this user?",
      title: "Edit user profile",
      confirmationText: "Save Changes",
      confirmationButtonProps: {
        variant: "contained",
        color: "primary",
      },
      cancellationButtonProps: {
        variant: "outlined",
        color: "secondary",
      },
    });

    editUser(
      { username: editName, role: selectRole as "admin" | "user", id },
      {
        onSuccess: () => {
          snackMessage("User detail successfully edited!", 3000);
          queryClient.invalidateQueries(["Users"]);
          setSelectedEditId("");
        },
        onError: () => {
          snackMessage("Something went wrong!", 3000);
        },
      }
    );
  };

  return (
    <Grid item xs={12}>
      <Paper
        component="form"
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          mb: 2,
          width: 400,
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search user"
          inputProps={{ "aria-label": "search user" }}
          onChange={(e) => {
            e.preventDefault();
            setSearchInput(e.target.value);
          }}
        />
        <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
          <Search />
        </IconButton>
      </Paper>
      <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
        <Box
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <Title>User</Title>
          <UserAddForm />
        </Box>

        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading
              ? null
              : isSuccess &&
                users
                  .filter((user) =>
                    user.name
                      ?.toLowerCase()
                      .trim()
                      .includes(searchInput.toLowerCase().trim())
                  )
                  .map((row) => (
                    <TableRow key={row.id}>
                      <TableCell>
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 2 }}
                        >
                          <Avatar alt={row.name ?? ""} src={row.image ?? ""} />
                          {selectedEditId === row.id ? (
                            <TextField
                              inputProps={{ form: "editform" }}
                              id="usernameedit"
                              label="Username"
                              size="small"
                              onChange={(e) => handleNameEdit(e)}
                              value={editName}
                            />
                          ) : (
                            <span>{row.name}</span>
                          )}
                        </Box>
                      </TableCell>
                      <TableCell>{row.email}</TableCell>
                      <TableCell>
                        {selectedEditId === row.id ? (
                          <FormControl fullWidth>
                            <InputLabel id="selectrolelabel" htmlFor="roleedit">
                              Role
                            </InputLabel>
                            <Select
                              inputProps={{ form: "editform" }}
                              id="roleedit"
                              label="Role"
                              size="small"
                              value={selectRole}
                              onChange={(e) => handleSelectEdit(e)}
                            >
                              <MenuItem value="admin">Admin</MenuItem>
                              <MenuItem value="user">User</MenuItem>
                            </Select>
                          </FormControl>
                        ) : (
                          row.role
                        )}
                      </TableCell>
                      <TableCell>
                        {row.createdAt.toLocaleString().split("T")[0]}
                      </TableCell>
                      <TableCell align="right">
                        {selectedEditId === row.id && (
                          <form
                            onSubmit={(e) => handleEditSubmit(e, row.id)}
                            className="my-2"
                            id="editform"
                          >
                            <Button
                              size="small"
                              variant="contained"
                              type="submit"
                              disabled={loadEditUser}
                              endIcon={
                                loadEditUser && (
                                  <CircularProgress
                                    size={20}
                                    color="inherit"
                                    sx={{ mx: 1 }}
                                  />
                                )
                              }
                            >
                              Save changes
                            </Button>
                          </form>
                        )}
                        <ButtonGroup>
                          <IconButton
                            color="success"
                            size="small"
                            onClick={() => handleCancelEdit(row.id)}
                          >
                            {selectedEditId === row.id ? <Cancel /> : <Edit />}
                          </IconButton>
                          <IconButton
                            color="error"
                            size="small"
                            onClick={() => handleDelete(row.id)}
                            disabled={loadDelete}
                          >
                            <Delete />
                          </IconButton>
                        </ButtonGroup>
                      </TableCell>
                    </TableRow>
                  ))}
          </TableBody>
        </Table>
      </Paper>
    </Grid>
  );
}
