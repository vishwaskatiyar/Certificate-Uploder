import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const SavedScreen: React.FC = () => {
  const certifications = useSelector(
    (state: RootState) => state.certification.certifications
  );

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center pt-12 px-6 md:px-12 lg:px-24">
      {/* Header */}
      <h2 className="text-3xl md:text-4xl font-extrabold text-center">
        Skills-Based Certifications
      </h2>
      <p className="text-gray-400 text-center mb-8 text-sm md:text-lg">
        (You can add up to 5 certifications)
      </p>

      {/* No certifications message */}
      {certifications.length === 0 ? (
        <p className="text-gray-400 text-center py-8 text-lg">No certifications added yet.</p>
      ) : (
        <div className="space-y-6 w-full max-w-5xl">
          {certifications.map((cert, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row items-center sm:items-center bg-white/10 backdrop-blur-lg shadow-lg rounded-xl p-6 sm:p-4 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl"
            >
              {/* Number Badge */}
              <span className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-full text-md font-bold shadow-md">
                {index + 1}
              </span>

              {/* Certification Name & Issuer */}
              <div className="flex-1 sm:ml-6 text-center sm:text-left mt-4 sm:mt-0">
                <h3 className="text-lg sm:text-xl font-semibold text-white">
                  {cert.certificationName}
                </h3>
                <p className="text-gray-300 text-sm sm:text-md mt-1">{cert.issuer}</p>
              </div>

              {/* View Certification Link */}
              {cert.file && (
                <a
                  href={URL.createObjectURL(cert.file)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 font-medium text-sm sm:text-md hover:underline hover:text-blue-300 transition-all duration-200 mt-4 sm:mt-0"
                >
                  View Certification →
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedScreen;
