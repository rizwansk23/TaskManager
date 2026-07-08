import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./Layout/AppLayout";
import Main from "./Components/Main/Main";
import { useEffect, useState } from "react";
import { type dataProp } from "./data/data";
import Home from "./Pages/Home";
import GenerateId from "./utils/GenerateId";
import axios from "axios";
import NotFound from "./Pages/NotFound";

const App = () => {

  const [Data, setData] = useState<dataProp[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false); //used to create or open to create a new folder 
  const [isloading, setLoading] = useState<boolean>(true)

  const guestId = GenerateId(); // generate a random id 
  
  useEffect(() => {
    const fetch = async () => {
      try{
        const response = (await axios.get('/project', { params: { "guestId": guestId }})).data

      setData(response.data)
      setLoading(false);
      }catch(err){
        console.log(err); 
        console.log("not connected");
      }
    }

    fetch()
  }, [isOpen])


  const route = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout Data={Data} setData={setData} isOpen={isOpen} setIsOpen={setIsOpen} />,
      children: [
        {
          path: "/:taskTitle/",
          element: <Main Data={Data} isLoading={isloading} setData={setData}/>
        }, {
          path: '/',
          element: <Home Data={Data} isOpen={isOpen} setIsOpen={setIsOpen} />
        },{
          path:'*',
          element:<NotFound Data={Data}/>
        }
      ],
    },
  ]);
  return <RouterProvider router={route} />;
};

export default App;
