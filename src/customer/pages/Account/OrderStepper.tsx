import { Box, Divider } from "@mui/material";
import React, { useEffect, useState } from "react";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const steps = [
    { name: "Order Placed", description: "on Thu, 11 Jul", value: "PLACED" },
    { name: "Packed", description: "Item Packed in Dispatch Warehouse", value: "CONFIRMED" },
    { name: "Shipped", description: "by Mon, 15 Jul", value: "SHIPPED" },
    { name: "Arriving", description: "by 16 Jul - 18 Jul", value: "ARRIVING" },
    { name: "Arrived", description: "by 16 Jul - 18 Jul", value: "DELIVERED" },
];

const canceledStep = [
    { name: "Order Placed", description: "on Thu, 11 Jul", value: "PLACED" },
    { name: "Order Canceled", description: "on Thu, 11 Jul", value: "CANCELLED" },
];

const OrderStepper = ({ orderStatus }: any) => {
    const [statusStep, setStatusStep] = useState(steps);
    
    useEffect(() => {
        setStatusStep(orderStatus === 'CANCELLED' ? canceledStep : steps);
    }, [orderStatus]);

    return (
        <Box className="mx-auto my-10">
            {statusStep.map((step, index) => (
                <div key={index} className="flex px-4">
                    {/* Step Indicator */}
                    <div className="flex flex-col items-center">
                        <Box
                            sx={{ zIndex: -1 }}
                            className={`w-8 h-8 rounded-full flex items-center justify-center z-10 ${
                                step.value === orderStatus
                                    ? "bg-black text-white" // ✅ Black for completed step
                                    : "bg-gray-700 text-gray-400" // ✅ Dark gray for pending steps
                            }`}
                        >
                            {step.value === orderStatus ? (
                                <CheckCircleIcon />
                            ) : (
                                <FiberManualRecordIcon sx={{ zIndex: -1 }} />
                            )}
                        </Box>
                        {/* Connector Line */}
                        {index < statusStep.length - 1 && (
                            <div
                                className={`border h-20 w-[2px] ${
                                    index < steps.findIndex(s => s.value === orderStatus)
                                        ? "bg-black" // ✅ Black for completed steps
                                        : "bg-gray-600"
                                }`}
                            ></div>
                        )}
                    </div>

                    {/* Step Information */}
                    <div className="ml-2 w-full">
                        <div
                            className={`${
                                step.value === orderStatus
                                    ? "bg-black p-2 text-white font-medium rounded-md -translate-y-3"
                                    : ""
                            } w-full`}
                        >
                            <p className="font-bold">{step.name}</p>
                            <p className="text-xs text-gray-300">{step.description}</p>
                        </div>
                    </div>
                </div>
            ))}
        </Box>
    );
};

export default OrderStepper;
