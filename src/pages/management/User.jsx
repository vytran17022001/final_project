import * as React from "react";
import getData from "../../utils/getData";
import postData from "../../utils/postData";
import updateData from "../../utils/updateData";
import deleteData from "../../utils/deleteData";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

export const User = () => {
  const [data, setData] = React.useState([]);
  const [roles, setRoles] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [dataUpdate, setDataUpdate] = React.useState({});

  const fetchData = async () => {
    const fetchedData = await getData("user");
    const roleData = await getData("role");
    setData(fetchedData);
    setRoles(roleData);
  };

  const handleDelete = async (id) => {
    await deleteData("user", id);
    fetchData();
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="container mx-auto px-10" style={{ height: "1000px" }}>
        <div className="mb-4">
          <Button
            variant="contained"
            color="primary"
            onClick={() => setOpen(true)}
          >
            Create User
          </Button>
          <Dialog
            open={open}
            onClose={() => setOpen(false)}
            PaperProps={{
              component: "form",
              onSubmit: async (event) => {
                event.preventDefault(); // chan gui mac dinh

                const formData = new FormData(event.currentTarget); // Goi form
                const formJson = Object.fromEntries(formData.entries()); // chuyen form thanh json

                await postData("user", formJson);
                fetchData();

                setOpen(false);
              },
            }}
          >
            <DialogTitle>Create User</DialogTitle>
            <DialogContent>
              <Select name="role_id" defaultValue="" fullWidth required>
                {roles.map((role) => (
                  <MenuItem key={role.id} value={role.id}>
                    {role.role_name}
                  </MenuItem>
                ))}
              </Select>
              <TextField
                autoFocus
                required
                margin="dense"
                name="user_email"
                label="User Email"
                type="email"
                fullWidth
                variant="standard"
              />
              <TextField
                autoFocus
                required
                margin="dense"
                name="user_password"
                label="User Password"
                type="password"
                fullWidth
                variant="standard"
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpen(false)}>Cancel</Button>
              <Button type="submit">Submit</Button>
            </DialogActions>
          </Dialog>
        </div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="direction table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>No</strong>
                </TableCell>
                <TableCell>
                  <strong>User Role</strong>
                </TableCell>
                <TableCell>
                  <strong>User Email</strong>
                </TableCell>
                <TableCell>
                  <strong>User Password</strong>
                </TableCell>
                <TableCell>
                  <strong>Actions</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row, index) => {
                let roleName = "Unknown";

                const foundRole = roles.find((r) => r.id === row.role_id);
                if (foundRole) {
                  roleName = foundRole.role_name;
                }
                return (
                  <TableRow key={row.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{roleName}</TableCell>
                    <TableCell>{row.user_email}</TableCell>
                    <TableCell>{row.user_password}</TableCell>
                    <TableCell>
                      <EditIcon
                        color="primary"
                        onClick={() => {
                          setOpenEdit(true);
                          setDataUpdate(row);
                        }}
                        sx={{
                          cursor: "pointer",
                          "&:hover": {
                            backgroundColor: "#e5e5e5",
                            borderRadius: "5px",
                          },
                          fontSize: "22px",
                        }}
                      />
                      <Dialog
                        style={{ marginBottom: "80px" }}
                        open={openEdit}
                        onClose={() => setOpenEdit(false)}
                        PaperProps={{
                          component: "form",
                          onSubmit: async (event) => {
                            event.preventDefault();

                            const formData = new FormData(event.currentTarget);
                            const formJson = Object.fromEntries(
                              formData.entries()
                            ); // chuyen form thanh json

                            await updateData("user", dataUpdate.id, formJson);
                            fetchData();

                            setOpenEdit(false);
                          },
                        }}
                      >
                        <DialogTitle>Edit User</DialogTitle>
                        <DialogContent>
                          <Select
                            name="role_id"
                            fullWidth
                            required
                            value={dataUpdate.role_id || ""}
                            onChange={(e) =>
                              setDataUpdate({
                                ...dataUpdate,
                                role_id: e.target.value,
                              })
                            }
                          >
                            {roles.map((role) => (
                              <MenuItem key={role.id} value={role.id}>
                                {role.role_name}
                              </MenuItem>
                            ))}
                          </Select>
                          <TextField
                            autoFocus
                            margin="dense"
                            name="user_email"
                            label="User Email"
                            value={dataUpdate.user_email}
                            onChange={(e) => {
                              setDataUpdate({
                                ...dataUpdate,
                                user_email: e.target.value,
                              });
                            }}
                            type="text"
                            fullWidth
                            variant="standard"
                          />
                          <TextField
                            autoFocus
                            margin="dense"
                            name="user_password"
                            label="User Password"
                            value={dataUpdate.user_password}
                            onChange={(e) => {
                              setDataUpdate({
                                ...dataUpdate,
                                user_password: e.target.value,
                              });
                            }}
                            type="text"
                            fullWidth
                            variant="standard"
                          />
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={() => setOpenEdit(false)}>
                            Cancel
                          </Button>
                          <Button type="submit">Submit</Button>
                        </DialogActions>
                      </Dialog>
                      <DeleteForeverIcon
                        variant="outlined"
                        color="error"
                        sx={{
                          cursor: "pointer",
                          "&:hover": {
                            backgroundColor: "#e5e5e5",
                            borderRadius: "5px",
                          },
                          fontSize: "25px",
                        }}
                        onClick={() => handleDelete(row.id)}
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};
