import { useState, useEffect } from "react";
import { Navigation } from "./components/Navigation";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Services } from "./components/Services";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { AdminDashboard } from "./components/AdminDashboard";
import { DebugPanel } from "./components/DebugPanel";
import { HeadMeta } from "./components/HeadMeta";
import { Toaster } from "./components/ui/sonner";

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");

  // Set page title
  useEffect(() => {
    document.title = "MCRC Tax and Accounting Services";
  }, []);

  // Check URL hash on mount and hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === "#admin") {
        setCurrentPage("admin");
        document.title = "Admin Dashboard - MCRC";
      } else if (hash === "#debug") {
        setCurrentPage("debug");
        document.title = "Debug Panel - MCRC";
      } else {
        setCurrentPage("home");
        document.title = "MCRC Tax and Accounting Services";
      }
    };

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  if (currentPage === "admin") {
    return (
      <>
        <HeadMeta />
        <AdminDashboard />
        <Toaster />
      </>
    );
  }

  if (currentPage === "debug") {
    return (
      <>
        <HeadMeta />
        <DebugPanel />
        <Toaster />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <HeadMeta />
      <Navigation />
      <main>
        <Hero />
        <About />
        <Services />
        <Contact />
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}
