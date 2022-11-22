import React, {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Slide from '@mui/material/Slide';
import Grow, { GrowProps } from '@mui/material/Grow';



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
    const [notificationContent, setNotificationContent] = useState<any>('This is a success message!');
    const [severity, setSeverity] = useState<string|null>(null);
    const vertical:any = "bottom";
    const horizontal: any = "right";

    useEffect(()=>{
        if(notificationState){
            setOpen(true)
            setSeverity('success')
            setNotificationContent(notificationState.content)

        }else{
            setOpen(false)
            setNotificationContent(null)
        }
    },[notificationState])

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
    };
  
    
  return (
    <Box sx={{ display: 'flex' }}>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} TransitionComponent={TransitionRight} anchorOrigin={{ vertical, horizontal }}  key={"top" + "center"}>
            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                {notificationContent}
            </Alert>
        </Snackbar>
    </Box>
  );
}

export default Notification