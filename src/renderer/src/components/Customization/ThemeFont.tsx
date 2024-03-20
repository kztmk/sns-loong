import { ChangeEvent } from 'react';
import { v4 as uuidv4 } from 'uuid';
// material-ui
import { Box, FormControlLabel, Grid, Radio, RadioGroup, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// project-imports
import { HEADER_HEIGHT } from '../../config';
import { useAppDispatch, useAppSelector } from '../../hooks/rtkHooks';
import MainCard from '../MainCard';

import { saveConfigToLocalStorage } from '../../store/reducers/configSlice';
import { FontFamily } from '../../types/config';

// ==============================|| CUSTOMIZATION - FONT FAMILY ||============================== //

const ThemeFont = () => {
  const theme = useTheme();

  const { fontFamily } = useAppSelector((state) => state.config.config);
  const dispatch = useAppDispatch();

  const handleFontChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(
      saveConfigToLocalStorage({ key: 'fontFamily', value: event.target.value as FontFamily })
    );
  };

  const fonts = [
    {
      id: 'inter',
      value: `'Inter', sans-serif`,
      label: 'Inter',
    },
    {
      id: 'roboto',
      value: `'Roboto', sans-serif`,
      label: 'Roboto',
    },
    {
      id: 'poppins',
      value: `'Poppins', sans-serif`,
      label: 'Poppins',
    },
    {
      id: 'public-sans',
      value: `'Public Sans', sans-serif`,
      label: 'Public Sans',
    },
  ];

  return (
    <RadioGroup
      row
      aria-label="payment-card"
      name="payment-card"
      value={fontFamily}
      onChange={handleFontChange}
    >
      <Grid container spacing={1.75} sx={{ ml: 0 }}>
        {fonts.map((item) => (
          <Grid item key={uuidv4()}>
            <FormControlLabel
              control={<Radio value={item.value} sx={{ display: 'none' }} />}
              sx={{ display: 'flex', '& .MuiFormControlLabel-label': { flex: 1 } }}
              label={
                <MainCard
                  content={false}
                  sx={{
                    bgcolor: fontFamily === item.value ? 'primary.lighter' : 'secondary.lighter',
                    p: 1,
                  }}
                  border={false}
                  {...(fontFamily === item.value && {
                    boxShadow: true,
                    shadow: theme.customShadows.primary,
                  })}
                >
                  <Box
                    sx={{
                      minWidth: HEADER_HEIGHT,
                      bgcolor: 'background.paper',
                      p: 1,
                      '&:hover': { bgcolor: 'background.paper' },
                    }}
                  >
                    <Stack spacing={0.5} alignItems="center">
                      <Typography variant="h5" color="textPrimary" sx={{ fontFamily: item.value }}>
                        Aa
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        {item.label}
                      </Typography>
                    </Stack>
                  </Box>
                </MainCard>
              }
            />
          </Grid>
        ))}
      </Grid>
    </RadioGroup>
  );
};

export default ThemeFont;
