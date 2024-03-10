// material-ui
import { Box, useMediaQuery } from '@mui/material';
import { Theme } from '@mui/material/styles';

// project-imports
import { useAppSelector } from '../../../../hooks/rtkHooks';

import Message from './Message';
import Profile from './Profile';

import DrawerHeader from '../../Drawer/DrawerHeader';

// type
import { MenuOrientation } from '../../../../types/config';

// ==============================|| HEADER - CONTENT ||============================== //

const HeaderContent = () => {
  const { menuOrientation } = useAppSelector((state) => state.config.config);

  const downLG = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'));

  return (
    <>
      {menuOrientation === MenuOrientation.HORIZONTAL && !downLG && <DrawerHeader open />}
      {downLG && <Box sx={{ width: '100%', ml: 1 }} />}

      <Message />
      <Profile />
    </>
  );
};

export default HeaderContent;
