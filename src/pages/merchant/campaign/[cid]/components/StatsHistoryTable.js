import {
  Avatar,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Toolbar,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";

const fakeDate = dayjs().format("MMMM DD, YYYY");

const StatsHistoryTable = () => {
  const rows = [
    { name: "michael.near", date: fakeDate },
    { name: "emma.near", date: fakeDate },
    { name: "evelyn.near", date: fakeDate },
    { name: "katie.near", date: fakeDate },
    { name: "nick.near", date: fakeDate },
  ];

  return (
    <Paper elevation={0} variant="outlined">
      <Toolbar sx={{ px: 2 }} disableGutters>
        <Typography variant="h3" sx={{ flexGrow: 1 }}>
          Users
        </Typography>
        <Button variant="text">Export List</Button>
      </Toolbar>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Wallet Address</strong>
              </TableCell>
              <TableCell>
                <strong>Purchase Date</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name} sx={{ td: { py: 1, border: 0 } }}>
                <TableCell sx={{ display: "flex", alignItems: "center" }}>
                  <Avatar sx={{ height: 32, width: 32, mr: 1 }}>{row.name.slice(0, 1)}</Avatar>
                  <Typography>{row.name}</Typography>
                </TableCell>
                <TableCell>{row.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default StatsHistoryTable;
