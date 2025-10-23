import React, { useState, useEffect } from 'react';
import { Button, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const MenuFile = ({ onClickEdit, onClickDelete, onClose }) => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
        onClose && onClose(); // Call the onClose function if provided
    };

    // Listen for changes in onClose prop to close the menu
    useEffect(() => {
        if (!anchorEl) {
            setAnchorEl(null);
        }
    }, [onClose, anchorEl]);

    return (
        <>
            <Button
                aria-controls="basic-menu"
                aria-haspopup="true"
                onClick={handleClick}
            >
                <MoreVertIcon sx={{ color: "black" }} />
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={onClickEdit}>Edit</MenuItem>
                <MenuItem onClick={onClickDelete}>Delete</MenuItem>
            </Menu>
        </>
    );
};

export default MenuFile;
