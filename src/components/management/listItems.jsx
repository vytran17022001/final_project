import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import LayersIcon from "@mui/icons-material/Layers";
import PaymentIcon from "@mui/icons-material/Payment";
import MovieFilterIcon from "@mui/icons-material/MovieFilter";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import Person4Icon from "@mui/icons-material/Person4";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import Person3Icon from "@mui/icons-material/Person3";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { Link } from "react-router-dom";

export const mainListItems = (
  <React.Fragment>
    <ListItemButton>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton>
    <Link to="/management/order">
      <ListItemButton>
        <ListItemIcon>
          <ShoppingCartIcon />
        </ListItemIcon>
        <ListItemText primary="Order" />
      </ListItemButton>
    </Link>
    <Link to="/management/user">
      <ListItemButton>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="User" />
      </ListItemButton>
    </Link>
    <ListItemButton>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Reports" />
    </ListItemButton>
    <Link to="/management/role">
      <ListItemButton>
        <ListItemIcon>
          <LayersIcon />
        </ListItemIcon>
        <ListItemText primary="Role" />
      </ListItemButton>
    </Link>
    <Link to="/management/dicection">
      <ListItemButton>
        <ListItemIcon>
          <Person4Icon />
        </ListItemIcon>
        <ListItemText primary="Dicection" />
      </ListItemButton>
    </Link>
    <Link to="/management/actor">
      <ListItemButton>
        <ListItemIcon>
          <Person3Icon />
        </ListItemIcon>
        <ListItemText primary="Actor" />
      </ListItemButton>
    </Link>
    <Link to="/management/category">
      <ListItemButton>
        <ListItemIcon>
          <ClearAllIcon />
        </ListItemIcon>
        <ListItemText primary="Category" />
      </ListItemButton>
    </Link>
    <Link to="/management/movie">
      <ListItemButton>
        <ListItemIcon>
          <MovieFilterIcon />
        </ListItemIcon>
        <ListItemText primary="Movie" />
      </ListItemButton>
    </Link>
    <Link to="/management/showtime">
      <ListItemButton>
        <ListItemIcon>
          <AccessTimeFilledIcon />
        </ListItemIcon>
        <ListItemText primary="Show Time" />
      </ListItemButton>
    </Link>
    <Link to="/management/ticker">
      <ListItemButton>
        <ListItemIcon>
          <ConfirmationNumberIcon />
        </ListItemIcon>
        <ListItemText primary="Ticket" />
      </ListItemButton>
    </Link>
    <Link to="/management/payment">
      <ListItemButton>
        <ListItemIcon>
          <PaymentIcon />
        </ListItemIcon>
        <ListItemText primary="Payment" />
      </ListItemButton>
    </Link>
  </React.Fragment>
);

// export const secondaryListItems = (
//   <React.Fragment>
//     <ListSubheader component="div" inset>
//       Saved reports
//     </ListSubheader>
//     <ListItemButton>
//       <ListItemIcon>
//         <AssignmentIcon />
//       </ListItemIcon>
//       <ListItemText primary="Current month" />
//     </ListItemButton>
//     <ListItemButton>
//       <ListItemIcon>
//         <AssignmentIcon />
//       </ListItemIcon>
//       <ListItemText primary="Last quarter" />
//     </ListItemButton>
//     <ListItemButton>
//       <ListItemIcon>
//         <AssignmentIcon />
//       </ListItemIcon>
//       <ListItemText primary="Year-end sale" />
//     </ListItemButton>
//   </React.Fragment>
// );
