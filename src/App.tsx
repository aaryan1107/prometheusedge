import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ScrollToTop } from "@/components/v2/ScrollToTop";
import { CanvasCursor } from "@/components/ui/CanvasCursor";
import Home from "@/pages/Home";

const Blog = lazy(() => import("@/pages/Blog"));
const BlogPost = lazy(() => import("@/pages/BlogPost"));
const Careers = lazy(() => import("@/pages/Careers"));
const CareerDetail = lazy(() => import("@/pages/CareerDetail"));
const Universities = lazy(() => import("@/pages/Universities"));
const UniversityCountry = lazy(() => import("@/pages/UniversityCountry"));
const Contact = lazy(() => import("@/pages/Contact"));
const AdminBookings = lazy(() => import("@/pages/AdminBookings"));
const NotFound = lazy(() => import("@/pages/NotFound"));

function RouteFallback() {
  return (
    <div className="tw:flex tw:min-h-screen tw:items-center tw:justify-center tw:bg-parchment">
      <span className="tw:font-display tw:text-2xl tw:text-espresso/55">The Edge Way</span>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <CanvasCursor />
      <ScrollToTop />
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/careers/:slug" element={<CareerDetail />} />
          <Route path="/universities" element={<Universities />} />
          <Route path="/universities/:country" element={<UniversityCountry />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin/bookings" element={<AdminBookings />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
