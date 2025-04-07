import { Button, Divider, IconButton } from '@mui/material'
import React from 'react'
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { CartItem } from '../../../types/cartTypes';
import { useAppDispatch } from '../../../Redux Toolkit/Store';
import { deleteCartItem, updateCartItem } from '../../../Redux Toolkit/Customer/CartSlice';
import { useAppSelector } from '../../../Redux Toolkit/Store';

interface CartItemProps {
    item: CartItem
}

// Get cartItems from Redux


const CartItemCard: React.FC<CartItemProps> = ({ item }) => {
    const dispatch = useAppDispatch();
    
    const handleUpdateQuantity = (value: number) => {
        dispatch(updateCartItem({
            jwt: localStorage.getItem("jwt"),
            cartItemId: item.id,
            cartItem: { quantity: item.quantity + value }
        }))
    }
    const handleRemoveCartItem = () => {
        dispatch(deleteCartItem({
            jwt: localStorage.getItem("jwt") || "", 
            cartItemId: item.id
        }))
    }
    
    return (
        <div className='border rounded-md relative'>
            <div className='p-5 flex gap-3'>
                <div>
                    <img className='w-[90px] rounded-md' 
                        src={item.product.images[0]} 
                        alt="" 
                    />
                </div>
                <div className='space-y-2'>
                    <h1 className='font-semibold text-lg'>{item.product?.title}</h1>
                    <p className='text-gray-1000 text-xs'><strong>Sold by:</strong> Whitford</p>
                    <p className='text-xs'><strong>24 hours replacement</strong> available</p>
                    <p className='text-sm text-gray-1000'><strong>Quantity:</strong> {item.quantity}</p>
                    <p className='text-sm text-gray-1000'><strong>Size:</strong> {item.size}</p>
                </div>
            </div>
            
            <Divider />
            
            <div className='px-5 py-2 flex justify-between items-center'>
                <div className='flex items-center justify-between w-[140px]'>
                    <div className="flex items-center gap-2 p-1 border border-black rounded-md">
                        {/* Decrease Quantity */}
                        <Button 
                            size="small" 
                            disabled={item.quantity === 1} 
                            onClick={() => handleUpdateQuantity(-1)}
                            className="min-w-[32px] text-black hover:bg-black/10 disabled:text-black/30"
                        >
                            <RemoveIcon fontSize="small" />
                        </Button>
                        
                        {/* Quantity Display */}
                        <span className="px-2 font-semibold text-black">
                            {item.quantity}
                        </span>
                        
                        {/* Increase Quantity - Now Black */}
                        <Button 
                            size="small" 
                            onClick={() => handleUpdateQuantity(1)}
                            className="min-w-[32px] text-black hover:bg-black/10"
                        >
                            <AddIcon fontSize="small" sx={{ color: "black" }} />  {/* ✅ Changed to black */}
                        </Button>
                    </div>
                    
                    {/* Price Display - Right Aligned */}
                    <div className="ml-4">
                        <p className="text-gray-700 font-medium">₹{item.sellingPrice}</p>
                    </div>
                </div>
            </div>
            
            {/* Remove Item Button */}
            <div className='absolute top-1 right-1'>
                <IconButton onClick={handleRemoveCartItem} sx={{ color: "black" }}>
                    <CloseIcon />
                </IconButton>
            </div>
        </div>
    )
}

export default CartItemCard;
