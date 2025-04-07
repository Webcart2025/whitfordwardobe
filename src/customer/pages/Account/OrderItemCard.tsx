import React from 'react';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import { Avatar, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Order, OrderItem } from '../../../types/orderTypes';
import { formatDate } from '../../util/fomateDate';

interface OrderItemCardProps {
    item: OrderItem;
    order: Order;
}

const OrderItemCard: React.FC<OrderItemCardProps> = ({ item, order }) => {
    const navigate = useNavigate();
    return (
        <div onClick={() => navigate(`/account/orders/${order.id}/${item.id}`)} 
             className='text-sm bg-white p-5 space-y-4 border rounded-md cursor-pointer'>

            <div className='flex items-center gap-3'>
                <div>
                    <Avatar sizes='small'>
                        <ElectricBoltIcon />
                    </Avatar>
                </div>
                <div>
                    {/* 🔹 Changed text color from green (text-teal-600) to black */}
                    <h1 className='font-bold text-black'>{order.orderStatus}</h1>
                    <p>Arriving by {formatDate(order.deliverDate)}</p>
                </div>
            </div>
            
            <div className='p-5 bg-gray-100 flex gap-3 '>
                <div className=''>
                    <img className='w-[70px]' src={item.product.images[0]} alt="" />
                </div>
                <div className='w-full space-y-2'>
                    <h1 className='font-bold'>{item.product.seller?.businessDetails.businessName}</h1>
                    <p>{item.product.title}</p>
                    <p><strong>Size: </strong>FREE</p>
                </div>
            </div>

        </div>
    );
};

export default OrderItemCard;
