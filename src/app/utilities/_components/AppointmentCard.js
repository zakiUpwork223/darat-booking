import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Divider } from '@mui/material';
import { useRouter } from 'next/navigation';

function AppointmentCard({ image, title, time, rupees }) {
    const cardStyle = {
        width: '100%',
        border: "1px solid black"
    };

    const imageStyle = {
        width: '100%',
        height: 'auto',
    };

    const router = useRouter();
    const handleClick = () => {
        router.push(`/productdetail?head=${title}`)
    };

    return (
        <Card style={cardStyle}>
            <CardMedia component="img" alt={title} image={image} style={imageStyle} />
            <CardContent>
                <Typography sx={{ fontSize: "26px" }}>
                    {title}
                </Typography>
                <Divider />
                <Typography sx={{ lineHeight: 3 }}>
                    {time}
                </Typography>
                <Typography >
                    {rupees}
                </Typography>
                <Button
                    onClick={handleClick}
                    sx={{
                        width: "40%",
                        border: "1px solid white",
                        backgroundColor: "black",
                        borderRadius: "4px",
                        color: "white",
                        fontSize: "18px",
                        mt: 5,
                        textTransform: "capitalize",
                        "&:hover": {
                            backgroundColor: "black",
                        },
                        "&:active": {
                            backgroundColor: "black",
                        },
                    }}
                >
                    Book Now
                </Button>
            </CardContent>
        </Card>
    );
}

export default AppointmentCard;
