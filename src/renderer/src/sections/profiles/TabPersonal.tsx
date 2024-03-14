import { useEffect, useState } from 'react';

// material-ui
import {
  Box,
  Button,
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
import { updateAvatar, updateProfile } from '../../store/reducers/authSlice';
import { openSnackbar } from '../../store/reducers/snackbarSlice';
// assets
import { Camera } from 'iconsax-react';
import defaultAvatar from '../../assets/images/users/default_avatar.png';
// types
import { UserProfile } from '../../types/auth';
import { ThemeMode } from '../../types/config';

// field validation schema
const schema = z.object({
  displayName: z.string().min(1, 'Display Name is required'),
  email: z.string().email('Must be a valid email').max(255).min(1, 'Email is required'),
});

type PersonalInfoInputs = z.infer<typeof schema>;

// styles & constant
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    },
  },
};

// ==============================|| ACCOUNT PROFILE - PERSONAL ||============================== //

const TabPersonal = () => {
  const theme = useTheme();
  const [avatar, setAvatar] = useState<string | undefined>(defaultAvatar);

  const { id, email, name, avatar: photoUrl, image } = useAppSelector((state) => state.auth.user);
  const { error: authError } = useAppSelector((state) => state.auth);

  const defaultValues: PersonalInfoInputs = {
    displayName: name,
    email: email,
  };

  const dispatch = useAppDispatch();

  const handleChangeAvatar = async () => {
    // call dispach updateAvatar
    dispatch(updateAvatar());
  };

  useEffect(() => {
    if (photoUrl && photoUrl.length > 0) {
      setAvatar(image);
      dispatch(updateProfile({ id, email, avatar: photoUrl, image, name, role: '', tier: '' }));
    } else {
      setAvatar(defaultAvatar);
    }
  }, [photoUrl]);

  useEffect(() => {
    if (authError.length > 0) {
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
  }, [authError]);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: zodResolver(schema),
  });

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
          <Button variant="outlined" color="secondary">
            Cancel
          </Button>
          <Button form="personal-info-form" type="submit" variant="contained">
            Update Profile
          </Button>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default TabPersonal;