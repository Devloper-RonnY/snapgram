import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { useSignOutAccount } from "@/lib/react-query/queriesandMutations";
import { useEffect } from "react";
import { useUserContext } from "@/context/AuthContext";
import { sidebarLinks } from "@/constants";
import { Button } from "../ui/button";
var LeftSideBar = function () {
    var pathname = useLocation().pathname;
    var _a = useSignOutAccount(), signOut = _a.mutate, isSuccess = _a.isSuccess;
    var navigate = useNavigate();
    var user = useUserContext().user;
    useEffect(function () {
        if (isSuccess)
            navigate(0);
    }, [isSuccess]);
    console.log("Rendering LeftSideBar...");
    console.log("User from Context:", user);
    return (_jsxs("nav", { className: "leftsidebar", children: [_jsxs("div", { className: "flex flex-col gap-11", children: [_jsx(Link, { to: "/", className: "flex gap-3 items-center", children: _jsx("img", { src: "/assets/images/logo.svg", alt: "logo", width: 170, height: 36 }) }), _jsxs(Link, { to: "/profile/".concat(user.id), className: "flex gap-3 items-center", children: [_jsx("img", { src: user.imageUrl || "/assets/icons/profile-placeholder.svg", className: "w-10 h-10 rounded-full", alt: "profile" }), _jsxs("div", { className: "flex flex-col", children: [_jsx("p", { className: "body-bold", children: user.name }), _jsxs("p", { className: "small-regular  text-light-3", children: ["@", user.username] })] })] }), _jsx("ul", { className: "flex flex-col gap-6", children: sidebarLinks.map(function (link) {
                            var isActive = pathname === link.route;
                            return (_jsx("li", { className: "leftsidebar-link group ".concat(isActive && 'bg-primary-500'), children: _jsxs(NavLink, { to: link.route, className: "flex gap-4 items-center p-4", children: [_jsx("img", { src: link.imgURL, alt: link.label, className: "group-hover:invert-white ".concat(isActive && "invert-white") }), link.label] }) }, link.label));
                        }) })] }), _jsxs(Button, { variant: "ghost", className: "shad-button_ghost", onClick: function () { return signOut(); }, children: [_jsx("img", { src: "/assets/icons/logout.svg", alt: "logout" }), _jsx("p", { className: "small-medium lg:base-medium", children: "Logout" })] })] }));
};
export default LeftSideBar;
