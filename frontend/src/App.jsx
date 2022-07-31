import Menu from './components/Menu'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { Routes, Route } from 'react-router-dom';
import Hackthons from './views/Hackthons';
import Develpers from './views/Developers';
import Login from './views/Login';
import Footer from './components/Footer';
import Page404 from './views/page404';
import AuthUser from './components/AuthUser';
import Home from './views/Home';
function App() {

  const { getToken } = AuthUser();
  if (!getToken()) return <Login />;

  return (
    <div className='App'>
      <Menu />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='hackathons' element={<Hackthons />} />
        <Route path='developers' element={<Develpers />} />
        <Route path='login' element={<Login />} />
        <Route path='*' element={<Page404 />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
