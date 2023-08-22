import { Outlet, useNavigate } from 'react-router-dom';
import ConnectedAppBar from './components/connected/ConnectedAppBar';
import ConnectedGlobalSpinner from './components/connected/ConnectedGlobalSpinner';
import { UserLoginResponse } from './app/models';
import { useAppDispatch } from './app/store';
import { setUser } from './app/features/user/userSlice';
import { useEffect } from 'react';

const App = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const userString = sessionStorage.getItem("user");

    if (userString) {
      const user: UserLoginResponse = JSON.parse(userString);
      dispatch(setUser(user));

      if (user) {
        navigate('products');
      }
    }
  }, []);

  return (
    <>
      <ConnectedAppBar />
      <Outlet />
      <ConnectedGlobalSpinner />
    </>
  );
};

export default App;
