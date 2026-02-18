import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'

//page imports
import { Landing } from './pages/landing'
import { Home } from './pages/homepage'
import { AboutUs } from './pages/about-us'
import { Admin } from './pages/admin-page'
import { CreateAccount } from './components/create-account'
import { FAQ } from './pages/faq-page'
import { ForgotPassword } from './pages/forgot-password-page'
import { SubmitLostItem } from './pages/lost-and-found-submission-form'
import { LostAndFound } from './pages/lost-and-found'
import { Profile } from './pages/profile-page'
import { Map } from './pages/school-map'
import { SignIn } from './components/sign-in'
import { ViewItem } from './pages/view-specific-item'
import { Layout } from './components/Layout'



function App() {
  useEffect(() => {
    let token = sessionStorage.getItem("User");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }, [])

  const [count, setCount] = useState(0)
  const [data, setData] = useState()


  const fetchAPI = async () => {
    const response = await axios.get("http://localhost:8080/api");
    if (response.status === 200) {
      setData(response.data)
    }
  };

  useEffect(()=>{
    fetchAPI();
    },[]);

    

  return (
    /* <> --> for testing purposes only, delete before final submission
      {JSON.stringify(data)}
    </>
    */
    <Router>
      <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route element={<Layout/>}>
          <Route path="/home" element={<Home/>}/>
          <Route path="/about-us" element={<AboutUs/>}/>
          <Route path="/faq" element={<FAQ/>}/>
          <Route path="/submit-item" element={<SubmitLostItem/>}/>
          <Route path="/lost-and-found" element={<LostAndFound/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/map" element={<Map/>}/>
          <Route path="/view-item/:id" element={<ViewItem/>}/>
          <Route path="/admin" element={<Admin/>}/>
        </Route>
        <Route path="/create-account" element={<CreateAccount/>}/>
        <Route path="/forgot-password" element={<ForgotPassword/>}/>
        <Route path="/login" element={<SignIn/>}/>
      </Routes>
    </Router>
    
  )
}

export default App
