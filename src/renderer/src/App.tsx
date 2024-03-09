import { useEffect, useState } from 'react';
import Loader from './components/Loader';
import Routes from './routes';
import ThemeCustomization from './themes';

import Snackbar from './components/@extended/Snackbar';
import Customization from './components/Customization';
import ScrollTop from './components/ScrollTop';
import Notistack from './components/third-party/Notistack';

import { useAppDispatch } from './hooks/rtkHooks';
import { getConfigFromLocalStorage } from './store/reducers/configSlice';
import { getKeepMeSignInFromLocalStorage } from './store/reducers/keepMeSignIn';

const App = () => {
  const [loading, setLoading] = useState<boolean>(true);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getKeepMeSignInFromLocalStorage());
    dispatch(getConfigFromLocalStorage());
    setLoading(false);
  }, []);

  if (loading) return <Loader />;

  return (
    <ThemeCustomization>
      <ScrollTop>
        <>
          <Notistack>
            <Routes />
            <Customization />
            <Snackbar />
          </Notistack>
        </>
      </ScrollTop>
    </ThemeCustomization>
  );
};

export default App;
