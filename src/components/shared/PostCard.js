import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useUserContext } from "@/context/AuthContext"; // Your Auth context hook
import { multiFormatDateString } from "@/lib/utils";
import { Link } from "react-router-dom";
import PostStats from "./PostStats";
var PostCard = function (_a) {
    var _b, _c, _d;
    var post = _a.post;
    var user = useUserContext().user;
    console.log("Post Data:", post); // Debugging
    console.log(post.creater); // Creator info
    return (_jsxs("div", { className: "post-card", children: [_jsxs("div", { className: "flex-between", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx(Link, { to: "/profile/".concat(((_b = post.creater) === null || _b === void 0 ? void 0 : _b.id) || "#"), children: _jsx("img", { src: ((_c = post.creater) === null || _c === void 0 ? void 0 : _c.imageUrl) || "/assets/icons/profile-placeholder.svg", alt: "creator", className: "rounded-full w-12 lg:h-12" }) }), _jsxs("div", { className: "flex flex-col", children: [_jsx("p", { className: "base-medium lg:body-bold text-light-1", children: (_d = post.creater) === null || _d === void 0 ? void 0 : _d.name }), _jsxs("div", { className: "flex-center gap-2 text-light-3", children: [_jsx("p", { className: "subtle-semibold lg:small-reguglar", children: multiFormatDateString(post.$createdAt) }), " -", _jsx("p", { className: "subtle-semibold lg:small-regular", children: post.location })] })] })] }), _jsx(Link, { to: "/update-post/".concat(post.$id), children: _jsx("img", { src: "/assets/icons/edit.svg", alt: "edit", width: 20, height: 20 }) })] }), _jsxs(Link, { to: "/posts/".concat(post.$id), children: [_jsxs("div", { className: "small-medium lg:base-medium py-5", children: [_jsx("p", { children: post.caption }), _jsx("ul", { className: "flex gap-1 mt-2", children: post.tags.map(function (tag) { return (_jsxs("li", { className: "text-light-3", children: ["#", tag] }, tag)); }) })] }), _jsx("img", { src: post.imageUrl || '/assets.icons/profile-placeholder.svg', className: "post-card_img", alt: "postimage" })] }), _jsx(PostStats, { post: post, userId: user.id })] }));
};
export default PostCard;
