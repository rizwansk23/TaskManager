import React from "react";
import { GetPath } from "../../Hook/GetPaths";
import type { getData } from "../../Layout/AppLayout";
import { useNavigate } from "react-router-dom";
import MainPage from "./MainPage";

export type onlyData = Pick<getData, "Data" | 'isLoading'>

const Main: React.FC<onlyData> = ({ Data, isLoading }) => {
    const location = GetPath();
    const Paths = decodeURIComponent(location) //remove the space %20 in url 
    const navigate = useNavigate()
    
    if (isLoading) {
        return <div>Loading...</div>;
    }   

    const isTaskFound = Data.some((project) => project.name === Paths);

    if(!isTaskFound) navigate('/');

    return (
        <>
            {isTaskFound ? (
                <MainPage name={Paths} data={Data} />
            ) : (
                <div className="w-full bg-red-100 h-screen">
                    <h1 className="text-text">not found</h1>
                </div>
            )}
        </>
    );
};

export default Main;
