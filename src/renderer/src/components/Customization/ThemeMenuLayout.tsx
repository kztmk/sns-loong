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
import { openDrawer } from '../../store/reducers/menuSlice';
import MainCard from '../MainCard';

// assets
import horizontalLayout from '../../assets/images/customization/horizontal.svg';
import defaultLayout from '../../assets/images/customization/vertical.svg';

// types
import { saveConfigToLocalStorage } from '@renderer/store/reducers/configSlice';
import { MenuOrientation } from '../../types/config';

// ==============================|| CUSTOMIZATION - CONTAINER ||============================== //

const ThemeMenuLayout = () => {
  const theme = useTheme();
  const downLG = useMediaQuery(theme.breakpoints.down('lg'));

  const { menuOrientation, miniDrawer } = useAppSelector((state) => state.config.config);
  const isHorizontal = menuOrientation === MenuOrientation.HORIZONTAL;

  const dispatch = useAppDispatch();
  console.log(`menuOrientation:${menuOrientation === MenuOrientation.HORIZONTAL}`);
  console.log(`downLG:${downLG}`);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleContainerChange = (e: any) => {
    console.log(`menuLayout:${miniDrawer}:${menuOrientation}:${e.target.value}:${isHorizontal}`);
    // dispatch(saveConfigToLocalStorage({ key: 'miniDrawer', value: true }));
    dispatch(saveConfigToLocalStorage({ key: 'menuOrientation', value: e.target.value }));
    dispatch(openDrawer(e.target.value !== MenuOrientation.HORIZONTAL));
  };

  return (
    <RadioGroup
      row
      aria-label="payment-card"
      name="payment-card"
      value={menuOrientation}
      onChange={handleContainerChange}
    >
      <Stack direction="row" alignItems="center" spacing={2.5} sx={{ width: '100%' }}>
        <FormControlLabel
          control={<Radio value={MenuOrientation.VERTICAL} sx={{ display: 'none' }} />}
          sx={{ width: '100%', m: 0, display: 'flex', '& .MuiFormControlLabel-label': { flex: 1 } }}
          label={
            <MainCard
              content={false}
              sx={{
                borderWidth: 2,
                p: 1,
                ...(!isHorizontal && { borderColor: theme.palette.primary.main }),
              }}
            >
              <Stack direction="row" alignItems="center" justifyContent="center">
                <CardMedia component="img" src={defaultLayout} alt="defaultLayout" />
              </Stack>
            </MainCard>
          }
        />
        <FormControlLabel
          control={<Radio value={MenuOrientation.HORIZONTAL} sx={{ display: 'none' }} />}
          sx={{ width: '100%', m: 0, display: 'flex', '& .MuiFormControlLabel-label': { flex: 1 } }}
          label={
            <MainCard
              content={false}
              sx={{
                borderWidth: 2,
                p: 1,
                ...(isHorizontal && { borderColor: theme.palette.primary.main }),
              }}
            >
              <Stack direction="row" alignItems="center" justifyContent="center">
                <CardMedia component="img" src={horizontalLayout} alt="defaultLayout" />
              </Stack>
            </MainCard>
          }
        />
      </Stack>
    </RadioGroup>
  );
};

export default ThemeMenuLayout;
