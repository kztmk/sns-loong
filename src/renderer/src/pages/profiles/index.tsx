import { SyntheticEvent, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

// material-ui
import { Box, Tab, Tabs } from '@mui/material';

// project-imports
import MainCard from '../../components/MainCard';

// assets
import { DocumentText, Lock, Setting3 } from 'iconsax-react';

// ==============================|| PROFILE - ACCOUNT ||============================== //

const AccountProfile = () => {
  const { pathname } = useLocation();

  let selectedTab = 0;
  switch (pathname) {
    case '/profiles/password':
      selectedTab = 1;
      break;
    case '/profiles/settings':
      selectedTab = 2;
      break;
    case '/profiles/personal':
    default:
      selectedTab = 0;
  }

  const [value, setValue] = useState(selectedTab);

  const handleChange = (_event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <MainCard border={false} contentSX={{ paddingTop: '0px' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', width: '100%' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="account profile tab"
        >
          <Tab
            label="Personal"
            component={Link}
            to="/profiles/personal"
            icon={<DocumentText />}
            iconPosition="start"
          />
          <Tab
            label="Change Password"
            component={Link}
            to="/profiles/password"
            icon={<Lock />}
            iconPosition="start"
          />
          <Tab
            label="Settings"
            component={Link}
            to="/profiles/settings"
            icon={<Setting3 />}
            iconPosition="start"
          />
        </Tabs>
      </Box>
      <Box sx={{ mt: 2.5 }}>
        <Outlet />
      </Box>
    </MainCard>
  );
};

export default AccountProfile;
