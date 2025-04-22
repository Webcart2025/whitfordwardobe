import React from 'react'
import { Address } from '../../../types/userTypes'

interface UserAddressCardProps {
  item: Address
  onEdit: (address: Address) => void
  onDelete: (id: number) => void
}

const UserAddressCard: React.FC<UserAddressCardProps> = ({ item, onEdit, onDelete }) => {

  console.log("UserAddressCard received item:", item);
  return (
    <div className='p-5 border rounded-md'>
      <div className='space-y-3'>
        <h1 className='font-semibold'>{item.name}</h1>
        <p className='w-[320px]'>
          {item.address}, {item.locality}, {item.city}, {item.state} - {item.pinCode}
        </p>
        <p><strong>Mobile:</strong> {item.mobile}</p>
        <div className="flex gap-3 pt-2">
          <button
            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
            onClick={() => onEdit(item)}
          >
            Edit
          </button>
          <button
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            onClick={() => item.id && onDelete(item.id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default UserAddressCard
