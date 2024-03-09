import { ElementType, Suspense } from 'react';

// project-imports
import Loader from './Loader';

// ==============================|| LOADABLE - LAZY LOADING ||============================== //

const Loadable = (Component: ElementType) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const LoadableComponent = (props: any) => (
    <Suspense fallback={<Loader />}>
      <Component {...props} />
    </Suspense>
  );
  return LoadableComponent;
};

export default Loadable;
