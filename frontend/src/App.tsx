import { Outlet } from 'react-router-dom';
import ConnectedAppBar from './components/connected/ConnectedAppBar';

const App = () => {
  return (
    <>
      <ConnectedAppBar />
      <Outlet />
    </>
  );
};

export default App;
