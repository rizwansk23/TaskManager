import { Delete, Edit, Folder, FolderOpen } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useOutsideClick } from "../../Hook/CheckOutsideCLick";
import { Link, useNavigate } from "react-router-dom";
import { type dataProp } from "../../data/data";
import axios from "axios";

interface ListProp {
  datas: dataProp;
  index: number;
  setData: React.Dispatch<React.SetStateAction<dataProp[]>>;
  isSelected: boolean;
}

const List: React.FC<ListProp> = ({ datas, index, setData, isSelected }) => {
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [value, setvalue] = useState<string>(datas.name);
  const ref = useRef<HTMLInputElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  // const [SidebarData, setSidebarData] = useState(data);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isDisabled) {
      ref.current?.focus();
      ref.current?.select();
      return;
    }
    ref.current?.blur();
  }, [isDisabled]);

  useOutsideClick(ref, () => {
    if (value.trim() == "") return;
    setIsDisabled(true);
  });

  async function HandleUpdate(e: React.SubmitEvent | React.KeyboardEvent) {
    e.preventDefault();

    const inputValue = value.trim();

    if (inputValue === "") {
      setvalue(datas.name);
      setIsDisabled(true);
      return;
    }

    // update the data here
    setData((prev) =>
      prev.map((d) => (d.name === datas.name ? { ...d, name: inputValue } : d)),
    );

    await axios.patch(`http://localhost:8000/project/${datas._id}`, { name: inputValue.trim() })

    navigate(`/${value}`);
    setvalue(inputValue);
    setIsDisabled(true);
  }

  const handleDelete = async () => {
    setData((prev) =>  prev.filter((data) => { return data._id !== datas._id }) )
    await axios.delete(`http://localhost:8000/project/${datas._id}`)
  }

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`hover:border-border hover:bg-bg px-3  py-1 rounded-xl `}
    >
      <span className={`flex justify-between items-center gap-2 `}>
        <div className="">
          {isSelected ? <FolderOpen size={18} /> : <Folder size={18} />}
        </div>
        <Link to={value}>
          <li className="w-full px-2 list-none /active:scale-95">
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

                if (e.key === "F2") {
                  if (value.trim() == "") return;

                  setIsDisabled(!isDisabled);
                }
              }}
            />
          </li>
        </Link>
        {(!isDisabled && !isHovered) ||
          (isSelected && (
            <div className={` gap-3 flex`}>
              <Edit
                className="cursor-pointer active:scale-90"
                onClick={() => {
                  setIsDisabled(!isDisabled);
                }}
                size={16}
              />
              <Delete
                className="cursor-pointer active:scale-90 text-red-400"
                onClick={handleDelete}
                size={16}
              />
            </div>
          ))}
      </span>
    </div>
  );
};

export default List;
