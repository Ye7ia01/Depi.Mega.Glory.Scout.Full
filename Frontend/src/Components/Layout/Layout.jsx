import React, {useContext, useState, useEffect} from "react";
import { AuthenticatedNavBar } from "../AuthenticatedNavBar";
import { AuthenticatedSideBar } from "../AuthenticatedSideBar";
import { Outlet } from "react-router";
import {AuthContext} from "../../context/AuthContext.jsx";
import {useNavigate} from "react-router-dom";

const Layout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {user} = useContext(AuthContext);
  const navigate = useNavigate();
    useEffect(() => {
        console.log
        if (!user?.token) {
            navigate('/login');
        }
    }, []);
  return (
    <div className="d-flex flex-column">
      {/* Navbar */}
      <AuthenticatedNavBar  collapsed={collapsed} setCollapsed={setCollapsed}/>
      
      <div className="d-flex">
        {/* Sidebar */}
        <AuthenticatedSideBar />
        
        {/* Main Content */}
        <div className="flex-grow-1 p-4 ">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default Layout;
