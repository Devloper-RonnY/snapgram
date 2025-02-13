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
// "use client"
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from '@/components/ui/button';
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SignupValidarion } from "@/lib/validation";
import Loader from "@/components/shared/Loader";
import { Link, useNavigate } from "react-router-dom";
import { useCreateUserAccount, useSignInAccount } from "@/lib/react-query/queriesandMutations";
import { useUserContext } from "@/context/AuthContext";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { EyeOff, Eye } from "lucide-react";
import { useState } from "react";
import { signOutAccount } from "@/lib/appwrite/api";
var SignupForm = function () {
    var checkAuthUser = useUserContext().checkAuthUser;
    var navigate = useNavigate();
    var _a = useCreateUserAccount(), createUserAccount = _a.mutateAsync, isCreatingUser = _a.isPending;
    var signInAccount = useSignInAccount().mutateAsync;
    var form = useForm({
        resolver: zodResolver(SignupValidarion),
        defaultValues: {
            name: "",
            username: "",
            email: "",
            password: ""
        },
    });
    function onSubmit(values) {
        return __awaiter(this, void 0, void 0, function () {
            var isLoggedIn, newUser, session, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        return [4 /*yield*/, checkAuthUser()];
                    case 1:
                        isLoggedIn = _a.sent();
                        if (!isLoggedIn) return [3 /*break*/, 3];
                        return [4 /*yield*/, signOutAccount()];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [4 /*yield*/, createUserAccount({
                            name: values.name || "",
                            username: values.username || "",
                            email: values.email || "",
                            password: values.password || "",
                        })];
                    case 4:
                        newUser = _a.sent();
                        if (!newUser) {
                            toast.error("Sign up failed. Please try again.");
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, signInAccount({
                                email: values.email,
                                password: values.password,
                            })];
                    case 5:
                        session = _a.sent();
                        if (!session) {
                            toast.error("Sign in failed. Please try again.");
                            return [2 /*return*/];
                        }
                        toast.success("Welcome, ".concat(values.username, " ! \uD83C\uDF89"));
                        form.reset();
                        navigate("/");
                        return [3 /*break*/, 7];
                    case 6:
                        error_1 = _a.sent();
                        console.error("Error signing in:", error_1);
                        toast.error("An error occurred. Please try again later.");
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    }
    return (_jsx(Form, __assign({}, form, { children: _jsxs("div", { className: "sm:w-420 flex-center flex-col", children: [_jsx("img", { src: "/assets/images/logo.svg", alt: "logo" }), _jsx("h2", { className: "h2-bold md:h2-bold pt-5 sm:pt-4", children: "Create a new account" }), _jsx("p", { className: "text-light-3 small-medium md:base-regular mt-2", children: "To use Snapgram, please enter your account details." }), _jsxs("form", { onSubmit: form.handleSubmit(onSubmit), className: "space-y-2 flex flex-col w-full mt-1", children: [_jsx(FormField, { control: form.control, name: "name", render: function (_a) {
                                var field = _a.field;
                                return (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Name" }), _jsx(FormControl, { children: _jsx(Input, __assign({ type: "text", className: "shad-input" }, field, { placeholder: "enter your name" })) }), _jsx(FormMessage, {})] }));
                            } }), _jsx(FormField, { control: form.control, name: "username", render: function (_a) {
                                var field = _a.field;
                                return (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Username" }), _jsx(FormControl, { children: _jsx(Input, __assign({ type: "text", className: "shad-input" }, field, { placeholder: "enter username" })) }), _jsx(FormMessage, {})] }));
                            } }), _jsx(FormField, { control: form.control, name: "email", render: function (_a) {
                                var field = _a.field;
                                return (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Email" }), _jsx(FormControl, { children: _jsx(Input, __assign({ type: "text", className: "shad-input" }, field, { placeholder: "enter your email" })) }), _jsx(FormMessage, {})] }));
                            } }), _jsx(FormField, { control: form.control, name: "password", render: function (_a) {
                                var field = _a.field;
                                var _b = useState(false), showPassword = _b[0], setShowPassword = _b[1];
                                return (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Password" }), _jsx(FormControl, { children: _jsxs("div", { className: "relative", children: [_jsx(Input, __assign({ type: showPassword ? "text" : "password", className: "shad-input", placeholder: "enter your password" }, field)), _jsx("button", { type: "button", className: "absolute right-3 top-1/2 -translate-y-1/2", onClick: function () { return setShowPassword(!showPassword); }, children: showPassword ? _jsx(EyeOff, { size: 24 }) : _jsx(Eye, { size: 24 }) })] }) }), _jsx(FormMessage, {})] }));
                            } }), _jsx(Button, { className: "shad-button_primary", type: "submit", children: isCreatingUser ? (_jsxs("div", { className: "flex-center gap-2", children: [_jsx(Loader, {}), " Loading..."] })) : "Sign-up" }), _jsxs("p", { className: "text-small-regular text-light-2 text-center mt-2", children: ["Already have an account?", _jsx(Link, { to: "/sign-in", className: "text-primary-500 text-small-semibold ml-1", children: " Log in" })] })] })] }) })));
};
export default SignupForm;
