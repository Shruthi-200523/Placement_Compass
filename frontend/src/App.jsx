import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Companies from "./pages/Companies";
import Notes from "./pages/Notes";
import Planner from "./pages/Planner";
import Coding from "./pages/Coding";
import Aptitude from "./pages/Aptitude";
import CompanyPreparation from "./pages/CompanyPreparation";

function App() {

    return (
        <BrowserRouter>

            <Navbar />

            <Routes>

                <Route path="/" element={<Home />} />

                <Route
                    path="/register"
                    element={<Register />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/companies"
                    element={<Companies />}
                />

                <Route
                    path="/notes"
                    element={<Notes />}
                />

                <Route
                    path="/planner"
                    element={<Planner />}
                />

                <Route
                    path="/coding"
                    element={<Coding />}
                />

                <Route
                    path="/aptitude"
                    element={<Aptitude />}
                />

                <Route
                    path="/company-preparation"
                    element={<CompanyPreparation />}
                />

            </Routes>

        </BrowserRouter>
    );
}

export default App;