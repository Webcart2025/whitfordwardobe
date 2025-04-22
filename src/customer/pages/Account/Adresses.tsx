import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../Redux Toolkit/Store'
import UserAddressCard from './UserAddressCard'
import { Dialog } from '@mui/material'
import AddressForm from '../Checkout/AddresssForm'
import {
  fetchUserAddresses,
  deleteAddress
} from '../../../Redux Toolkit/Customer/UserSlice'
import { Address } from '../../../types/userTypes'

const Addresses: React.FC = () => {
  const { user } = useAppSelector(store => store)
  const [openForm, setOpenForm] = useState(false)
  const [refreshAddresses, setRefreshAddresses] = useState(false)
  const [editingAddress, setEditingAddress] = useState<Address | null>(null)

  const dispatch = useAppDispatch()
  const jwt = localStorage.getItem("jwt") || ""

  useEffect(() => {
    if (jwt) {
      dispatch(fetchUserAddresses(jwt))
    }
  }, [dispatch, jwt, refreshAddresses])

  const handleEdit = (address: Address) => {
    setEditingAddress(address)
    setOpenForm(true)
  }

  const handleDelete = (id: number) => {
    dispatch(deleteAddress({ id, jwt })).then(() => {
      setRefreshAddresses(prev => !prev)
    })
  }

  const handleFormClose = () => {
    setOpenForm(false)
    setEditingAddress(null)
    setRefreshAddresses(prev => !prev)
  }

  return (
    <>
      <div className='space-y-3 mb-5'>
        {user?.addresses?.map((item) => (
          <UserAddressCard
            key={item.id}
            item={item}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>

      <button
        onClick={() => {
          setOpenForm(true)
          setEditingAddress(null)
        }}
        className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition"
      >
        + Add New Address
      </button>

      <Dialog open={openForm} onClose={() => setOpenForm(false)} fullWidth maxWidth="sm">
        <AddressForm
          handleClose={handleFormClose}
          mode="profile"
          paymentGateway=""
          existingAddress={editingAddress}
        />
      </Dialog>
    </>
  )
}

export default Addresses
