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
import HomePage from "./pages/HomePage";
import Admin from "./pages/Admin";
import Reservations from "./pages/Reservations";
import NotFound from "./pages/NotFound";
import ReservationButton from './components/ReservationButton';

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
            <ReservationButton />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/reservations" element={<Reservations />} />
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
