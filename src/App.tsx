import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import UploadForm from "./components/UploadForm";
import SavedScreen from "./components/SavedScreen";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
          <Routes>
            {/* Route for Upload Form */}
            <Route path="/" element={<UploadForm />} />

            {/* Route for Saved Certifications */}
            <Route path="/saved" element={<SavedScreen />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
