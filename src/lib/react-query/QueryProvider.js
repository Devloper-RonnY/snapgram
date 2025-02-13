import { jsx as _jsx } from "react/jsx-runtime";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
var queryClient = new QueryClient();
export var QueryProvider = function (_a) {
    var children = _a.children;
    return (_jsx(QueryClientProvider, { client: queryClient, children: children }));
};
export default QueryProvider;
