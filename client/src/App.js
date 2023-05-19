import { Fragment } from 'react';
import './App.css';
import ChatPage from './pages/ChatPage';
import RegistrationPage from './pages/RegistrationPage';
import LoginPage from './pages/LoginPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NotFoundPage from './pages/NotFoundPage';
import ForgetPasswordPage from './pages/ForgetPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import FullscreenLoader from './components/masterLayout/FullScreenLoader';
import { Toaster } from 'react-hot-toast';
import { getToken } from './helper/sessionHelper';

function App() {
  if(getToken()){
    return (
      <Fragment>
        <BrowserRouter>
          <Routes>
            <Route exact path='/chat' element={<ChatPage />}/>
            <Route exact path='*' element={<NotFoundPage />}/>
          </Routes>
        </BrowserRouter>
        <FullscreenLoader />
        <Toaster position="top-right" reverseOrder={false}/>
      </Fragment>
    );
  }else{
  return (
    <Fragment>
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<LoginPage />} />
          <Route exact path='/register' element={<RegistrationPage />} />
          <Route exact path='/forgetPassword' element={<ForgetPasswordPage />} />
          <Route exact path='/resetPassword/:token' element={<ResetPasswordPage />} />
          <Route exact path={'*'} element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
      <FullscreenLoader />
      <Toaster position="top-right" reverseOrder={false} />
    </Fragment>
  );
  }
}

export default App;
