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

export const Direction = () => {
  const [data, setData] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [dataUpdate, setDataUpdate] = React.useState({});

  const fetchData = async () => {
    const fetchedData = await getData("direction");
    setData(fetchedData);
  };

  const handleDelete = async (id) => {
    await deleteData("direction", id);
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
            Create Direction
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

                await postData("direction", formJson);
                fetchData();

                setOpen(false);
              },
            }}
          >
            <DialogTitle>Create Direction</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                required
                margin="dense"
                name="direction_name"
                label="Direction Name"
                type="text"
                fullWidth
                variant="standard"
              />
              <TextField
                autoFocus
                required
                margin="dense"
                name="direction_img"
                label="Direction Img"
                type="text"
                fullWidth
                variant="standard"
              />
              <TextField
                autoFocus
                required
                margin="dense"
                name="direction_description"
                label="Direction Description"
                type="text"
                fullWidth
                multiline
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
                  <strong>Direction Name</strong>
                </TableCell>
                <TableCell>
                  <strong>Direction Img</strong>
                </TableCell>
                <TableCell>
                  <strong>Direction Description</strong>
                </TableCell>
                <TableCell>
                  <strong>Actions</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row, index) => (
                <TableRow key={row.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{row.direction_name}</TableCell>
                  <TableCell>{row.direction_img}</TableCell>
                  <TableCell>{row.direction_description}</TableCell>
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

                          await updateData(
                            "direction",
                            dataUpdate.id,
                            formJson
                          );
                          fetchData();

                          setOpenEdit(false);
                        },
                      }}
                    >
                      <DialogTitle>Edit Direction</DialogTitle>
                      <DialogContent>
                        <TextField
                          autoFocus
                          margin="dense"
                          name="direction_name"
                          label="Direction Name"
                          value={dataUpdate.direction_name}
                          onChange={(e) => {
                            setDataUpdate({
                              ...dataUpdate,
                              direction_name: e.target.value,
                            });
                          }}
                          type="text"
                          fullWidth
                          variant="standard"
                        />
                        <TextField
                          autoFocus
                          margin="dense"
                          name="direction_img"
                          label="Direction Img"
                          value={dataUpdate.direction_img}
                          onChange={(e) => {
                            setDataUpdate({
                              ...dataUpdate,
                              direction_img: e.target.value,
                            });
                          }}
                          type="text"
                          fullWidth
                          variant="standard"
                        />
                        <TextField
                          autoFocus
                          margin="dense"
                          multiline
                          name="direction_description"
                          label="Direction Description"
                          value={dataUpdate.direction_description}
                          onChange={(e) => {
                            setDataUpdate({
                              ...dataUpdate,
                              direction_description: e.target.value,
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
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};
