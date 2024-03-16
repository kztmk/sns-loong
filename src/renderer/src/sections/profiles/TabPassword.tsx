import { SyntheticEvent, useEffect, useState } from 'react';

// material-ui
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Box,
  Button,
  FormHelperText,
  Grid,
  InputAdornment,
  InputLabel,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  OutlinedInput,
  Stack,
  Typography,
} from '@mui/material';
import { z } from 'zod';
// project-imports
import IconButton from '../../components/@extended/IconButton';
import MainCard from '../../components/MainCard';

// assets
import { Eye, EyeSlash, Minus, TickCircle } from 'iconsax-react';
// project imports
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../hooks/rtkHooks';
import { updatePassword } from '../../store/reducers/authSlice';
import { openSnackbar } from '../../store/reducers/snackbarSlice';
import {
  isLowercaseChar,
  isNumber,
  isSpecialChar,
  isUppercaseChar,
  minLength,
} from '../../utils/password-validation';

// ==============================|| ACCOUNT PROFILE - PASSWORD CHANGE ||============================== //
const schema = z
  .object({
    old: z.string().min(1, 'Old Password is required'),
    password: z
      .string()
      .min(8, 'Password must contain at least 8 characters')
      .max(16, 'Password must contain at most 16 characters')
      .regex(
        /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        'Password must contain at least 8 characters, one uppercase, one number and one special case character'
      ),
    confirm: z.string().min(1, 'Confirm Password is required').max(16),
  })
  .superRefine(({ old, password, confirm }, ctx) => {
    if (old === password) {
      return ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Old Password and New Password cannot be same',
        path: ['old'],
      });
    }
    if (password !== confirm) {
      return ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Password and Confirm Password must match',
        path: ['confirm'],
      });
    }
    return ctx;
  });

type TabPasswordInputs = z.infer<typeof schema>;

const defaultValues: TabPasswordInputs = {
  old: '',
  password: '',
  confirm: '',
};

