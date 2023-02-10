import { Statistics } from "./components/Statistics";
import { PirateAlert } from "./components/PirateAlert";
import { Home } from "./components/Home";

const AppRoutes = [
  {
    index: true,
    element: <Home />,
  },
  {
    path: "/statistics",
    element: <Statistics />,
  },
  {
    path: "/pirate-alert",
    element: <PirateAlert />,
  },
];

export default AppRoutes;
