import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const ProgressCircular: React.FC<{size:number}> = ({size}) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CircularProgress size={size} color='primary'/>
    </Box>
  );
}

export default ProgressCircular