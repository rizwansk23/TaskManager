import { X } from "lucide-react";
import React, { useState } from "react";
import AddButton from "../AddButton";
import type { dataProp } from "../../data/data";
import api from "../../utils/Axios";

const Modal: React.FC<{ currentProject : dataProp | undefined, setData: React.Dispatch<React.SetStateAction<dataProp[]>> }> = ({ currentProject, setData }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [isEmpty, setEmpty] = useState<boolean>(false);

  const currentdate = new Date().toISOString().split("T")[0];

  async function HandleSubmit(e: React.SubmitEvent) {
    e.preventDefault();
    
    const TitleValue = title.trim()

    if (TitleValue === '') return setEmpty(true)

    const id : string = crypto.randomUUID().toString()

    setData((prev) =>
      prev.map((project) =>
        project.name === currentProject?.name
          ? {
            ...project,
            tasks: [
              ...(project.tasks ?? []),
              {
                _id: id,
                name: title,
                status: "todo",
                date: currentdate
              },
            ],
          }
          : project
      )
    );

    try {
      await api.post(`/project/${currentProject?._id}/task`, { _id: id, name: TitleValue, date: currentdate });
    }
    catch (err) {
      alert(err)
    } finally {
      setTitle("");
      setEmpty(false)
      setIsOpen(!isOpen);
    }
  }

  return (
    <div>
      <AddButton text="Add Task" Function={() => { setIsOpen(!isOpen) }} />
      {isOpen && (
        <div
          id="modal"
          popover="manual"
          className="w-full h-screen bg-[#00000055] fixed z-99 text-text flex items-center justify-center "
        >
          <div className="bg-black w-1/3 h-fit px-4 py-5 rounded-2xl">
            <header className="flex justify-between items-center text-text-h text-xl">
              <kbd className="text-3xl font-bold">Create</kbd>
              <button className="cursor-pointer active:scale-90" onClick={() => setIsOpen((prev) => !prev)}>
                <X />
              </button>
            </header>
            <main>
              <form
                onSubmit={(e) => {
                  HandleSubmit(e);
                }}
                className="flex flex-col"
              >
                <div className="title flex flex-col gap-1.5 py-2 pb-20">
                  <label htmlFor="title" className="text-base font-medium">
                    Task title
                  </label>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="title"
                    className="border border-border rounded-xl py-2 px-3 text-xl text-text-h"
                  />
                  {isEmpty && <h2 className="text-red-600 px-3 ">opps.. please enter the value </h2>}
                </div>
                <input type="submit" value="create" className="flex items-center hover:border-boder cursor-pointer hover:border rounded-2xl text-lg  text-center  py-2 " />
              </form>
            </main>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal