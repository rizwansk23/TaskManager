import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./Layout/AppLayout";
import Main from "./Components/Main/Main";
import { useState } from "react";
import { data, type dataProp } from "./data/data";
import Home from "./Components/Home/Home";

const App = () => {

  const [Data, setData] = useState<dataProp[]>(data);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const route = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout Data={Data} setData={setData} isOpen={isOpen} setIsOpen={setIsOpen} />,
      children: [
        {
          path: "/:taskTitle/",
          element: <Main Data={Data} />
        }, {
          path: '/',
          element: <Home Data={Data} isOpen={isOpen} setIsOpen={setIsOpen} />
        }
      ],
    },
  ]);
  return <RouterProvider router={route} />;
};

export default App;
