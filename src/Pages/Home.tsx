import React, { useState } from "react";

import { Link } from "react-router-dom";
import type { getData } from "../Layout/AppLayout";
import { Layers } from "lucide-react";
import AddButton from "../Components/AddButton";

type getonlyData = Omit<getData, "setData" | 'isLoading'>;

const Home: React.FC<getonlyData> = ({ Data, isOpen, setIsOpen }) => {
  const [open, setopen] = useState<boolean>(false);
  return (
    <div className="w-full bg-bg text-text flex justify-center">
      <div className="flex flex-col justify-center items-center gap-5">
        <div className="border border-border rounded-2xl bg-code-bg px-4 py-2 text-gray-500">
          <Layers size={60} />
        </div>
        <kbd className="text-4xl text-text-h font-bold">Your WorkSpace</kbd>
        <div className="leading-5 tracking-tight text-center">
          <h5>Select a project from the sidebar </h5>
          <h5>or</h5>
          <h5> create a new one to get started.</h5>
        </div>
        <AddButton
          text="Add Project"
          Function={() => {
            setIsOpen(!isOpen);
          }}
        />
        {Data && <kbd className="uppercase">Recent Projects</kbd>}
        <div
          className={`grid grid-cols-3 gap-3 ${
            open ? "h-fit" : "overflow-hidden h-30"
          }`}
        >
          {Data.slice(0, open ? Data.length : 3).map((data) => {
            const taskCount = data.tasks?.length ?? 0;

            return (
              <Link key={data.name} to={data.name}>
                <div className="border border-border hover:border-gray-600 rounded-2xl bg-code-bg px-4 py-2 w-40 hover:bg-border">
                  <h1 className="text-xl text-text-h font-bold">{data.name}</h1>
                  <p>{taskCount} task</p>
                </div>
              </Link>
            );
          })}
        </div>
        <div className="flex justify-end items-end">
          {Data.length > 3 && (
            <button
              className=" font-extrabold cursor-pointer hover:text-blue-500 hover:underline"
              onClick={() => setopen((prev) => !prev)}
            >
              {open ? "less..." : "more..."}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
