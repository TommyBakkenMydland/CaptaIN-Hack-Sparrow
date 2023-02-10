import { Counter } from "./components/Counter";
import { PirateAlert } from "./components/PirateAlert";
import { Home } from "./components/Home";

const AppRoutes = [
  {
    index: true,
    element: <Home />,
  },
  {
    path: "/counter",
    element: <Counter />,
  },
  {
    path: "/pirate-alert",
    element: <PirateAlert />,
  },
];

export default AppRoutes;
