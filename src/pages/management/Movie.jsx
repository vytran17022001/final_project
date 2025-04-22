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
  FormControl,
  InputLabel,
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
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

const Movie = () => {
  const [data, setData] = React.useState({
    movies: [],
    actors: [],
    categorys: [],
    directions: [],
  });
  const [open, setOpen] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [dataUpdate, setDataUpdate] = React.useState({});

  const fetchData = async () => {
    const fetchMovies = await getData("movie");
    const fetchActors = await getData("actor");
    const fetchCategories = await getData("category");
    const fetchDirections = await getData("direction");

    setData({
      movies: fetchMovies,
      actors: fetchActors,
      categorys: fetchCategories,
      directions: fetchDirections,
    });
  };
  const moviesWithDetails = data.movies.map((movie) => {
    const actor = data.actors.find((actor) => actor.id === movie.actor_id);
    const category = data.categorys.find((cat) => cat.id === movie.category_id);
    const direc = data.directions.find(
      (direc) => direc.id === movie.direction_id
    );

    return {
      ...movie,
      actorName: actor ? actor.actor_name : "Unknown",
      categoryName: category ? category.category_name : "Unknown",
      directionName: direc ? direc.direction_name : "Unknown",
    };
  });

  const handleDelete = async (id) => {
    await deleteData("movie", id);
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
            Create Movie
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

                await postData("movie", formJson);
                fetchData();

                setOpen(false);
              },
            }}
          >
            <DialogTitle>Create Movie</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                name="movie_name"
                label="Movie Name"
                type="text"
                fullWidth
                required
                variant="standard"
              />

              <TextField
                margin="dense"
                name="movie_price"
                label="Movie Price"
                type="number"
                fullWidth
                required
                variant="standard"
              />

              <TextField
                margin="dense"
                name="movie_duration"
                label="Movie Duration (min)"
                type="number"
                fullWidth
                required
                variant="standard"
              />

              <TextField
                margin="dense"
                name="movie_country"
                label="Movie Country"
                type="text"
                fullWidth
                required
                variant="standard"
                sx={{ mb: 2 }}
              />

              <LocalizationProvider
                fullWidth
                margin="dense"
                variant="standard"
                dateAdapter={AdapterDayjs}
              >
                <DemoContainer components={["DateTimePicker"]}>
                  <DateTimePicker
                    label="Movie Created At"
                    name="movie_createdAt"
                    slotProps={{
                      textField: {
                        required: true,
                      },
                    }}
                  />
                </DemoContainer>
              </LocalizationProvider>

              <TextField
                margin="dense"
                name="movie_rating"
                label="Movie Rating"
                type="number"
                fullWidth
                required
                variant="standard"
                inputProps={{ min: 0, max: 5 }}
              />

              <FormControl fullWidth margin="dense" variant="standard">
                <InputLabel>Actor</InputLabel>
                <Select name="actor_id" defaultValue="" required>
                  {data.actors.map((actor) => (
                    <MenuItem key={actor.id} value={actor.id}>
                      {actor.actor_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth margin="dense" variant="standard">
                <InputLabel>Category</InputLabel>
                <Select name="category_id" defaultValue="" required>
                  {data.categorys.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.category_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth margin="dense" variant="standard">
                <InputLabel>Direction</InputLabel>
                <Select name="direction_id" defaultValue="" required>
                  {data.directions.map((direction) => (
                    <MenuItem key={direction.id} value={direction.id}>
                      {direction.direction_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField
                margin="dense"
                name="movie_img"
                label="Movie Image (URL)"
                type="text"
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
                  <strong>Movie Actor</strong>
                </TableCell>
                <TableCell>
                  <strong>Movie Category</strong>
                </TableCell>
                <TableCell>
                  <strong>Movie Direction</strong>
                </TableCell>
                <TableCell>
                  <strong>Movie Country</strong>
                </TableCell>
                <TableCell>
                  <strong>Movie CreatedAt</strong>
                </TableCell>
                <TableCell>
                  <strong>Movie Duration</strong>
                </TableCell>
                <TableCell>
                  <strong>Movie Img</strong>
                </TableCell>
                <TableCell>
                  <strong>Movie Name</strong>
                </TableCell>
                <TableCell>
                  <strong>Movie Price</strong>
                </TableCell>
                <TableCell>
                  <strong>Movie rating</strong>
                </TableCell>
                <TableCell>
                  <strong>Actions</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {moviesWithDetails.map((row, index) => (
                <TableRow key={row.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{row.actorName}</TableCell>
                  <TableCell>{row.categoryName}</TableCell>
                  <TableCell>{row.directionName}</TableCell>
                  <TableCell>{row.movie_country}</TableCell>
                  <TableCell>
                    {dayjs(row.movie_createdAt).format("DD/MM/YYYY HH:mm")}
                  </TableCell>
                  <TableCell>{row.movie_duration}</TableCell>
                  <TableCell>{row.movie_img}</TableCell>
                  <TableCell>{row.movie_name}</TableCell>
                  <TableCell>{row.movie_price}</TableCell>
                  <TableCell>{row.movie_rating}</TableCell>
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

                          await updateData("movie", dataUpdate.id, formJson);
                          fetchData();

                          setOpenEdit(false);
                        },
                      }}
                    >
                      <DialogTitle>Edit Movie</DialogTitle>
                      <DialogContent>
                        <TextField
                          autoFocus
                          margin="dense"
                          name="movie_name"
                          label="Movie Name"
                          type="text"
                          fullWidth
                          required
                          variant="standard"
                          value={dataUpdate.movie_name || ""}
                          onChange={(e) =>
                            setDataUpdate({
                              ...dataUpdate,
                              movie_name: e.target.value,
                            })
                          }
                        />

                        <TextField
                          margin="dense"
                          name="movie_price"
                          label="Movie Price"
                          type="number"
                          fullWidth
                          required
                          variant="standard"
                          value={dataUpdate.movie_price || ""}
                          onChange={(e) =>
                            setDataUpdate({
                              ...dataUpdate,
                              movie_price: e.target.value,
                            })
                          }
                        />

                        <TextField
                          margin="dense"
                          name="movie_duration"
                          label="Movie Duration (min)"
                          type="number"
                          fullWidth
                          required
                          variant="standard"
                          value={dataUpdate.movie_duration || ""}
                          onChange={(e) =>
                            setDataUpdate({
                              ...dataUpdate,
                              movie_duration: e.target.value,
                            })
                          }
                        />

                        <TextField
                          margin="dense"
                          name="movie_country"
                          label="Movie Country"
                          type="text"
                          fullWidth
                          required
                          variant="standard"
                          sx={{ mb: 2 }}
                          value={dataUpdate.movie_country || ""}
                          onChange={(e) =>
                            setDataUpdate({
                              ...dataUpdate,
                              movie_country: e.target.value,
                            })
                          }
                        />

                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DemoContainer components={["DateTimePicker"]}>
                            <DateTimePicker
                              label="Movie Created At"
                              name="movie_createdAt"
                              defaultValue={dayjs(dataUpdate.movie_createdAt)}
                              onChange={(newValue) =>
                                setDataUpdate({
                                  ...dataUpdate,
                                  movie_createdAt: newValue,
                                })
                              }
                            />
                          </DemoContainer>
                        </LocalizationProvider>

                        <TextField
                          margin="dense"
                          name="movie_rating"
                          label="Movie Rating"
                          type="number"
                          fullWidth
                          required
                          variant="standard"
                          inputProps={{ min: 0, max: 10 }}
                          value={dataUpdate.movie_rating || ""}
                          onChange={(e) =>
                            setDataUpdate({
                              ...dataUpdate,
                              movie_rating: e.target.value,
                            })
                          }
                        />

                        <FormControl
                          fullWidth
                          margin="dense"
                          variant="standard"
                        >
                          <InputLabel>Actor</InputLabel>
                          <Select
                            name="actor_id"
                            required
                            value={dataUpdate.actor_id || ""}
                            onChange={(e) =>
                              setDataUpdate({
                                ...dataUpdate,
                                actor_id: e.target.value,
                              })
                            }
                          >
                            {data.actors.map((actor) => (
                              <MenuItem key={actor.id} value={actor.id}>
                                {actor.actor_name}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>

                        <FormControl
                          fullWidth
                          margin="dense"
                          variant="standard"
                        >
                          <InputLabel>Category</InputLabel>
                          <Select
                            name="category_id"
                            required
                            value={dataUpdate.category_id || ""}
                            onChange={(e) =>
                              setDataUpdate({
                                ...dataUpdate,
                                category_id: e.target.value,
                              })
                            }
                          >
                            {data.categorys.map((category) => (
                              <MenuItem key={category.id} value={category.id}>
                                {category.category_name}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>

                        <FormControl
                          fullWidth
                          margin="dense"
                          variant="standard"
                        >
                          <InputLabel>Direction</InputLabel>
                          <Select
                            name="direction_id"
                            required
                            value={dataUpdate.direction_id || ""}
                            onChange={(e) =>
                              setDataUpdate({
                                ...dataUpdate,
                                direction_id: e.target.value,
                              })
                            }
                          >
                            {data.directions.map((direction) => (
                              <MenuItem key={direction.id} value={direction.id}>
                                {direction.direction_name}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>

                        <TextField
                          margin="dense"
                          name="movie_img"
                          label="Movie Image (URL)"
                          type="text"
                          fullWidth
                          variant="standard"
                          value={dataUpdate.movie_img || ""}
                          onChange={(e) =>
                            setDataUpdate({
                              ...dataUpdate,
                              movie_img: e.target.value,
                            })
                          }
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

export default Movie;
