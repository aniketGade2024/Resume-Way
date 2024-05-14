import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import AppRouter from "./AppRouter"
import { NavWrapper } from "./components/organizms"
import { useLocation } from "react-router-dom";
import { checkHiddenRoute } from "./utils/helpers/common";

const queryClient = new QueryClient();

const App = () => {
  const { pathname } = useLocation();

  return (
    <QueryClientProvider client={queryClient}>
      <NavWrapper isHide={checkHiddenRoute(pathname)}>
        <AppRouter />
      </NavWrapper>
    </QueryClientProvider>
  )
}

export default App
