// material-ui
import { CardMedia, FormControlLabel, Radio, RadioGroup, Stack } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// project-imports
import { useAppDispatch, useAppSelector } from '../../hooks/rtkHooks';
import MainCard from '../MainCard';

// assets
import { saveConfigToLocalStorage } from '@renderer/store/reducers/configSlice';
import Caption from '../../assets/images/customization/caption.svg';
import NoCaption from '../../assets/images/customization/no-caption.svg';

// ==============================|| CUSTOMIZATION - MODE ||============================== //

const MenuCaption = () => {
  const theme = useTheme();
  const { menuCaption } = useAppSelector((state) => state.config.config);
  const dispatch = useAppDispatch();
  const handleMenuCaptionChange = () => {
    dispatch(saveConfigToLocalStorage({ key: 'menuCaption', value: !menuCaption }));
  };

  return (
    <RadioGroup
      row
      aria-label="payment-card"
      name="payment-card"
      value={menuCaption ? 'caption' : 'default'}
      onChange={handleMenuCaptionChange}
    >
      <Stack direction="row" alignItems="center" spacing={2.5} sx={{ width: '100%' }}>
        <FormControlLabel
          control={<Radio value="caption" sx={{ display: 'none' }} />}
          sx={{ width: '100%', m: 0, display: 'flex', '& .MuiFormControlLabel-label': { flex: 1 } }}
          label={
            <MainCard
              content={false}
              sx={{
                borderWidth: 2,
                p: 1,
                ...(menuCaption && { borderColor: theme.palette.primary.main }),
              }}
            >
              <Stack direction="row" alignItems="center" justifyContent="center">
                <CardMedia component="img" src={Caption} alt="Caption" />
              </Stack>
            </MainCard>
          }
        />
        <FormControlLabel
          control={<Radio value="default" sx={{ display: 'none' }} />}
          sx={{ width: '100%', m: 0, display: 'flex', '& .MuiFormControlLabel-label': { flex: 1 } }}
          label={
            <MainCard
              content={false}
              sx={{
                borderWidth: 2,
                p: 1,
                ...(!menuCaption && { borderColor: theme.palette.primary.main }),
              }}
            >
              <Stack direction="row" alignItems="center" justifyContent="center">
                <CardMedia component="img" src={NoCaption} alt="NoCaption" />
              </Stack>
            </MainCard>
          }
        />
      </Stack>
    </RadioGroup>
  );
};

export default MenuCaption;
