import {
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
} from "react-router-dom";
import { Suspense, lazy, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import { server } from "./constants/config";
import { adminExists, adminNotExists } from "./redux/reducers/auth";

const Footer = lazy(() => import("./components/Footer"));
const Header = lazy(() => import("./components/Header"));
const Loader = lazy(() => import("./components/Loader"));
const ProtectedRoute = lazy(() => import("./components/ProtectedRoute"));

// Public pages
const Home = lazy(() => import("./pages/Home"));
const Gallery = lazy(() => import("./pages/Gallery"));
const Membership = lazy(() => import("./pages/Membership"));
const DonateNow = lazy(() => import("./pages/Donate"));
const Login = lazy(() => import("./pages/Login"));
const DonationSuccess = lazy(() => import("./pages/DonationSuccess"));
const DonationFailure = lazy(() => import("./pages/DonationFailure"));
const MembershipSuccess = lazy(() => import("./pages/MembershipSuccess"));
const LatestEvents = lazy(() => import("./pages/LatestEvents"));
const OurWork = lazy(() => import("./pages/OurWork"));
const Contact = lazy(() => import("./pages/Contact"));

// Admin pages
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const DashboardHome = lazy(() =>
  import("./pages/admin/sections/DashboardHome")
);
const Donations = lazy(() => import("./pages/admin/sections/Donations"));
const Events = lazy(() => import("./pages/admin/sections/Events"));
const Media = lazy(() => import("./pages/admin/sections/Media"));
const Members = lazy(() => import("./pages/admin/sections/Members"));
const Settings = lazy(() => import("./pages/admin/sections/Settings"));
const Team = lazy(() => import("./pages/admin/sections/Team"));

const AppLayout = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");
  const { admin, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`${server}/api/v1/admin/me`, { withCredentials: true })
      .then(({ data }) => {
        if (data) {
          dispatch(adminExists(data?.admin));
        }
      })
      .catch(() => {
        dispatch(adminNotExists());
      });
  }, [dispatch]);

  if (loading) return <Loader />;

  return (
    <Suspense fallback={<Loader />}>
      {!isAdminRoute && <Header />}
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/membership" element={<Membership />} />
        <Route path="/donate" element={<DonateNow />} />
        <Route path="/donation-success" element={<DonationSuccess />} />
        <Route path="/donation-failure" element={<DonationFailure />} />
        <Route path="/membership-success" element={<MembershipSuccess />} />
        <Route path="/events" element={<LatestEvents />} />
        <Route path="/our-work" element={<OurWork />} />
        <Route path="/contact" element={<Contact />} />

        <Route
          path="/login"
          element={
            <ProtectedRoute admin={!admin} redirect="/admin">
              <Login />
            </ProtectedRoute>
          }
        />

        {/* Admin routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute admin={admin} redirect="/login">
              <AdminDashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardHome />} />
          <Route path="members" element={<Members />} />
          <Route path="donations" element={<Donations />} />
          <Route path="events" element={<Events />} />
          <Route path="media" element={<Media />} />
          <Route path="team" element={<Team />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
      {!isAdminRoute && <Footer />}
    </Suspense>
  );
};

const App = () => {
  return (
    <>
      <Router>
        <AppLayout />
      </Router>
      <Toaster />
    </>
  );
};

export default App;
