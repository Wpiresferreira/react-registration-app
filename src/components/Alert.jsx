export default function Alert({message, type, onClick}){

  
    return(
        <div
        className={`${type==='alert'?'text-red-800  bg-red-50 dark:bg-gray-800 dark:text-red-400 ' : ' text-sky-800  bg-sky-50 dark:bg-gray-800 dark:text-sky-400 ' } rounded-lg  fixed bottom-5 right-5  border-double border-[6px] p-4  text-sm`}
        onClick={onClick}
        >
        <span className="font-medium">Message: </span> {message}
      </div>
    )      
}