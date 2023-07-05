import load from '../assets/img/message.gif' 
export default function Loader() {
  return (
    <div className="mt-4 items-center ">
       <img src={load} className="object-fit " width={400} height={400} />
    </div>

  )
}
