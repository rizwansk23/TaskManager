import React, { useState, type DragEvent } from "react";
import { type dataProp, type Task, type TaskType } from "../../data/data";

interface TileBoxProps {
  title: string;
  type: TaskType;
  tasks: Task[];
  draggingId: string | null;
  onDragStart: (id: string) => void;
  onDragEnd: () => void;
  onDrop: (targetType: TaskType) => void;
}

interface TileBoxProps {
  title: string;
  type: TaskType;
  tasks: Task[];
  draggingId: string | null;
  name: string;
  setData: React.Dispatch<React.SetStateAction<dataProp[]>>;
  onDragStart: (id: string) => void;
  onDragEnd: () => void;
  onDrop: (targetType: TaskType) => void;
}

const TileBox: React.FC<TileBoxProps> = ({
  title,
  type,
  tasks,
  draggingId,
  name,
  setData,
  onDragStart,
  onDragEnd,
  onDrop,
}) => {
  const [isOver, setIsOver] = useState(false);
  const filtered = tasks.filter((t) => t.type === type);

  const handleDragOver = (e: DragEvent<HTMLElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setIsOver(true);
  };

  const handleDrop = (e: DragEvent<HTMLElement>) => {
    e.preventDefault();
    setIsOver(false);
    onDrop(type);
  };
  const handleDone = (taskId: string) => {
    setData((prev) =>
      prev.map((d) =>
        d.name !== name // "name" = current user/project prop
          ? d
          : {
              ...d,
              task: d.task?.map(
                (t) => (t.id === taskId ? { ...t, type: "done" } : t),
              ),
            },
      ),
    );
  };

  return (
    <section
      onDragOver={handleDragOver}
      onDragLeave={(e) => {
        // only clear when truly leaving the section (not entering a child)
        if (!e.currentTarget.contains(e.relatedTarget as Node)) {
          setIsOver(false);
        }
      }}
      onDrop={handleDrop}
      className={`mb-6 rounded-2xl p-2 border-2 transition-colors duration-150 ${
        isOver
          ? "border-dashed border-blue-400 bg-blue-50 dark:bg-blue-950/20"
          : "border-transparent"
      }`}
    >
      {/* Header */}
      <header className="flex items-center gap-3 px-1 mb-2">
        <h2 className="font-bold text-sm">{title}</h2>
        <span className="text-xs text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-full">
          {filtered.length}
        </span>
        <hr className="border border-border flex-1" />
      </header>

      {/* Cards */}
      <div className="flex flex-col gap-1 ">
        {filtered.length === 0 && (
          <p className="text-xs text-gray-400 text-center py-4">
            Drop tasks here
          </p>
        )}

        {filtered.map((task) => {
          const isSelected = task.type == "done";
          return (
            <label
              key={task.id}
              htmlFor={task.id}
              draggable
              onDragStart={(e) => {
                e.dataTransfer.effectAllowed = "move";
                e.dataTransfer.setData("text/plain", task.id);
                onDragStart(task.id);
              }}
              onDragEnd={onDragEnd}
              className={`
              flex items-center gap-3 px-3 py-2.5 rounded-xl
              border border-transparent cursor-grab active:cursor-grabbing
              select-none transition-all duration-150
              hover:border-gray-300 hover:bg-white dark:hover:bg-gray-800
              ${draggingId === task.id ? "opacity-40 scale-95" : "opacity-100"}
            `}
            >
              <span
                className="text-gray-300 text-lg leading-none"
                onPointerDown={(e) => e.stopPropagation()}
              >
                <div className="size-2 rounded-full bg-red-400"></div>
              </span>

              <input
                type="checkbox"
                checked={isSelected}
                id={task.id}
                name={task.name}
                className="accent-blue-500"
                onChange={() => {
                  handleDone(task.id);
                }}
                onPointerDown={(e) => e.stopPropagation()}
              />

              <span className="flex-1 text-sm">{task.name}</span>

                {/* <span>{Date()}</span> */}
              <span className="text-xs text-gray-400 capitalize">
                {task.type}
              </span>
            </label>
          );
        })}
      </div>
    </section>
  );
};
export default TileBox;
