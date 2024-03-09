// material-ui
import { FormControlLabel, Radio, RadioGroup, Stack } from '@mui/material';
import { useTheme } from '@mui/material/styles';
// assets
import { Mask } from 'iconsax-react';
// project-imports
import { saveConfigToLocalStorage } from '@renderer/store/reducers/configSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/rtkHooks';
import MainCard from '../MainCard';

// ==============================|| CUSTOMIZATION - MODE ||============================== //

const ThemeContrast = () => {
  const theme = useTheme();
  const { themeContrast } = useAppSelector((state) => state.config.config);
  const dispatch = useAppDispatch();

  const handleContrastChange = () => {
    dispatch(saveConfigToLocalStorage({ key: 'themeContrast', value: !themeContrast }));
  };

  return (
    <RadioGroup
      row
      aria-label="payment-card"
      name="payment-card"
      value={themeContrast ? 'contrast' : 'default'}
      onChange={handleContrastChange}
    >
      <Stack direction="row" alignItems="center" spacing={2.5} sx={{ width: '100%' }}>
        <FormControlLabel
          control={<Radio value="contrast" sx={{ display: 'none' }} />}
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
                ...(themeContrast && { borderColor: theme.palette.primary.main }),
              }}
            >
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="center"
                sx={{ height: 44 }}
              >
                <Mask variant="Bold" />
              </Stack>
            </MainCard>
          }
        />
        <FormControlLabel
          control={<Radio value="default" sx={{ display: 'none' }} />}
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
                ...(!themeContrast && { borderColor: theme.palette.primary.main }),
              }}
            >
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="center"
                sx={{ height: 44 }}
              >
                <Mask />
              </Stack>
            </MainCard>
          }
        />
      </Stack>
    </RadioGroup>
  );
};

export default ThemeContrast;
