export default function Alert({showMessage, message, onClick}){


    return(
        <div
        className={` transition-opacity   absolute border-double border-[6px] p-4 mt-[50%] text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400`}
        role="alert" onClick={onClick}
        >
        <span className="font-medium">Message: </span> {message}
      </div>
    )      
}