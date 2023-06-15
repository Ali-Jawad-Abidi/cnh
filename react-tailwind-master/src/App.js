// import "./styles.css";
import React, { lazy, Suspense } from "react";
import HomePage from "./assets/HomePage";
import { Route, Routes } from "react-router";
import Logout from "./assets/Logout";
import Loading from "./assets/Loading";
import LatestConsoles from "./assets/LatestConsoles";
import VerifyEmail from "./assets/VerifyEmailPage";

const Nostalgiabase = lazy(() => import("./assets/Nostalgiabase"));
const SigninPage = lazy(() => import("./assets/SigninPage"));
const Blog = lazy(() => import("./assets/Blog"));
const LoginPage = lazy(() => import("./assets/LoginPage"));
const ListingPage = lazy(() => import("./assets/ListingPage"));
const ProductDisplayPage = lazy(() => import("./assets/ProductDisplayPage"));
const SearchResults = lazy(() => import("./assets/SearchResults"));
const BlogDisplay = lazy(() => import("./assets/BlogDisplay"));
const ProfilePanel = lazy(() => import("./assets/ProfilePanel"));
const AddConsole = lazy(() => import("./assets/AddConsole"));
const About = lazy(() => import("./assets/About"));
const Museums = lazy(() => import("./assets/Museums.js"));
const Verify = lazy(() => import("./assets/Verify"));
const SubCats = lazy(() => import("./assets/SubCatsPage"));
const CheckoutForm = lazy(() => import("./assets/Checkout"));
const Store = lazy(() => import("./assets/Store"));
const MerchPage = lazy(() => import("./assets/MerchPage"));
const AdminDashboard = lazy(() => import("./assets/AdminDashboard"));
const PatreonLinking = lazy(() => import("./assets/PatreonLinking"));
const ForgotPassword = lazy(() => import("./assets/ForgotPassword.js"));
const ResetPassword = lazy(() => import("./assets/ResetPassword"));
const ProfilePage = lazy(() => import("./assets/ProfilePage"));
// import PopUp from "./assets/PopUp";

export default function App() {
  return (
    // <ProductProvider>
    <div className="App bg-white dark:bg-gray-900">
      {/* <PopUp /> */}
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route exact path="/" element={<HomePage page="Home" />} />
          <Route exact path="/verify/:id" element={<Verify />} />
          <Route
            exact
            path="/nostalgiabase"
            element={<Nostalgiabase page="NostalgiaBase" />}
          />
          <Route exact path="/nostalgiabase/:brand" element={<SubCats />} />
          <Route exact path="/blogs" element={<Blog page="News" />} />
          <Route exact path="/blogs/:id" element={<BlogDisplay />} />
          {localStorage.getItem("userid") === null && (
            <>
              <Route exact path="/signin" element={<SigninPage />} />
              <Route exact path="/login" element={<LoginPage />} />
              <Route
                exact
                path="/forgotPassword"
                element={<ForgotPassword />}
              />
            </>
          )}
          {localStorage.getItem("userid") !== null && (
            <>
              <Route exact path="/signin" element={<HomePage />} />
              <Route exact path="/login" element={<HomePage />} />
              <Route exact path="/forgotPassword" element={<HomePage />} />
              <Route
                exact
                path="/approveconsole/:id"
                element={<ProductDisplayPage />}
              />
            </>
          )}
          <Route
            exact
            path="/productgrid/pc/:id"
            element={<ListingPage cat="pc" />}
          />

          <Route
            exact
            path="/productgrid/mobile/:id"
            element={<ListingPage cat="mobile" />}
          />
          <Route
            exact
            path="/productgrid/"
            element={<ListingPage cat="console" />}
          />
          <Route
            exact
            path="/nostalgiabase/:brand/:subcat"
            element={<ListingPage cat="console" />}
          />
          <Route
            exact
            path="/nostalgiabase/:brand/:subcat/:con"
            element={<ProductDisplayPage />}
          />

          <Route exact path="/profile/:id" element={<ProfilePanel />} />
          <Route exact path="/search/:search" element={<SearchResults />} />
          <Route exact path="/addconsole" element={<AddConsole />} />
          <Route exact path="/logout" element={<Logout />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/thewall" element={<Museums page="Museum" />} />
          <Route exact path="/checkout" index element={<CheckoutForm />} />
          <Route exact path="/store" index element={<Store />} />
          <Route exact path="/store/:id" index element={<MerchPage />} />
          <Route
            exact
            path="/xGpAQhWobyTxIPx51LAKKOGnrWZNUtcOImuVUIPdqc="
            index
            element={<AdminDashboard />}
          />
          <Route exact path="/latest" index element={<LatestConsoles />} />
          {/* <Route exact path="/verifyEmail" index element={<VerifyEmail />} /> */}
          <Route exact path="/patreon" index element={<PatreonLinking />} />
          <Route
            exact
            path="/resetPassword"
            index
            element={<ResetPassword />}
          />

          <Route
            exact
            path="/profilepage/:id"
            index
            element={<ProfilePage />}
          />
        </Routes>
      </Suspense>
    </div>
    // </ProductProvider>
  );
}
