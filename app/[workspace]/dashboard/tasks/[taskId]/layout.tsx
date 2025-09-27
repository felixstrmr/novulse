import TaskHeader from "@/components/workspace/task/task-header";
import TaskSidebar from "@/components/workspace/task/task-sidebar";

type Props = {
  children: React.ReactNode;
};

export default function TaskLayout({ children }: Props) {
  return (
    <div className="absolute inset-0 flex size-full gap-1 bg-muted p-1">
      <TaskSidebar />
      <div className="flex size-full flex-col gap-1">
        <TaskHeader />
        {children}
      </div>
    </div>
  );
}
