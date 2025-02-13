import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import AuthLayout from './_auth/forms/AuthLayout';
import SigninForm from './_auth/forms/SigninForm';
import SignupForm from './_auth/forms/SignupForm';
import { Home, PostDetails, Profile, Explore, Saved, CreatePost, UpdateProfile, EditPost, AllUsers } from './_root/pages';
import './globals.css';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RootLayout from './_root/RootLayout';
var App = function () {
    return (_jsxs("main", { className: 'flex h-screen', children: [_jsxs(Routes, { children: [_jsxs(Route, { element: _jsx(AuthLayout, {}), children: [_jsx(Route, { path: '/sign-in', element: _jsx(SigninForm, {}) }), _jsx(Route, { path: '/sign-up', element: _jsx(SignupForm, {}) })] }), _jsxs(Route, { element: _jsx(RootLayout, {}), children: [_jsx(Route, { index: true, element: _jsx(Home, {}) }), _jsx(Route, { path: '/explore', element: _jsx(Explore, {}) }), _jsx(Route, { path: '/saved', element: _jsx(Saved, {}) }), _jsx(Route, { path: '/all-users', element: _jsx(AllUsers, {}) }), _jsx(Route, { path: '/create-post', element: _jsx(CreatePost, {}) }), _jsx(Route, { path: '/update-post/:id', element: _jsx(EditPost, {}) }), _jsx(Route, { path: '/posts/:id', element: _jsx(PostDetails, {}) }), _jsx(Route, { path: '/profile/:id/*', element: _jsx(Profile, {}) }), _jsx(Route, { path: '/update-profile/:id', element: _jsx(UpdateProfile, {}) })] })
                    // </Routes>
                    , "// "] }), _jsx(ToastContainer, {})] }));
};
export default App;
