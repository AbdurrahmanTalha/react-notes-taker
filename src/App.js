
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Header from './Components/Shared/Header';
import Register from './Pages/Register';
import MakeTodo from './Pages/MakeTodo';
import RequireAuth from './Pages/RequireAuth';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MyTodos from './Pages/MyTodos';

function App() {
  return (
    <div className="App">
      <Header></Header>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/register" element={<Register></Register>}></Route>
        <Route path="/make" element={<RequireAuth><MakeTodo></MakeTodo></RequireAuth>}></Route>
        <Route path="/todo" element={<RequireAuth><MyTodos></MyTodos></RequireAuth>}></Route>
      </Routes>
      <ToastContainer></ToastContainer>
    </div>
  );
}

export default App;