const TabPassword = () => {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [onUpdate, setOnUpdate] = useState(true);

  const handleClickShowOldPassword = () => {
    setShowOldPassword(!showOldPassword);
  };
  const handleClickShowNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };
  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleMouseDownPassword = (event: SyntheticEvent) => {
    event.preventDefault();
  };

  const dispach = useAppDispatch();
  const { isInitialized, error } = useAppSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    watch,
    getValues,
    trigger,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm<TabPasswordInputs>({
    mode: 'all',
    defaultValues,
    resolver: zodResolver(schema),
  });

  const password = watch('password', '');

  useEffect(() => {
    if (getValues('old').length > 0) {
      trigger();
    }
  }, [password]);

  const onSubmit = (data: TabPasswordInputs) => {
    dispach(updatePassword(data.password));
  };

  useEffect(() => {
    if (!isInitialized) {
      setOnUpdate(false);
    } else {
      if (error.length === 0) {
        dispach(
          openSnackbar({
            open: true,
            message: 'Password Updated Successfully',
            variant: 'success',
            alert: { color: 'success' },
            close: false,
          })
        );
      } else {
        dispach(
          openSnackbar({
            open: true,
            message: error,
            variant: 'error',
            alert: { color: 'error' },
            close: false,
          })
        );
      }
    }
  }, [isInitialized]);

  const clearForm = () => {
    reset();
  };

  return (
    <MainCard title="Change Password">
      <Box component="form" id="change-password" onSubmit={handleSubmit(onSubmit)} sx={{ p: 0 }}>
        <Grid container spacing={3}>
          <Grid item container spacing={3} xs={12} sm={6}>
            <Grid item xs={12}>
              <Stack spacing={1.25}>
                <InputLabel htmlFor="password-old">Old Password</InputLabel>
                <OutlinedInput
                  {...register('old')}
                  id="password-old"
                  placeholder="Enter Old Password"
                  type={showOldPassword ? 'text' : 'password'}
                  name="old"
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowOldPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                        size="large"
                        color="secondary"
                      >
                        {showOldPassword ? <Eye /> : <EyeSlash />}
                      </IconButton>
                    </InputAdornment>
                  }
                  autoComplete="password-old"
                />
                {errors.old && (
                  <FormHelperText error id="standard-weight-helper-text-password-old">
                    {errors.old?.message}
                  </FormHelperText>
                )}
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Stack spacing={1.25}>
                <InputLabel htmlFor="password-password">New Password</InputLabel>
                <OutlinedInput
                  {...register('password')}
                  id="password-password"
                  placeholder="Enter New Password"
                  type={showNewPassword ? 'text' : 'password'}
                  name="password"
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowNewPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                        size="large"
                        color="secondary"
                      >
                        {showNewPassword ? <Eye /> : <EyeSlash />}
                      </IconButton>
                    </InputAdornment>
                  }
                  autoComplete="password-password"
                />
                {errors.password && (
                  <FormHelperText error id="standard-weight-helper-text-password-password">
                    {errors.password?.message}
                  </FormHelperText>
                )}
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Stack spacing={1.25}>
                <InputLabel htmlFor="password-confirm">Confirm Password</InputLabel>
                <OutlinedInput
                  {...register('confirm')}
                  id="password-confirm"
                  placeholder="Enter Confirm Password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirm"
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowConfirmPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                        size="large"
                        color="secondary"
                      >
                        {showConfirmPassword ? <Eye /> : <EyeSlash />}
                      </IconButton>
                    </InputAdornment>
                  }
                  autoComplete="password-confirm"
                />
                {errors.confirm && (
                  <FormHelperText error id="standard-weight-helper-text-password-confirm">
                    {errors.confirm?.message}
                  </FormHelperText>
                )}
              </Stack>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ p: { xs: 0, sm: 2, md: 4, lg: 5 } }}>
              <Typography variant="h5">New Password must contain:</Typography>
              <List sx={{ p: 0, mt: 1 }}>
                <ListItem divider>
                  <ListItemIcon sx={{ color: minLength(password) ? 'success.main' : 'inherit' }}>
                    {minLength(password) ? <TickCircle /> : <Minus />}
                  </ListItemIcon>
                  <ListItemText primary="At least 8 characters" />
                </ListItem>
                <ListItem divider>
                  <ListItemIcon
                    sx={{
                      color: isLowercaseChar(password) ? 'success.main' : 'inherit',
                    }}
                  >
                    {isLowercaseChar(password) ? <TickCircle /> : <Minus />}
                  </ListItemIcon>
                  <ListItemText primary="At least 1 lower letter (a-z)" />
                </ListItem>
                <ListItem divider>
                  <ListItemIcon
                    sx={{
                      color: isUppercaseChar(password) ? 'success.main' : 'inherit',
                    }}
                  >
                    {isUppercaseChar(password) ? <TickCircle /> : <Minus />}
                  </ListItemIcon>
                  <ListItemText primary="At least 1 uppercase letter (A-Z)" />
                </ListItem>
                <ListItem divider>
                  <ListItemIcon sx={{ color: isNumber(password) ? 'success.main' : 'inherit' }}>
                    {isNumber(password) ? <TickCircle /> : <Minus />}
                  </ListItemIcon>
                  <ListItemText primary="At least 1 number (0-9)" />
                </ListItem>
                <ListItem>
                  <ListItemIcon
                    sx={{ color: isSpecialChar(password) ? 'success.main' : 'inherit' }}
                  >
                    {isSpecialChar(password) ? <TickCircle /> : <Minus />}
                  </ListItemIcon>
                  <ListItemText primary="At least 1 special characters" />
                </ListItem>
              </List>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={2}>
              <Button variant="outlined" color="secondary" onClick={clearForm}>
                Clear
              </Button>
              <Button disabled={!isValid || isSubmitting} type="submit" variant="contained">
                Update Password
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </MainCard>
  );
};

export default TabPassword;
