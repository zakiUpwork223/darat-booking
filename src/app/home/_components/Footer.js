"use client";
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import IconButton from '@mui/material/IconButton';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

function Footer() {
    const router = useRouter();
    const [name, setName] = useState('');

    const handleSignup = () => {
        router.push(`/signup?name=${encodeURIComponent(name)}`);
    };

    const handleInstagramClick = () => {
        window.open('https://www.instagram.com/', '_blank');
    };

    const handleWhatsAppClick = () => {
        window.open('https://web.whatsapp.com/', '_blank');
    };

    const handleSnapchatClick = () => {
        window.open('https://www.snapchat.com/', '_blank');
    };

    const handleTikTokClick = () => {
        window.open('https://www.tiktok.com/', '_blank');
    };

    return (
        <Box sx={{ margin: "auto", mb: 6, mt: 8, width: "60%" }}>
            <Typography sx={{ fontSize: "40px", fontWeight: 500, lineHeight: 2, textAlign: "center" }}>Join the Club</Typography>
            <Typography sx={{ width: "50%", margin: "auto", mb: 2, textAlign: "center" }}>Join our email list and get access to specials deals exclusive to our subscribers.</Typography>
            <Typography>Enter your name here * </Typography>
            <Box sx={{ display: "flex" }}>
                <TextField
                    name="name"
                    type="text"
                    fullWidth
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <Button
                    onClick={handleSignup}
                    sx={{
                        backgroundColor: "black",
                        width: "20%",
                        border: "1px solid white",
                        borderRadius: "4px",
                        color: "white",
                        fontSize: "18px",
                        textTransform: "capitalize",
                        "&:hover": {
                            backgroundColor: "black",
                        },
                        "&:active": {
                            backgroundColor: "black",
                        },
                    }}
                >
                    Sign Up
                </Button>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 15, mb: 5 }}>
                <IconButton color="inherit" onClick={handleInstagramClick}>
                    <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                        <InstagramIcon />
                    </a>
                </IconButton>
                <IconButton color="inherit" onClick={handleWhatsAppClick}>
                    <a href="https://web.whatsapp.com/" target="_blank" rel="noopener noreferrer">
                        <WhatsAppIcon />
                    </a>
                </IconButton>
                <IconButton color="inherit" onClick={handleSnapchatClick}>
                    <a href="https://www.snapchat.com/" target="_blank" rel="noopener noreferrer">
                        <Image src="/sc.png" alt='sc_logo' width={20} height={20} />
                    </a>
                </IconButton>
                <IconButton color="inherit" onClick={handleTikTokClick}>
                    <a href="https://www.tiktok.com/" target="_blank" rel="noopener noreferrer">
                        <Image src="/tiktok.jpg" alt='sc_logo' width={26} height={26} />
                    </a>
                </IconButton>
            </Box>
            <Typography>©2023 by Dr. Wafa Clinics. </Typography>
        </Box>
    );
}

export default Footer;
