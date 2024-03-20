import { useState } from 'react';
import electronLogo from '../assets/electron.svg';

import { Link } from 'react-router-dom';

// material-ui
import { Slide, SlideProps } from '@mui/material';
// assets

// project-imports
import { useAppDispatch } from '../hooks/rtkHooks';
import { openSnackbar } from '../store/reducers/snackbarSlice';
// animation function
const TransitionSlideLeft = (props: SlideProps) => {
  return <Slide {...props} direction="left" />;
};

function Landing(): JSX.Element {
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();

  const handleOpen = () => {
    dispatch(
      openSnackbar({
        anchorOrigin: { vertical: 'bottom', horizontal: 'right' },
        transition: 'SlideLeft',
        open: true,
        message: 'Password Updated Successfully',
        variant: 'alert',
        alert: { color: 'success' },
        close: false,
      })
    );
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <img alt="logo" className="logo" src={electronLogo} />
      <div className="creator">Powered by electron-vite</div>
      <div className="text">
        Build an Electron app with <span className="react">React</span>
        &nbsp;and <span className="ts">TypeScript</span>
      </div>
      <p className="tip">
        Please try pressing <code>F12</code> to open the devTool
      </p>
      <div className="actions">
        <div className="action">
          <a href="https://electron-vite.org/" target="_blank" rel="noreferrer">
            Documentation
          </a>
        </div>
        <button onClick={handleOpen}>Open Snackbar</button>
        <div className="action">
          <Link to="/dashboard">Dashboard</Link>
        </div>
      </div>
    </>
  );
}

export default Landing;
