import { ArrowLeft, House, MapPinOffIcon } from "lucide-react";
import AddButton from "../Components/AddButton";
import { Link, useNavigate } from "react-router-dom";
import React from "react";
import type { dataProp } from "../data/data";

const NotFound:React.FC<{Data : dataProp[]}> = ({Data}) => {
    // const [open, setopen] = useState<boolean>(false);
  const navigate = useNavigate();
  return (
    <div className="w-full bg-bg text-text flex flex-col items-center justify-center">
      <div className="flex flex-col justify-center items-center gap-5">
        <div className="border border-border rounded-2xl bg-code-bg px-6 py-6 text-gray-500">
          <MapPinOffIcon size={54} />
        </div>
        <kbd className="text-4xl text-text-h font-bold">Page not found</kbd>
        <div className="leading-5 tracking-tight text-center text-md w-2/3">
          <h5 >The page you're looking for doesn't exist or may have been moved.</h5>
          {/* <h5>Create a new one to get started.</h5> */}
        </div>
        <div className="flex justify-around gap-4 ">
          <AddButton
          icon={<ArrowLeft />}
          text="Go Back "
          Function={() => {
            navigate(-1)
          }}
        />
        <AddButton
        icon={<House/>}
        text="Go Home"
        Function={()=>{
          navigate('/')
        }} 
        />
        </div>
         {Data.length !== 0 && <kbd className="uppercase">Or jump to a project</kbd>}
        <div
          className={`grid grid-cols-3 gap-3 ${
            "h-fit" 
          }`}
        >
          {Data.map((data) => {
            const taskCount = data.tasks?.length ?? 0;

            return (
              <Link key={data.name} to={data.name}>
                <div className="border border-border hover:border-gray-600 rounded-2xl bg-code-bg px-4 py-2 w-40 hover:bg-border">
                  <h1 className="text-xl text-text-h font-bold">{data.name}</h1>
                  <p>{taskCount} task</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  )
}

export default NotFound