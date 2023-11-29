import {BrowserRouter,Route,Routes} from 'react-router-dom'
import HomePage from './components/homepage';
import Navbar from './components/navbar';
import SideMenu from './components/sidemenu';
import CreateNote from './components/createNote';
import Login from './components/login';
import Register from './components/register';
function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <SideMenu/>
      <Routes>
        <Route exact path='/' element={<HomePage></HomePage>}></Route>
        <Route exact path='createnote' element={<CreateNote></CreateNote>}></Route>
        <Route exact path='login' element={<Login></Login>}></Route>
        <Route exact path='register' element={<Register></Register>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
