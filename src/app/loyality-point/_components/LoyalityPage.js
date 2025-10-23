import React from 'react';
import { Box, Button, Typography, LinearProgress, Grid } from '@mui/material';

const LoyaltyPage = () => {
  const rootStyle = {
    flexGrow: 1,
    padding: '20px',
  };

  const word = 'COUPON';
  const titleStyle = {
    marginBottom: '20px',
    fontWeight: '700',
    textAlign: 'center',
  };

  const array = [
    { title: 'Free facial on birthday', data: ['K', 'K', 'K'] },
    { title: 'Free facial on birthday', data: ['K', 'K', 'K'] },
    { title: 'Free facial on birthday', data: ['K', 'K', 'K'] },
    { title: 'Free facial on birthday', data: ['K', 'K', 'K'] },
  ];

  // Calculate completion percentage
  const currentPoints = 600; // Replace with the actual value of current loyalty points
  const goalPoints = 1000; // Replace with the actual goal points
  const completionPercentage = (currentPoints / goalPoints) * 100;

  return (
    <div style={rootStyle}>
      <Typography variant="h2" gutterBottom style={titleStyle}>
        Loyalty Points
      </Typography>
      <Box p={10} mt={5} borderRadius={10} marginTop={10} backgroundColor='gainsboro'>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Box display={'flex'} justifyContent={'start'} gap={12} mb={10}>
              <Typography variant='h5' fontWeight={600} mt={1.5}>
                {`${goalPoints - currentPoints} points are missing to reach`}
              </Typography>
              <Button variant='contained' size='large' style={{ fontWeight: '600', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '10px', height: '60px', width: '250px', backgroundColor: 'black', color: 'white' }}>Platinum Star</Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
          </Grid>
          <Grid item xs={12} md={2}>
            <img style={{ borderRadius: '50%', width: '100%', maxWidth: '150px', height: 'auto' }} src='star.jpg' alt="Star" />
          </Grid>
          <Grid item xs={12} md={8}>
            <Box>
              <Typography variant='h2' marginLeft={5}><b>{currentPoints}</b> <b style={{fontWeight: '600', color: 'gray', fontSize: '40px'}}>Loyalty Points</b></Typography>
              <Box padding={0.6} borderRadius={20} border={'0.5rem solid orange'} backgroundColor={'white'} height={60}>
                <LinearProgress
                  variant="determinate"
                  value={completionPercentage}
                  style={{
                    height: '60px',
                    borderRadius: '50px',
                    backgroundColor: 'white',
                  }}
                  sx={{
                    '& .MuiLinearProgress-bar': {
                      borderRadius: '50px',
                      backgroundColor: 'orange',
                      boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)', // Add box shadow here
                    },
                  }}
                />
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={8}>
            <Box display={'flex'} justifyContent={'start'}>
              <Button variant='contained' size='large' style={{ fontWeight: '600', marginLeft: '15px', width: '170px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '10px', height: '60px', backgroundColor: 'black', color: 'white' }}>Gold Star</Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
          </Grid>
        </Grid>
      </Box>
      
      <Grid p={0} container marginTop={12}>
        <Grid item xs={12} md={12}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Box borderRadius={10} p={3} backgroundColor={'orange'}>
                <Typography style={{ fontSize: '4.5rem', color: 'white', fontWeight: '600' }}>FACE</Typography>
                <Typography style={{ fontSize: '4.5rem', color: 'white', fontWeight: '600' }}>FACIAL</Typography>
                <Typography style={{ fontSize: '2.5rem', color: 'white', fontWeight: '600' }}>ON BIRTHDAY</Typography>
                <Box display={'flex'} justifyContent={'center'} mt={7}>
                  <img style={{ width: '100%', maxWidth: '350px', height: 'auto', borderRadius: '9rem' }} src="face5.avif" alt="" />
                </Box>
              </Box>
            </Grid>
            <Grid height={330} item xs={12} md={6}>
              <Box paddingBottom={2} textAlign={'center'} style={{ borderTopLeftRadius: '100px', backgroundColor: 'gainsboro' }}>
                <Box display={'flex'} justifyContent={'center'}>
                  <Typography fontSize={175} fontWeight={600} color={'orange'}>10</Typography>
                  <Box display={'flex'} flexDirection={'column'}>
                    <Typography mt={4} fontSize={110} fontWeight={600} color={'orange'}>%</Typography>
                    <Typography fontSize={40} fontWeight={600} color={'orange'}>OFF</Typography>
                  </Box>
                </Box>
                <Typography fontSize={40} fontWeight={600} textAlign={'center'} color={'#333'}>DISCOUNT COUPON</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={1}>
              <Grid backgroundColor={'black'} borderRadius={20} textAlign={'center'} color={'orange'} height={340} item container direction="column">
                {word.split('').map((letter, index) => (
                  <Grid item mt={0.4} key={index} style={{ transform: `rotate(${90}deg)` }}>
                    <Typography fontSize={35} fontWeight={900}>{letter}</Typography>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid container justifyContent="center">
        <Grid item xs={12} md={8}>
          <Box marginTop={12} backgroundColor="black" color="white" height={500} borderRadius={7} p={5}>
            <Box p={2} color={'orange'} display="flex" justifyContent="space-between">
              <Typography fontWeight={700} fontSize={30}>SILVER</Typography>
              <Typography fontWeight={700} fontSize={30}>GOLD</Typography>
              <Typography fontWeight={700} fontSize={30}>PLATINUM</Typography>
            </Box>
            <Box color={'orange'} paddingX={2} paddingY={2.5} textAlign="center" marginTop={-5} display="flex" justifyContent="space-between">
              <Typography fontWeight={700} fontSize={30}>1 - 500</Typography>
              <Typography fontWeight={700} fontSize={30}>500 - 1500</Typography>
              <Typography fontWeight={700} fontSize={30}>1500++</Typography>
            </Box>
            <Box width={'100%'}>
              <ul style={{ listStyleType: 'none', padding: 0 }}>
                {array.map((item, index) => (
                  <li key={index} style={{ borderTop: '3px solid orange', padding: '10px 20px', display: 'flex', alignItems: 'center', marginTop: 10 }}>
                    <span style={{ marginRight: 30, fontWeight: 700 }}>{item.title}</span>
                    <ul style={{ listStyleType: 'none', display: 'flex', flexDirection: 'row' }}>
                      {item.data.map((subItem, subIndex) => (
                        <li key={subIndex} style={{ marginLeft: 200, fontWeight: 700 }}>{subItem}</li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default LoyaltyPage;