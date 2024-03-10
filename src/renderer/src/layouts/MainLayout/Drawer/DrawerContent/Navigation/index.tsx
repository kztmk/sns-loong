import { useEffect, useLayoutEffect, useState } from 'react';

// material-ui
import { Box, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// project-imports
import menuItem from '../../../../../menu-items';
import Menu from '../../../../../menu-items/dashboard';
import NavGroup from './NavGroup';

import { HORIZONTAL_MAX_ITEM } from '../../../../../config';
import { useAppSelector } from '../../../../../hooks/rtkHooks';
// types
import { MenuOrientation } from '../../../../../types/config';
import { NavItemType } from '../../../../../types/menu';

// ==============================|| DRAWER CONTENT - NAVIGATION ||============================== //

const Navigation = () => {
  const theme = useTheme();

  const downLG = useMediaQuery(theme.breakpoints.down('lg'));

  const { menuOrientation } = useAppSelector((state) => state.config.config);
  const { drawerOpen } = useAppSelector((state) => state.menu);

  const [selectedItems, setSelectedItems] = useState<string | undefined>('');
  const [selectedLevel, setSelectedLevel] = useState<number>(0);
  const [menuItems, setMenuItems] = useState<{ items: NavItemType[] }>({ items: [] });

  useLayoutEffect(() => {
    setMenuItems(menuItem);
    // eslint-disable-next-line
  }, [menuItem]);

  const getMenu = Menu();
  const handlerMenuItem = () => {
    const isFound = menuItems.items.some((element) => {
      if (element.id === 'group-dashboard') {
        return true;
      }
      return false;
    });

    if (getMenu?.id !== undefined && !isFound) {
      menuItems.items.splice(0, 0, getMenu);
      setMenuItems(menuItems);
    }
  };

  useEffect(() => {
    handlerMenuItem();
    // eslint-disable-next-line
  }, []);

  const isHorizontal = menuOrientation === MenuOrientation.HORIZONTAL && !downLG;

  const lastItem = isHorizontal ? HORIZONTAL_MAX_ITEM : null;
  let lastItemIndex = menuItems.items.length - 1;
  let remItems: NavItemType[] = [];
  let lastItemId: string;

  if (lastItem && lastItem < menuItems.items.length) {
    lastItemId = menuItems.items[lastItem - 1].id!;
    lastItemIndex = lastItem - 1;
    remItems = menuItems.items.slice(lastItem - 1, menuItems.items.length).map((item) => ({
      title: item.title,
      elements: item.children,
      icon: item.icon,
    }));
  }

  const navGroups = menuItems.items.slice(0, lastItemIndex + 1).map((item) => {
    switch (item.type) {
      case 'group':
        return (
          <NavGroup
            key={item.id}
            setSelectedItems={setSelectedItems}
            setSelectedLevel={setSelectedLevel}
            selectedLevel={selectedLevel}
            selectedItems={selectedItems}
            lastItem={lastItem!}
            remItems={remItems}
            lastItemId={lastItemId}
            item={item}
          />
        );
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">
            Fix - Navigation Group
          </Typography>
        );
    }
  });
  return (
    <Box
      sx={{
        // eslint-disable-next-line no-nested-ternary
        pt: drawerOpen ? (isHorizontal ? 0 : 2) : 0,
        '& > ul:first-of-type': { mt: 0 },
        display: isHorizontal ? { xs: 'block', lg: 'flex' } : 'block',
      }}
    >
      {navGroups}
    </Box>
  );
};

export default Navigation;
