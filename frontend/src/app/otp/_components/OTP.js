"use client";
import React, { useState, useRef, useEffect } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import api from '../../../../lib/services/api';

const OTP = () => {
    const router = useRouter();
    const [otp, setOTP] = useState(['', '', '', '']);
    const [username, setUsername] = useState('');
    const inputRefs = useRef([]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const userEmail = localStorage.getItem('userEmail');
            if (userEmail) {
                setUsername(userEmail);
            }
        }
    }, []);

    const handleDigitChange = (index, value) => {
        if (/^\d*$/.test(value)) {
            const updatedOTP = [...otp];
            updatedOTP[index] = value;
            setOTP(updatedOTP);
            if (value && index < otp.length - 1) {
                inputRefs.current[index + 1].focus();
            }
        }
    };

    const handleBackspace = (index, event) => {
        if (!otp[index] && event.key === 'Backspace' && index > 0) {
            const updatedOTP = [...otp];
            updatedOTP[index - 1] = '';
            setOTP(updatedOTP);
            inputRefs.current[index - 1].focus();
        }
    };

    const handleVerify = () => {
        const otpString = otp.join('');
        api.post('auth/verifyUser', {
            username: username,
            code: otpString
        })
            .then(response => {
                console.log("otpResponse:", response);
                if (response.data.access_token) {
                    localStorage.setItem("token", response.data.access_token);
                    toast.success('OTP verified successfully!');
                    router.push('/home');

                } else {
                    toast.error('Invalid OTP. Please try again.');
                }
            })
            .catch(error => {
                console.error('Error verifying OTP:', error.message);
                toast.error('Failed to verify OTP. Please try again later.');
            });
    };
    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '90vh',
                    textAlign: 'center',
                }}
            >
                <Typography sx={{ fontSize: '24px', fontWeight: 500 }}>
                    Enter OTP
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                    {otp.map((digit, index) => (
                        <div key={index} style={{ marginRight: '10px' }}>
                            <input
                                type="text"
                                maxLength={1}
                                value={digit}
                                onChange={(e) => handleDigitChange(index, e.target.value)}
                                onKeyDown={(e) => handleBackspace(index, e)}
                                ref={(el) => (inputRefs.current[index] = el)}
                                style={{
                                    width: '40px',
                                    height: '40px',
                                    fontSize: '24px',
                                    textAlign: 'center',
                                    border: '1px solid black',
                                    borderRadius: '5px',
                                }}
                            />
                        </div>
                    ))}
                </Box>
                <Button
                    variant="contained"
                    onClick={handleVerify}
                    sx={{ width: '230px', borderRadius: '10px', backgroundColor: 'black', color: 'white', mt: 2 }}
                >
                    Verify
                </Button>
            </Box>
            <ToastContainer />
        </>
    );
};

export default OTP;
