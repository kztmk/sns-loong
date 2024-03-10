// material-ui
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// project-imports
import DrawerHeaderStyled from './DrawerHeaderStyled';

import Logo from '../../../../components/logo';
import { DRAWER_WIDTH, HEADER_HEIGHT } from '../../../../config';
import { useAppSelector } from '../../../../hooks/rtkHooks';
// types
import { MenuOrientation } from '../../../../types/config';

// ==============================|| DRAWER HEADER ||============================== //

interface Props {
  open: boolean;
}

const DrawerHeader = ({ open }: Props) => {
  const theme = useTheme();
  const downLG = useMediaQuery(theme.breakpoints.down('lg'));

  const { menuOrientation } = useAppSelector((state) => state.config.config);
  const isHorizontal = menuOrientation === MenuOrientation.HORIZONTAL && !downLG;

  return (
    <DrawerHeaderStyled
      theme={theme}
      open={open}
      sx={{
        minHeight: isHorizontal ? 'unset' : HEADER_HEIGHT,
        width: isHorizontal ? { xs: '100%', lg: DRAWER_WIDTH + 50 } : 'inherit',
        paddingTop: isHorizontal ? { xs: '10px', lg: '0' } : '8px',
        paddingBottom: isHorizontal ? { xs: '18px', lg: '0' } : '8px',
        // eslint-disable-next-line no-nested-ternary
        paddingLeft: isHorizontal ? { xs: '24px', lg: '0' } : open ? '24px' : 0,
      }}
    >
      <Logo isIcon={!open} sx={{ width: open ? 'auto' : 52, height: 'auto' }} />
    </DrawerHeaderStyled>
  );
};

export default DrawerHeader;
