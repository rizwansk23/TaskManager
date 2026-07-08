import React, { useEffect, useState } from "react";
import Modal from "../Components/Main/Modal";
import { type dataProp, type Task, type TaskType } from "../data/data";
import TileBox from "../Components/Main/TileBox";
import { useDebounce } from "../Hook/Debouncing";
import TodoCard from "../Components/Main/TodoCard";
import api from "../utils/Axios";

const COLUMNS: { status: TaskType; title: string }[] = [
  { status: "todo", title: "To Do" },
  { status: "progress", title: "In Progress" },
  { status: "completed", title: "Done" },
];

const MainPage: React.FC<{
  name: string;
  data: dataProp[];
  setData: React.Dispatch<React.SetStateAction<dataProp[]>>;
}> = ({ name, data, setData }) => {
  // const [Data, setData] = useState<dataProp[]>(data);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [isSearch, setIsSearch] = useState<boolean>(false);
  const [searchTask, setSearchTask] = useState<Task[]>();
  const [searchValue, setSearchValue] = useState<string>("");
  const Debouncing = useDebounce(searchValue);

  const userTasks: Task[] = data.find((d) => d.name === name)?.tasks ?? [];

  const currentProject: dataProp | undefined = data.find(
    (d) => d.name === name,
  );

  useEffect(() => {
    if (Debouncing) {
      const task: Task[] | undefined = currentProject?.tasks?.filter((value) =>
        value.name.includes(searchValue),
      );
      setSearchTask(task);
      if (task) setIsSearch(true);
    }
    if (searchValue.trim() === "") setIsSearch(false);
  }, [Debouncing]);

  const handleDrop = async (targetType: TaskType) => {
    if (!draggingId) return;

    setData((prev) =>
      prev.map((d) =>
        d.name !== name
          ? d
          : {
              ...d,
              tasks: d.tasks?.map((t) =>
                t._id === draggingId ? { ...t, status: targetType } : t,
              ),
            },
      ),
    );

    setDraggingId(null);

    await api.patch(
      `/project/${currentProject?._id}/task/${draggingId}`,
      { status: targetType },
    );
  };

  const handleDone = async (taskId: string, task: Task): Promise<void> => {
    let taskType: TaskType;

    if (task.status === "todo") {
      taskType = "progress";
    } else if (task.status === "progress") {
      taskType = "completed";
    } else return;

    setData((prev) =>
      prev.map((d) =>
        d.name !== name
          ? d
          : {
              ...d,
              tasks: d.tasks?.map((t) =>
                t._id === taskId ? { ...t, status: taskType } : t,
              ),
            },
      ),
    );
    await api.patch(
      `/project/${currentProject?._id}/task/${taskId}`,
      { status: taskType },
    );
  };

  const handleDelete = async (taskId: string): Promise<void> => {
     setData((prev) =>
      prev.map((d) =>
        d.name !== name
          ? d
          : {
              ...d,
              tasks: d.tasks?.filter((t) =>
                t._id !== taskId 
              ),
            },
      ),
    );
    await api.delete(`/project/${currentProject?._id}/task/${taskId}`)
  };
  return (
    <div className="w-full bg-bg text-text">
      <nav className="px-4 py-2 pb-5 border-b-2 border-code-bg">
        <div className="flex justify-between items-center">
          <kbd className="text-4xl text-text-h py-4">{name.toUpperCase()}</kbd>
          <Modal
            currentProject={currentProject}
            setData={setData}
          />
        </div>
        <div className="flex justify-between items-center gap-5">
          <input
            type="search"
            name="search"
            placeholder="search"
            id="search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="w-full px-4 py-2 text-xl border rounded-2xl focus:outline-text-h focus:outline-2 focus:ring-accent-bg focus:ring-2"
          />
          {/* <Menu className="active:scale-95 active:text-white" /> */}
        </div>
      </nav>

      <main className="px-8 py-5 bg-inherit">
        {isSearch ? (
          searchTask?.length === 0 ? (
            <h1 className="text-xl text-text text-center">not found</h1>
          ) : (
            searchTask?.map((task, index) => {
              const isSelected: boolean = task.status === "completed";
              return (
                <TodoCard
                  key={index}
                  isSelected={isSelected}
                  task={task}
                  handleDone={handleDone}
                />
              );
            })
          )
        ) : (
          COLUMNS.map((col) => (
            <TileBox
              key={col.status}
              title={col.title}
              type={col.status}
              tasks={userTasks}
              draggingId={draggingId}
              handleDone={handleDone}
              handleDelete={handleDelete}
              onDragStart={(id) => setDraggingId(id)}
              onDragEnd={() => setDraggingId(null)}
              onDrop={handleDrop}
            />
          ))
        )}
      </main>
    </div>
  );
};

export default MainPage;
