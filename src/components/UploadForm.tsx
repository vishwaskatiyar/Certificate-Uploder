import { useState } from "react";
import { useDispatch } from "react-redux";
import { addCertification } from "../redux/certificationSlice";
import { useNavigate } from "react-router-dom";

const UploadForm: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [certificationName, setCertificationName] = useState("");
  const [issuer, setIssuer] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [errors, setErrors] = useState({
    certificationName: "",
    issuer: "",
    file: "",
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setErrors((prevErrors) => ({ ...prevErrors, file: "" })); // Clear error if fixed
    }
  };

  const validateForm = () => {
    const newErrors = {
      certificationName: certificationName ? "" : "Certification name is required.",
      issuer: issuer ? "" : "Issuer is required.",
      file: file ? "" : "File is required.",
    };

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === ""); // Return true if no errors
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent page refresh

    if (!validateForm()) return; // Stop submission if validation fails

    // Dispatch to Redux Store
    dispatch(addCertification({ certificationName, issuer, file }));

    // Show success message
    setShowPopup(true);

    // Reset form after submission
    setCertificationName("");
    setIssuer("");
    setFile(null);
    setErrors({ certificationName: "", issuer: "", file: "" });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl relative">
        {/* Close (X) Button */}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-black text-2xl"
          onClick={() => navigate("/saved")}
        >
          ✕
        </button>

        {/* Header */}
        <h2 className="text-3xl font-bold text-center">Skills-Based Certifications</h2>
        <p className="text-gray-500 text-center text-sm mb-6">
          (You can add up to 5 certifications)
        </p>

        <form onSubmit={handleSubmit}>
          {/* Input Fields */}
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-gray-700 mb-1">Certification Name</label>
              <input
                type="text"
                placeholder="Enter certification name"
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-400 outline-none"
                value={certificationName}
                onChange={(e) => setCertificationName(e.target.value)}
              />
              {errors.certificationName && <p className="text-red-500 text-sm mt-1">{errors.certificationName}</p>}
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Issuer</label>
              <input
                type="text"
                placeholder="Enter issuer"
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-400 outline-none"
                value={issuer}
                onChange={(e) => setIssuer(e.target.value)}
              />
              {errors.issuer && <p className="text-red-500 text-sm mt-1">{errors.issuer}</p>}
            </div>
          </div>

          {/* File Upload Section */}
          <div className="mb-6">
            <label className="block text-gray-700 mb-1">Upload a file showing your certification</label>
            <div className="flex items-center justify-between border rounded-lg px-4 py-3">
              <span className="text-gray-500 truncate">{file ? file.name : "No file chosen"}</span>
              <label className="bg-purple-500 text-white px-5 py-2 rounded-lg cursor-pointer hover:bg-purple-600 transition">
                Upload 📤
                <input
                  type="file"
                  accept="application/pdf,image/jpeg"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
            </div>
            <p className="text-gray-500 text-sm text-center mt-2">(File format should be only PDF and JPG)</p>
            {errors.file && <p className="text-red-500 text-sm mt-1">{errors.file}</p>}
          </div>

          {/* Buttons: Upload & View */}
          <div className="flex flex-col items-center gap-4">
            <button
              type="submit"
              className="bg-purple-500 text-white px-6 py-3 rounded-lg w-full font-semibold hover:bg-purple-600 transition"
            >
              Upload File
            </button>

            {/* View Certifications Button */}
            <button
              type="button"
              onClick={() => navigate("/saved")}
              className="bg-gray-300 text-black px-6 py-3 rounded-lg w-full font-semibold hover:bg-gray-400 transition"
            >
              View Certifications
            </button>
          </div>
        </form>
      </div>

      {/* Popup Notification */}
      {showPopup && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center w-96">
            <p className="text-lg font-semibold">Your document has been uploaded!</p>
            <p className="text-sm text-gray-600 mt-2">
              You can view it with the "View Certifications" button.
            </p>
            <button
              onClick={() => { setShowPopup(false); navigate("/saved"); }}
              className="mt-4 bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              View Certifications
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadForm;
