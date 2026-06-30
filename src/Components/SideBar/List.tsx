import { Delete, Edit } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useOutsideClick } from "../../Hook/CheckOutsideCLick";
import { Link, useNavigate } from "react-router-dom";
import type { dataProp } from "../../data/data";

interface ListProp {
    datas: string;
    index: number,
    setData: React.Dispatch<React.SetStateAction<dataProp[]>>
}

const List: React.FC<ListProp> = ({ datas, index, setData }) => {
    const [isDisabled, setIsDisabled] = useState<boolean>(true);
    const [value, setvalue] = useState<string>(datas);
    const ref = useRef<HTMLInputElement | null>(null);
    // const [SidebarData, setSidebarData] = useState(data); 
    // const navigate = useNavigate();

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

        // update the data here
        setData((prev) => prev.map((d) => d.name === datas ? { ...d, name: value } : d));
        // navigate(`/${value}`);
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

export default List