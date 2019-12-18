import React, { useState } from "react";
import ReactDOM from "react-dom";
import {
  makeStyles,
  withStyles,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  TablePagination
} from "@material-ui/core";

import { rows } from "./rustdata";

import "./styles.css";

const useStyles = makeStyles({
  root: {
    width: "100%",
    overflowX: "auto"
  },
  table: {
    minWidth: 650
  },
  TableRow: {
    backgroundColor: "rgb(245,245,245)",
    color: "rgb(84,84,84)"
  },
  lastCell: {
    color: "grey"
  },
  line: {
    borderLeft: "1px solid red",
    paddingLeft: "15px"
  }
});

const StyledCell = withStyles(() => ({
  head: {
    backgroundColor: "rgb(245,245,245)",
    color: "rgb(84, 84, 84)"
  },
  body: {
    fontSize: 15,
    color: "grey"
  }
}))(TableCell);

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function App() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const classes = useStyles();
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className="App">
      <h1>Rust Jobs</h1>
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <StyledCell>Type</StyledCell>
              <StyledCell>Title</StyledCell>
              <StyledCell>Company</StyledCell>
              <StyledCell>Location</StyledCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rows
            ).map(row => (
              <TableRow className={classes.TableRow} key={row.id} hover>
                <TableCell component="th" scope="row">
                  {row.type}
                </TableCell>
                <TableCell align="left">{row.title}</TableCell>
                <TableCell align="left">{row.company}</TableCell>
                <TableCell className={classes.lastCell} align="left">
                  <div className={classes.line}> {row.location} </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
