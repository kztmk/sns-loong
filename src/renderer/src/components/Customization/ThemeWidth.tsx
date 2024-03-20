// material-ui
import { CardMedia, FormControlLabel, Radio, RadioGroup, Stack } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// project-imports
import { useAppDispatch, useAppSelector } from '../../hooks/rtkHooks';
import MainCard from '../MainCard';

// assets
import containerLayout from '../../assets/images/customization/container.svg';
import defaultLayout from '../../assets/images/customization/fluid.svg';
import { saveConfigToLocalStorage } from '../../store/reducers/configSlice';

// ==============================|| CUSTOMIZATION - CONTAINER ||============================== //

const ThemeWidth = () => {
  const theme = useTheme();

  const { container } = useAppSelector((state) => state.config.config);
  const dispatch = useAppDispatch();
  const handleContainerChange = () => {
    dispatch(saveConfigToLocalStorage({ key: 'container', value: !container }));
  };

  return (
    <RadioGroup
      row
      aria-label="payment-card"
      name="payment-card"
      value={container ? 'container' : 'fluid'}
      onChange={handleContainerChange}
    >
      <Stack direction="row" alignItems="center" spacing={2.5} sx={{ width: '100%' }}>
        <FormControlLabel
          control={<Radio value="fluid" sx={{ display: 'none' }} />}
          sx={{ width: '100%', m: 0, display: 'flex', '& .MuiFormControlLabel-label': { flex: 1 } }}
          label={
            <MainCard
              content={false}
              sx={{
                borderWidth: 2,
                p: 1,
                ...(!container && { borderColor: theme.palette.primary.main }),
              }}
            >
              <Stack direction="row" alignItems="center" justifyContent="center">
                <CardMedia component="img" src={defaultLayout} alt="defaultLayout" />
              </Stack>
            </MainCard>
          }
        />
        <FormControlLabel
          control={<Radio value="container" sx={{ display: 'none' }} />}
          sx={{ width: '100%', m: 0, display: 'flex', '& .MuiFormControlLabel-label': { flex: 1 } }}
          label={
            <MainCard
              content={false}
              sx={{
                borderWidth: 2,
                p: 1,
                ...(container && { borderColor: theme.palette.primary.main }),
              }}
            >
              <Stack direction="row" alignItems="center" justifyContent="center">
                <CardMedia component="img" src={containerLayout} alt="defaultLayout" />
              </Stack>
            </MainCard>
          }
        />
      </Stack>
    </RadioGroup>
  );
};

export default ThemeWidth;
