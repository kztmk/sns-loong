import LinearProgress from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';
import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

const LoaderWrapper = styled('div')(({ theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  zIndex: 2001,
  width: '100%',
  '& > * + *': {
    marginTop: theme.spacing(2),
  },
}));

const Loader = () => {
  return (
    <LoaderWrapper>
      <LinearProgress color="primary" />
    </LoaderWrapper>
  );
};

interface CommonLayoutProps {
  layout?: string;
}

const CommonLayout: React.FC<CommonLayoutProps> = ({ layout = 'blank' }: { layout?: string }) => {
  return (
    <>
      {(layout === 'landing' || layout === 'simple') && (
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      )}
      {layout === 'blank' && <Outlet />}
    </>
  );
};

export default CommonLayout;
