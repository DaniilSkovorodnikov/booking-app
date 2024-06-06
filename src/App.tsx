import './App.css'
import {Route, Routes} from "react-router-dom";
import Layout from "./components/Layout.tsx";
import Home from "./pages/Home.tsx";
import Restaurant from "./pages/Restaurant.tsx";
import Login from "./pages/Login.tsx";
import Registration from "./pages/Registration.tsx";
import Profile from "./pages/Profile.tsx";
import EditProfile from "./pages/EditProfile.tsx";

function App() {

    return (
        <Routes>
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Registration/>}/>
            <Route path='/' element={<Home/>}/>
            <Route path='/restaurant/:id' element={<Restaurant/>}/>
            <Route path='/profile' element={<Profile/>}/>
            <Route path='/profile/edit' element={<EditProfile/>}/>
        </Routes>
    )
}

export default App
