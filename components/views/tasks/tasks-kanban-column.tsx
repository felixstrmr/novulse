import type { Task } from "@/types";

type Props = {
  status: string;
  tasks: Task[];
};

export default function TasksKanbanColumn({}: Props) {
  return <div>TasksKanbanColumn</div>;
}
