// third-party
import { FormattedMessage } from 'react-intl';

// project-imports
import { useAppSelector } from '../hooks/rtkHooks';

// type
import { Box1, Home3, HomeTrendUp } from 'iconsax-react';
import { NavItemType } from '../types/menu';

const icons = {
  navigation: Home3,
  dashboard: HomeTrendUp,
  components: Box1,
};

// ==============================|| MENU ITEMS - API ||============================== //

const Menu = () => {
  const { menu } = useAppSelector((state) => state.menu);

  const SubChildrenLis = (SubChildrenLis: NavItemType[]) => {
    return SubChildrenLis?.map((subList: NavItemType) => {
      return {
        ...subList,
        title: <FormattedMessage id={`${subList.title}`} />,
        // @ts-ignore
        icon: icons[subList.icon],
      };
    });
  };

  const itemList = (subList: NavItemType) => {
    let list: NavItemType = {
      ...subList,
      title: <FormattedMessage id={`${subList.title}`} />,
      // @ts-ignore
      icon: icons[subList.icon],
    };

    if (subList.type === 'collapse') {
      list.children = SubChildrenLis(subList.children!);
    }
    return list;
  };

  const withoutMenu = menu?.children?.filter((item: NavItemType) => item.id !== 'no-menu');
  const ChildrenList: NavItemType[] | undefined = withoutMenu?.map((subList: NavItemType) => {
    return itemList(subList);
  });

  const menuList: NavItemType = {
    ...menu,
    title: <FormattedMessage id={`${menu.title}`} />,
    // @ts-ignore
    icon: icons[menu.icon],
    children: ChildrenList,
  };

  return menuList;
};

export default Menu;
