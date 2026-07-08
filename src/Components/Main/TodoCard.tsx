import { useEffect, useState, type MouseEvent } from "react";
import type { Task } from "../../data/data";

const TodoCard: React.FC<{
  task: Task;
  isSelected?: boolean;
  handleDone: (taskId: string, task: Task) => Promise<void>;
  handleDelete ?:  (taskID :string) => Promise<void>;
}> = ({ task, isSelected, handleDone , handleDelete }) => {
  const bg = {
    completed: "bg-green-400",
    todo: "bg-red-400",
    progress: "bg-yellow-400",
  };
  const [menuPos, setMenuPos] = useState<{x:number , y:number}>({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);

  const handleRightClick = (e: MouseEvent<HTMLDivElement | MouseEvent>) => {
    e.preventDefault();
    setMenuPos({ x: e.clientX, y: e.clientY });
    setVisible(true);
  };

  // Close the custom menu when clicking anywhere else
  useEffect(() => {
    const closeMenu = () => setVisible(false);
    window.addEventListener("click", closeMenu);
    return () => window.removeEventListener("click", closeMenu);
  }, []);

  return (
    <div
      onContextMenu={handleRightClick}
      className=" flex items-center gap-3  px-3 py-2.5 rounded-xl border border-transparent cursor-grab active:cursor-grabbing select-none transition-all duration-150 hover:border-gray-300 hover:bg-white dark:hover:bg-gray-800"
    >
      {visible && (
        <ul
          style={{
            position: "absolute",
            top: `${menuPos.y}px`,
            left: `${menuPos.x}px`,
          }}
          className=" py-2 px-1"
        >
          <li onClick={()=> handleDelete!(task._id)} 
            className="bg-border px-2 py-1 active:scale-98 text-red-600">delete</li>
        </ul>
      )}

      <span
        className="text-gray-300 text-lg leading-none"
        onPointerDown={(e) => e.stopPropagation()}
      >
        <div className={`size-2 rounded-full ${bg[task.status]}`} />
      </span>

      <input
        type="checkbox"
        checked={isSelected}
        id={task._id}
        name={task.name}
        className="accent-bg size-4.5 hover:accent-indigo-600 rounded-3xl hover:cursor-pointer"
        onChange={() => handleDone(task._id, task)}
        onPointerDown={(e) => e.stopPropagation()}
      />

      <span
        className={`flex-1 text-base    ${
          isSelected ? "line-through decoration-1 text-gray-600" : "text-text-h"
        }`}
      >
        {task.name}
      </span>

      <span className="text-xs text-gray-400 font-medium ">{task.date}</span>

      <span className="text-xs text-gray-400 capitalize">{task.status}</span>
    </div>
  );
};

export default TodoCard;