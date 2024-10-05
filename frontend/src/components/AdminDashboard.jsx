import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [inventory, setInventory] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchInventory();
    fetchOrders();
  }, []);

  const fetchInventory = async () => {
    try {
      const response = await axios.get('/api/admin/inventory');
      setInventory(response.data);
    } catch (error) {
      console.error('Error fetching inventory:', error);
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await axios.get('/api/admin/orders');
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const handleUpdateOrderStatus = async (orderId, status) => {
    try {
      await axios.put(`/api/admin/orders/${orderId}`, { status });
      fetchOrders(); // Refresh the orders after updating
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>

      {/* Inventory Section */}
      <div>
        <h3>Inventory Management</h3>
        <ul>
          {inventory.map(item => (
            <li key={item._id}>
              {item.name}: {item.availableStock}
            </li>
          ))}
        </ul>
      </div>

      {/* Orders Section */}
      <div>
        <h3>Manage Orders</h3>
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Status</th>
              <th>Update Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user.name}</td>
                <td>{order.status}</td>
                <td>
                  <select
                    value={order.status}
                    onChange={(e) => handleUpdateOrderStatus(order._id, e.target.value)}
                  >
                    <option value="Order Received">Order Received</option>
                    <option value="In the Kitchen">In the Kitchen</option>
                    <option value="Sent to Delivery">Sent to Delivery</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
