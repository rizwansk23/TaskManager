import { Plus, X } from "lucide-react";
import { useState } from "react";

const Modal = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [duedate, setDueDate] = useState<string>("");

  const currentdate = new Date().toISOString().split("T")[0];
  const date = new Date();
  date.setDate(date.getDate() + 10);
  const maxDateString = date.toISOString().split("T")[0];

  function HandleSubmit(e: React.SubmitEvent) {
    e.preventDefault();
    console.log(title);
    console.log(message);
    console.log(maxDateString);
    setDueDate("");
    setTitle("");
    setMessage("");
    setIsOpen(!isOpen);
  }

  return (
    <div>
      <button
        className="border-border border-2 rounded-xl px-3 py-2 active:scale-95 active:border-white ease-in-out flex items-center gap-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Plus size={20} /> Add Tasks
      </button>
      {isOpen && (
        <div
          id="modal"
          popover="manual"
          className="w-full h-screen bg-[#00000055] fixed z-99 text-text flex items-center justify-center "
        >
          <div className="bg-black w-1/3 h-fit px-4 py-5 rounded-2xl">
            <header className="flex justify-between items-center text-text-h text-xl">
              <h1>create</h1>
              <button onClick={() => setIsOpen(!isOpen)}>
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
                <div className="title flex flex-col gap-1 py-2">
                  <label htmlFor="title" className="text-sm font-medium">
                    Task title
                  </label>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="title"
                    className="border border-border rounded-xl py-1 px-2"
                  />
                </div>
                <div className="title flex flex-col gap-1 py-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Task Message
                  </label>
                  <textarea
                    placeholder="message"
                    name="message"
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="border border-border rounded-xl py-1 px-2"
                  ></textarea>
                </div>
                <div className=" gap-1 py-2">
                  <input
                    type="date"
                    name=""
                    id="date"
                    min={currentdate}
                    value={duedate}
                    onChange={(e) => setDueDate(e.target.value)}
                    max={maxDateString}
                    className="border border-border rounded-xl px-3 py-2 [&::-webkit-calendar-picker-indicator]:invert"
                  />
                </div>
                <input type="submit" value="create" />
              </form>
            </main>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
