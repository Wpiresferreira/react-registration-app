export default function Page(){
    return(
        <div className="flex items-center justify-center">

        <form className=" rounded-lg flex flex-col w-[80vw] bg-teal-300 items-center">
        <label htmlFor="username">Username
        </label>
        <input  name="username" type="email" className="border-2 border-solid border-blue-950 rounded-md"></input>
        
        </form>
        </div>
    )
}