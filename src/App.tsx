import Routes from "./routes";
import { ThemeProvider } from "@mui/material";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";
import { theme } from "./theme";

const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

export default function App() {
  return (
    <main>
      <CacheProvider value={cacheRtl}>
        <ThemeProvider theme={theme}>
          <Routes />
        </ThemeProvider>
      </CacheProvider>
    </main>
  );
}
