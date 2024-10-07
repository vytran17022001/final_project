import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import getData from "../utils/getData";
import postData from "../utils/postData";
import updateData from "../utils/updateData";
import deleteData from "../utils/deleteData";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

// Viet hoa ten
const toCamelCase = (string) => {
  if (string.includes("_id")) {
    const arr = string.split("_");
    return arr[0].charAt(0).toUpperCase() + arr[0].slice(1);
  }

  return string
    .toLowerCase()
    .split("_")
    .map((word, index) => {
      if (index === 0) {
        return word.charAt(0).toUpperCase() + word.slice(1);
      } else {
        return word.charAt(0).toUpperCase() + word.slice(1);
      }
    })
    .join(" ");
};

// Kiem tra kieu du lieu -< string thi ra text -> Ngay thi ra datetime -> boolean thi ra do xanh
const formatData = async (data, column) => {
  if (typeof data === "object" && data.seconds) {
    const result = new Date(data.seconds * 1000);
    return result.toLocaleString();
  } else if (typeof data === "string" && column.includes("_id")) {
    //includes bao gom
    const collection = column.split("_id")[0];
    const json = await getData(collection);

    const rs = json.find((json) => json.id === data) || [];

    const col = Object.keys(rs).find(
      (key) =>
        key.includes("_name") ||
        key.includes("_chair") ||
        key.includes("_timedate") ||
        key.includes("_email")
    );

    // Khi di goi tu bang khac va co datetime -> XU ly ngay thang
    if (rs[col] && rs[col].seconds) {
      const result = new Date(rs[col].seconds * 1000);
      return result.toLocaleString();
    }

    return rs[col];
  } else if (typeof data === "boolean") {
    return data ? (
      <TaskAltIcon color="primary" fontSize="small" />
    ) : (
      <HighlightOffIcon className="text-red-500" fontSize="small" />
    );
  } else {
    return data;
  }
};

// Doi. du lieu tu bang khac
const AsyncDataCell = ({ data, column }) => {
  const [formattedData, setFormattedData] = React.useState(null);

  React.useEffect(() => {
    const fetchData = async () => {
      const result = await formatData(data, column);
      setFormattedData(result);
    };

    fetchData();
  }, [data, column]);

  return (
    <TableCell component="th" scope="row">
      {Array.isArray(formattedData) && formattedData.length > 0
        ? formattedData.map((data) => (
            <span className="border mr-2 p-2 ">{data}</span>
          ))
        : formattedData !== null
        ? formattedData
        : "Loading..."}
    </TableCell>
  );
};

