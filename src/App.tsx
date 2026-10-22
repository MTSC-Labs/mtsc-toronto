import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

// Existing Imports
import { SiteLayout } from "./components/SiteLayout";
import Index from "./pages/Index.tsx";
import About from "./pages/About.tsx";
import Support from "./pages/Support.tsx";
import GetInvolved from "./pages/GetInvolved.tsx";
import Contact from "./pages/Contact.tsx";
import NotFound from "./pages/NotFound.tsx";
import Newsletter from "./pages/Newsletter.tsx";

// New Page Imports
import ShipVisits from "./pages/ShipVisits.tsx";
import WomenInMaritime from "./pages/WomenInMaritime.tsx";
import HamiltonStation from "./pages/HamiltonStation.tsx";
import WhatsAhead from "./pages/WhatsAhead.tsx";
import WaysToGetInvolvedArticle from "./pages/WaysToGetInvolvedArticle.tsx";
import Announcements from "./pages/Announcements.tsx";
import Events from "./pages/Events.tsx";
const queryClient = new QueryClient();

// Helper component that automatically scrolls to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop /> 
        <Routes>
          <Route element={<SiteLayout />}>
           
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/support" element={<Support />} />
            <Route path="/get-involved" element={<GetInvolved />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/newsletter" element={<Newsletter />} />

            
            <Route path="/ship-visits" element={<ShipVisits />} />
            <Route path="/women-in-maritime" element={<WomenInMaritime />} />
            <Route path="/hamilton-station" element={<HamiltonStation />} />
            <Route path="/whats-ahead" element={<WhatsAhead />} />
            <Route path="/ways-to-get-involved-article" element={<WaysToGetInvolvedArticle />} />
            <Route path="/announcements" element={<Announcements />} />
            <Route path="/events" element={<Events />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;