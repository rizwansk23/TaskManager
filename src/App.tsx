import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./Layout/AppLayout";
import Main from "./Components/Main/Main";
import { useEffect, useState } from "react";
import { type dataProp } from "./data/data";
import Home from "./Components/Home/Home";
import GenerateId from "./utils/GenerateId";
import axios from "axios";

const App = () => {

  const [Data, setData] = useState<dataProp[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false); //used to create or open to create a new folder 
  const [isloading, setLoading] = useState<boolean>(true)

  const guestId = GenerateId();

  useEffect(() => {
    const fetch = async () => {
      try{
        const response = await (await axios.get('http://localhost:8000/project', { params: { "guestId": guestId } })).data

      setData(response.data)
      setLoading(false);
      }catch(err){
        console.log(err);
        console.log("not connected");
      }
    }

    fetch()
  }, [])



  const route = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout Data={Data} setData={setData} isOpen={isOpen} setIsOpen={setIsOpen} />,
      children: [
        {
          path: "/:taskTitle/",
          element: <Main Data={Data} isLoading={isloading}/>
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
