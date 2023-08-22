import { Outlet } from 'react-router-dom';
import ConnectedAppBar from './components/connected/ConnectedAppBar';
import ConnectedGlobalSpinner from './components/connected/ConnectedGlobalSpinner';

const App = () => {
  return (
    <>
      <ConnectedAppBar />
      <Outlet />
      <ConnectedGlobalSpinner />
    </>
  );
};

export default App;
