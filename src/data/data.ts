export interface dataProp {
 _id?: string;
  name: string;
  userId?: string | null;
  guestId?: string | null;
  tasks?: Task[] ;
  createdAt?: string;
  updatedAt?: string;
}
[];

export type TaskType ="todo" | "progress" | "completed";
 
export interface Task {
  _id: string;
  name: string;
  status: TaskType;
  date?:string;
}
 

export const data: dataProp[] = [
  {
    name: "app",
    tasks: [
      {
        _id:'1',
        name: "ok",
        status: "todo",
      },
      {_id:'2',
        name: "ok",
        status: "progress",
      },
      {_id:'3',
        name: "ok",
        status: "completed",
      },
      {_id:'4',
        name: "i completed",
        status: "todo",
      },
    ],
  },
  {
    name: "web",
    tasks: [
      {_id:'1',
        name: "ok",
        status: "todo",
      },
    ],
  },
  {
    name: "DSA",
    tasks: [
      {_id:'1',
        name: "ok",
        status: "todo",
      },
    ],
  }
];
