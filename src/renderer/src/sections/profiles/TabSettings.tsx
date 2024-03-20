import { useMemo } from 'react';

// material-ui
// material-ui
import { Box, Divider, Grid, Stack, Typography } from '@mui/material';

// project-imports
import ColorScheme from '../../components/Customization/ColorScheme';
import ThemeContrast from '../../components/Customization/ThemeContrast';
import ThemeLayout from '../../components/Customization/ThemeLayout';
import ThemeMenuLayout from '../../components/Customization/ThemeMenuLayout';
import ThemeMode from '../../components/Customization/ThemeMode';
import ThemeWidth from '../../components/Customization/ThemeWidth';
// project-imports
import MainCard from '../../components/MainCard';
import SimpleBar from '../../components/third-party/SimpleBar';

// assets
import MenuCaption from '../../components/Customization/MenuCaption';
import { HEADER_HEIGHT } from '../../config';
import { useAppSelector } from '../../hooks/rtkHooks';

const TabSettings = () => {
  // const theme = useTheme();
  const {
    container,
    mode,
    presetColor,
    miniDrawer,
    themeDirection,
    menuOrientation,
    menuCaption,
    themeContrast,
  } = useAppSelector((state) => state.config.config);

  // eslint-disable-next-line
  const themeLayout = useMemo(() => <ThemeLayout />, [miniDrawer, themeDirection]);
  // eslint-disable-next-line
  const themeMenuLayout = useMemo(() => <ThemeMenuLayout />, [menuOrientation]);
  // eslint-disable-next-line
  const themeMode = useMemo(() => <ThemeMode />, [mode]);
  // eslint-disable-next-line
  const themeContrastView = useMemo(() => <ThemeContrast />, [themeContrast]);
  // eslint-disable-next-line
  const menuCaptionView = useMemo(() => <MenuCaption />, [menuCaption]);
  // eslint-disable-next-line
  const themeColor = useMemo(() => <ColorScheme />, [presetColor]);
  // eslint-disable-next-line
  const themeWidth = useMemo(() => <ThemeWidth />, [container]);
  // eslint-disable-next-line
  // const themeFont = useMemo(() => <ThemeFont />, [fontFamily]);

  return (
    <MainCard content={false} border={false}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        spacing={1.5}
        sx={{ p: 2.5 }}
      >
        <Typography variant="h5">Settings</Typography>
      </Stack>
      <SimpleBar
        sx={{
          '& .simplebar-content': {
            display: 'flex',
            flexDirection: 'column',
          },
        }}
      >
        <Box sx={{ p: 3, height: `calc(100vh - ${HEADER_HEIGHT}px)` }}>
          <Grid container spacing={2.5}>
            {/* theme-mode */}
            <Grid item xs={12}>
              <Stack>
                <Typography variant="subtitle1" color="textPrimary">
                  Theme Mode
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  Choose light or dark mode
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={12}>
              {themeMode}
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>

            {/* theme-contrast */}
            <Grid item xs={12}>
              <Stack>
                <Typography variant="subtitle1" color="textPrimary">
                  Theme Contrast
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  Choose theme contrast/shadow
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={12}>
              {themeContrastView}
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>

            {/* custom-theme */}
            <Grid item xs={12}>
              <Stack>
                <Typography variant="subtitle1" color="textPrimary">
                  Custom Theme
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  Choose your primary theme color
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={12}>
              {themeColor}
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>

            {/* menu-caption */}
            <Grid item xs={12}>
              <Stack>
                <Typography variant="subtitle1" color="textPrimary">
                  Sidebar Caption
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  Hide your sidebar caption
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={12}>
              {menuCaptionView}
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>

            {/* theme-layout */}
            <Grid item xs={12}>
              <Stack>
                <Typography variant="subtitle1" color="textPrimary">
                  Theme Layout
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  Choose your layout
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={12}>
              {themeLayout}
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>

            {/* theme-orientation */}
            <Grid item xs={12}>
              <Stack>
                <Typography variant="subtitle1" color="textPrimary">
                  Menu Orientation
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  Choose Vertical or Horizontal Menu Orientation
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={12}>
              {themeMenuLayout}
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>

            {/* theme-container */}
            <Grid item xs={12}>
              <Stack>
                <Typography variant="subtitle1" color="textPrimary">
                  Layout Width
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  Choose fluid or container layout
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={12}>
              {themeWidth}
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>

            {/* theme-font-family */}
            {/* <Grid item xs={12}>
        <Stack>
          <Typography variant="subtitle1" color="textPrimary">
            Font Family
          </Typography>
          <Typography variant="caption" color="textSecondary">
            Choose your font family.
          </Typography>
        </Stack>
      </Grid>
      <Grid item xs={12}>
        {themeFont}
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid> */}
          </Grid>
        </Box>
      </SimpleBar>
    </MainCard>
  );
};

export default TabSettings;
