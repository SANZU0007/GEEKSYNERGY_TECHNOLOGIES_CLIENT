import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DataGrid, {
  Column,
  Editing,
  Popup,
  Form,
  Pager,
  Paging
} from 'devextreme-react/data-grid';
import 'devextreme/dist/css/dx.light.css';
import "../css/Register.css"

const API_URL = 'https://geeksynergy-technologies-server.onrender.com';

const UserManagement = () => {
  const [users, setUsers] = useState([]);

  // Fetch user details from the API
  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${API_URL}/users`);
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  // Handle updating user data
  const handleUpdate = async (id, updatedData) => {
    try {
      await axios.put(`${API_URL}/users/${id}`, updatedData);
      fetchUsers(); // Refresh the list after update
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  // Handle deleting user
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/users/${id}`);
      fetchUsers(); // Refresh the list after delete
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  // Triggered after a row is updated
  const onRowUpdated = (e) => {
    const { _id: id, name, phoneNo, email } = e.data;
    handleUpdate(id, { name, phoneNo, email });
  };

  // Triggered after a row is removed
  const onRowRemoved = (e) => {
    const { _id: id } = e.data;
    handleDelete(id);
  };

  useEffect(() => {
    fetchUsers(); // Fetch users on component mount
  }, []);

  return (
    <div className="user-management-container">
      <h1 className="user-management-title">User Management</h1>
      <DataGrid
        dataSource={users}
        keyExpr="_id"
        showBorders={true}
        repaintChangesOnly={true}
        onRowUpdated={onRowUpdated}
        onRowRemoved={onRowRemoved}
        className="user-management-grid"
      >
        <Editing
          mode="popup"
          allowUpdating={true}
          allowDeleting={true}
          useIcons={true}
        >
        <Popup 
    title="Edit User Details" 
    showTitle={true} 
    width={window.innerWidth > 700 ? '70%' : '100%'} 
    height={400} 
  />
          <Form />
        </Editing>
        <Column dataField="name" caption="Name" />
        <Column dataField="phoneNo" caption="Phone Number" />
        <Column dataField="email" caption="Email" />
        <Pager allowedPageSizes={[5, 10, 20]} showPageSizeSelector={true} />
        <Paging defaultPageSize={10} />
      </DataGrid>
    </div>
  );
};

export default UserManagement;
