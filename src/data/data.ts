export interface dataProp {
  name: string;
  task?: Task[];
}
[];

export type TaskType = "todo" | "progress" | "done";
 
export interface Task {
  id: string;
  name: string;
  type: TaskType;
}
 

export const data: dataProp[] = [
  {
    name: "app",
    task: [
      {
        id:'1',
        name: "ok",
        type: "todo",
      },
      {id:'2',
        name: "ok",
        type: "progress",
      },
      {id:'3',
        name: "ok",
        type: "done",
      },
      {id:'4',
        name: "i completed",
        type: "todo",
      },
    ],
  },
  {
    name: "web",
    task: [
      {id:'1',
        name: "ok",
        type: "todo",
      },
    ],
  },
  {
    name: "DSA",
    task: [
      {id:'1',
        name: "ok",
        type: "todo",
      },
    ],
  }
];
