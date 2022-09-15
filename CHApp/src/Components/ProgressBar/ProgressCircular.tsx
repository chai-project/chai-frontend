import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const ProgressCircular: React.FC = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CircularProgress color='primary'/>
    </Box>
  );
}

export default ProgressCircular