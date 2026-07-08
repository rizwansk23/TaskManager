import React from "react";
import { GetPath } from "../../Hook/GetPaths";
import type { getData } from "../../Layout/AppLayout";
import { useNavigate } from "react-router-dom";
import MainPage from "../../Pages/MainPage";
import SkeletonPage from "../../Pages/SkeletonPage";

export type onlyData = Pick<getData, "Data" | 'isLoading' | 'setData'>

const Main: React.FC<onlyData> = ({ Data, isLoading , setData }) => {
    const location = GetPath();
    const Paths = decodeURIComponent(location) //remove the space %20 in url 
    const navigate = useNavigate()
    
    if (isLoading) {
        return <SkeletonPage />;
    }   

    const isTaskFound = Data.some((project) => project.name === Paths);

    if(!isTaskFound) navigate('/');

    return (
        <>
            {isTaskFound ? (
                <MainPage name={Paths} data={Data} setData={setData} />
            ) : (
                <div className="w-full bg-bg h-screen">
                    <h1 className="text-text">not found</h1>
                </div>
            )}
        </>
    );
};

export default Main;
