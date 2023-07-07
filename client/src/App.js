import './App.css';
import { io } from 'socket.io-client';
import { useState } from 'react';
import Room from './components/Room';
import Loader from './components/Loader';

const socket = io('http://localhost:3001', {
  reconnectionDelay: 10000, 
  reconnectionDelayMax: 10000
}) 

function App() {

  const [username , setUsername] = useState("");
  const [isIn , setisIn] = useState(false) ; 
  const [isConnecting , setisConnecting] = useState(false) ; 
  const [room, setRoom] = useState("") ; 

  const JoinRoom = () => { 
     if(username !=="" && room !== "") 
     { 
      setisConnecting(true)
      console.log(isConnecting)
      setTimeout(() => { 
        socket.emit("join_room" , room) ; 
        setisConnecting(false)
        setisIn(true) 
      }, 10000)
       
     }
  }

  return (
    <div className="App">
      <div className='flex justify-center'>
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg text-center">
                 <h1 className="font-extrabold text-transparent text-4xl bg-clip-text bg-gradient-to-r from-red-400 to-orange-600">Experiment  <span className='struggle'>LiveStream</span>  Chat Today</h1>

                 <p className="mt-4 text-gray-500">
                 Exchange secretly and surely with your teamates in a encrypted rooms.
                 </p>
              </div>
          {isConnecting ? 
            <Loader />
           : isIn ?  (
            <Room socket={socket} username={username} room={room} />
         ) : 
         (
           <>
              
               <div  className="mx-auto mb-0 mt-8 max-w-md space-y-4 shadow-xl sm:p-6 lg:p-8">
                 <div>
                   <label htmlFor="email" className="sr-only">Email</label>

                   <div className="relative">
                     <input
                       type="text"
                       className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                       placeholder="Enter your username "
                       value={username}
                       onChange={(e) => setUsername(e.target.value)}
                     />

                     <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                       <svg
                         xmlns="http://www.w3.org/2000/svg"
                         className="h-4 w-4 text-gray-400"
                         fill="none"
                         viewBox="0 0 24 24"
                         stroke="currentColor"
                       >
                         <path
                           strokeLinecap="round"
                           strokeLinejoin="round"
                           strokeWidth="2"
                           d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                         />
                       </svg>
                     </span>
                   </div>
                 </div>

                 <div>
                   <label htmlFor="rooms" className="sr-only">Room ID</label>

                   <div className="relative">
                     <input
                       type="text"
                       className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                       placeholder="Enter room ID"
                       value={room}
                       onChange={(e) => { setRoom(e.target.value) }}
                     />

                     <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                       <svg
                         xmlns="http://www.w3.org/2000/svg"
                         className="h-4 w-4 text-gray-400"
                         fill="none"
                         viewBox="0 0 24 24"
                         stroke="currentColor"
                       >
                         <path
                           strokeLinecap="round"
                           strokeLinejoin="round"
                           strokeWidth="2"
                           d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                         />
                         <path
                           strokeLinecap="round"
                           strokeLinejoin="round"
                           strokeWidth="2"
                           d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                         />
                       </svg>
                     </span>
                   </div>
                 </div>

                 <div className="flex items-center md:justify-end justify-center">
         
                   <button
                     type="submit"
                     onClick={JoinRoom}
                     className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white mb-2"
                   >
                   Join Chat 
                   </button>
                 </div>
               </div>
           </>
         ) }
        
         
        </div>
      </div>

    </div>
  );
}

export default App;
