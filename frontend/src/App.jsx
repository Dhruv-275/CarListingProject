import { useState } from "react";
import "./App.css";
import { useRoutes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Private from "./middleware/Private";
import Home from "./pages/Home";
import NoPage from "./pages/NoPage";
import About from "./pages/About";
import ContactUs from "./pages/Contact";
import Public from "./Middleware/public";
function App() {
  const publicRoute = [
      {
      path: "/home",
      element: (
        <Public>
          <Home />
        </Public>
      ),
    },
      {
      path: "/about",
      element: (
        <Public>
          <About />
        </Public>
      ),
    },
    {
      path: "/contact",
      element: (
        <Public>
          <ContactUs />
        </Public>
      ),
    },
  ];
  const privateRoutes = [
    {
      path: "/profile",
      element: (
        <Private>
          {/* <Profile /> */}
        </Private>
      ),
    },
    {
      path: "*",
      element: (
        <Private>
          <NoPage />
        </Private>
      ),
    },
  ];
  const element = useRoutes([...publicRoute, ...privateRoutes]);
  return element;
}

export default App;
