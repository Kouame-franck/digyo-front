import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { SessionProvider } from "./context/SessionContext";
import { AuthModalProvider } from "./context/AuthModalContext";
import { ThemeProvider } from "./context/ThemeContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SupportWidget from "./components/SupportWidget";
import SiteNudges from "./components/SiteNudges";
import Home from "./pages/Home";
import Services from "./pages/Services";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ClientSpace from "./pages/ClientSpace";
import Saas from "./pages/Saas";
import SaasDetail from "./pages/SaasDetail";
import SaasSignupConfirmation from "./pages/SaasSignupConfirmation";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import MentionsLegales from "./pages/MentionsLegales";
import PolitiqueConfidentialite from "./pages/PolitiqueConfidentialite";
import NotFound from "./pages/NotFound";

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

export default function App() {
  return (
    <ThemeProvider>
      <SessionProvider>
        <AuthModalProvider>
          <div className="flex min-h-screen flex-col">
            <ScrollToTop />
            <Header />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/services" element={<Services />} />
                <Route path="/a-propos" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/espace-client" element={<ClientSpace />} />
                <Route path="/saas" element={<Saas />} />
                <Route path="/saas/:slug" element={<SaasDetail />} />
                <Route path="/saas/:slug/confirmation" element={<SaasSignupConfirmation />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:slug" element={<BlogPost />} />
                <Route path="/mentions-legales" element={<MentionsLegales />} />
                <Route path="/politique-de-confidentialite" element={<PolitiqueConfidentialite />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
            <SupportWidget />
            <SiteNudges />
          </div>
        </AuthModalProvider>
      </SessionProvider>
    </ThemeProvider>
  );
}
