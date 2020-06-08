import Boleta from "../components/Boleta";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "../theme";

export default function Home() {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <main>
          <AppBar position="static">
            <Toolbar>
              <Typography color="inherit">Generá tu boleta de pago</Typography>
            </Toolbar>
          </AppBar>
          <Boleta />
        </main>
        <footer>AREF</footer>
      </ThemeProvider>
    </div>
  );
}
