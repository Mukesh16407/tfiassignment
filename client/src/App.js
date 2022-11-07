import { BrowserRouter, Routes, Route } from "react-router-dom";
import {ApplyVolunteer} from './pages/ApplyVolunteer'
import {Home} from './pages/Home';
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <div >
      <BrowserRouter>
      <Routes>
        <Route path="/login"element={<Login />}/>
        <Route path="/register" element={<Register /> } />
      <Route path="/"element={<Home/>}/>
      <Route path="/apply-volunteer"element={<ApplyVolunteer />}/>
      </Routes>
        
      </BrowserRouter>
    
    </div>
  );
}

export default App;
