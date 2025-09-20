import { Card } from './ui/card';
import { Button } from './ui/button';
import { Calendar, CheckCircle2, Circle, SquarePen, Trash2 } from 'lucide-react';
import { Input } from './ui/input';
import { cn } from '@/lib/utils';
import api from '@/lib/axios';
import { toast } from 'sonner';
import { useState } from 'react';

const TaskCard = ({ task, index, handleTaskChanged }) => {
    const [isEditing, setIsEditting] = useState(false);

    const [updateTask, setUpdateTask] = useState(task.title || "");

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            update();
        }
    }


    const toggleTaskCompleteButton = async () => {
        try {
            if (task.status === "active") {
                await api.put(`/tasks/${task._id}`, {
                    status: "complete",
                    completedAt: new Date().toISOString()
                });
                toast.success(`${task.title} đã được hoàn thành`)
            } else {
                await api.put(`/tasks/${task._id}`, {
                    status: "active",
                    completedAt: null
                });
                toast.success(`${task.title} đã đổi sang chưa hoàn thành`)
            }
            handleTaskChanged();
        } catch (error) {
            toast.error("Updating Error");
        }
    }

    const update = async () => {
        try {
            setIsEditting(false);
            await api.put(`/tasks/${task._id}`, {
                title: updateTask
            });
            toast.success('Nhiem vu da duoc cap nhat');
            handleTaskChanged();
        } catch (error) {
            toast.error("Updating Error");
        }
    }

    const deleteTask = async (taskId) => {
        try {
            await api.delete(`/tasks/${taskId}`);
            toast.success('Nhiem vu da duoc xoa');
            handleTaskChanged();
        } catch (error) {
            toast.error("Deleting Error");
        }
    }

    return (
        <Card className={cn(
            "p-4 bg-gradient-card border-0 shadow-custom-md hover:shadow-custom-lg transition-all duration-200 animate-fade-in group",
            task.status === "complete" && "opacity-75"
        )}
            style={{ animationDelay: `${index * 50}ms` }}
        >
            <div className="flex items-center gap-4">
                <Button
                    onClick={toggleTaskCompleteButton}
                    variant="ghost"
                    size="icon"
                    className={cn(
                        "flex-shrink-0 size-8 rounded-full transition-all duration-200",
                        task.status === "complete"
                            ? "text-success hover:text-success/80"
                            : "text-muted-foreground hover:text-primary"
                    )}

                >
                    {task.status === "complete" ? (
                        <CheckCircle2 className="size-5" />
                    ) : (
                        <Circle className="size-5" />
                    )}
                </Button>

                <div className="flex-1 min-w-0">
                    {isEditing ? (
                        <Input
                            placeholder='task to do'
                            className='flex-1 h-12 text-base border-border/50 focus:border-primary/50 focus:ring-primary/20'
                            type="text"
                            value={updateTask}
                            onChange={(event) => setUpdateTask(event.target.value)}
                            onKeyPress={handleKeyPress}
                            onBlur={() => {
                                setIsEditting(false);
                                setUpdateTask(task.title || "");
                            }}
                        />
                    ) : (
                        <p className={
                            cn("text-base transition-all duration-200",
                                task.status === "complete" ? "line-through text-muted-foreground" : "text-muted-foreground"
                            )

                        }>
                            {task.title}
                        </p>
                    )}
                    <div className="flex items-center gap-2 mt-1">
                        <Calendar className='size-3 text-muted-foreground' />
                        <span className='text-xs text-muted-foreground'>

                            {new Date(task.createdAt).toLocaleString()}
                        </span>

                        {task.completedAt && (
                            <>
                                <span className="text-xs text-muted-foreground">
                                    -
                                </span>
                                <Calendar className='size-3 text-muted-foreground' />
                                <span className='text-xs text-muted-foreground'>
                                    {new Date(task.completedAt).toLocaleString()}
                                </span>

                            </>
                        )}
                    </div>

                </div>



                <div className="hidden gap-2 group-hover:inline-flex animate-slide-up">
                    {/* nút edit */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="flex-shrink-0 transition-colors size-8 text-muted-foreground hover:text-info"
                        onClick={() => {
                            setIsEditting(true);
                            setUpdateTask(task.title || "");
                        }}
                    >
                        <SquarePen className="size-4" />
                    </Button>

                    {/* nút xoá */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="flex-shrink-0 transition-colors size-8 text-muted-foreground hover:text-destructive"
                        onClick={() => deleteTask(task._id)}
                    >
                        <Trash2 className="size-4" />
                    </Button>
                </div>

            </div>
        </Card >
    )
}

export default TaskCard