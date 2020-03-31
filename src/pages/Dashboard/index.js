import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../redux/selectors/usersSelector";
import { fetchUsers, deleteUser } from "../../api";
import GenericTable from "../../components/GenericTable";
import AddUserModal from "./AddUserModal";

const Dashboard = () => {
  const dispatch = useDispatch();
  const users = useSelector(getUsers);
  useEffect(() => {
    dispatch(fetchUsers());
  }, []);
  return (
    <div>
      <GenericTable
        data={users}
        tableHeaders={["Id", "Name", "Username", "City", "Email", "Actions"]}
        tableRows={["id", "name", "username", "address.city", "email"]}
        title="Dashboard"
        deleteApi={deleteUser}
        fetchApi={fetchUsers}
        subtitle="User list"
        addModal={{ AddUserModal }}
      />
    </div>
  );
};

export default Dashboard;
