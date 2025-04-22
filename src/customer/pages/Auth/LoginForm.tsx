import { Alert, Button, CircularProgress, Snackbar, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import OTPInput from '../../components/OtpFild/OTPInput'
import { FormikValues, useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { useAppDispatch, useAppSelector } from '../../../Redux Toolkit/Store';
import { sendLoginOtp, verifyLoginOtp } from '../../../Redux Toolkit/Seller/sellerAuthenticationSlice';
import { useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { sendLoginSignupOtp, signin } from '../../../Redux Toolkit/Customer/AuthSlice';

const LoginForm = () => {

    const navigate = useNavigate();
    const [otp, setOtp] = useState("");
    const [isOtpSent, setIsOtpSent] = useState(false)
    const [timer, setTimer] = useState<number>(30); // Timer state
    const [isTimerActive, setIsTimerActive] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const { auth } = useAppSelector(store => store)

    const formik = useFormik({
        initialValues: {
            email: '',
            otp: ''
        },

        onSubmit: (values: any) => {
            // Handle form submission
            dispatch(signin({ email: values.email, otp, navigate }))
            console.log('Form data:', values);
        }
    });

    const handleOtpChange = (otp: any) => {

        setOtp(otp);

    };

    const handleResendOTP = () => {
        // Implement OTP resend logic
        dispatch(sendLoginSignupOtp({ email: "signing_"+formik.values.email }))
        console.log('Resend OTP');
        setTimer(30);
        setIsTimerActive(true);
    };

    const handleSentOtp = () => {
        setIsOtpSent(true);
        handleResendOTP();
    }

    const handleLogin = () => {
        formik.handleSubmit()
    }

  

    useEffect(() => {
        let interval: NodeJS.Timeout | undefined;

        if (isTimerActive) {
            interval = setInterval(() => {
                setTimer(prev => {
                    if (prev === 1) {
                        clearInterval(interval);
                        setIsTimerActive(false);
                        return 30; // Reset timer for next OTP request
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
            <h1 className='text-center font-bold text-xl text-primary-color-1 pb-8'>Login</h1>
            <form className="space-y-5">

            <TextField
    fullWidth
    name="email"
    label="Enter Your Email"
    value={formik.values.email}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    error={formik.touched.email && Boolean(formik.errors.email)}
    helperText={formik.touched.email ? (formik.errors.email as string) : undefined}
    InputLabelProps={{
        style: { color: "black" }, // Make label black
    }}
    sx={{
        "& label.Mui-focused": { color: "black" }, // Black color when focused
        "& .MuiOutlinedInput-root": {
            "& fieldset": { borderColor: "black" }, // Black border
            "&:hover fieldset": { borderColor: "black" }, // Black border on hover
            "&.Mui-focused fieldset": { borderColor: "black" }, // Black border when focused
        },
    }}
/>


                {auth.otpSent && <div className="space-y-2">
                    <p className="font-medium text-sm">
                        * Enter OTP sent to your email
                    </p>
                    <OTPInput
                        length={6}
                        onChange={handleOtpChange}
                        error={formik.touched.otp && Boolean(formik.errors.otp)}
                    />
                    <p className="text-xs space-x-2">
                        {isTimerActive ? (
                            <span>Resend OTP in {timer} seconds</span>
                        ) : (
                            <>
                                Didn’t receive OTP?{" "}
                                <span
                                    onClick={handleResendOTP}
                                    className="text-black cursor-pointer font-semibold hover:text-gray-800 "
                                >
                                    Resend OTP
                                </span>
                            </>
                        )}
                    </p>
                    {formik.touched.otp && formik.errors.otp && <p>{formik.errors.otp as string}</p>}
                </div>}

                {auth.otpSent && (
    <div>
        <Button 
            disabled={auth.loading} 
            onClick={handleLogin}
            fullWidth 
            variant='contained' 
            sx={{ 
                py: "11px", 
                backgroundColor: "black", 
                color: "white",
                "&:hover": { backgroundColor: "gray" } 
            }}
        >
            {auth.loading ? <CircularProgress size={24} sx={{ color: "black" }}/> : "Login"}
        </Button>
    </div>
)}


                {!auth.otpSent && <Button
                disabled={auth.loading}
                    fullWidth
                    variant='contained'
                    onClick={handleSentOtp}
                    sx={{ py: "11px",backgroundColor:"black",color:"white","&:hover":{backgroundColor:"gray"} }}>{
                        auth.loading ? <CircularProgress  size={24} sx={{ color: "black" }}/>: "sent otp"}</Button>
                }



            </form>

         
        </div>
    )
}

export default LoginForm