import { Radio } from '@mui/material'
import React from 'react'
import { Address } from '../../../types/userTypes';

interface AddressCardProps {
    value: number;
    selectedValue: number;
    handleChange: (e: any) => void;
    item: Address;
}

const AddressCard: React.FC<AddressCardProps> = ({ value, selectedValue, handleChange, item }) => {
    return (
        <div className="p-4 border rounded-md flex flex-col sm:flex-row items-start sm:items-center w-full space-y-4 sm:space-y-0 sm:space-x-4">
            {/* Radio Button */}
            <div>
                <Radio
                    checked={value === selectedValue}
                    onChange={handleChange}
                    value={value}
                    name="radio-buttons"
                    inputProps={{ 'aria-label': 'B' }}
                    sx={{
                        color: "black",
                        "&.Mui-checked": { color: "black" },
                    }}
                />
            </div>

            {/* Address Details */}
            <div className="space-y-2 w-full">
                <h1 className="text-lg font-semibold">{item.name}</h1>
                <p className="text-sm text-gray-700 leading-5 break-words">
                    {item.address}, {item.locality}, {item.city}, {item.state} - {item.pinCode}
                </p>
                <p className="text-sm">
                    <strong>Mobile:</strong> {item.mobile}
                </p>
            </div>
        </div>
    )
}

export default AddressCard
