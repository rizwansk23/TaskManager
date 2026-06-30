import { useEffect, useState } from "react";
import { data, type dataProp } from "../../data/data";
import { GetPath } from "../../Hook/GetPaths";
import MainPage from "./MainPage";

const Main = () => {
    const location = GetPath();

    const Datas: dataProp[] = data;

    const [tasks,setTasks] = useState<string[]>(Datas.map((task)=> task.name)); //data.name fetch data name from backened

    useEffect(() => {
      setTasks(Datas.map((task)=> task.name))
    }, [location])
    


    return (
        <>
            {tasks.includes(location) ? (
                <MainPage name={location} />
                // <MainPage name='project1'/>
            ) : (
                <div className="w-full bg-red-100 h-screen">
                    <h1 className="text-text">not found</h1>
                </div>
            )}
        </>
    );
};

export default Main;
