import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { bottombarLinks, } from "@/constants";
import { Link, useLocation } from "react-router-dom";
var BottomBar = function () {
    var pathname = useLocation().pathname;
    return (_jsx("section", { className: "bottom-bar", children: bottombarLinks.map(function (link) {
            var isActive = pathname === link.route;
            return (_jsxs(Link, { to: link.route, className: "".concat(isActive && 'bg-primary-500 rounded-[10px]', " flex-center flex-col gap-1 p-2 transition"), children: [_jsx("img", { src: link.imgURL, alt: link.label, width: 16, height: 16, className: "".concat(isActive && "invert-white") }), _jsx("p", { className: "tiny-medium text-light-3 ", children: link.label })] }, link.label));
        }) }));
};
export default BottomBar;
