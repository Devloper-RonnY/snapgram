var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";
import FileUploader from "../shared/FileUploader";
import { PostValidation } from "@/lib/validation";
import { ID } from "appwrite";
import { useUserContext } from "@/context/AuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useCreatePost, useUpdatePost } from "@/lib/react-query/queriesandMutations";
import { appwriteConfig, storage } from "@/lib/appwrite/config";
var PostForm = function (_a) {
    var post = _a.post, action = _a.action;
    var _b = useCreatePost(), createPost = _b.mutateAsync, isLoadingCreate = _b.isPending;
    var _c = useUpdatePost(), updatePost = _c.mutateAsync, isLoadingUpdate = _c.isPending;
    var user = useUserContext().user;
    var navigate = useNavigate();
    var form = useForm({
        resolver: zodResolver(PostValidation),
        defaultValues: {
            caption: post ? post === null || post === void 0 ? void 0 : post.caption : "",
            file: [],
            location: post ? post.location : "",
            tags: post ? post.tags.join(",") : "",
        },
    });
    // 🛠️ Handle Form Submission
    function onSubmit(values) {
        return __awaiter(this, void 0, void 0, function () {
            var updatedPost, error_1, imageId, imageUrl, file, uploadedFile, newPostData, newPost;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(post && action === "Update")) return [3 /*break*/, 5];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, updatePost(__assign(__assign({}, values), { postId: post.$id, imageId: post.imageId, imageUrl: post.imageUrl, caption: values.caption || "", file: values.file || [] // Passing the file only if there’s one
                             }))];
                    case 2:
                        updatedPost = _a.sent();
                        if (!updatedPost) {
                            toast.error("Please try again..!");
                            console.log(updatedPost);
                        }
                        toast.success("Post updated successfully!");
                        navigate("/posts/".concat(post.$id));
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        console.error("Update failed:", error_1);
                        toast.error("Failed to update post. Please try again.");
                        return [3 /*break*/, 4];
                    case 4: return [3 /*break*/, 9];
                    case 5:
                        imageId = "";
                        imageUrl = "";
                        if (!(values.file && values.file.length > 0)) return [3 /*break*/, 7];
                        file = values.file[0];
                        return [4 /*yield*/, storage.createFile(appwriteConfig.storageId, ID.unique(), file)];
                    case 6:
                        uploadedFile = _a.sent();
                        if (!uploadedFile || !uploadedFile.$id) {
                            toast.error("File upload failed. Please try again.");
                            return [2 /*return*/];
                        }
                        imageId = uploadedFile.$id;
                        imageUrl = storage.getFilePreview(appwriteConfig.storageId, uploadedFile.$id);
                        // Check if the generated imageUrl is valid
                        if (!imageUrl.startsWith("http")) {
                            toast.error("Invalid image URL generated.");
                            return [2 /*return*/];
                        }
                        _a.label = 7;
                    case 7:
                        newPostData = {
                            creater: (user === null || user === void 0 ? void 0 : user.id) || "",
                            caption: values.caption || "",
                            location: values.location || "",
                            tags: values.tags ? values.tags.split(",").map(function (tag) { return tag.trim(); }) : [],
                            imageId: imageId, // ✅ Required now
                            imageUrl: imageUrl, // ✅ Required now
                            file: Array.isArray(values.file) ? values.file : []
                        };
                        console.log("Generated imageUrl:", imageUrl);
                        console.log("Length of imageUrl:", imageUrl.length);
                        return [4 /*yield*/, createPost(newPostData)];
                    case 8:
                        newPost = _a.sent();
                        if (!newPost) {
                            toast.error("Please try again..!");
                        }
                        else {
                            toast.success("Post created successfully!");
                            navigate("/"); // Redirect after successful creation
                        }
                        _a.label = 9;
                    case 9: return [2 /*return*/];
                }
            });
        });
    }
    return (_jsx(Form, __assign({}, form, { children: _jsxs("form", { onSubmit: form.handleSubmit(onSubmit), className: "flex flex-col gap-9 w-full max-w-5xl", children: [_jsx(FormField, { control: form.control, name: "caption", render: function (_a) {
                        var field = _a.field;
                        return (_jsxs(FormItem, { children: [_jsx(FormLabel, { className: "shad-form_label", children: "Caption" }), _jsx(FormControl, { children: _jsx(Textarea, __assign({ className: "shad-textarea custom-scrollbar" }, field)) }), _jsx(FormMessage, {})] }));
                    } }), _jsx(FormField, { control: form.control, name: "file", render: function (_a) {
                        var field = _a.field;
                        return (_jsxs(FormItem, { children: [_jsx(FormLabel, { className: "shad-form_label", children: "Add Photos" }), _jsx(FormControl, { children: _jsx(FileUploader, { fieldChange: field.onChange, mediaUrl: post === null || post === void 0 ? void 0 : post.imageUrl }) }), _jsx(FormMessage, {})] }));
                    } }), _jsx(FormField, { control: form.control, name: "location", render: function (_a) {
                        var field = _a.field;
                        return (_jsxs(FormItem, { children: [_jsx(FormLabel, { className: "shad-form_label", children: "Add Location" }), _jsx(FormControl, { children: _jsx(Input, __assign({ type: "text", className: "shad-input" }, field)) }), _jsx(FormMessage, {})] }));
                    } }), _jsx(FormField, { control: form.control, name: "tags", render: function (_a) {
                        var field = _a.field;
                        return (_jsxs(FormItem, { children: [_jsx(FormLabel, { className: "shad-form_label", children: "Add Tags (comma-separated)" }), _jsx(FormControl, { children: _jsx(Input, __assign({ type: "text", className: "shad-input", placeholder: "Art, Expression, Learn" }, field)) }), _jsx(FormMessage, {})] }));
                    } }), _jsxs("div", { className: "flex gap-4 items-center justify-end", children: [_jsx(Button, { type: "button", className: "shad-button_dark_4", children: "Cancel" }), _jsxs(Button, { type: "submit", className: "shad-button_primary whitespace-nowrap", disabled: isLoadingCreate || isLoadingUpdate, children: [isLoadingCreate || isLoadingUpdate && "Submitting...", action] })] })] }) })));
};
export default PostForm;
