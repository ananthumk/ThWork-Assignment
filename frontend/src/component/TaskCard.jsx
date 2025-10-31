import { FaCalendarAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";


export default function TaskCard({task}){
    const navigate = useNavigate()
    return(
        <div onClick={() => navigate(`/edit/${task._id}`)} key={task._id} className="sm:max-w-[340px] flex flex-col gap-2 bg-white rounded py-2 px-4">
            <h3 className="text-[14px] sm:text-[15px]">{task.title}</h3>
            <p className="text-[11px]">{task.description}</p>
            <div className="flex items-center justify-between">
            <div className={`py-0.5 px-1.5 ${task.priority === 'High' ? 'bg-red-200' : task.priority === 'Medium' ? 'bg-yellow-200' : 'bg-green-300' } rounded-md`}>
                <p className="text-[10px]">{task.priority}</p>
            </div>
            <p className={`text-[11px] ${task.status === 'Open' ? 'text-red-500' : task.status === 'In Progress' ? 'text-blue-600' : 'text-green-500' }`}>{task.status}</p>
            </div>
            <div className="flex items-center gap-2">
                <FaCalendarAlt className="w-3 h-3" />
                <p className="text-[10px]">{task.dueDate}</p>
            </div>
        </div>
    )
}