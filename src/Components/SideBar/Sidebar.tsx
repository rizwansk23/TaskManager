import { Delete, Edit, FolderPlus, Plus } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { data, type dataProp } from "../../data/data";
import { useOutsideClick } from "../../Hook/CheckOutsideCLick";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [SidebarData, setSidebarData] = useState<dataProp[]>(data); //side bar data <folder name>
  const [isOpen, setIsOpen] = useState<boolean>(false); // check the input is open or not for naming the folder name
  const [Inputvalue, setInputvalue] = useState<string>(""); // conatin input value
  const [Selected, setSelected] = useState<string>("");

  const ref = useRef<HTMLInputElement | null>(null); // reference of input box

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
    setSidebarData((prev) => [
      ...prev,
      { name: Inputvalue.trim() },
    ]);
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
            {SidebarData.map((data, index) => {
              return (
                <div
                  onClick={() => setSelected(data.name)}
                  key={index}
                  className={` rounded-xl /active:scale-98 ease-in-out ${SidebarData[index].name == Selected && "bg-[#000000b1]"}`}
                >
                  <List datas={data.name} index={index} setSidebarData={setSidebarData} SidebarData={SidebarData} />
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

const List: React.FC<{ datas: string; index: number, SidebarData: any, setSidebarData: React.Dispatch<React.SetStateAction<any>> }> = ({ datas, index, SidebarData, setSidebarData }) => {
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [value, setvalue] = useState<string>(datas);
  const ref = useRef<HTMLInputElement | null>(null);
  // const [SidebarData, setSidebarData] = useState(data); 

  useEffect(() => {
    if (!isDisabled) {
      ref.current?.focus();
      ref.current?.select();
      return;
    }
    ref.current?.blur();
  }, [isDisabled]);

  useOutsideClick(ref, () => setIsDisabled(true));

  function HandleUpdate(e: React.SubmitEvent | React.KeyboardEvent) {
    e.preventDefault();
    setIsDisabled(!isDisabled);
  }

  return (
    <div className={`hover:border-border hover:bg-bg px-3  py-1 rounded-xl `}>
      <span className={`flex justify-between items-center  `}>
        <Link to={value}>
          <li className="w-full list-none active:scale-95">
            <input
              ref={ref}
              readOnly={isDisabled}
              type="text"
              value={value}
              name={value}
              id={value}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setvalue(e.target.value);
              }}
              key={index}
              className={`list-none text-text-h cursor-pointer text-lg w-full ${isDisabled && "outline-none focus:outline-none focus:ring-0"}`}
              onKeyDown={(e) => {
                if (e.key == "Enter") {
                  HandleUpdate(e);
                }
              }}
            />
          </li>
        </Link>
        {isDisabled && (
          <div className=" gap-3 flex">
            <Edit
              className="cursor-pointer active:scale-95"
              onClick={() => {
                setIsDisabled(!isDisabled);
              }}
              size={16}
            />
            <Delete
              className="cursor-pointer active:scale-95"
              // onClick={() => {
              //   const val = SidebarData[index].name
              //   setSidebarData((prev:dataProp[])=> prev.splice(index,1))
              //   // console.log( )
              // }}
              size={16} />
          </div>
        )}
      </span>
    </div>
  );
};
