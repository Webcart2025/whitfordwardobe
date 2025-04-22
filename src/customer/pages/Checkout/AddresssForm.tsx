import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Address } from '../../../types/userTypes'
import { useAppDispatch } from '../../../Redux Toolkit/Store'
import {
  addAddressToServer,
  updateAddress
} from '../../../Redux Toolkit/Customer/UserSlice'

interface AddressFormProps {
  handleClose: () => void
  mode: string // not used currently but kept for future
  paymentGateway: string // not used currently but kept for future
  existingAddress?: Address | null // if provided, form goes to edit mode
}

const AddressForm: React.FC<AddressFormProps> = ({
  handleClose,
  existingAddress = null
}) => {
  const dispatch = useAppDispatch()
  const jwt = localStorage.getItem('jwt') || ''
  const isEditMode = !!existingAddress

  const formik = useFormik({
    initialValues: {
      name: existingAddress?.name || '',
      address: existingAddress?.address || '',
      locality: existingAddress?.locality || '',
      city: existingAddress?.city || '',
      state: existingAddress?.state || '',
      pinCode: existingAddress?.pinCode || '',
      mobile: existingAddress?.mobile || ''
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      address: Yup.string().required('Address is required'),
      locality: Yup.string().required('Locality is required'),
      city: Yup.string().required('City is required'),
      state: Yup.string().required('State is required'),
      pinCode: Yup.string()
        .matches(/^[0-9]{6}$/, 'PIN code must be 6 digits')
        .required('PIN code is required'),
      mobile: Yup.string()
        .matches(/^[0-9]{10}$/, 'Mobile number must be 10 digits')
        .required('Mobile number is required')
    }),
    onSubmit: async (values) => {
      const addressPayload: Address = {
        ...values,
        id: existingAddress?.id || 0
      }

      try {
        if (isEditMode) {
          await dispatch(updateAddress({ address: addressPayload, jwt })).unwrap()
        } else {
          await dispatch(addAddressToServer({ address: addressPayload, jwt })).unwrap()
        }
        handleClose()
      } catch (err) {
        console.error('Address submission failed:', err)
      }
    }
  })

  return (
    <form onSubmit={formik.handleSubmit} className="p-5 space-y-4">
      {[
        ['name', 'Full Name'],
        ['address', 'Address'],
        ['locality', 'Locality'],
        ['city', 'City'],
        ['state', 'State'],
        ['pinCode', 'PIN Code'],
        ['mobile', 'Mobile Number']
      ].map(([key, label]) => (
        <div key={key}>
          <label className="block font-medium mb-1">{label}</label>
          <input
            type="text"
            name={key}
            value={formik.values[key as keyof typeof formik.values]}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full p-2 border rounded"
          />
          {formik.touched[key as keyof typeof formik.values] &&
            formik.errors[key as keyof typeof formik.values] && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors[key as keyof typeof formik.values]}
              </p>
            )}
        </div>
      ))}

      <div className="flex justify-end gap-3 pt-4">
        <button
          type="button"
          onClick={handleClose}
          className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          {isEditMode ? 'Update Address' : 'Save Address'}
        </button>
      </div>
    </form>
  )
}

export default AddressForm
