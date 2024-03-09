import { ReactNode, useEffect, useMemo } from 'react';

// material-ui
import { CssBaseline, StyledEngineProvider } from '@mui/material';
import {
  Theme,
  ThemeOptions,
  ThemeProvider,
  TypographyVariantsOptions,
  createTheme,
} from '@mui/material/styles';

// project-imports

import { HEADER_HEIGHT } from '../config';
import { useAppDispatch, useAppSelector } from '../hooks/rtkHooks';
import { getConfigFromLocalStorage } from '../store/reducers/configSlice';
import getWindowScheme from '../utils/getWindowScheme';

// types
import { ThemeMode } from '../types/config';
import { CustomShadowProps } from '../types/theme';
import componentsOverride from './overrides';
import Palette from './palette';
import CustomShadows from './shadows';
import Typography from './typography';

// types
type ThemeCustomizationProps = {
  children: ReactNode;
};

// ==============================|| DEFAULT THEME - MAIN  ||============================== //

const ThemeCustomization = ({ children }: ThemeCustomizationProps) => {
  const dispatch = useAppDispatch();
  const { themeDirection, mode, presetColor, fontFamily, themeContrast } = useAppSelector(
    (state) => state.config.config
  );
  let themeMode = mode;
  if (themeMode === ThemeMode.AUTO) {
    const autoMode = getWindowScheme();
    if (autoMode) {
      themeMode = ThemeMode.DARK;
    } else {
      themeMode = ThemeMode.LIGHT;
    }
  }

  useEffect(() => {
    dispatch(getConfigFromLocalStorage());
  }, [themeDirection, mode, presetColor, fontFamily, themeContrast]);

  const theme: Theme = useMemo<Theme>(
    () => Palette(themeMode, presetColor, themeContrast),
    [themeMode, presetColor, themeContrast]
  );

  const themeTypography: TypographyVariantsOptions = useMemo<TypographyVariantsOptions>(
    () => Typography(fontFamily),

    [fontFamily]
  );
  const themeCustomShadows: CustomShadowProps = useMemo<CustomShadowProps>(
    () => CustomShadows(theme),
    [theme]
  );

  const themeOptions: ThemeOptions = useMemo(
    () => ({
      breakpoints: {
        values: {
          xs: 0,
          sm: 768,
          md: 1024,
          lg: 1266,
          xl: 1440,
        },
      },
      direction: themeDirection,
      mixins: {
        toolbar: {
          minHeight: HEADER_HEIGHT,
          paddingTop: 8,
          paddingBottom: 8,
        },
      },
      palette: theme.palette,
      shape: {
        borderRadius: 8,
      },
      customShadows: themeCustomShadows,
      typography: themeTypography,
    }),
    [themeDirection, theme, themeTypography, themeCustomShadows]
  );

  const themes: Theme = createTheme(themeOptions);
  themes.components = componentsOverride(themes);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default ThemeCustomization;
