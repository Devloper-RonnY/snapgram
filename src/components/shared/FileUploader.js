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
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
var FileUploader = function (_a) {
    var fieldChange = _a.fieldChange, mediaUrl = _a.mediaUrl;
    var _b = useState([]), file = _b[0], setfile = _b[1];
    var _c = useState(mediaUrl), fileUrl = _c[0], setFileUrl = _c[1];
    var onDrop = useCallback(function (acceptedFiles) {
        setfile(acceptedFiles);
        fieldChange(acceptedFiles);
        setFileUrl(URL.createObjectURL(acceptedFiles[0]));
    }, [file]);
    var _d = useDropzone({
        onDrop: onDrop,
        accept: {
            'image/*': ['.png', '.jpeg', '.jpg', '.svg']
        }
    }), getRootProps = _d.getRootProps, getInputProps = _d.getInputProps;
    return (_jsxs("div", __assign({}, getRootProps(), { className: 'flex flex-col flex-center bg-dark-3 rounded-xl cursor-pointer ', children: [_jsx("input", __assign({}, getInputProps(), { className: 'cursor-pointer' })), fileUrl ? (_jsxs(_Fragment, { children: [_jsx("div", { className: 'flex flex-1 justify-center w-full p-5 lg:p-10', children: _jsx("img", { src: fileUrl, alt: 'image', className: 'file-uploader_img' }) }), _jsx("p", { className: 'file_uploader-label', children: "Click or drag photo to replace" })] })) : (_jsxs("div", { className: 'file_uploader-box', children: [_jsx("img", { src: '/assets/icons/file-upload.svg', width: 96, height: 77, alt: 'file-upload' }), _jsx("h3", { className: 'base-medium text-light-2 mb-2 mt-4', children: "Drag photo here" }), _jsx("p", { className: 'text-light-4 small-regular mb-6', children: "SVG, PNG, JPG" }), _jsx("button", { className: 'shad-button_dark_4', children: "select from computer" })] }))] })));
};
export default FileUploader;
