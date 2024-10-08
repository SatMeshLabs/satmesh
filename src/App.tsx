import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import ApiDataPage from "./pages/ApiDataPage";
import TelecastPage from "./pages/TelecastPage";
import Navbar from "./components/Navbar";

function App() {
    return (
        
            <Router>
                <div className="min-h-screen bg-dark-100">
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/api-data" element={<ApiDataPage />} />
                        
                            <Route
                                path="/telecast"
                                element={<TelecastPage />}
                            />
                        
                    </Routes>
                </div>
            </Router>
        
    );
}

export default App;
