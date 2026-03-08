import { useState, useCallback } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence } from 'framer-motion';
import { AdminProvider } from './context/AdminContext';
import OwlIntro from './components/OwlIntro';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Index from "./pages/Index";
import About from "./pages/About";
import MenuPage from "./pages/MenuPage";
import Gallery from "./pages/Gallery";
import Reservations from "./pages/Reservations";
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const introSeen = sessionStorage.getItem('owlIntroSeen') === 'true';
  const [showIntro, setShowIntro] = useState(!introSeen);

  const handleIntroComplete = useCallback(() => {
    sessionStorage.setItem('owlIntroSeen', 'true');
    setShowIntro(false);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AdminProvider>
          <Toaster />
          <Sonner />
          <AnimatePresence>
            {showIntro && <OwlIntro onComplete={handleIntroComplete} />}
          </AnimatePresence>
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/menu" element={<MenuPage />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/reservations" element={<Reservations />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
          </BrowserRouter>
        </AdminProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
