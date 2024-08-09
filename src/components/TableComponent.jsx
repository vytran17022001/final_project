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
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const toCamelCase = (string) => {
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

const formatData = async (data, column) => {
  console.log(typeof data);
  if (typeof data === "object" && data.seconds) {
    const result = new Date(data.seconds * 1000);
    return result.toLocaleString();
  } else if (typeof data === "string" && column.includes("_id")) {
    //includes bao gom
    const collection = column.split("_id")[0];
    const json = await getData(collection);

    const rs = json.find((json) => json.id === data) || [];
    console.log(rs);

    const col = Object.keys(rs).find(
      (key) =>
        key.includes("_name") ||
        key.includes("_chair") ||
        key.includes("_timedate")
    );
    console.log(rs[col]);

    if (rs[col].seconds) {
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

const AsyncDataCell = ({ data, column }) => {
  const [formattedData, setFormattedData] = React.useState(null);

  React.useEffect(() => {
    const fetchData = async () => {
      const result = await formatData(data, column);
      console.log(result);
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

    data.forEach((item) => {
      Object.keys(item).forEach((key) => {
        if (key !== "id") {
          keys.add(key);
        }
      });
    });

    const names = [...keys];

    setColumnName(names);

    names.map(async (col) => {
      if (col.includes("_id")) {
        const collectName = col.split("_id")[0];
        const data = await getData(collectName);
        const newData = { [col]: [...data] };

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
                columnName.map((key) => (
                  <TableCell>{toCamelCase(key)}</TableCell>
                ))}
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
                    {columnName.map((key) => (
                      <AsyncDataCell key={key} data={row[key]} column={key} />
                    ))}

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
                          {columnName.map((col) => (
                            <TextField
                              autoFocus
                              margin="dense"
                              name={col}
                              label={toCamelCase(col)}
                              value={dataUpdate[col]}
                              onChange={(e) => {
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
                          ))}
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
