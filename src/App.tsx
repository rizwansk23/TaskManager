import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./Layout/AppLayout";
import Main from "./Components/Main/Main";

const App = () => {
  const route = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      children: [
        { path: "/:taskTitle/",
          element: <Main />
        }
      ],
    },
  ]);
  return <RouterProvider router={route}/>;
};

export default App;
