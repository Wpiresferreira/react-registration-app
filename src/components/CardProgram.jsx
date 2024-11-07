import { formatDate } from "../data/util";


export default function CardProgram({isadmin, program, handleProgramClick,  handleDeleteProgram, handleEditProgram}){


    return(
<li
              key={program.programcode}
              onClick={() => handleProgramClick(program.programcode)}
              className="bg-white border border-gray-300 rounded-lg p-6 shadow-2xl hover:shadow-xl transition-shadow duration-300 transform cursor-pointer"
            >
              <h2 className="text-2xl font-bold text-blue-1000 mb-2">
                {program.programname}
              </h2>
              <p className="text-gray-700 italic">{program.description}</p>
              <p className="text-gray-700">
                <strong>Program Code:</strong> {program.programcode}
              </p>
              <p className="text-gray-700">
                <strong>Duration:</strong> {program.duration} Terms
              </p>
              <p className="text-gray-700">
                <strong>Term:</strong> {program.term}
              </p>
              <p className="text-gray-700">
                <strong>Start Date:</strong> {formatDate(program.startdate)}
              </p>
              <p className="text-gray-700">
                <strong>End Date:</strong> {formatDate(program.enddate)}
              </p>
              <p className="text-gray-700">
                <strong>Domestic Fees (CAD): </strong> {program.domesticfee}
              </p>
              <p className="text-gray-700">
                <strong>International Fees (CAD): </strong> {program.internationalfee?program.internationalfee:"Not Available"}
              </p>

              {isadmin && (
                <div className="flex justify-between mt-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditProgram(program.programcode);
                    }}
                    className="bg-yellow-500 text-white px-2 py-1 rounded-lg hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteProgram(program.programcode);
                    }}
                    className="bg-red-500 text-white px-2 py-1 rounded-lg hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              )}
            </li>

    )
}