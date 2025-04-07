import React, { useEffect } from 'react';
import OrderItemCard from './OrderItemCard';
import { useAppDispatch, useAppSelector } from '../../../Redux Toolkit/Store';
import { fetchUserOrderHistory } from '../../../Redux Toolkit/Customer/OrderSlice';

interface OrderProps {
  activeFilter?: string | null;
}

const Order = ({ activeFilter }: OrderProps) => {
  const dispatch = useAppDispatch();
  const { auth, orders } = useAppSelector(store => store);

  useEffect(() => {
    dispatch(fetchUserOrderHistory(localStorage.getItem("jwt") || ""));
  }, [auth.jwt, dispatch]);

  // Get statuses based on active filter
  const getFilterStatuses = () => {
    switch(activeFilter) {
      case 'Arriving':
        return ['PLACED', 'CONFIRMED', 'PENDING', 'SHIPPED', 'ARRIVING'];
      case 'Delivered':
        return ['DELIVERED'];
      case 'Cancelled':
        return ['CANCELLED'];
      default:
        return ['PLACED', 'CONFIRMED', 'PENDING', 'SHIPPED', 'ARRIVING', 'DELIVERED', 'CANCELLED'];
    }
  };

  // Filter and sort orders
  const filteredOrders = (orders?.orders || [])
    .filter(order => getFilterStatuses().includes(order.orderStatus))
    .sort((a, b) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime());

  return (
    <div className='text-sm min-h-screen'>
      <div className='pb-5'>
        <h1 className='font-semibold'>All orders</h1>
        <p>from anytime</p>
      </div>

      <div className='space-y-2'>
        {filteredOrders.length > 0 ? (
          filteredOrders.map(order =>
            order?.orderItems?.map(item => 
              <OrderItemCard key={item.id} item={item} order={order} />
            )
          )
        ) : (
          <div className='text-center py-10'>
            <p>No orders found in this category</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Order;