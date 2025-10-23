 "use client";
import React, { useState } from 'react';
import { Box, Typography, Drawer, List, ListItem, ListItemIcon, ListItemText, Paper } from '@mui/material';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import ScheduleIcon from '@mui/icons-material/Schedule';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import BarChartIcon from '@mui/icons-material/BarChart';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import SettingsIcon from '@mui/icons-material/Settings';
import GroupIcon from '@mui/icons-material/Group';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

function Dashboard() {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const handleDrawerToggle = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };
    const handleCloseDrawer = () => {
        setIsDrawerOpen(false);
    };

    const styles = {
        dashboardContainer: {
            position: 'fixed',
            left: 0,
            width: isDrawerOpen ? 200 : 50,
            height: '100vh',
            backgroundColor: '#fff',
            transition: 'width 0.3s ease',

        },
        drawerToggle: {
            display: 'flex',
            flexDirection: 'column',
            gap: 30,
            alignItems: 'center',
            padding: 10,
            cursor: 'pointer',

        },
        drawerContent: {
            overflowX: 'hidden',
            padding: 10,
            backgroundColor: "#282aba",
            color: "white",
            height: '100vh',


        },
    };

    const iconMapping = {
        'Patients': <GroupIcon />,
        'Schedule': <ScheduleIcon />,
        'Finances': <SettingsIcon />,
        'Reports': <BarChartIcon />,
        'Contacts': <PhoneAndroidIcon />,
        'Personal': <PersonOutlineIcon />,
        'Setting': <SettingsIcon />,
    };
    return (
        <Box sx={{ display: 'flex', gap: 20, margin: '20px' }}>
            {/* Blog Section */}
            <Paper sx={{ padding: '20px', flexGrow: 1, transition: 'margin 0.4s ease', marginLeft: isDrawerOpen ? 20 : 0 }}>
                <Typography variant="h4" mb={2}>
                    Latest Blog
                </Typography>
                <Typography>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio.
                    Praesent libero. Sed cursus ante dapibus diam.
                </Typography>
                {/* Add more blog content as needed */}
            </Paper>
            <Box style={styles.dashboardContainer}>
                <Box
                    style={styles.drawerToggle}
                >
                    <MenuIcon onClick={handleDrawerToggle} />
                    <GroupIcon />
                    <ScheduleIcon />
                    <AccountBalanceIcon />
                </Box>
                <Drawer
                    anchor="left"
                    open={isDrawerOpen}
                    onClose={handleDrawerToggle}
                    variant="persistent"
                    PaperProps={{
                        style: {
                            width: 200,
                            transition: 'width 0.3s ease',
                        },
                    }}
                >
                    <Box style={styles.drawerContent}>
                        <List>
                            <Box sx={{ display: "flex", justifyContent: "space-between", cursor: "pointer" }}>
                                <Typography>Halaxy</Typography>
                                <MenuIcon onClick={handleCloseDrawer} />
                            </Box>
                            {['Patients', 'Schedule', 'Finance', 'Reports', 'Contacts', 'Personal', 'Setting'].map((text) => (
                                <ListItem key={text}>
                                    <ListItemIcon sx={{ color: "white" }}>
                                        {iconMapping[text]}
                                    </ListItemIcon>
                                    <ListItemText primary={text} />
                                    <ChevronRightIcon /> {/* Add the ChevronRightIcon here */}
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                </Drawer>
            </Box>
        </Box>
    );
}

export default Dashboard;
