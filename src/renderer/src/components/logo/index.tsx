import { To } from 'history';
import { Link } from 'react-router-dom';

// material-ui
import { ButtonBase } from '@mui/material';
import { SxProps } from '@mui/system';

// project-imports
import { APP_DEFAULT_PATH } from '../../config';
import LogoIcon from './LogoIcon';
import Logo from './LogoMain';

// ==============================|| MAIN LOGO ||============================== //

interface Props {
  reverse?: boolean;
  isIcon?: boolean;
  sx?: SxProps;
  to?: To;
}

const LogoSection = ({ reverse, isIcon, sx, to }: Props) => (
  <ButtonBase disableRipple component={Link} to={!to ? APP_DEFAULT_PATH : to} sx={sx}>
    {isIcon ? <LogoIcon /> : <Logo reverse={reverse} />}
  </ButtonBase>
);

export default LogoSection;
