import { AuthContext, AuthProvider } from "./context/AuthContext.jsx";
import { Route, Routes } from "react-router-dom";
import { AuthenticatedNavBar } from "./Components/AuthenticatedNavBar.jsx";
import { useState, useContext } from "react";
import Contact from "./Components/Contact";
import { PlayersCoachesHomeScreen } from "./screens/PlayersCoachesHomeScreen.jsx";
import FAQ from "./Components/FAQ.jsx";
import PlayerProfile from "./Components/PlayerProfile.jsx";
import { Toaster } from "react-hot-toast";
import Login from "./Components/Auth/Login.jsx";
import Layout from "./Components/Layout/Layout.jsx";
import PublicLayout from "./Components/Layout/PublicLayout.jsx";
import NotFound from "./Components/Layout/NotFound.jsx";
import Home from "./Components/Home/Home.jsx";
import About from "./Components/About/About.jsx";
import RegisterCoach from "./Components/Auth/RegisterCoach.jsx";
import RegisterPlayers from "./Components/Auth/RegisterPlayers.jsx";
import CreateNewPassword from "./Components/Auth/CreateNewPassword.jsx";
import ResetPassword from "./Components/Auth/ResetPassword.jsx";
import UploadPage from "./Components/UploadPage.jsx";
import PublicPlayerProfile from "./Components/PublicPlayerProfile.jsx";
import ProtectedLayout from "./Components/Layout/ProtectedLayout.jsx";
import HomePage from "./screens/HomePage.jsx";
import PublicCoachProfile from "./Components/PublicCoachProfile.jsx";
import PostDetails from "./Components/PostDetails";


function App() {
  const [collapsed, setCollapsed] = useState(false);
  const { user } = useContext(AuthContext);

  return (
    <AuthProvider>
      <Toaster />
      {user ? (
        <AuthenticatedNavBar
          collapsed={collapsed}
          setCollapsed={setCollapsed}
        />
      ) : (
        // <Layout>
        //   <PlayerProfile/>
        // </Layout>
        ""
      )}

      <Routes>
        {/*
          This route displays the main Layout containing the Sidebar.
          Any content within this route will be displayed inside the Layout.
        */}
        <Route path="/home" element={
        <ProtectedLayout>
          <Layout />
        </ProtectedLayout>
        }>
          <Route index element={<HomePage />}/>
          <Route path="/home/player" element={<PlayerProfile />} dataType="players"/>
          <Route path="/home/coach" element={<PlayerProfile />} dataType="coaches"/>
          <Route path="/home/faq" element={<FAQ />} />
          <Route path="/home/email" element={<Login />} />
          <Route path="/home/contact" element={<Contact />} />
          <Route path="/home/public" element={<PublicPlayerProfile />} />
          <Route path="/home/players" element={<PlayersCoachesHomeScreen dataType="players" />} />
          <Route path="/home/coaches" element={<PlayersCoachesHomeScreen dataType="coaches" />} />
          {/*<Route path="/home/coaches" element={<PlayerProfile dataType="players" />} />*/}
          {/* <Route path="/home/player"  element={<players />} /> */}
          {/* <Route index  element={<PlayersCoachesHomeScreen />} /> */}
         <Route path="/home/player/:id" element={<PublicPlayerProfile/>}/>
         <Route path="/home/coach/:id" element={<PublicCoachProfile/>}/>
        </Route>
        <Route path="/posts/:postId" element={<PostDetails />} />

        <Route path="/" element={<PublicLayout />}>
          {/* These routes will be divided between site visitors and registered users.
        Each group will be linked to a specific layout with its own access permissions. */}
        <Route index element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/register-coaches" element={<RegisterCoach />} />
        <Route path="/register-player" element={<RegisterPlayers />} />
        <Route path="/login" element={<Login />} />
        <Route path="/changepassword" element={<CreateNewPassword />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        {/* <Route path="/coach-profile" element={<PlayerProfile dataType="coaches" />} /> */}
        <Route path="/upload" element={<UploadPage />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
