import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./Layout/AppLayout";
import Main from "./Components/Main/Main";
import { useState } from "react";
import { data, type dataProp } from "./data/data";

const App = () => {

  const [Data, setData] = useState<dataProp[]>(data);
  const route = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout Data={Data} setData={setData} />,
      children: [
        {
          path: "/:taskTitle/",
          element: <Main Data={Data} />
        }
      ],
    },
  ]);
  return <RouterProvider router={route} />;
};

export default App;
