import { ChangeEvent, useState } from 'react';

// material-ui
import {
  CardMedia,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

// project-imports
import { useAppDispatch, useAppSelector } from '../../hooks/rtkHooks';
import { saveConfigToLocalStorage } from '../../store/reducers/configSlice';
import { openDrawer } from '../../store/reducers/menuSlice';
import MainCard from '../MainCard';

// assets
import defaultLayout from '../../assets/images/customization/ltr.svg';
import miniMenu from '../../assets/images/customization/mini-menu.svg';
import rtlLayout from '../../assets/images/customization/rtl.svg';

// types
import { MenuOrientation, ThemeDirection } from '../../types/config';

// ==============================|| CUSTOMIZATION - LAYOUT ||============================== //

const ThemeLayout = () => {
  const theme = useTheme();
  const downLG = useMediaQuery(theme.breakpoints.down('lg'));

  const dispatch = useAppDispatch();
  const { miniDrawer, themeDirection, menuOrientation } = useAppSelector(
    (state) => state.config.config
  );
  const { drawerOpen } = useAppSelector((state) => state.menu);

  let initialTheme = 'default';
  if (miniDrawer === true) initialTheme = 'mini';
  if (themeDirection === ThemeDirection.RTL) initialTheme = 'rtl';

  const [value, setValue] = useState<string | null>(initialTheme);
  const handleRadioChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setValue(newValue);
    if (newValue === 'default') {
      if (themeDirection === ThemeDirection.RTL) {
        dispatch(saveConfigToLocalStorage({ key: 'themeDirection', value: ThemeDirection.LTR }));
      }
      if (miniDrawer === true) {
        dispatch(saveConfigToLocalStorage({ key: 'miniDrawer', value: false }));
      }
      if (!drawerOpen) {
        dispatch(openDrawer(true));
      }
    }
    if (newValue === 'mini') {
      dispatch(saveConfigToLocalStorage({ key: 'miniDrawer', value: true }));
      if (drawerOpen) {
        dispatch(openDrawer(false));
      }
    }
    if (newValue === ThemeDirection.RTL) {
      dispatch(saveConfigToLocalStorage({ key: 'themeDirection', value: ThemeDirection.RTL }));
    }
  };

  return (
    <RadioGroup
      row
      aria-label="payment-card"
      name="payment-card"
      value={value}
      onChange={handleRadioChange}
    >
      <Stack direction="row" alignItems="center" spacing={2.5} sx={{ width: '100%' }}>
        <FormControlLabel
          control={<Radio value="default" sx={{ display: 'none' }} />}
          sx={{ width: '100%', m: 0, display: 'flex', '& .MuiFormControlLabel-label': { flex: 1 } }}
          label={
            <MainCard
              content={false}
              sx={{
                borderWidth: 2,
                p: 1,
                ...(value === 'default' && { borderColor: theme.palette.primary.main }),
              }}
            >
              <Stack direction="row" alignItems="center" justifyContent="center">
                <CardMedia component="img" src={defaultLayout} alt="defaultLayout" />
              </Stack>
            </MainCard>
          }
        />
        {(menuOrientation === MenuOrientation.VERTICAL || downLG) && (
          <FormControlLabel
            control={<Radio value="mini" sx={{ display: 'none' }} />}
            sx={{
              width: '100%',
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
                  ...(value === 'mini' && { borderColor: theme.palette.primary.main }),
                }}
              >
                <Stack direction="row" alignItems="center" justifyContent="center">
                  <CardMedia component="img" src={miniMenu} alt="miniMenu" />
                </Stack>
              </MainCard>
            }
          />
        )}
        <FormControlLabel
          control={<Radio value={ThemeDirection.RTL} sx={{ display: 'none' }} />}
          sx={{ width: '100%', m: 0, display: 'flex', '& .MuiFormControlLabel-label': { flex: 1 } }}
          label={
            <MainCard
              content={false}
              sx={{
                borderWidth: 2,
                p: 1,
                ...(value === ThemeDirection.RTL && { borderColor: theme.palette.primary.main }),
              }}
            >
              <Stack direction="row" alignItems="center" justifyContent="center">
                <CardMedia component="img" src={rtlLayout} alt="rtlLayout" />
              </Stack>
            </MainCard>
          }
        />
      </Stack>
    </RadioGroup>
  );
};

export default ThemeLayout;
