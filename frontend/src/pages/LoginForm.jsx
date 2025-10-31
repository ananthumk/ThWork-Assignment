import { useEffect, useState } from 'react'
import image from '../assets/taskLogin.jpg'
import taskLogo from '../assets/taskLogo.PNG'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import AppContext from '../context/AppContext'

export default function LoginForm() {
    const [errMsg, setErrMsg] = useState('')
    const [login, setLogin] = useState(true)
    const [userInfo, setUserInfo] = useState({
        name: '', email: '', password: ''
    })
    
    

    const handleToggle = () => {
        setLogin(prev => !prev)
    }

    const handleInfo = (e) => {
        const { name, value
        } = e.target
        setUserInfo(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const { url, token, updateToken } = useContext(AppContext)

    useEffect(() => {
        if(token){
            navigate('/')
        }
    }, [token])

    const navigate = useNavigate()
    const submitForm = (e) => {
        e.preventDefault()
        console.log(userInfo)
        const fetchData = async () => {
            try {

                const urlString = `${url}/${login ? 'login' : 'register'}`
                const options = {
                    method: 'POST',
                    body: JSON.stringify(userInfo),
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
                const response = await fetch(urlString, options)
                const data = await response.json()
                if (response.ok) {
                    updateToken(data.token)
                    localStorage.setItem('token', data.token)
                    setUserInfo({ name: '', email: '', message: '' })
                    navigate('/')
                } else {
                    console.log(data)
                    setErrMsg(data.message)
                }
            }
            catch (error) {
                console.log(data)
                setErrMsg(error.message)
            }

        }
        fetchData()
    }

    const buttonText = login ? 'Sign In' : 'Sign Up'
    return (
        <div className="w-full min-h-screen bg-white flex justify-evenly items-center">
            <img src={image} alt="background-image" className='hidden sm:block w-[300px] h-[250px] md:w-[400px] md:h-[300px]' />
            <div className='flex bg-white border border-gray-200 rounded-lg flex-col p-4 md:p-7
             min-w-[270px] gap-2 items-center shadow-md'>
                <h2 className='text-2xl font-extrabold'>Task Tracker</h2>
                <form onSubmit={submitForm} className='flex flex-col gap-3 min-w-[250px]'>
                    {!login && <div className='flex flex-col gap-1'>
                        <label className='text-sm text-gray-600'>Name</label>
                        <input value={userInfo.name} name="name" onChange={handleInfo} type="text" className='py-2 px-4 text-sm text-gray-500 rounded-md border border-gray-500 outline-0' 
                            placeholder='Eg: Arun Jacob' />
                    </div>}
                    <div className='flex flex-col gap-1'>
                        <label className='text-sm text-gray-600'>Email</label>
                        <input value={userInfo.email} name="email" onChange={handleInfo} type="email" className='py-2 px-4 text-sm text-gray-500 rounded-md border border-gray-500 outline-0' 
                            placeholder='Eg: arunjacob@gmail.com ' />
                    </div>

                    <div className='flex flex-col gap-1'>
                        <label className='text-sm text-gray-600'>Password</label>
                        <input value={userInfo.password} name="password" onChange={handleInfo} type="password" className='py-2 px-4 text-sm text-gray-500 rounded-md border border-gray-500 outline-0' 
                            placeholder='Eg: arunjacob' />
                    </div>
                    <button type="submit" className='cursor-pointer rounded py-1 px-4 border-0 text-md outline-0 bg-blue-500 text-white font-medium'>
                        {buttonText}
                    </button>
                    {errMsg && <p className='text-[13px] text-center font-medium text-red-500'>{errMsg}</p>}
                </form>
                {!login && <p className='text-md text-start mt-2 text-gray-700'>Already have a account? <span onClick={handleToggle} className='text-blue-500 cursor-pointer'>Click here</span></p>}
                {login && <p className='text-md text-start mt-2 text-gray-700'>Don't have a account? <span onClick={handleToggle} className='text-blue-500 cursor-pointer'>Click here</span></p>}
            </div>
        </div>
    )
}
