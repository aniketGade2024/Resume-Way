import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import AppRouter from "./AppRouter"
import { NavWrapper } from "./components/organizms"

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <NavWrapper>
        <AppRouter />
      </NavWrapper>
    </QueryClientProvider>
  )
}

export default App
