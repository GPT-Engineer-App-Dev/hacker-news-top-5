import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ChakraProvider, extendTheme, ColorModeScript } from "@chakra-ui/react";
import { ColorModeProvider, CSSReset } from "@chakra-ui/react";

const config = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const theme = extendTheme({ config });

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <ColorModeProvider options={{ initialColorMode: "light", useSystemColorMode: false }}>
        <CSSReset />
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <App />
      </ColorModeProvider>
    </ChakraProvider>
  </React.StrictMode>
);
