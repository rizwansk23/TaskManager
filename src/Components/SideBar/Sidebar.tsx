import {  FolderPlus, Plus } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useOutsideClick } from "../../Hook/CheckOutsideCLick";
import { useNavigate } from "react-router-dom";
import type { getData } from "../../Layout/AppLayout";
import List from "./List";
import type { dataProp } from "../../data/data";

const Sidebar: React.FC<getData> = ({ Data, setData }) => {

  const data : dataProp[] = Data;
  const [isOpen, setIsOpen] = useState<boolean>(false); // check the input is open or not for naming the folder name
  const [Inputvalue, setInputvalue] = useState<string>(""); // conatin input value
  const [Selected, setSelected] = useState<string>("");

  const ref = useRef<HTMLInputElement | null>(null); // reference of input box
    const navigate = useNavigate();

  //foucs the input box when its open and unfoucs when its close
  useEffect(() => {
    if (isOpen) {
      ref.current?.focus();
      return;
    }
    ref.current?.blur();
  }, [isOpen]);

  window.addEventListener("keydown", (e) => {
    if (e.ctrlKey && e.key === "F") {
      setIsOpen(!isOpen);
    }
  });

  useOutsideClick(ref, () => {
    setIsOpen(false);
  });

  function Handlesubmit(e: React.SubmitEvent | React.KeyboardEvent) {
    e.preventDefault();
    if (!Inputvalue.trim()) return;
    setData((prev) => [
      ...prev,
      { name: Inputvalue.trim() },
    ]);
    navigate(`/${Inputvalue}`)
    setIsOpen(!isOpen);
  }

  const keyboard = "ctrl + shift + f";

  return (
    <form className="w-3/12 h-screen sticky top-0 self-start">
      <aside className="w-full h-full  text-text bg-code-bg flex flex-col">
        <header className="flex gap-3 items-center h-20 border-b px-4 py-6">
          <div className="logo border-border px-4 py-3 bg-taupe-400 rounded-2xl text-white">
            <Plus />
          </div>
          <h1 className="text-4xl text-white">To-do</h1>
        </header>
        <main className="flex-1 px-2">
          <div className="flex justify-between items-center px-4 py-5 ">
            <h1 className="text-base">Projects</h1>
            <div
              onClick={(e: React.MouseEvent) => {
                e.stopPropagation();
                setIsOpen(!isOpen);
              }}
            >
              <span title={keyboard}>
                <FolderPlus size={16} />
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-2 pb-4">
            {data.map((data, index) => {
              return (
                <div
                  onClick={() => setSelected(data.name)}
                  key={index}
                  className={` rounded-xl /active:scale-98 ease-in-out ${Data[index].name == Selected && "bg-[#000000b1]"}`}
                >
                  <List datas={data.name} index={index} setData={setData} />
                </div>
              );
            })}
          </div>
          {isOpen && (
            <input
              ref={ref}
              type="text"
              id="foldername"
              name="foldername"
              className="border-white text-text-h w-full text-lg"
              onChange={(e) => {
                setInputvalue(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key == "Enter") {
                  Handlesubmit(e);
                }
              }}
            />
          )}
        </main>
      </aside>
    </form>
  );
};

export default Sidebar;