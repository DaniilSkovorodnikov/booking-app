import './App.css'
import {Route, Routes} from "react-router-dom";
import Layout from "./components/Layout.tsx";
import Home from "./pages/Home.tsx";
import Restaurant from "./pages/Restaurant.tsx";
import Auth from "./pages/Auth.tsx";

function App() {

    return (
        <Routes>
            <Route path='/login' element={<Auth/>}/>
            <Route path='/' element={<Home/>}/>
            <Route path='/restaurant/:id' element={<Restaurant/>}/>
        </Routes>
    )
}

export default App
