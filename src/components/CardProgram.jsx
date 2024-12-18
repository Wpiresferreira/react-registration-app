import { formatDate } from "../data/util";

export default function CardProgram({
  isadmin,
  program,
  handleProgramClick,
  handleDeleteProgram,
  handleEditProgram,
}) {
  return (
    <li
      key={program.programcode}
      id={"card_" + program.programcode}
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
        <strong>Domestic Fees (CAD): </strong>
        {!program.domesticfee || program.domesticfee === "$0.00"
          ? "Not Available"
          : program.domesticfee}
      </p>
      <p className="text-gray-700">
        <strong>International Fees (CAD): </strong>{" "}
        {!program.internationalfee || program.internationalfee === "$0.00"
          ? "Not Available"
          : program.internationalfee}
      </p>

      {isadmin && (
        <div className="flex justify-end mt-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteProgram(program.programcode);
            }}
            className={`fa fa-trash-o text-sm text-white rounded-xl px-4 py-1 m-3 bg-[var(--color3)] border-solid border-2 border-[var(--color3)] hover:text-[var(--color3)] hover:bg-white`}
          ></button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleEditProgram(e.target.closest("li").id.split("_")[1]);
            }}
            className={`fa fa-edit text-sm text-white rounded-xl px-4 py-1 m-3 bg-[var(--color1)] border-solid border-2 border-[var(--color1)] hover:text-[var(--color1)] hover:bg-white`}
          ></button>
          
        </div>
      )}
    </li>
  );
}