const TableComponent = ({ collection }) => {
  collection = collection.toLowerCase();
  const [data, setData] = React.useState([]);
  const [columnName, setColumnName] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [dataUpdate, setDataUpdate] = React.useState({});
  const [dataChild, setDataChild] = React.useState({});

  const keys = new Set(); //object

  const fetchData = async () => {
    const data = await getData(collection);
    setData(data);
    console.log(data);

    // Lay ten cot set vao State
    data.forEach((item) => {
      Object.keys(item).forEach((key) => {
        if (key !== "id") {
          keys.add(key);
        }
      });
    });
    const names = [...keys];
    setColumnName(names);

    // Lay nhung cot chua _id (tu bang khac) di goi du lieu
    names.map(async (col) => {
      if (col.includes("_id")) {
        const collectName = col.split("_id")[0]; // Cat lay ten collection. Example: role_id -> role -> goi tu Role
        const data = await getData(collectName); // Goi du lieu tu collecton do
        const newData = { [col]: [...data] }; // Rai tat ca du lieu tu role

        // Set du lieu moi cua cot _id vao State
        setDataChild((prevdataChild) => ({
          ...prevdataChild,
          ...newData,
        }));
      }
    });
  };

  const handleDelete = async (id) => {
    await deleteData(collection, id);
    fetchData();
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <h1 className="text-xl text-center font-bold uppercase">
        {collection} table
      </h1>
      <Button variant="outlined" onClick={() => setOpen(true)}>
        Create {collection}
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
            columnName.map((col) => {
              formJson[col] = formJson[col].trim(); // xoa khoang trang dau va cuoi cung
              // if (!formJson[col]) {
              //   alert(`${toCamelCase(col)} khong duoc de trong`);
              //   return;
              // }
            });
            await postData(collection, formJson);
            fetchData();

            setOpen(false);
          },
        }}
      >
        <DialogTitle>Create {collection}</DialogTitle>
        <DialogContent>
          {columnName.map((col) => {
            if (col.includes("_id")) {
              // Col: user_name, role_id, ...
              // Ten cot: User Name, Role ID, User GMAIL
              // toCamelCase: user_name -> User Name
              const name = col.split("_id")[0];

              return (
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    {toCamelCase(col)}
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name={col}
                    label={col}
                  >
                    {dataChild[col] &&
                      dataChild[col].map((child) => {
                        return (
                          <MenuItem value={child.id}>
                            {child[name + "_name"]}
                          </MenuItem>
                        );
                      })}
                  </Select>
                </FormControl>
              );
            }

            if (col.includes("_createdAt") || col.includes("_timedate")) {
              return (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DateTimePicker"]}>
                    <DateTimePicker label={toCamelCase(col)} name={col} />
                  </DemoContainer>
                </LocalizationProvider>
              );
            }

            return (
              <TextField
                margin="dense"
                name={col}
                label={toCamelCase(col)}
                type={
                  col === "password"
                    ? "password"
                    : col === "email"
                    ? "email"
                    : "text"
                } // TODO
                fullWidth
                variant="standard"
                required
              />
            );
          })}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button type="submit">Submit</Button>
        </DialogActions>
      </Dialog>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              {columnName &&
                columnName.map((key) => {
                  if (key.includes("password")) return null;

                  return <TableCell>{toCamelCase(key)}</TableCell>;
                })}
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data.map((row, index) => {
                return (
                  <TableRow
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {index + 1}
                    </TableCell>
                    {columnName.map((key) => {
                      if (key.includes("password")) return null;
                      return (
                        <AsyncDataCell key={key} data={row[key]} column={key} />
                      );
                    })}

                    <TableCell component="th" scope="row">
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

                            columnName.map((col) => {
                              formJson[col] = formJson[col].trim();
                            });

                            await updateData(
                              collection,
                              dataUpdate.id,
                              formJson
                            );
                            fetchData();

                            setOpenEdit(false);
                          },
                        }}
                      >
                        <DialogTitle>Edit {collection}</DialogTitle>
                        <DialogContent>
                          {columnName.map((col) => {
                            if (col.includes("_id")) {
                              // Col: user_name, role_id, ...
                              // Ten cot: User Name, Role ID, User GMAIL
                              // toCamelCase: user_name -> User Name
                              const name = col.split("_id")[0];

                              return (
                                <FormControl fullWidth>
                                  <InputLabel id="demo-simple-select-label">
                                    {toCamelCase(col)}
                                  </InputLabel>
                                  <Select
                                    defaultValue={dataUpdate[col]}
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    name={col}
                                    label={col}
                                  >
                                    {dataChild[col] &&
                                      dataChild[col].map((child) => {
                                        return (
                                          <MenuItem value={child.id}>
                                            {child[name + "_name"]}
                                          </MenuItem>
                                        );
                                      })}
                                  </Select>
                                </FormControl>
                              );
                            }
                            if (
                              col.includes("_createdAt") ||
                              col.includes("showtime_timedate")
                            ) {
                              return (
                                <LocalizationProvider
                                  dateAdapter={AdapterDayjs}
                                >
                                  <DemoContainer
                                    components={["DateTimePicker"]}
                                  >
                                    <DateTimePicker
                                      label={toCamelCase(col)}
                                      name={col}
                                      defaultValue={dayjs(dataUpdate[col])}
                                    />
                                  </DemoContainer>
                                </LocalizationProvider>
                              );
                            }
                            return (
                              <TextField
                                autoFocus
                                margin="dense"
                                name={col}
                                label={toCamelCase(col)}
                                value={dataUpdate[col]}
                                onChange={(e) => {
                                  if (col.includes("password")) return;
                                  if (col.includes("email")) return;

                                  setDataUpdate({
                                    ...dataUpdate,
                                    [col]: e.target.value,
                                  });
                                }}
                                type={
                                  col === "password"
                                    ? "password"
                                    : col === "email"
                                    ? "email"
                                    : "text"
                                } // TODO
                                fullWidth
                                variant="standard"
                              />
                            );
                          })}
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
    </>
  );
};

export default TableComponent;
