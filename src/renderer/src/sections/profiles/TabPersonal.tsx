import { useEffect, useState } from 'react';

// material-ui
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormHelperText,
  FormLabel,
  Grid,
  InputLabel,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

// third-party
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';
import { z } from 'zod';
// project-imports
import Avatar from '../../components/@extended/Avatar';
import MainCard from '../../components/MainCard';

import { useAppDispatch, useAppSelector } from '../../hooks/rtkHooks';
import { useUpdateEffect } from '../../hooks/useUpdateEffect';
import { confirmEmail, updateAvatar, updateProfile } from '../../store/reducers/authSlice';
import { openSnackbar } from '../../store/reducers/snackbarSlice';
// assets
import { Camera } from 'iconsax-react';
import defaultAvatar from '../../assets/images/users/default_avatar.png';
// types
import { UserProfile } from '../../types/auth';
import { ThemeMode } from '../../types/config';

// field validation schema
const schema = z.object({
  displayName: z.string(),
  email: z.string().email('Must be a valid email').max(255).min(1, 'Email is required'),
});

type PersonalInfoInputs = z.infer<typeof schema>;

// ==============================|| ACCOUNT PROFILE - PERSONAL ||============================== //

const TabPersonal = () => {
  const theme = useTheme();
  const [avatar, setAvatar] = useState<string | undefined>(defaultAvatar);

  // verification code dialog
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
    dispatch(confirmEmail());
  };

  const {
    id,
    email,
    name,
    avatar: photoUrl,
    image,
    verifyEmail,
  } = useAppSelector((state) => state.auth.user);
  const { isInitialized, error: authError, updateItem } = useAppSelector((state) => state.auth);

  const defaultValues: PersonalInfoInputs = {
    displayName: name,
    email: email,
  };

  const dispatch = useAppDispatch();

  const handleChangeAvatar = async () => {
    // call dispach updateAvatar
    dispatch(updateAvatar());
  };

  // watch for avator
  useUpdateEffect(() => {
    if (photoUrl && photoUrl.length > 0 && updateItem === 'avatar') {
      setAvatar(image);
      dispatch(updateProfile({ id, email, avatar: photoUrl, image, name, role: '', tier: '' }));
    } else {
      setAvatar(defaultAvatar);
    }
  }, [photoUrl]);

  useEffect(() => {
    if (image.length > 0) {
      setAvatar(image);
    }
  }, []);

  useEffect(() => {
    if (!isInitialized) {
      // now on update
    } else {
      if (updateItem === 'profile' && authError.length === 0) {
        if (verifyEmail === 'pending') {
          setOpen(true);
        } else {
          dispatch(
            openSnackbar({
              open: true,
              message: 'Dispaly name updated successfully',
              variant: 'alert',
              alert: { color: 'success' },
              close: true,
            })
          );
        }
      } else if (updateItem === 'profile' && authError.length > 0) {
        dispatch(
          openSnackbar({
            open: true,
            message: authError,
            variant: 'alert',
            alert: { color: 'error' },
            close: false,
          })
        );
      }
    }
  }, [isInitialized]);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: zodResolver(schema),
  });

  const handleClear = () => {
    setValue('displayName', '');
    setValue('email', '');
  };

  const onSubmit = (data: PersonalInfoInputs) => {
    const userProfile: UserProfile = {
      id,
      email: data.email,
      avatar: photoUrl,
      image,
      name: data.displayName,
      role: '',
      tier: '',
    };
    dispatch(updateProfile(userProfile));
  };

  return (
    <Grid container spacing={3} justifyContent="center" direction="column" alignItems="center">
      <Grid item xs={12} sm={6}>
        <MainCard title="Personal Information">
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Stack spacing={2.5} alignItems="center" sx={{ m: 3 }}>
                <FormLabel
                  htmlFor="change-avtar"
                  sx={{
                    position: 'relative',
                    borderRadius: '50%',
                    overflow: 'hidden',
                    '&:hover .MuiBox-root': { opacity: 1 },
                    cursor: 'pointer',
                  }}
                >
                  <Avatar alt="Avatar 1" src={avatar} sx={{ width: 76, height: 76 }} />
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      backgroundColor:
                        theme.palette.mode === ThemeMode.DARK
                          ? 'rgba(255, 255, 255, .75)'
                          : 'rgba(0,0,0,.65)',
                      width: '100%',
                      height: '100%',
                      opacity: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    onClick={() => {
                      handleChangeAvatar();
                    }}
                  >
                    <Stack spacing={0.5} alignItems="center">
                      <Camera
                        style={{ color: theme.palette.secondary.lighter, fontSize: '1.5rem' }}
                      />
                      <Typography sx={{ color: 'secondary.lighter' }} variant="caption">
                        Upload
                      </Typography>
                    </Stack>
                  </Box>
                </FormLabel>
              </Stack>
            </Grid>
            <Box
              component="form"
              id="personal-info-form"
              onSubmit={handleSubmit(onSubmit)}
              sx={{
                width: '100%',
                height: '100%',
                alignItems: 'center',
                padding: '0px 16px',
              }}
            >
              <Stack spacing={2}>
                <Grid item xs={12} sm={12}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="personal-first-name">
                      <FormattedMessage
                        id="Display_Name_on_Form_personalInfo"
                        defaultMessage="Dispaly Name"
                        description=""
                      />
                    </InputLabel>
                    <Controller
                      name="displayName"
                      control={control}
                      render={({ field }) => (
                        <>
                          <TextField
                            {...field}
                            fullWidth
                            error={!!errors.displayName}
                            id="dispalyName"
                            placeholder="Display Name"
                            autoFocus
                          />
                          {errors.displayName && (
                            <FormHelperText error id="standard-weight-helper-text-displayName">
                              {errors.displayName?.message}
                            </FormHelperText>
                          )}
                        </>
                      )}
                    />
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="personal-location">
                      <FormattedMessage
                        id="email_on_Form_personalInfo"
                        defaultMessage="Email"
                        description="Email input text"
                      />
                    </InputLabel>
                    <Controller
                      name="email"
                      control={control}
                      render={({ field }) => (
                        <>
                          <TextField {...field} fullWidth id="email" placeholder="email address" />
                          {errors.email && (
                            <FormHelperText error id="standard-weight-helper-text-email">
                              {errors.email?.message}
                            </FormHelperText>
                          )}
                        </>
                      )}
                    />
                  </Stack>
                </Grid>
              </Stack>
            </Box>
          </Grid>
        </MainCard>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={2}>
          <Button variant="outlined" color="secondary" onClick={handleClear}>
            Clear
          </Button>
          <Button form="personal-info-form" type="submit" variant="contained">
            Update Profile
          </Button>
        </Stack>
      </Grid>
      <Dialog open={open} onClose={handleClose}>
        <Box sx={{ p: 1, py: 1.5 }}>
          <DialogTitle>Change Mail Address</DialogTitle>
          <DialogContent>
            <DialogContentText sx={{ mb: 2 }}>
              You recieve a varification email in your new mailbox. Please click link for verify and
              change mail address. If you do not find the mail, please check the spam folder.
            </DialogContentText>
            <DialogContentText sx={{ mb: 2 }}>
              Closing this dialog will sign you out. Please complete the email address change and
              then sign in again. Until the change is complete, you can sign in with your previous
              email address
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" onClick={handleClose}>
              OK
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Grid>
  );
};

export default TabPersonal;
