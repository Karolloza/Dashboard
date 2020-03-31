import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import styled from "styled-components";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button
} from "@material-ui/core";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import { getColumnValue } from "../utils";
import { setModal, showToast } from "../redux/actions";
import { getModal } from "../redux/selectors";
import AddUserModal from "../pages/Dashboard/AddUserModal";
import EditUserModal from "../pages/Dashboard/EditUserModal";

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    textAlign: "center",
    cursor: "pointer"
  },
  body: {
    fontSize: 14,
    textAlign: "center"
  }
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default
    }
  }
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700
  },
  sortArrow: {
    verticalAlign: "sub",
    fontSize: "20px"
  }
});

const S = {
  TableRow: styled.div`
    display: flex;
    justify-content: space-between;
    margin: 5px 30px;
    align-items: center;
    h3 {
      font-size: 24px;
    }
  `,
  Button: styled(Button)`
    padding: 5px 30px;
  `,
  StyledTableCell: styled(StyledTableCell)`
    display: flex;
    justify-content: space-around;
  `,
  TableContainer: styled(TableContainer)`
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.75);
  `
};

const GenericTable = ({
  data = [],
  tableHeaders,
  tableRows,
  title,
  deleteApi,
  fetchApi,
  subtitle
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const isModalOpen = useSelector(getModal);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editData, setEditData] = useState();

  const [sortedData, setSortedData] = useState(data);
  const [sortedColumn, setSortedColumn] = useState();
  const [sortDirection, setSortDirection] = useState("descending");

  const displayHeaders = () => {
    return tableHeaders.map(header => (
      <StyledTableCell onClick={() => sortTable(header)} align="right">
        {header}
        {sortDirection === "descending" ? (
          <ArrowDownwardIcon
            className={classes.sortArrow}
            visibility={
              sortedColumn === showSortArrow(header) ? "visible" : "hidden"
            }
          />
        ) : (
          <ArrowUpwardIcon
            className={classes.sortArrow}
            visibility={
              sortedColumn === showSortArrow(header) ? "visible" : "hidden"
            }
          />
        )}
      </StyledTableCell>
    ));
  };

  const displayRows = item => {
    let items = [];
    for (let i = 0; i < tableRows.length; i++) {
      items.push(
        <StyledTableCell>{getColumnValue(item, tableRows[i])}</StyledTableCell>
      );
    }
    return items.map(item => item);
  };

  const handleDelete = async id => {
    if (window.confirm("Are you sure you want to delete user?")) {
      await dispatch(deleteApi(id));
      await dispatch(fetchApi());
      await dispatch(showToast({ body: "User deleted" }));
    }
  };

  const handleAdd = () => {
    dispatch(setModal(true));
  };

  function sortByKey(array, key) {
    if (sortDirection === "descending") {
      setSortDirection("ascending");
      return array.sort(function(a, b) {
        if (typeof a[key] === "number" || typeof b[key] === "number") {
          let x = getColumnValue(a, key) || "";
          let y = getColumnValue(b, key) || "";
          return x < y ? -1 : x > y ? 1 : 0;
        } else {
          let x = (getColumnValue(a, key) || "").toString().toLowerCase();
          let y = (getColumnValue(b, key) || "").toString().toLowerCase();
          return x < y ? -1 : x > y ? 1 : 0;
        }
      });
    } else if (sortDirection === "ascending") {
      setSortDirection("descending");
      return array.sort(function(a, b) {
        if (typeof a[key] === "number" || typeof b[key] === "number") {
          let x = getColumnValue(a, key) || "";
          let y = getColumnValue(b, key) || "";
          return y < x ? -1 : y > x ? 1 : 0;
        } else {
          let x = (getColumnValue(a, key) || "").toString().toLowerCase();
          let y = (getColumnValue(b, key) || "").toString().toLowerCase();
          return y < x ? -1 : y > x ? 1 : 0;
        }
      });
    }

    return array;
  }

  const sortTable = header => {
    const column = tableRows[tableHeaders.indexOf(header)];
    setSortedColumn(column);
    const sorted = sortByKey(data, column);
    setSortedData(sorted);
  };
  const showSortArrow = header => {
    let headerIndex = tableHeaders.indexOf(header);

    if (tableRows[headerIndex] === sortedColumn) {
      return sortedColumn;
    } else {
      return false;
    }
  };

  useEffect(() => {
    setSortedData(data);
    setSortDirection("descending");
  }, [sortedData, data]);

  return (
    <>
      <h1>{title}</h1>
      <S.TableContainer component={Paper}>
        <S.TableRow>
          <h3>{subtitle}</h3>
          <S.Button
            color="primary"
            variant="outlined"
            onClick={() => {
              handleAdd();
              setEditModalOpen(false);
              setAddModalOpen(true);
            }}
          >
            Add new
          </S.Button>
        </S.TableRow>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>{displayHeaders()}</TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data.map(item => (
                <>
                  <StyledTableRow>
                    {displayRows(item)}
                    <S.StyledTableCell>
                      <S.Button
                        variant="contained"
                        color="secondary"
                        onClick={() => handleDelete(item.id)}
                      >
                        Delete
                      </S.Button>

                      <S.Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                          setEditData(item);
                          setAddModalOpen(false);
                          setEditModalOpen(true);
                          dispatch(setModal(true));
                        }}
                      >
                        Edit
                      </S.Button>
                    </S.StyledTableCell>
                  </StyledTableRow>
                </>
              ))}
          </TableBody>
        </Table>
      </S.TableContainer>
      <AddUserModal open={isModalOpen && addModalOpen} />
      <EditUserModal open={isModalOpen && editModalOpen} data={editData} />
    </>
  );
};

export default GenericTable;
