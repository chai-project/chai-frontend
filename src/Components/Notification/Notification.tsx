import React, {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Slide from '@mui/material/Slide';
import Grow, { GrowProps } from '@mui/material/Grow';
import useMediaQuery from '@mui/material/useMediaQuery';
import {makeStyles, Theme, createStyles, useTheme } from '@material-ui/core/styles';






const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


function TransitionRight(props:any) {
  return <Slide {...props} direction="left" />;
}

function GrowTransition(props: GrowProps) {
    return <Grow {...props} />;
  }

const Notification: React.FC<{notificationState:any}> = ({notificationState}) => {
    const [open, setOpen] = useState<any>(true);
    const [notificationContent, setNotificationContent] = useState<any>();
    const [severity, setSeverity] = useState<any>(null);

    const theme = useTheme();
    const breakpoint = useMediaQuery(theme.breakpoints.down("md"));
    // const vertical:any = breakpoint ? "top" : "bottom";
    const vertical:any = "bottom";
    const horizontal: any = "right";

    useEffect(()=>{
        if(notificationState){
            setOpen(true)
            setSeverity(notificationState.severity)
            setNotificationContent(notificationState.content)

        }else{
            setOpen(false)
            // setSeverity(null)
            setNotificationContent(null)
            // setSeverity(null)
        }
    },[notificationState])

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
      if (reason === 'clickaway') {
        return;
      }
      setSeverity(null)
      setNotificationContent(null)
      setOpen(false);
    };
  
    
  return (
    <Box sx={{ display: 'flex' }}> {/* in Snackbar autoHideDuration={6000} to hide, but it is implemented in the reducer*/}
        <Snackbar open={open} onClose={handleClose} TransitionComponent={TransitionRight} anchorOrigin={{ vertical, horizontal }}  key={"top" + "center"}> 
            <Alert onClose={handleClose} severity={severity ? severity : undefined} sx={{ width: '100%' }}>
                {notificationContent} 
            </Alert>
        </Snackbar>
    </Box>
  );
}

export default Notification