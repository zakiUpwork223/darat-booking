"use client";
import React, { useEffect, useState } from 'react';
import { Box, Typography, Container } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setState } from '../../../../lib/redux/slices/authSlice';

function AdminPanel() {
    const dispatch = useDispatch();
    const router = useRouter();
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const handleLogout = () => {
        if (isClient) {
            localStorage.removeItem("token");
            localStorage.removeItem("role");
            dispatch(setState());
            router.push("/");
        }
    };

    if (!isClient) {
        return null; 
    }

    return (
        <Container>
            <Box mt={4}>
                <Box onClick={handleLogout} sx={{ float: "right", cursor: "pointer" }}>
                    <LogoutIcon />
                    <Typography sx={{ textDecoration: "underline" }}>Log out</Typography>
                </Box>
                <Typography variant="h4" component="h1" gutterBottom>
                    Welcome to the Admin Panel
                </Typography>
                <Typography variant="body1" paragraph>
                    This is the dashboard for managing your application as an administrator.
                </Typography>
            </Box>
        </Container>
    );
}

export default AdminPanel;
