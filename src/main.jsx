import ReactDOM from "react-dom/client";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App";
import UserProvider from "./store/UserContext";
import theme from "./theme";
import "./index.css";
const querryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={querryClient}>
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <UserProvider>
        <App />
      </UserProvider>
    </ChakraProvider>
  </QueryClientProvider>
);
