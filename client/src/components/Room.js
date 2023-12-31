import { useState, useEffect } from "react"

export default function Room({room , username , socket}) {

    const [currentMessage , setCurrentMessage] = useState("") ; 
    const [messageList , setMessageList] = useState([]) ; 
    const sendMessage = async () =>{ 
        if(currentMessage !== "") { 
              const messageData = { 
                    room , 
                    author : username , 
                    message : currentMessage , 
                    time : new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
                }

                await socket.emit("send_message" , messageData)
                setMessageList((list) => [...list , messageData])
                setCurrentMessage("")
        }
      
    }

    useEffect(() => {
        socket.on("receive_message" , (data) => { 
           setMessageList((list) =>[...list , data])
        })
    }, [socket])
    
   


  return (
      <>
       <div className=" h-full">
         
            <div className="flex-1 bg-gray-100 rounded-xl shadow-lg w-full h-[60%] overflow-y-scroll">
                <div className="main-body container m-auto w-11/12 h-full flex flex-col">
                    <div className="py-4 flex-2 flex flex-row">
                       
                        <div className="flex-1 text-right">
                            <span className="inline-block text-gray-700">
                                Status: <span className="inline-block align-text-bottom w-4 h-4 bg-green-400 rounded-full border-2 border-white"></span> <b>Online</b>
                                <span className="inline-block align-text-bottom">
                                    <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" className="w-4 h-4"><path d="M19 9l-7 7-7-7"></path></svg>
                                </span>
                            </span>
        
                            <span className="inline-block ml-8 text-gray-700 hover:text-gray-900 align-bottom">
                                <span className="block h-6 w-6 p-1 rounded-full hover:bg-gray-400">
                                    <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" className="w-4 h-4"><path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
                                </span>
                            </span>
                        </div>
                    </div>
    
                    <div className="main flex-1 flex flex-col">
                      

                        <div className="flex-1 flex ">
                            <div className="chat-area flex-1 flex flex-col">
                                <div className="messages flex-1 ">
                                
                                     {messageList.map((content) => { 
                                      return content.author === username ? (

                                       <div className="message me mb-4 flex text-right">
                                          <div className="flex-1 px-2">
                                              <div className="inline-block bg-blue-600 rounded-full p-2 px-6 text-white">
                                                  <span>{content.message}</span>
                                              </div>
                                              <div className="pr-4"><small className="text-gray-500">{content.time}</small></div>
                                          </div>
                                      </div>
                                       ) : (
                                        <div className="message mb-4 flex">
                                        <div className="grid">
                                          <p className="pl-4 font-normal text-gray-500 text-sm mb-2">@{content.author}</p>
                                          <div className="flex-1 px-2">
                                              <div className="inline-block bg-gradient-to-r from-red-400 to-orange-600 rounded-full p-2 px-6 text-white w-full">
                                                  <span>{content.message}</span>
                                              </div>
                                              <div className="pl-4"><small className="text-gray-500">{content.time}</small></div>
                                          </div>
                                        </div>
                                        </div>
                                       )
                                    })}
                                  
                                   
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-4 sm:flex sm:gap-2 chat-room" >
          <div className="sm:flex-1">
            <label htmlFor="email" className="sr-only">Message </label>

            <input
              type="text"
              placeholder="Write down your message ...  "
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              onKeyDown={(e) => { 
                e.key === "Enter" && sendMessage() 
              }}
              className="w-full rounded-md border-gray-200 bg-white p-3 text-gray-700 shadow-sm transition focus:border-white focus:outline-none focus:ring focus:ring-blue-400"
            />
          </div>
          <button
            type="submit"
            onClick={sendMessage}
            className="group mt-4 flex w-full items-center justify-center gap-2 rounded-md bg-blue-600 px-5 py-3 text-white transition focus:outline-none focus:ring focus:ring-blue-400 sm:mt-0 sm:w-auto"
          >
            <span className="text-sm font-medium"> Send </span>
              <svg aria-hidden="true" className="w-5 h-5 rtl:rotate-180 font-semibold" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" stroke-linecap="round" stroke-linejoin="round"></path>
              </svg>
          </button>
        </div>
        </div>

     
       
      </>
  )
}
