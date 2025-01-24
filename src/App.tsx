import AuthLayout from './_auth/forms/AuthLayout'
import SigninForm from './_auth/forms/SigninForm'
import SignupForm from './_auth/forms/SignupForm'
import { Home, PostDetails, Profile, Explore, Saved, CreatePost, UpdateProfile, EditPost, AllUsers } from './_root/pages'
import './globals.css'
import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RootLayout from './_root/RootLayout'



const App = () => {
  return (
    <main className='flex h-screen'>
      <Routes>
        {/* Public Routes */}
        <Route element={<AuthLayout />}>
         <Route path='/sign-in' element={<SigninForm />} />
         <Route path='/sign-up' element={<SignupForm />} />
        </Route>

        {/* Private Routes */} 
        <Route element={<RootLayout />}>
        <Route index element={<Home />}/>
        <Route path='/explore' element={<Explore />} />
        <Route path='/saved' element={<Saved />} />
        <Route path='/all-users' element={<AllUsers />} />
        <Route path='/create-post' element={<CreatePost />} />
        <Route path='/update-post/:id' element={<EditPost />} />
        <Route path='/posts/:id' element={<PostDetails />} />
        <Route path='/profile/:id/*' element={<Profile />} />
        <Route path='/update-profile/:id' element={<UpdateProfile />} />
        </Route>
      // </Routes>
      <ToastContainer />
    </main>
  )
}

export default App