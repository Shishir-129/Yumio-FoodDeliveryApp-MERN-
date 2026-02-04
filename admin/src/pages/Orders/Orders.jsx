import React from 'react'
import './Orders.css'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { useEffect } from 'react';
import { assets } from '../../assets/assets';

const Orders = ({url}) => {

  const [orders,setOrders] = useState([]);

  // function to fetch all orders from the backend
  // the api endpoint used here is : GET {url}/api/order/list
  // this api is called by the fetchAllOrders fxn to retrieve all orders from the backend and set it to the state variable 'orders'
  const fetchAllOrders = async () => {
    const response = await axios.get(url + "/api/order/list");
    if (response.data.success) {
      setOrders(response.data.data);
      console.log(response.data.data);
    } else {
      toast.error("Error fetching orders");
    }
  }

  // useEffect hook is used to run code after a react component is rendered.
  // here we are using useEffect to call the 'fetchAllOrders' function when the component is rendered for the first time.
  // [] means it runs once on the first load
  // if we pass [value] then it runs when 'value' changes
  useEffect( () => {
    fetchAllOrders();
  } , [])

  return (
    <div className='order add'>
      <h3> Order Page</h3>
      <div className="order-list">
        {orders.map((order,index) => (
          <div key={index}className="order-item">
            <img src={assets.parcel_icon} alt="" />
            <p className='order-item-food'>
              {order.items.map((item,index)=>{
                if (index === order.items.length -1) {
                  return item.name + " x " + item.quantity
                } else {
                  return item.name + " x " + item.quantity + ", "
                }
              })}
            </p>
          </div>
        ))}
      </div>
      
    </div>
  )
}

export default Orders
