import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Button, Modal } from "@material-ui/core";
import { setModal, showToast } from "../../redux/actions";
import { updateUser, fetchUsers } from "../../api";
import { emailValidator } from "../../utils";
import { getModal } from "../../redux/selectors";

const useStyles = makeStyles(theme => ({
  paper: {
    position: "absolute",
    minWidth: 500,
    top: "50%",
    left: "50%",
    transform: " translate(-50%, -50%)",
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    display: "flex",
    flexDirection: "column"
  }
}));

const S = {
  TextField: styled(TextField)`
    margin: 15px 0px;
  `,
  ButtonSection: styled.div`
    display: flex;
    justify-content: flex-end;
    button {
      margin: 10px;
    }
  `
};

const EditUserModal = ({ open, data }) => {
  const classes = useStyles();
  const [values, setValues] = useState(data);
  const dispatch = useDispatch();
  const [emailError, setEmailError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const modalStatus = useSelector(getModal);

  const handleClose = () => {
    dispatch(setModal(false));
  };

  const handleFieldChange = event => {
    event.persist();
    if (event.target.name === "city") {
      setValues(currentValues => ({
        ...currentValues,
        address: {
          ...currentValues.address,
          [event.target.name]: event.target.value
        }
      }));
    } else {
      setValues(currentValues => ({
        ...currentValues,
        [event.target.name]: event.target.value
      }));
    }
  };

  const checkValidation = () => {
    let isValidated = true;
    if (!values.name) {
      setNameError(true);
      isValidated = false;
    } else {
      setNameError(false);
    }
    if (!emailValidator.test(values.email)) {
      setEmailError(true);
      isValidated = false;
    } else {
      setEmailError(false);
    }
    return isValidated;
  };

  const handleSubmit = async () => {
    const { id, name, username, email, address } = values;
    if (checkValidation()) {
      await dispatch(updateUser(id, { id, name, username, email, address }));
      await dispatch(fetchUsers());
      await dispatch(setModal(false));
      await dispatch(showToast({ body: "Successfully edited user" }));
    }
  };

  useEffect(() => {
    setValues(data);
    setEmailError(false);
  }, [modalStatus, data]);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        disableBackdropClick
      >
        <div className={classes.paper}>
          <h2>Edit user</h2>
          <S.TextField
            error={false}
            id="outlined-error-helper-text"
            label="Id"
            name="id"
            variant="outlined"
            onChange={handleFieldChange}
            value={values && values.id}
            disabled
          />
          <S.TextField
            error={nameError}
            id="outlined-error-helper-text"
            label="Name"
            name="name"
            helperText={nameError && "required"}
            variant="outlined"
            onChange={handleFieldChange}
            value={values && values.name}
          />
          <S.TextField
            error={false}
            id="outlined-error-helper-text"
            label="Username"
            name="username"
            variant="outlined"
            onChange={handleFieldChange}
            value={values && values.username}
          />
          <S.TextField
            error={false}
            id="outlined-error-helper-text"
            label="City"
            name="city"
            variant="outlined"
            onChange={handleFieldChange}
            value={values && values.address.city}
          />
          <S.TextField
            error={emailError}
            id="outlined-error-helper-text"
            label="Email"
            name="email"
            helperText={emailError && "Invalid email"}
            variant="outlined"
            onChange={handleFieldChange}
            value={values && values.email}
          />
          <S.ButtonSection>
            <Button variant="contained" color="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Submit
            </Button>
          </S.ButtonSection>
        </div>
      </Modal>
    </div>
  );
};

export default EditUserModal;
