import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import PageWrapper from "./PageWrapper";
import LoadingSpinner from "./LoadingSpinner";
import Dashboard from "./Dashboard";

// Lazy load components
const PredictorForm = lazy(() => import("./PredictorForm"));
const Leaderboard = lazy(() => import("./Leaderboard"));
const NotFound = lazy(() => import("./NotFound")); // You'll create this next

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageWrapper>
              <PredictorForm />
            </PageWrapper>
          }
        />
        <Route
          path="/leaderboard"
          element={
            <PageWrapper>
              <Leaderboard />
            </PageWrapper>
          }
        />
        <Route
          path="*"
          element={
            <PageWrapper>
              <NotFound />
            </PageWrapper>
          }
        />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <nav className="sticky top-0 z-50 p-4 flex justify-between items-center bg-green-800 text-white pixel-font shadow-md">
        <NavLink to="/" className="text-xl font-bold hover:text-yellow-300">
          🔥 Burnout Predictor
        </NavLink>
        <div className="flex gap-4 text-sm sm:text-base">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `hover:text-yellow-300 transition ${
                isActive ? "underline text-yellow-300" : ""
              }`
            }
          >
            🧠 Predictor Form
          </NavLink>
          <NavLink
            to="/leaderboard"
            className={({ isActive }) =>
              `hover:text-yellow-300 transition ${
                isActive ? "underline text-yellow-300" : ""
              }`
            }
          >
            🏆 Leaderboard
          </NavLink>
          <Link to="/dashboard" className="px-3">Dashboard</Link>
        </div>
      </nav>

      <main className="bg-gray-100 min-h-screen">
        <Suspense fallback={<LoadingSpinner />}>
          <AnimatedRoutes />
        </Suspense>
      </main>
    </Router>
  );
}

export default App;
