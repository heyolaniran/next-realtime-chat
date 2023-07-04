import { useState } from "react"

export default function Room({room , username , socket}) {

    const [currentMessage , setCurrentMessage] = useState("") ; 

    const sendMessage = async () =>{ 

        if(currentMessage !== "") { 
              const messageData = { 
                    room , 
                    author : username , 
                    message : currentMessage , 
                    time : new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
                }

                await socket.emit("send_message" , messageData)
        }
      
    }


  return (
    <div className="mt-4 sm:flex sm:gap-2">
        <div className="sm:flex-1">
          <label htmlFor="email" className="sr-only">Email</label>

          <input
            type="text"
            placeholder="Hey there ...  "
            value={currentMessage}
            onChange={(e) => setCurrentMessage(e.target.value)}
            className="w-full rounded-md border-gray-200 bg-white p-3 text-gray-700 shadow-sm transition focus:border-white focus:outline-none focus:ring focus:ring-blue-400"
          />
        </div>

        <button
          type="submit"
          onClick={sendMessage}
          className="group mt-4 flex w-full items-center justify-center gap-2 rounded-md bg-blue-600 px-5 py-3 text-white transition focus:outline-none focus:ring focus:ring-blue-400 sm:mt-0 sm:w-auto"
        >
          <span className="text-sm font-medium"> Send </span>
          <svg
            className="h-5 w-5 rtl:rotate-180"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </button>
    </div>
  )
}
