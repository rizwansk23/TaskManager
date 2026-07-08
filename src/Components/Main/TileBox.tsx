import React, {
  useState,
  type DragEvent,
} from "react";
import { type Task, type TaskType } from "../../data/data";
import TodoCard from "./TodoCard";

interface TileBoxProps {
  title: string;
  type: TaskType;
  tasks: Task[];
  draggingId: string | null;
  handleDone: (taskId: string, task: Task) => Promise<void>;
  handleDelete : (taskID:string ) => Promise<void>;
  onDragStart: (id: string) => void;
  onDragEnd: () => void;
  onDrop: (targetType: TaskType) => void;
}

const TileBox: React.FC<TileBoxProps> = ({
  title,
  type,
  tasks,
  draggingId,
  handleDone,
  handleDelete,
  onDragStart,
  onDragEnd,
  onDrop,
}) => {
  const [isOver, setIsOver] = useState(false);
  const filtered = tasks.filter((t) => t.status === type);

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

  return (
    <section
      onDragOver={handleDragOver}
      onDragLeave={(e) => {
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
      <header className="flex items-center gap-3 px-1 mb-2">
        <h2 className="font-bold text-sm">{title}</h2>
        <span className="text-xs text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-full">
          {filtered.length}
        </span>
        <hr className="border-2 border-border flex-1" />
      </header>

      <div className="flex flex-col gap-1">
        {filtered.length === 0 && (
          <p className="text-xs text-gray-400 text-center py-4">
            Drop tasks here
          </p>
        )}

        {filtered.map((task) => {
          const isSelected: boolean = task.status === "completed";
          return (
            <div
              key={task._id}
              draggable
              onDragStart={(e) => {
                e.dataTransfer.effectAllowed = "move";
                e.dataTransfer.setData("text/plain", task._id);
                onDragStart(task._id);
              }}
              onDragEnd={onDragEnd}
              className={`
                ${draggingId === task._id ? "opacity-40 scale-95" : "opacity-100"}
              `}
            >
              <TodoCard
              handleDelete={handleDelete}
                isSelected={isSelected}
                task={task}
                handleDone={handleDone}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default TileBox;


