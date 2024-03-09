import { SyntheticEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// material-ui
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
} from '@mui/material';
// assets
import { Eye, EyeSlash } from 'iconsax-react';
// third-party
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import * as z from 'zod';

// project-imports
import AnimateButton from '../../../components/@extended/AnimateButton';
import IconButton from '../../../components/@extended/IconButton';
import useScriptRef from '../../../hooks/useScriptRef';

import { openSnackbar } from '../../../store/reducers/snackbarSlice';

// types
import { useAppDispatch, useAppSelector } from '../../../hooks/rtkHooks';

// ============================|| FIREBASE - RESET PASSWORD ||============================ //

const schema = z
  .object({
    password: z.string(),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })
  .superRefine(({ password }, checkPassComplexity) => {
    const containsUppercase = (ch) => /[A-Z]/.test(ch);
    const containsLowercase = (ch) => /[a-z]/.test(ch);
    const containsSpecialChar = (ch) => /[`!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?~ ]/.test(ch);
    let countOfUpperCase = 0,
      countOfLowerCase = 0,
      countOfNumbers = 0,
      countOfSpecialChar = 0;

    for (let i = 0; i < password.length; i++) {
      let ch = password.charAt(i);
      if (!isNaN(+ch)) countOfNumbers++;
      else if (containsUppercase(ch)) countOfUpperCase++;
      else if (containsLowercase(ch)) countOfLowerCase++;
      else if (containsSpecialChar(ch)) countOfSpecialChar++;
    }

    let errObj = {
      upperCase: { pass: true, message: 'add upper case.' },
      lowerCase: { pass: true, message: 'add lower case.' },
      specialCh: { pass: true, message: 'add special ch.' },
      totalNumber: { pass: true, message: 'add number.' },
    };

    if (countOfLowerCase < 1) {
      errObj = { ...errObj, lowerCase: { ...errObj.lowerCase, pass: false } };
    }
    if (countOfNumbers < 1) {
      errObj = {
        ...errObj,
        totalNumber: { ...errObj.totalNumber, pass: false },
      };
    }
    if (countOfUpperCase < 1) {
      errObj = { ...errObj, upperCase: { ...errObj.upperCase, pass: false } };
    }
    if (countOfSpecialChar < 1) {
      errObj = { ...errObj, specialCh: { ...errObj.specialCh, pass: false } };
    }

    if (
      countOfLowerCase < 1 ||
      countOfUpperCase < 1 ||
      countOfSpecialChar < 1 ||
      countOfNumbers < 1
    ) {
      checkPassComplexity.addIssue({
        code: 'custom',
        path: ['password'],
        message: JSON.stringify(errObj),
      });
    }
  });

type AuthUpdatePasswordFormValues = z.infer<typeof schema>;

const defaultValue: AuthUpdatePasswordFormValues = {
  password: '',
  confirmPassword: '',
};

const AuthUpdatePassword = () => {
  const scriptedRef = useScriptRef();
  const navigate = useNavigate();

  const { isLoggedIn } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const [formErrorMessage, setFormErrorMessage] = useState<string | null>(null);

  const handleMouseDownPassword = (event: SyntheticEvent) => {
    event.preventDefault();
  };

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AuthUpdatePasswordFormValues>({
    defaultValues: defaultValue,
    resolver: zodResolver(schema),
  });

  const onSubmit = async (values: AuthUpdatePasswordFormValues) => {
    try {
      // password reset
      const result = await window.electronAPI.updatePassword(values.password);
      if (result.error.length === 0) {
        if (scriptedRef.current) {
          dispatch(
            openSnackbar({
              open: true,
              message: 'Successfuly reset password.',
              variant: 'alert',
              alert: {
                color: 'success',
              },
              close: false,
            })
          );

          setTimeout(() => {
            navigate(isLoggedIn ? '/auth/login' : '/login', { replace: true });
          }, 1500);
        }
      } else {
        setFormErrorMessage(result.error);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const errorMessage = err.message || 'Something went wrong';
      setFormErrorMessage(errorMessage);
    }
  };

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Stack spacing={1}>
            <InputLabel htmlFor="password-reset">Password</InputLabel>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <OutlinedInput
                  {...field}
                  fullWidth
                  error={!!errors.password}
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  {...field}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                        color="secondary"
                      >
                        {showPassword ? <Eye /> : <EyeSlash />}
                      </IconButton>
                    </InputAdornment>
                  }
                  placeholder="Enter password"
                />
              )}
            />
            {!!errors.password && (
              <FormHelperText error id="helper-text-password-reset">
                <ul className="mt-2 text-sm text-red-400">
                  {Object.keys(JSON.parse(errors.password.message as string)).map((m, i) => {
                    const { pass, message } = (errors.password?.message as string)[m];

                    return (
                      <li key={i}>
                        <span>{pass ? '✅' : '❌'}</span>
                        <span>{message}</span>
                      </li>
                    );
                  })}
                </ul>
              </FormHelperText>
            )}
          </Stack>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item>
                <Box sx={{ width: 85, height: 8, borderRadius: '7px' }} />
              </Grid>
              <Grid item></Grid>
            </Grid>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Stack spacing={1}>
            <InputLabel htmlFor="confirm-password-reset">Confirm Password</InputLabel>
            <Controller
              name="confirmPassword"
              control={control}
              render={({ field }) => (
                <OutlinedInput
                  {...field}
                  fullWidth
                  error={!!errors.confirmPassword}
                  id="confirmPassword"
                  type="password"
                  {...field}
                  placeholder="Enter confirm password"
                />
              )}
            />
            {!!errors.confirmPassword && (
              <FormHelperText error id="helper-text-confirm-password-reset">
                {errors.confirmPassword.message}
              </FormHelperText>
            )}
          </Stack>
        </Grid>
        {formErrorMessage && (
          <Grid item xs={12}>
            <FormHelperText error>{formErrorMessage}</FormHelperText>
          </Grid>
        )}
        <Grid item xs={12}>
          <AnimateButton>
            <Button
              disableElevation
              disabled={isSubmitting}
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              color="primary"
            >
              Reset Password
            </Button>
          </AnimateButton>
        </Grid>
      </Grid>
    </form>
  );
};

export default AuthUpdatePassword;
