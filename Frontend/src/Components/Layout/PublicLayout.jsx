import { Outlet } from "react-router-dom";
import PublicNavbar from "../PublicNavbar";
import Footer from "../Footer";

const PublicLayout = () => {
  return (
    <div>
      <PublicNavbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default PublicLayout;
