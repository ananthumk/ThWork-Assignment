import { IoPerson } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export default function Navbar(){
    const navigate = useNavigate()
    return (
        <div className="w-full bg-white py-3">
            <div className="w-[85%] mx-auto flex items-center justify-between">
                <h1 onClick={() => navigate('/')} className="text-2xl font-bold text-black">Task Tracker</h1>
                <div className="w-11 h-11 flex justify-center items-center rounded-full bg-blue-300">
                     <IoPerson className="w-6 h-6" />
                </div>
            </div>
        </div>
    )
}