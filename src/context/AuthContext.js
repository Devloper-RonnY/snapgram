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
import { jsx as _jsx } from "react/jsx-runtime";
import { getCurrentUser } from '@/lib/appwrite/api';
import { useContext, createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
export var INITIAL_USER = {
    id: "",
    name: "",
    username: "",
    email: "",
    imageUrl: "",
    bio: "",
};
var INITIAL_STATE = {
    user: INITIAL_USER,
    isLoading: false,
    isAuthenticated: false,
    setUser: function () { },
    setIsAuthenticated: function () { },
    checkAuthUser: function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
        return [2 /*return*/, false];
    }); }); },
};
var AuthContext = createContext(INITIAL_STATE);
export var AuthProvider = function (_a) {
    var children = _a.children;
    var _b = useState(INITIAL_USER), user = _b[0], setUser = _b[1];
    var _c = useState(false), isLoading = _c[0], setIsLoading = _c[1];
    var _d = useState(false), isAuthenticated = _d[0], setIsAuthenticated = _d[1];
    var navigate = useNavigate();
    var checkAuthUser = function () { return __awaiter(void 0, void 0, void 0, function () {
        var user_1, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setIsLoading(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    return [4 /*yield*/, getCurrentUser()];
                case 2:
                    user_1 = _a.sent();
                    console.log("Fetched User:", user_1); // Debug log
                    if (user_1) {
                        setUser({
                            id: user_1.$id || "", // Ensure it correctly maps to the Appwrite user ID
                            name: user_1.name || "User", // Fallback for missing name
                            username: user_1.username || "",
                            email: user_1.email || "",
                            imageUrl: user_1.imageUrl || "/assets/icons/profile-placeholder.svg",
                            bio: user_1.bio || "",
                        });
                        setIsAuthenticated(true);
                        return [2 /*return*/, true];
                    }
                    console.warn("⚠️ No authenticated user found.");
                    setUser(INITIAL_USER); // Reset user state
                    setIsAuthenticated(false);
                    return [2 /*return*/, false];
                case 3:
                    error_1 = _a.sent();
                    console.error("❌ Auth check error:", error_1);
                    setUser(INITIAL_USER);
                    setIsAuthenticated(false);
                    return [2 /*return*/, false];
                case 4:
                    setIsLoading(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    useEffect(function () {
        console.log("AuthProvider Mounted");
        if (localStorage.getItem('cookieFallback') === '[]' ||
            localStorage.getItem('cookieFallback') === null) {
            // console.log("Redirecting to sign-in...");
            navigate('/sign-in');
        }
        checkAuthUser().then(function (result) {
            console.log("Auth Check Result:", result);
            console.log("Updated User State:", user);
        });
    }, [isAuthenticated]); // Added dependency to re-check authentication state
    return (_jsx(AuthContext.Provider, { value: {
            user: user,
            isLoading: isLoading,
            isAuthenticated: isAuthenticated,
            setUser: setUser,
            setIsAuthenticated: setIsAuthenticated,
            checkAuthUser: checkAuthUser
        }, children: children }));
};
export default AuthProvider;
export var useUserContext = function () { return useContext(AuthContext); };
