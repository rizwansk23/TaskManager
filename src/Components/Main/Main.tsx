import React, { useMemo } from "react";
import { GetPath } from "../../Hook/GetPaths";
import MainPage from "./MainPage";
import type { getData } from "../../Layout/AppLayout";

type onlyData = Omit<getData, "setData">

const Main: React.FC<onlyData> = ({ Data }) => {
    const location = GetPath();

    const taskNames = useMemo(() => {
        if (!Data) return [];
        return Data.map((task) => task.name);
    }, [Data]);

    const isTaskFound = taskNames.includes(location);

    return (
        <>
            {isTaskFound ? (
                <MainPage name={location} />
            ) : (
                <div className="w-full bg-red-100 h-screen">
                    <h1 className="text-text">not found</h1>
                </div>
            )}
        </>
    );
};

export default Main;
