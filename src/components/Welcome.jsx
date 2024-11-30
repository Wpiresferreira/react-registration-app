export default function Welcome(){
    
  return (
    <div className="flex flex-col mt-2 justify-center items-center">
      <div className="min-h-[50vh] w-[80vw]">
        <div className=" text-center p-4 text-3xl font-bold">
          Welcome to Bow Valley Course Registration Page!
        </div>
        <div className="mb-5 text-xl w-[400px]">Here you can:</div>
        <ul className="shadow-balanced list-disc list-inside space-y-4 text-lg">
          <li className="p-1 ml-1 font-semibold">
            Meet our Programs and Courses
          </li>
          <li className="p-1 ml-1 font-semibold">Sign Up for a program</li>
          <li className="p-1 ml-1 font-semibold">
            Once you are registered in a Program, you are able to register for
            courses.
          </li>
        </ul>
        <div className="p-4 mr-4 text-right">Enjoy it!</div>
      </div>
    </div>
  );
}