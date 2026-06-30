import React, { useState } from "react";
import { Menu } from "lucide-react";
import TileBox from "./TileBox";
import Modal from "./Modal";
import { data, type dataProp, type TaskType } from "../../data/data";

const COLUMNS: { type: TaskType; title: string }[] = [
    { type: "todo", title: "To Do" },
    { type: "progress", title: "In Progress" },
    { type: "done", title: "Done" },
];

const MainPage: React.FC<{ name: string }> = ({ name }) => {

    const [Data, setData] = useState<dataProp[]>(data);

    const [draggingId, setDraggingId] = useState<string | null>(null);

    const userTasks = Data.find((d) => d.name === name)?.task ?? [];


    const handleDrop = (targetType: TaskType) => {
        if (!draggingId) return;
        setData((prev) =>
            prev.map((d) =>
                d.name !== name
                    ? d
                    : {
                        ...d,
                        task: d.task?.map((t) =>
                            t.id === draggingId ? { ...t, type: targetType } : t,
                        ),
                    },
            ),
        );
        setDraggingId(null);
    };
    return (
        <div className="w-full bg-bg text-text">
            <nav className="px-4 py-2 pb-5 border-b-2 border-code-bg ">
                <div className="flex justify-between items-center">
                    <kbd className="text-4xl text-text-h py-4">{name.toUpperCase()}</kbd>
                    <Modal />
                </div>
                <div className="flex justify-between items-center gap-5">
                    <input
                        type="search"
                        name="serach"
                        placeholder="search"
                        id="search"
                        className="w-full px-2 py-2 text-xl   border rounded-2xl focus:outline-text-h focus:outline-2 focus:ring-accent-bg focus:ring-2"
                    />
                    <Menu className="active:scale-95 active:text-white" />
                </div>
            </nav>
            <main className="px-8 py-5  bg-inherit">
                {COLUMNS.map((col) => (
                    <TileBox
                        key={col.type}
                        title={col.title}
                        type={col.type}
                        tasks={userTasks}
                        draggingId={draggingId}
                        name={name}
                        setData={setData}
                        onDragStart={(id) => setDraggingId(id)}
                        onDragEnd={() => setDraggingId(null)}
                        onDrop={handleDrop}
                    />
                ))}
            </main>
        </div>
    );
};

export default MainPage;
