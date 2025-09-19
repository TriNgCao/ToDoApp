import AddTask from '@/components/AddTask'
import DateTimeFilter from '@/components/DateTimeFilter'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import StatsAndFilter from '@/components/StatsAndFilter'
import TaskList from '@/components/TaskList'
import TaskListPagination from '@/components/TaskListPagination'
import axios from 'axios'
import { use, useEffect, useState } from 'react'
import { toast } from 'sonner'

const HomePage = () => {

    const [taskBuffer, setTaskBuffer] = useState([]);
    const [activeTasksCount, setActiveTasksCount] = useState(0);
    const [completeTasksCount, setCompleteTasksCount] = useState(0);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const res = await axios.get("http://localhost:5001/api/tasks");

            setTaskBuffer(res.data.tasks);
            setActiveTasksCount(res.data.activeCount);
            setCompleteTasksCount(res.data.comleteCount);
            console.log(res.data);
        } catch (error) {
            console.error("Fetching error:", error);
            toast.error("Loading error");
        }
    }


    //bien luu danh sach da loc
    const filteredTasks = taskBuffer.filter((task) => {
        switch (filter) {
            case "active":
                return task.status === "active";
            case "completed":
                return task.status === "complete";
            default:
                return true;
        }
    }
    );

    return (

        <div className="min-h-screen w-full bg-white relative overflow-hidden">
            {/* Grid + Glow on All Sides */}
            <div
                className="absolute inset-0 z-0 pointer-events-none"
                style={{
                    backgroundImage: `
       linear-gradient(to right, #f0f0f0 1px, transparent 1px),
       linear-gradient(to bottom, #f0f0f0 1px, transparent 1px),
       radial-gradient(circle 600px at 0% 200px, #d5c5ff, transparent),     /* Left */
       radial-gradient(circle 600px at 100% 200px, #d5c5ff, transparent),  /* Right */
       radial-gradient(circle 600px at 50% 0px, #d5c5ff, transparent),     /* Top */
       radial-gradient(circle 600px at 50% 100%, #d5c5ff, transparent)     /* Bottom */
     `,
                    backgroundSize: `
       96px 64px,    
       96px 64px,    
       100% 100%,    
       100% 100%,
       100% 100%,
       100% 100%
     `,
                }}
            />
            {/* Your Content Here */}
            <div className='container mx-auto pt-8 relative z-10'>
                <div className='w-full max-w-2xl p-6 mx-auto space-y-6'>
                    <Header />
                    <AddTask />
                    <StatsAndFilter
                        filter={filter}
                        setFilter={setFilter}
                        activeTasksCount={activeTasksCount} completedTasksCount={completeTasksCount} />
                    <TaskList
                        filter={filter}
                        filteredTasks={filteredTasks}
                    />
                    <div className='flex flex-col items-center gap-6 justify-between sm:flex-row'>
                        <TaskListPagination />
                        <DateTimeFilter />
                    </div>

                    <Footer
                        activeTasksCount={activeTasksCount} completedTasksCount={completeTasksCount}
                    />
                </div>

            </div>
        </div>


    )
}

export default HomePage