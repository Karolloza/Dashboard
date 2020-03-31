import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

import { getToast } from "../redux/selectors";
import { hideToast } from "../redux/actions";

// type = error | warning | info | success

const Toast = () => {
  const { show, body, type } = useSelector(getToast);
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(hideToast());
  };

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  return (
    <div>
      <Snackbar
        open={show}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert onClose={handleClose} severity={type}>
          {body}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Toast;
