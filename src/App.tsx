import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import SatelliteDataPage from "./pages/SatelliteDataPage";
import TelecastPage from "./pages/TelecastPage";
import Navbar from "./components/Navbar";

function App() {
    return (
        
            <Router>
                <div className="min-h-screen bg-dark-100">
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/satellite-data" element={<SatelliteDataPage />} />
                        
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
