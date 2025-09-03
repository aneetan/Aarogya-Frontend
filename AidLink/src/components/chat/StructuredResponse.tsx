import { IoIosWarning } from "react-icons/io";
import type { MedicalResponse } from "../../types/chat.types";

interface StructuredMedicalResponseProps {
  response: MedicalResponse;
}

const StructuredResponse: React.FC<StructuredMedicalResponseProps> = ({ response }) => {
  return (
    <div className="bg-gray-200 rounded-lg border border-gray-200 overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-800">
         {response.title}
         </h2>
        {response.overview && (
         <p className="mt-2 text-gray-700">
            {response.overview}
         </p>
        )}
      </div>

      <div className="p-4 space-y-3">
        {/* Warnings Section */}
        {response.warnings && response.warnings.length > 0 && (
          <div className="bg-red-50 p-5 rounded-r">
            <h3 className=" flex gap-2 items-center font-semibold text-red-800 mb-2"> <IoIosWarning/> Important Warnings</h3>
            <ul className="list-disc list-inside space-y-1 text-red-700">
              {response.warnings.map((warning, index) => (
                <li key={index}>{warning}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Steps Section */}
        {response.steps && response.steps.length > 0 && (
          <div>
            <h3 className="font-semibold text-gray-800 mb-3"> Step-by-Step Instructions</h3>
            <ol className="space-y-3">
              {response.steps.map((step) => (
                <li key={step.step_number}>
                  <div className="flex items-start">
                    <div>
                      <p className="font-medium text-gray-900"> {step.step_number} 1. {step.instruction}</p>
                      {step.details && (
                        <p className="mt-1 text-sm text-gray-600">{step.details}</p>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        )}

        {/* Additional Notes */}
        {response.additionalNotes && response.additionalNotes.length > 0 && (
          <div className=" py-4 rounded-r">
            <h3 className="font-semibold mb-2"> Additional Notes</h3>
            <ul className=" list-inside space-y-1">
              {response.additionalNotes.map((note, index) => (
                <li key={index}>{note}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Emergency Action */}
        {response.emergencyAction && (
          <div className="bg-red-100 p-4 rounded-lg ">
            <h3 className="font-bold text-red-800 mb-2"> Emergency Action</h3>
            <p className="text-red-700">{response.emergencyAction}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StructuredResponse;