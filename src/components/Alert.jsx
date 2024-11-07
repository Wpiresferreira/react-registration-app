export default function Alert({message, type, onClick}){


    return(
        <div
        className={`${type==='alert'?'text-red-800  bg-red-50 dark:bg-gray-800 dark:text-red-400 ' : ' text-sky-800  bg-sky-50 dark:bg-gray-800 dark:text-sky-400 ' } rounded-lg fixed border-double border-[6px] p-4 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-sm`}
        role="alert" onClick={onClick}
        >
        <span className="font-medium">Message: </span> {message}
      </div>
    )      
}