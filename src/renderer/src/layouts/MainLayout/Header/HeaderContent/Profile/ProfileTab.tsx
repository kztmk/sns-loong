import { MouseEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// material-ui
import { Dialog, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

// assets
import { Card, Edit2, Logout, Profile, Profile2User } from 'iconsax-react';
import { useAppDispatch } from '../../../../../hooks/rtkHooks';
import AboutCard from '../../../../../sections/dialog/about';
import { signOut } from '../../../../../store/reducers/authSlice';
// ==============================|| HEADER PROFILE - PROFILE TAB ||============================== //
interface Props {
  handleParentClose: () => void;
}

const ProfileTab = ({ handleParentClose }: Props) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseWithParent = () => {
    setOpen(false);
    handleParentClose();
  };
  const [selectedIndex, setSelectedIndex] = useState(0);
  const handleListItemClick = (_event: MouseEvent<HTMLDivElement>, index: number) => {
    switch (index) {
      case 0:
        navigate('/profiles/personal');
        handleParentClose();
        break;
      case 1:
        console.log('select 1');
        handleParentClose();
        break;
      case 4:
        setOpen(true);
        break;
      default:
        setSelectedIndex(index);
        handleParentClose();
        break;
    }
  };

  const handleSignout = () => {
    dispatch(signOut());
  };

  return (
    <>
      <List component="nav" sx={{ p: 0, '& .MuiListItemIcon-root': { minWidth: 32 } }}>
        <ListItemButton
          selected={selectedIndex === 0}
          onClick={(event: MouseEvent<HTMLDivElement>) => handleListItemClick(event, 0)}
        >
          <ListItemIcon>
            <Edit2 variant="Bulk" size={18} />
          </ListItemIcon>
          <ListItemText primary="Edit Profile" />
        </ListItemButton>
        <ListItemButton
          selected={selectedIndex === 1}
          onClick={(event: MouseEvent<HTMLDivElement>) => handleListItemClick(event, 1)}
        >
          <ListItemIcon>
            <Profile variant="Bulk" size={18} />
          </ListItemIcon>
          <ListItemText primary="View Profile" />
        </ListItemButton>

        <ListItemButton
          selected={selectedIndex === 3}
          onClick={(event: MouseEvent<HTMLDivElement>) => handleListItemClick(event, 3)}
        >
          <ListItemIcon>
            <Profile2User variant="Bulk" size={18} />
          </ListItemIcon>
          <ListItemText primary="Social Profile" />
        </ListItemButton>
        <ListItemButton
          selected={selectedIndex === 4}
          onClick={(event: MouseEvent<HTMLDivElement>) => handleListItemClick(event, 4)}
        >
          <ListItemIcon>
            <Card variant="Bulk" size={18} />
          </ListItemIcon>
          <ListItemText primary="about" />
        </ListItemButton>
        <ListItemButton selected={selectedIndex === 2} onClick={handleSignout}>
          <ListItemIcon>
            <Logout variant="Bulk" size={18} />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItemButton>
      </List>
      <Dialog open={open} onClose={handleClose}>
        <AboutCard handleClose={handleCloseWithParent} />
      </Dialog>
    </>
  );
};

export default ProfileTab;
