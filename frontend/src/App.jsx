import React from "react";
import { Route, Routes } from "react-router-dom";
import { Navigate } from "react-router";
import HomePage from "./pages/HomePage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import NotificationsPage from "./pages/NotificationsPage.jsx";
import ChatPage from "./pages/ChatPage.jsx";
import CallPage from "./pages/CallPage.jsx";
import OnboardingPage from "./pages/OnboardingPage.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import FriendsPage from "./pages/FriendsPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";

import { Toaster } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { axiosInstance } from "./lib/axios.js";
import PageLoader from "./components/PageLoader.jsx";
import { getAuthUser } from "./lib/api.js";
import useAuthUser from "./hooks/useAuthUser.js";
import Layout from "./components/Layout.jsx";
// import { useThemeStore } from './store/useThemeStore.js';

const App = () => {
  const { isLoading, authUser } = useAuthUser();

  // const {theme}=useThemeStore();

  const isAuthenticated = Boolean(authUser);
  const isOnboarded = authUser?.isOnboarded;

  if (isLoading) return <PageLoader />;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? (
              isOnboarded ? (
                <Layout showSidebar={true}>
                  <HomePage />
                </Layout>
              ) : (
                <Navigate to="/onboarding" />
              )
            ) : (
              <LandingPage />
            )
          }
        />

        <Route
          path="/profile"
          element={
            isAuthenticated ? (
              isOnboarded ? (
                <Layout showSidebar={true}>
                  <ProfilePage />
                </Layout>
              ) : (
                <Navigate to="/onboarding" />
              )
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/friends"
          element={
            isAuthenticated ? (
              isOnboarded ? (
                <Layout showSidebar={true}>
                  <FriendsPage />
                </Layout>
              ) : (
                <Navigate to="/onboarding" />
              )
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/signup"
          element={
            !isAuthenticated ? (
              <SignUpPage />
            ) : (
              <Navigate to={isOnboarded ? "/" : "/onboarding"} />
            )
          }
        />

        <Route
          path="/login"
          element={
            !isAuthenticated ? (
              <LoginPage />
            ) : (
              <Navigate to={isOnboarded ? "/" : "/onboarding"} />
            )
          }
        />

        <Route
          path="/notifications"
          element={
            isAuthenticated && isOnboarded ? (
              <Layout showSidebar={true}>
                <NotificationsPage />
              </Layout>
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
            )
          }
        />

        <Route
          path="/call/:id"
          element={
            isAuthenticated && isOnboarded ? (
              <CallPage />
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
            )
          }
        />

        <Route
          path="/chat/:id"
          element={
            isAuthenticated && isOnboarded ? (
              <Layout showSidebar={true}>
                <ChatPage />
              </Layout>
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
            )
          }
        />

        <Route
          path="/onboarding"
          element={
            isAuthenticated ? (
              !isOnboarded ? (
                <OnboardingPage />
              ) : (
                <Navigate to="/" />
              )
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>

      <Toaster />
    </div>
  );
};

export default App;
