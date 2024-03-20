import { useEffect, useState } from 'react';
import '../assets/splash.css';
import { splashImage } from '../assets/splashImage';
import Loader from '../components/Loader';

const Splash = (): JSX.Element => {
  const [version, setVersion] = useState<null | string>(null);

  useEffect(() => {
    const fetchVersion = async () => {
      const version = await window.electronAPI.getVersion();
      setVersion(`Version:${version}`);
    };

    fetchVersion();
  }, [version]);

  if (version === null) return <Loader />;

  return (
    <div className="image-container">
      <img src={splashImage} alt="Background" className="background-image" />
      <div className="centered-text">
        {version}
        <br />© 2024 Imakita3gyo
      </div>
    </div>
  );
};

export default Splash;
