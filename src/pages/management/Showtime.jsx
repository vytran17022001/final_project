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
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

const Showtime = () => {
  const [data, setData] = React.useState([]);
  const [movies, setMovies] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [dataUpdate, setDataUpdate] = React.useState({});

  const fetchData = async () => {
    const fetchedData = await getData("showtime");
    const movieData = await getData("movie");
    setData(fetchedData);
    setMovies(movieData);
  };

  const handleDelete = async (id) => {
    await deleteData("showtime", id);
    fetchData();
  };

  React.useLayoutEffect(() => {
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
            Create Time Day
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

                await postData("showtime", formJson);
                fetchData();

                setOpen(false);
              },
            }}
          >
            <DialogTitle>Create Time Day</DialogTitle>
            <DialogContent>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DateTimePicker"]}>
                  <DateTimePicker
                    label="Time Day"
                    name="showtime_timedate"
                    slotProps={{
                      textField: {
                        required: true,
                      },
                    }}
                  />
                </DemoContainer>
              </LocalizationProvider>
              <Select
                name="movie_id"
                sx={{ mt: 1 }}
                fullWidth
                required
                defaultValue=""
              >
                {movies.map((movie) => (
                  <MenuItem key={movie.id} value={movie.id}>
                    {movie.movie_name}
                  </MenuItem>
                ))}
              </Select>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpen(false)}>Cancel</Button>
              <Button type="submit">Submit</Button>
            </DialogActions>
          </Dialog>
        </div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="Showtime table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>No</strong>
                </TableCell>
                <TableCell>
                  <strong>Time Day</strong>
                </TableCell>
                <TableCell>
                  <strong>Movie</strong>
                </TableCell>
                <TableCell>
                  <strong>Actions</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row, index) => {
                let movieName = "Unknown";

                const foundMovie = movies.find((r) => r.id === row.movie_id);
                if (movieName) {
                  movieName = foundMovie.movie_name;
                }
                return (
                  <TableRow key={row.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{row.showtime_timedate}</TableCell>
                    <TableCell>{movieName}</TableCell>
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
                              "showtime",
                              dataUpdate.id,
                              formJson
                            );
                            fetchData();

                            setOpenEdit(false);
                          },
                        }}
                      >
                        <DialogTitle>Edit Time Day</DialogTitle>
                        <DialogContent>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={["DateTimePicker"]}>
                              <DateTimePicker
                                label="Time Day"
                                name="showtime_timedate"
                                defaultValue={dayjs(
                                  dataUpdate.showtime_timedate
                                )}
                                onChange={(newValue) =>
                                  setDataUpdate({
                                    ...dataUpdate,
                                    showtime_timedate: newValue,
                                  })
                                }
                              />
                            </DemoContainer>
                          </LocalizationProvider>
                          <Select
                            name="movie_id"
                            sx={{ mt: 1 }}
                            fullWidth
                            required
                            value={dataUpdate.movie_id || ""}
                            onChange={(e) =>
                              setDataUpdate({
                                ...dataUpdate,
                                movie_id: e.target.value,
                              })
                            }
                          >
                            {movies.map((movie) => (
                              <MenuItem key={movie.id} value={movie.id}>
                                {movie.movie_name}
                              </MenuItem>
                            ))}
                          </Select>
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

export default Showtime;
