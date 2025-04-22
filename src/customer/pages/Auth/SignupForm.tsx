import { Button, CircularProgress, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import OTPInput from '../../components/OtpFild/OTPInput';
import { useFormik } from 'formik';
import { useAppDispatch, useAppSelector } from '../../../Redux Toolkit/Store';
import { sendLoginSignupOtp, signup } from '../../../Redux Toolkit/Customer/AuthSlice';
import { useNavigate } from 'react-router-dom';
import { InputAdornment } from "@mui/material";


const SignupForm = () => {
    const navigate = useNavigate();
    const [otp, setOtp] = useState("");
    const [isTimerActive, setIsTimerActive] = useState<boolean>(false);
    const [timer, setTimer] = useState<number>(30);
    const dispatch = useAppDispatch();
    const { auth } = useAppSelector(store => store);

    const formik = useFormik({
        initialValues: {
            email: '',
            otp: '',
            name: '',
            mobile: ''  // Fixed: Now correctly set as an empty string
        },
        onSubmit: (values) => {
            dispatch(signup({ 
                fullName: values.name, 
                email: values.email, 
                mobile: values.mobile, 
                otp, 
                navigate 
            }));
        }
    });

    const handleOtpChange = (otp: string) => {
        setOtp(otp);
    };

    const handleResendOTP = () => {
        dispatch(sendLoginSignupOtp({ email: formik.values.email }));
        setTimer(30);
        setIsTimerActive(true);
    };

    useEffect(() => {
        let interval: NodeJS.Timeout | undefined;

        if (isTimerActive) {
            interval = setInterval(() => {
                setTimer(prev => {
                    if (prev === 1) {
                        clearInterval(interval);
                        setIsTimerActive(false);
                        return 30;
                    }
                    return prev - 1;
                });
            }, 1000);
        }

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isTimerActive]);

    return (
        <div>
            <h1 className='text-center font-bold text-xl text-primary-color-1 pb-5'>Signup</h1>
            <form className="space-y-5" onSubmit={formik.handleSubmit}>
                
                {/* Email Input */}
                <TextField
                    fullWidth
                    name="email"
                    label="Enter Your Email"
                    type="email"
                    value={formik.values.email} 
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email ? (formik.errors.email as string) : undefined}
                    InputLabelProps={{ style: { color: "black" } }}
                    sx={{
                        "& label.Mui-focused": { color: "black" },
                        "& .MuiOutlinedInput-root": {
                            "& fieldset": { borderColor: "black" },
                            "&:hover fieldset": { borderColor: "black" },
                            "&.Mui-focused fieldset": { borderColor: "black" },
                        },
                    }}
                />

                {/* OTP Input */}
                {auth.otpSent && (
                    <div className="space-y-2">
                        <p className="font-medium text-sm">* Enter OTP sent to your email</p>
                        <OTPInput length={6} onChange={handleOtpChange} error={false} />
                        <p className="text-xs space-x-2">
                            {isTimerActive ? (
                                <span>Resend OTP in {timer} seconds</span>
                            ) : (
                                <>
                                    Didn’t receive OTP?{" "}
                                    <span
                                        onClick={handleResendOTP}
                                        className="text-black cursor-pointer hover:text-gray-600 font-semibold"
                                    >
                                        Resend OTP
                                    </span>
                                </>
                            )}
                        </p>
                        {formik.touched.otp && formik.errors.otp && <p>{formik.errors.otp as string}</p>}
                    </div>
                )}

{auth.otpSent && (
    <>
        {/* Name Input */}
        <TextField
  fullWidth
  name="name"
  label="Enter Your Name"
  value={formik.values.name}
  onChange={formik.handleChange}
  onBlur={formik.handleBlur}
  error={formik.touched.name && Boolean(formik.errors.name)}
  helperText={formik.touched.name ? (formik.errors.name as string) : undefined}
  InputLabelProps={{ style: { color: "black" } }}
  sx={{
    "& label.Mui-focused": { color: "black" }, // Label color on focus
    "& .MuiOutlinedInput-root": {
      "& fieldset": { borderColor: "black" }, // Default border
      "&:hover fieldset": { borderColor: "black" }, // Hover border
      "&.Mui-focused fieldset": { borderColor: "black" }, // Focused border
    },
  }}
/>

        {/* Mobile Input */}
        <TextField
  fullWidth
  name="mobile"
  label="Enter Your Mobile Number"
  type="tel"
  value={formik.values.mobile}
  onChange={formik.handleChange}
  onBlur={formik.handleBlur}
  error={formik.touched.mobile && Boolean(formik.errors.mobile)}
  helperText={formik.touched.mobile ? (formik.errors.mobile as string) : undefined}
  InputProps={{
    startAdornment: (
      <InputAdornment position="start" style={{ color: "black" }}>
        +91
      </InputAdornment>
    ),
    inputProps: {
      maxLength: 10,
      onInput: (e: React.ChangeEvent<HTMLInputElement>) => {
        e.target.value = e.target.value.replace(/[^0-9]/g, '').slice(0, 10);
      }
    }
  }}
  InputLabelProps={{ style: { color: "black" } }}
  sx={{
    "& label.Mui-focused": { color: "black" },
    "& .MuiOutlinedInput-root": {
      "& fieldset": { borderColor: "black" },
      "&:hover fieldset": { borderColor: "black" },
      "&.Mui-focused fieldset": { borderColor: "black" },
    },
  }}
/>
    </>
)}

                {/* Signup Button */}
                {auth.otpSent && (
                    <Button
                        disabled={auth.loading}
                        type="submit"
                        fullWidth
                        variant='contained'
                        sx={{
                            py: "11px",
                            backgroundColor: "black",
                            color: "white",
                            "&:hover": { backgroundColor: "gray" }
                        }}
                    >
                        {auth.loading ? (
                            <CircularProgress size="small" sx={{ width: "27px", height: "27px",color: "black" }} />
                        ) : (
                            "Signup"
                        )}
                    </Button>
                )}

                {/* Send OTP Button */}
                {!auth.otpSent && (
                    <Button
                        fullWidth
                        variant='contained'
                        onClick={handleResendOTP}
                        disabled={auth.loading}
                        sx={{ py: "11px", backgroundColor: "black", color: "white", ":hover": { backgroundColor: "gray" } }}
                    >
                        {auth.loading ? <CircularProgress size="small" sx={{ width: "27px", height: "27px",color: "black" }} /> : "Send OTP"}
                    </Button>
                )}
            </form>
        </div>
    );
};

export default SignupForm;
