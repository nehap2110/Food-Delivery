import Hero from "./Pages/Hero";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import About from "./Pages/About";
import Menu from "./Pages/Menu";
import Contact from "./Pages/Contact";
import MobileCart from "./Pages/Cart";
import { Routes, Route } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AppContext } from "./context/AppContext";
import toast, { Toaster } from "react-hot-toast";
import Login from "./Pages/Login";
import Checkout from "./Pages/Checkout";
import MobileMenu from "./Pages/MobileMenu";
import Orders from "./Pages/Orders";
import LoadingScreen from "./components/LoadingScreen";
import { trackVisitor } from "./utils/trackVisitor"
import { inject } from '@vercel/analytics';

inject();

const App = () => {
  const { cartOpen, showLogin, showMobileMenu } = useContext(AppContext);
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    trackVisitor("user");
  }, []);

  /* ---------------- First Visit Loading Screen ---------------- */
  useEffect(() => {
    const hasVisited = sessionStorage.getItem("hasVisited");

    if (!hasVisited) {
      sessionStorage.setItem("hasVisited", "true");
      const timer = setTimeout(() => setShowLoading(false), 5000);
      return () => clearTimeout(timer);
    } else {
      setShowLoading(false);
    }
  }, []);

  /* ---------------- Backend Cold Start Warmup ---------------- */
  useEffect(() => {
    if (sessionStorage.getItem("backend_warmed")) return;

    console.log("🔁 Attempting backend connection");

    const toastId = toast.loading("Starting backend...");

    const slowTimer = setTimeout(() => {
      toast.loading(
        "Backend is starting (this may take 1–2 minutes)...",
        { id: toastId }
      );
    }, 8000);

    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/health`)
      .then((res) => {
        if (!res.ok) throw new Error("Backend not ready");

        clearTimeout(slowTimer);
        sessionStorage.setItem("backend_warmed", "true");

        toast.success("Backend connected 🚀", { id: toastId });
      })
      .catch(() => {
        clearTimeout(slowTimer);


        toast.loading(
          "Backend is currently offline. Reload to retry.",
          { id: toastId }
        );
      });
  }, []);



  return (
    <div className="overflow-clip">
      <Toaster position="top-center" />
      {showLoading && <LoadingScreen />}

      <Navbar />

      {cartOpen && <MobileCart />}
      {showLogin && <Login />}
      {showMobileMenu && <MobileMenu />}

      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/about" element={<About />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="*" element={<>Error</>} />
      </Routes>

      <Footer />
    </div>
  );
};

export default App;
