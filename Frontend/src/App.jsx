
import { useLocation } from 'react-router-dom'
import './App.css'
import Dashboard from './components/Dashboard'
import ParentContext from './Context/ParentContext'
import AuthLayout from './components/Auth/AuthLayout';
import { Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert'
import { forwardRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeSnackbar } from './redux/slices/app';

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} vairant="filled" {...props} />
})

function App() {

  const dispatch = useDispatch();

  const { open, message, severity } = useSelector((state) => state.app.snackbar)
  console.log(open, message, severity)

  const location = useLocation();

  const authPaths = ["/auth/login", "/auth/verify", "/auth/register", "/auth/reset-password", "/auth/new-password"]

  const showDashboard = authPaths.some(authPath => location.pathname.startsWith(authPath));

  return (
    <>
      <ParentContext>
        {!showDashboard && <Dashboard />}
        {showDashboard && <AuthLayout />}
      </ParentContext>

      {message && open ?

        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          open={open}
          autoHideDuration={4000}
          // key={vertical + horizontal}
          onClose={() => {
            dispatch(closeSnackbar());
          }}>

          <Alert onClose={() => {
            dispatch(closeSnackbar());
          }}
            severity={severity}
            sx={{ width: "100%" }}>
            {message}
          </Alert>

        </Snackbar>

        : <></>}

    </>
  )
}

export default App
