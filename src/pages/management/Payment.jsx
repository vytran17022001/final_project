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
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import dayjs from "dayjs";

const Payment = () => {
  const [data, setData] = React.useState({
    payments: [],
    orders: [],
    users: [],
  });
  const [open, setOpen] = React.useState(false);
  const [newPayment, setNewPayment] = React.useState({
    order_id: "",
    payment_amount: "",
    payment_created: new Date(),
    payment_status: false,
    payment_total: "",
    user_id: "",
  });
  const [openEdit, setOpenEdit] = React.useState(false);
  const [dataUpdate, setDataUpdate] = React.useState({});

  const fetchData = async () => {
    const fetchedPayment = await getData("payment");
    const fetchedOrder = await getData("order");
    const fetchedUser = await getData("user");
    setData({
      payments: fetchedPayment,
      orders: fetchedOrder,
      users: fetchedUser,
    });
  };
  const paymentWithDetails = data.payments.map((payment) => {
    const order = data.orders.find((o) => o.id === payment.order_id);
    const user = data.users.find((us) => us.id === payment.user_id);

    return {
      ...payment,
      paymentOrder: order ? order.id : "Unknown",
      userPayment: user ? user.user_email : "Unknown",
    };
  });
  const formatTimestamp = (timestamp) => {
    if (timestamp && timestamp.seconds) {
      const date = new Date(timestamp.seconds * 1000);
      return date.toLocaleString();
    } else {
      return "N/A";
    }
  };

  const isPaidStatus = (isPaid) => {
    if (typeof isPaid === "boolean") {
      if (isPaid) {
        return <TaskAltIcon className="text-green-500" fontSize="small" />;
      } else {
        return <HighlightOffIcon className="text-red-500" fontSize="small" />;
      }
    } else {
      return "N/A";
    }
  };

  const handleDelete = async (id) => {
    await deleteData("payment", id);
    fetchData();
  };

  React.useEffect(() => {
    fetchData();
    console.log("Users:", data.users);
  }, []);
  return (
    <>
      <div className="container mx-auto px-10" style={{ height: "1000px" }}>
        {/* <div className="mb-4">
          <Button
            variant="contained"
            color="primary"
            onClick={() => setOpen(true)}
          >
            Create Order
          </Button>
          <Dialog
            open={open}
            fullWidth
            onClose={() => setOpen(false)}
            PaperProps={{
              component: "form",
              onSubmit: async (event) => {
                event.preventDefault();
                await postData("payment", newPayment);
                fetchData();
                setOpen(false);
                setNewOrder({
                  showtime_id: "",
                  user_id: "",
                  order_chair: "",
                  order_isPaid: false,
                  order_createdAt: new Date(),
                });
              },
            }}
          >
            <DialogTitle>Add Order</DialogTitle>
            <DialogContent
              sx={{ display: "flex", flexDirection: "column", gap: 2 }}
            >
              <FormControl fullWidth variant="standard">
                <InputLabel>Show Time</InputLabel>
                <Select
                  required
                  value={newOrder.showtime_id}
                  onChange={(e) =>
                    setNewOrder({ ...newOrder, showtime_id: e.target.value })
                  }
                >
                  {data.showtimes.map((s) => (
                    <MenuItem key={s.id} value={s.id}>
                      {s.showtime_timedate}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth variant="standard">
                <InputLabel>User Order</InputLabel>
                <Select
                  required
                  value={newOrder.user_id}
                  onChange={(e) =>
                    setNewOrder({ ...newOrder, user_id: e.target.value })
                  }
                >
                  {data.users.map((u) => (
                    <MenuItem key={u.id} value={u.id}>
                      {u.user_email}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField
                required
                fullWidth
                label="Chairs"
                variant="standard"
                value={newOrder.order_chair}
                onChange={(e) =>
                  setNewOrder({ ...newOrder, order_chair: e.target.value })
                }
              />

              <FormControl fullWidth variant="standard">
                <InputLabel>Order isPaid</InputLabel>
                <Select
                  value={newOrder.order_isPaid.toString()}
                  onChange={(e) =>
                    setNewOrder({
                      ...newOrder,
                      order_isPaid: e.target.value === "true",
                    })
                  }
                >
                  <MenuItem value="true">Paid</MenuItem>
                  <MenuItem value="false">Unpaid</MenuItem>
                </Select>
              </FormControl>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpen(false)}>Cancel</Button>
              <Button type="submit">Submit</Button>
            </DialogActions>
          </Dialog>
        </div> */}
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="direction table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>No</strong>
                </TableCell>
                <TableCell>
                  <strong>Order ID</strong>
                </TableCell>
                <TableCell>
                  <strong>User</strong>
                </TableCell>
                <TableCell>
                  <strong>Amount</strong>
                </TableCell>
                <TableCell>
                  <strong>Total</strong>
                </TableCell>
                <TableCell>
                  <strong>Created</strong>
                </TableCell>
                <TableCell>
                  <strong>Status</strong>
                </TableCell>
                <TableCell>
                  <strong>Actions</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paymentWithDetails.map((row, index) => {
                return (
                  <TableRow key={row.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{row.paymentOrder}</TableCell>
                    <TableCell>{row.userPayment}</TableCell>
                    <TableCell>{row.payment_amount}</TableCell>
                    <TableCell>{row.payment_total}</TableCell>
                    <TableCell>
                      {formatTimestamp(row.payment_created)}
                    </TableCell>
                    <TableCell>{isPaidStatus(row.payment_status)}</TableCell>
                    <TableCell>
                      {/* <EditIcon
                        color="primary"
                        onClick={() => {
                          const fullOrder = data.orders.find(
                            (o) => o.id === row.id
                          );
                          setOpenEdit(true);
                          setDataUpdate(fullOrder);
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
                            );

                            const updatedOrder = {
                              ...dataUpdate,
                              ...formJson,
                              order_isPaid: formJson.order_isPaid === "true",
                            };

                            await updateData(
                              "order",
                              dataUpdate.id,
                              updatedOrder
                            );
                            fetchData();
                            setOpenEdit(false);
                          },
                        }}
                      >
                        <DialogTitle>Edit User</DialogTitle>
                        <DialogContent>
                          <FormControl
                            fullWidth
                            margin="dense"
                            variant="standard"
                          >
                            <InputLabel>Show Time</InputLabel>
                            <Select
                              name="showtime_id"
                              fullWidth
                              required
                              value={dataUpdate.showtime_id || ""}
                              onChange={(e) =>
                                setDataUpdate({
                                  ...dataUpdate,
                                  showtime_id: e.target.value,
                                })
                              }
                            >
                              {data.showtimes.map((time) => (
                                <MenuItem key={time.id} value={time.id}>
                                  {time.showtime_timedate}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                          <FormControl
                            fullWidth
                            margin="dense"
                            variant="standard"
                          >
                            <InputLabel>Order isPaid</InputLabel>
                            <Select
                              name="order_isPaid"
                              fullWidth
                              required
                              value={
                                dataUpdate.order_isPaid === true
                                  ? "true"
                                  : "false"
                              }
                              onChange={(e) =>
                                setDataUpdate({
                                  ...dataUpdate,
                                  order_isPaid: e.target.value === "true",
                                })
                              }
                              sx={{ mt: 2 }}
                            >
                              <MenuItem value="true">Paid</MenuItem>
                              <MenuItem value="false">Unpaid</MenuItem>
                            </Select>
                          </FormControl>
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={() => setOpenEdit(false)}>
                            Cancel
                          </Button>
                          <Button type="submit">Submit</Button>
                        </DialogActions>
                      </Dialog> */}
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

export default Payment;
