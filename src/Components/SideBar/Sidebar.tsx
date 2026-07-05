import { FolderPlus, ListTodo } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useOutsideClick } from "../../Hook/CheckOutsideCLick";
import { useLocation, useNavigate } from "react-router-dom";
import type { getData } from "../../Layout/AppLayout";
import List from "./List";
import type { dataProp } from "../../data/data";
import axios from "axios";
import GenerateId from "../../utils/GenerateId";

const Sidebar: React.FC<Omit<getData, 'isLoading'>> = ({ Data, setData, isOpen, setIsOpen }) => {

  const location = useLocation().pathname

  const data: dataProp[] = Data;
  // const [isOpen, setIsOpen] = useState<boolean>(false); // check the input is open or not for naming the folder name
  const [Inputvalue, setInputvalue] = useState<string>(""); // conatin input value
  const [Selected, setSelected] = useState<string>(location);

  const ref = useRef<HTMLInputElement | null>(null); // reference of input box
  const navigate = useNavigate();

  const guestId = GenerateId()

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

  const Handlesubmit = async (e: React.SubmitEvent | React.KeyboardEvent) => {
    e.preventDefault();
    const value = Inputvalue.trim()
    if (!value) return;
    setData((prev) => [
      ...prev,
      { name: value },
    ]);

    await axios.post('http://localhost:8000/project', {
      ProjectName: value,
      guestId: guestId
    })
    // const values  = decodeURIComponent(value)
    // console.log(values)
    navigate(`/${value}`)
    setSelected(value)
    setIsOpen(!isOpen);
  }

  const keyboard = "ctrl + shift + f";

  return (
    <form className="w-3/12 h-screen sticky top-0 self-start">
      <aside className="w-full h-full  text-text bg-code-bg flex flex-col">
        <header
          onClick={() => {
            navigate('/');
            setSelected('')
          }}
          className="flex gap-3 items-center h-20 border-b-2 border-border px-4 py-6">
          <div className="logo border-border px-4 py-3 bg-accent-border  rounded-2xl text-white">
            <ListTodo size={28} />
          </div>
          <kbd className="text-4xl text-white">To-do</kbd>
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
                <FolderPlus size={18} className="active:scale-90 cursor-pointer" />
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-2 pb-4">
            {data.map((data, index) => {
              const isSelected: boolean = Data[index].name == Selected;
              return (
                <div
                  onClick={() => setSelected(data.name)}
                  key={data._id || data.name}
                  className={`list rounded-xl /active:scale-98 ease-in-out ${isSelected && "bg-[#000000b1]"}`}
                >
                  <List datas={data} index={index} setData={setData} isSelected={isSelected}  />
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