import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import LeftSideBar from '@/components/shared/LeftSideBar';
import Topbar from '@/components/shared/Topbar';
import { Outlet } from 'react-router-dom';
import BottomBar from '@/components/shared/BottomBar';
var RootLayout = function () {
    return (_jsxs("div", { className: 'w-full md:flex', children: [_jsx(Topbar, {}), _jsx(LeftSideBar, {}), _jsx("section", { className: 'flex flex-1 h-full', children: _jsx(Outlet, {}) }), _jsx(BottomBar, {})] }));
};
export default RootLayout;
