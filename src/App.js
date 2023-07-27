import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import About from './pages/About';
import Settings from './pages/Settings';
import User from './pages/User';
import Category from './pages/Category';
import Meeting from './pages/Meeting';
import LoginPage from './pages/Login';
import MeetingCreate from './pages/MeetingCreate';
import ViewMeeting from './pages/ViewMeeting';

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' exact element={<Home/>}></Route>
          <Route path='/sign-in' exact element={<LoginPage/>}></Route>
          <Route path='/users' exact element={<User/>}></Route>
          <Route path='/category' exact element={<Category/>}></Route>
          <Route path='/meeting' exact element={<Meeting/>}></Route>
          <Route path='/meeting/create' exact element={<MeetingCreate/>}></Route>
          <Route path='/meeting/view/:id' exact element={<ViewMeeting/>}></Route>
          <Route path='/about' exact element={<About/>}></Route>
          <Route path='/settings' exact element={<Settings/>}></Route>
        </Routes>
      </Router>
    </>
  )
}
