import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import PostForm from "@/components/forms/PostForm";
import Loader from "@/components/shared/Loader";
import { useGetPostById } from "@/lib/react-query/queriesandMutations";
import { useParams } from "react-router-dom";
var EditPost = function () {
    var id = useParams().id;
    var _a = useGetPostById(id || ''), post = _a.data, isPending = _a.isPending;
    if (isPending)
        return _jsx(Loader, {});
    return (_jsx("div", { className: "flex flex-1", children: _jsxs("div", { className: "common-container", children: [_jsxs("div", { className: "max-w-5xl flex-start gap-3 justify-center w-full", children: [_jsx("img", { src: "/assets/icons/add-post.svg", width: 36, height: 36, alt: "add" }), _jsx("h2", { className: "h3-bold md:h2-bold text-left w-full", children: "Edit Post" })] }), _jsx(PostForm, { action: "Update", post: post })] }) }));
};
export default EditPost;
