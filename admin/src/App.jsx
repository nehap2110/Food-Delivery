import React, { useState, useEffect, useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import Main from "./ui/Main";
import Content from "./ui/Content";
import Stats from "./components/Stats/Stats";
import Team from "./components/Team/Team";
import Event from "./components/Event/Event";
import AddProduct from "./components/Products/AddProduct";
import FoodList from "./components/Products/FoodList";
import Orders from "./components/Orders/Orders";
import SignInModal from "./components/Auth/SignInModal";
import { ToastContainer } from "react-toastify";
import { appContext } from "./context/appContext";
import LoadingScreen from "./components/LoadingScreen";
import { trackVisitor } from "./utils/trackVisitor";
import { inject } from '@vercel/analytics';

inject();

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { showSignInModal, handleCloseSignInModal } = useContext(appContext);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    trackVisitor("admin");
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialLoading(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };


  const DarkModeWrapper = ({ children }) => (
    <div
      className={`${darkMode ? "dark bg-gray-900 text-white" : "bg-white text-gray-900"
        } min-h-screen w-full`}
    >
      {children}
    </div>
  );

  return (
    <Router>
      <div className={`${darkMode && "dark"} font-Quicksand min-h-screen`}>
        {initialLoading ? (
          <LoadingScreen />
        ) : (
          <>
            <Header
              toggleDarkMode={toggleDarkMode}
              toggleSidebar={toggleSidebar}
              darkMode={darkMode}
            />
            <Sidebar isSidebarOpen={isSidebarOpen} />
            <Main>
              <ToastContainer />
              <Routes>
                <Route
                  path="/"
                  element={
                    <DarkModeWrapper>
                      <Content className="">
                        <div className="p-4 gap-4  flex flex-col">
                          <Stats darkMode={darkMode} />
                          <div className="flex flex-col gap-3 lg:flex-row">
                            <Team />
                            <Event />
                          </div>
                        </div>
                      </Content>
                    </DarkModeWrapper>
                  }
                />

                <Route
                  path="/products"
                  element={
                    <DarkModeWrapper>
                      <div className="w-full p-4">
                        <AddProduct />
                      </div>
                    </DarkModeWrapper>
                  }
                />
                <Route
                  path="/foods"
                  element={
                    <DarkModeWrapper>
                      <div className="w-full p-4">
                        <FoodList />
                      </div>
                    </DarkModeWrapper>
                  }
                />
                <Route
                  path="/orders"
                  element={
                    <DarkModeWrapper>
                      <Orders />
                    </DarkModeWrapper>
                  }
                />
              </Routes>
            </Main>
          </>
        )}
      </div>
      {!initialLoading && showSignInModal && (
        <SignInModal onClose={handleCloseSignInModal} />
      )}
    </Router>
  );
};

export default App;
