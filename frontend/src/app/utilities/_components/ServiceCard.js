import React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';

const ServiceCard = ({ imageUrl, serviceName, Designation }) => {
    const cardStyle = {
        width: '100%',
    };

    const imageStyle = {
        width: '100%',
        height: 'auto',
    };

    const headingStyle = {
        width: "100%",
        textAlign: 'end',
        fontSize: "26px",
        fontWeight : 600

    };

    return (
        <Card style={cardStyle}>
            <CardMedia component="img" alt={serviceName} height="140" image={imageUrl} style={imageStyle} />
            <CardContent>
                <Card variant="h6" style={headingStyle}>
                    {serviceName}
                    {Designation && <Typography>{Designation}</Typography>}
                </Card>
            </CardContent>
        </Card>
    );
};

export default ServiceCard;
