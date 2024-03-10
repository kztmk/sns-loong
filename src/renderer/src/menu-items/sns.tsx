import { FormattedMessage } from 'react-intl';

import { NavItemType } from '../types/menu';

import { TagUser, Xrp } from 'iconsax-react';

const icons = {
  sns: TagUser,
  x: Xrp,
};

const sns: NavItemType = {
  id: 'group-sns',
  title: <FormattedMessage id="sns" defaultMessage="SNS" description="Sns group menu title" />,
  icon: icons.sns,
  type: 'group',
  children: [
    {
      id: 'x',
      title: <FormattedMessage id="x" defaultMessage="X" description="X menu title" />,
      type: 'item',
      url: '/sns/x',
      icon: icons.x,
    },
  ],
};

export default sns;
