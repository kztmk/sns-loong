import { ReactNode } from 'react';

// material-ui
import { styled } from '@mui/material/styles';

// third-party
import { SnackbarProvider } from 'notistack';
// assets
import { CloseCircle, InfoCircle, TickCircle, Warning2 } from 'iconsax-react';

// project-imports
import { useAppSelector } from '../../hooks/rtkHooks';

// custom styles
const StyledSnackbarProvider = styled(SnackbarProvider)(({ theme }) => ({
  '&.notistack-MuiContent-default': {
    backgroundColor: theme.palette.primary.main,
  },
  '&.notistack-MuiContent-error': {
    backgroundColor: theme.palette.error.main,
  },
  '&.notistack-MuiContent-success': {
    backgroundColor: theme.palette.success.main,
  },
  '&.notistack-MuiContent-info': {
    backgroundColor: theme.palette.info.main,
  },
  '&.notistack-MuiContent-warning': {
    backgroundColor: theme.palette.warning.main,
  },
}));

// ===========================|| SNACKBAR - NOTISTACK ||=========================== //

const Notistack = ({ children }: { children: ReactNode }) => {
  const snackbar = useAppSelector((state) => state.snackbar);
  const iconSX = { marginRight: 8, fontSize: '1.15rem' };

  return (
    <StyledSnackbarProvider
      maxSnack={snackbar.maxStack}
      dense={snackbar.dense}
      iconVariant={
        snackbar.iconVariant === 'useemojis'
          ? {
              success: <TickCircle style={iconSX} />,
              error: <CloseCircle style={iconSX} />,
              warning: <Warning2 style={iconSX} />,
              info: <InfoCircle style={iconSX} />,
            }
          : undefined
      }
      hideIconVariant={snackbar.iconVariant === 'hide'}
    >
      {children}
    </StyledSnackbarProvider>
  );
};

export default Notistack;
