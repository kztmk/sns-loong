import { ChangeEvent } from 'react';

// material-ui
import { FormControlLabel, Radio, RadioGroup, Stack } from '@mui/material';
import { useTheme } from '@mui/material/styles';
// assets
import { Moon, Setting2, Sun1 } from 'iconsax-react';
// project-imports
import { useAppDispatch, useAppSelector } from '../../hooks/rtkHooks';
import MainCard from '../MainCard';

// types
import { saveConfigToLocalStorage } from '../../store/reducers/configSlice';
import { ThemeMode } from '../../types/config';

// ==============================|| CUSTOMIZATION - MODE ||============================== //

const ThemeModeLayout = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const { mode } = useAppSelector((state) => state.config.config);

  const handleModeChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(saveConfigToLocalStorage({ key: 'mode', value: event.target.value as ThemeMode }));
  };

  return (
    <RadioGroup
      row
      aria-label="payment-card"
      name="payment-card"
      value={mode}
      onChange={handleModeChange}
    >
      <Stack direction="row" alignItems="center" spacing={2.5} sx={{ width: '100%' }}>
        <FormControlLabel
          control={<Radio value={ThemeMode.LIGHT} sx={{ display: 'none' }} />}
          sx={{
            width: '100%',
            height: 60,
            m: 0,
            display: 'flex',
            '& .MuiFormControlLabel-label': { flex: 1 },
          }}
          label={
            <MainCard
              content={false}
              sx={{
                borderWidth: 2,
                p: 1,
                ...(theme.palette.mode === ThemeMode.LIGHT && {
                  borderColor: theme.palette.primary.main,
                }),
              }}
            >
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="center"
                sx={{ height: 44 }}
              >
                <Sun1 variant="Bold" color={theme.palette.warning.main} />
              </Stack>
            </MainCard>
          }
        />
        <FormControlLabel
          control={<Radio value={ThemeMode.DARK} sx={{ display: 'none' }} />}
          sx={{
            width: '100%',
            height: 60,
            m: 0,
            display: 'flex',
            '& .MuiFormControlLabel-label': { flex: 1 },
          }}
          label={
            <MainCard
              content={false}
              sx={{
                borderWidth: 2,
                p: 1,
                ...(theme.palette.mode === ThemeMode.DARK && {
                  borderColor: theme.palette.primary.main,
                }),
              }}
            >
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="center"
                sx={{ height: 44 }}
              >
                <Moon variant="Bold" />
              </Stack>
            </MainCard>
          }
        />
        <FormControlLabel
          control={<Radio value={ThemeMode.AUTO} sx={{ display: 'none' }} />}
          sx={{
            width: '100%',
            height: 60,
            m: 0,
            display: 'flex',
            '& .MuiFormControlLabel-label': { flex: 1 },
          }}
          label={
            <MainCard
              content={false}
              sx={{
                borderWidth: 2,
                p: 1,
                ...(mode === ThemeMode.AUTO && { borderColor: theme.palette.primary.main }),
              }}
            >
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="center"
                sx={{ height: 44 }}
              >
                <Setting2 variant="Bold" />
              </Stack>
            </MainCard>
          }
        />
      </Stack>
    </RadioGroup>
  );
};

export default ThemeModeLayout;
