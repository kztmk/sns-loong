import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// material-ui
import { Box, ButtonBase, ClickAwayListener, Paper, Popper } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// project-imports
import Avatar from '../../../../../components/@extended/Avatar';
import Transitions from '../../../../../components/@extended/Transitions';
import MainCard from '../../../../../components/MainCard';
import ProfileTab from './ProfileTab';

// assets
import avatar1 from '../../../../../assets/images/users/default_avatar.png';

// types
import { ThemeMode } from '../../../../../types/config';

import { useAppDispatch, useAppSelector } from '../../../../../hooks/rtkHooks';
import { openSnackbar } from '../../../../../store/reducers/snackbarSlice';

// ==============================|| HEADER CONTENT - PROFILE ||============================== //

const ProfilePage = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const { user, error, isLoggedIn } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (error.length > 0) {
      dispatch(
        openSnackbar({
          open: true,
          message: error,
          variant: 'alert',
          alert: {
            color: 'error',
          },
          close: false,
        })
      );
    }
    if (!isLoggedIn) {
      navigate(`/login`, {
        state: {
          from: '',
        },
      });
    }
  }, [error, isLoggedIn]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const anchorRef = useRef<any>(null);
  const [open, setOpen] = useState(false);
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: MouseEvent | TouchEvent) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 0.75 }}>
      <ButtonBase
        sx={{
          p: 0.25,
          borderRadius: 1,
          '&:hover': {
            bgcolor:
              theme.palette.mode === ThemeMode.DARK ? 'secondary.light' : 'secondary.lighter',
          },
          '&:focus-visible': {
            outline: `2px solid ${theme.palette.secondary.dark}`,
            outlineOffset: 2,
          },
        }}
        aria-label="open profile"
        ref={anchorRef}
        aria-controls={open ? 'profile-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        <Avatar alt="profile user" src={user.image.length > 0 ? user.image : avatar1} />
      </ButtonBase>
      <Popper
        placement="bottom-end"
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        popperOptions={{
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [0, 9],
              },
            },
          ],
        }}
      >
        {({ TransitionProps }) => (
          <Transitions type="grow" position="top-right" in={open} {...TransitionProps}>
            <Paper
              sx={{
                boxShadow: theme.customShadows.z1,
                width: 290,
                minWidth: 240,
                maxWidth: 290,
                [theme.breakpoints.down('md')]: {
                  maxWidth: 250,
                },
                borderRadius: 1.5,
              }}
            >
              <ClickAwayListener onClickAway={handleClose}>
                <MainCard border={false} content={false}>
                  <ProfileTab handleParentClose={handleToggle} />
                </MainCard>
              </ClickAwayListener>
            </Paper>
          </Transitions>
        )}
      </Popper>
    </Box>
  );
};

export default ProfilePage;
