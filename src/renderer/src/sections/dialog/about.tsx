import { useEffect, useState } from 'react';
// material-ui
import { Box, CardContent, CardMedia, Divider, Grid, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
// types

// project-imports
import IconButton from '../../components/@extended/IconButton';
import MainCard from '../../components/MainCard';

// assets
import { Add } from 'iconsax-react';
import productIcon from '../../assets/images/sns-loogn-icon.png';
// ==============================|| PRODUCT CARD ||============================== //
interface Props {
  handleClose: () => void;
}

const AboutCard = ({ handleClose }: Props) => {
  const theme = useTheme();
  const [version, setVersion] = useState('');

  useEffect(() => {
    const fetchVersion = async () => {
      const version = await window.electronAPI.getVersion();
      setVersion(`Version:${version}`);
    };

    fetchVersion();
  }, []);

  return (
    <MainCard
      content={false}
      sx={{
        '&:hover': {
          transform: 'scale3d(1.02, 1.02, 1)',
          transition: 'all .4s ease-in-out',
        },
      }}
    >
      <Grid
        container
        spacing={2}
        justifyContent="space-between"
        alignItems="center"
        sx={{ borderBottom: `1px solid ${theme.palette.divider}` }}
      >
        <Grid item>
          <Typography
            color="textPrimary"
            variant="h5"
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              display: 'block',
              textDecoration: 'none',
              paddingLeft: '1em',
            }}
          >
            SNS-Loong
          </Typography>
        </Grid>
        <Grid item sx={{ mr: 1.5 }}>
          <IconButton color="secondary" onClick={handleClose}>
            <Add style={{ transform: 'rotate(45deg)' }} />
          </IconButton>
        </Grid>
      </Grid>
      <Box sx={{ width: 250, m: 'auto' }}>
        <CardMedia sx={{ height: 250, textDecoration: 'none' }} image={productIcon} />
      </Box>
      <Divider />
      <CardContent sx={{ p: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6" color="textSecondary">
              {version}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" color="textSecondary">
              © 2024 Imakita Industory
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </MainCard>
  );
};

export default AboutCard;
