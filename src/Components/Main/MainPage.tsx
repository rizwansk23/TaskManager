import React, { useState } from "react";
import { Menu } from "lucide-react";
import TileBox from "./TileBox";
import Modal from "./Modal";
import { type dataProp, type Task, type TaskType } from "../../data/data";
import axios from "axios";

const COLUMNS: { status: TaskType; title: string }[] = [
    { status: "todo", title: "To Do" },
    { status: "progress", title: "In Progress" },
    { status: "completed", title: "Done" },
];

const MainPage: React.FC<{ name: string, data : dataProp[] }> = ({ name, data }) => {

    const [Data, setData] = useState<dataProp[]>(data);

    const [draggingId, setDraggingId] = useState<string | null>(null);

    const userTasks : Task[] = Data.find((d) => d.name === name)?.tasks ?? [];

const currentProject: dataProp | undefined = data.find((data) => data.name == name)
    const handleDrop = async(targetType: TaskType) => {
        if (!draggingId) return;
        setData((prev) =>
            prev.map((d) =>
                d.name !== name
                    ? d
                    : {
                        ...d,
                        task: d.tasks?.map((t) =>
                            t._id === draggingId ? { ...t, type: targetType } : t,
                        ),
                    },
            ),
        );


        await axios.patch(`http://localhost:8000/project/${currentProject?._id}/task/${draggingId}`,{status:targetType})

        setDraggingId(null);
    };

    // console.log(userTasks)

    return (
        <div className="w-full bg-bg text-text">
            <nav className="px-4 py-2 pb-5 border-b-2 border-code-bg ">
                <div className="flex justify-between items-center">
                    <kbd className="text-4xl text-text-h py-4">{name.toUpperCase()}</kbd>
                    <Modal name={name} data={data} setData={setData} />
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
                        key={col.status}
                        title={col.title}
                        type={col.status}
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
