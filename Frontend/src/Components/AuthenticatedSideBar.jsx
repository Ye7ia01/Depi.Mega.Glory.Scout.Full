import {Button, Image, Nav, Navbar} from "react-bootstrap";
import Brand from '../assets/Brand.svg'
import Contact from '../assets/contactIcon.svg'
import FAQ from '../assets/FaqIcon.svg'
import Email from '../assets/emailIcon.svg'
import Home from '../assets/homeIcon.svg'
import Player from '../assets/playerIcon.svg'
import Settings from '../assets/settingsIcon.svg'
import Banner from '../assets/Banner.svg'
import {FaBars, FaHome, FaEnvelope, FaQuestionCircle, FaPhoneAlt, FaUser, FaCog} from "react-icons/fa";
import {useContext, useState} from "react";
import {NavbarLogo} from "./NavbarLogo.jsx";
import '../styles/Style.scss'
import {NavLink} from "react-router";
import {UserType} from "../enums/userType.jsx";
import {AuthContext} from "../context/AuthContext.jsx";

/**
 * AuthenticatedSideBar component
 *
 * This component renders a sidebar navigation menu for authenticated users.
 * It includes links to various sections of the application and displays different
 * options based on the user's type (player or coach).
 *
 * @param {Object} props - The component props
 * @param {boolean} props.collapsed - Indicates whether the sidebar is collapsed
 * @param {Function} props.setCollapsed - Function to toggle the collapsed state
 * @returns {JSX.Element} The rendered component
 */
export const AuthenticatedSideBar = ({collapsed, setCollapsed}) => {

    // Get the current user from the AuthContext
    const {user} = useContext(AuthContext)

    console.log("User in SIde Bar Comp. : ", user);
    // State to manage the visibility of the sidebar
    const [visible, setVisible] = useState(true)
    // State to manage the active page
    const [activePage, setActivePage] = useState('players')
    console.log("Active Page : ",activePage)

    return (
        <>
            {
                collapsed && (
                    <Navbar variant="dark" className="d-flex flex-column ps-4 align-items-start side-bar"
                    >

                        <Nav className="d-flex flex-column justify-content-evenly">
                            <div className='d-flex flex-row'>
                                <NavbarLogo/>
                                <Button className='bg-transparent border-0' onClick={() => setCollapsed(!collapsed)}>
                                    <FaBars/>
                                </Button>
                            </div>
                            <p className="side-bar-text mt-3">Main Menu</p>
                            <Nav.Item>
                                <NavLink href to="/home" className="d-flex align-items-center ps-0 text-decoration-none"
                                         onClick={
                                             () => setActivePage('home')
                                         }>
                                    <Image
                                        className={`me-3 svg-icon img-fluid ${activePage === 'home' ? 'svg-icon-active' : ''}`}
                                        src={Home}
                                        width='20px'
                                        height='20px'
                                    />
                                    <span className={`side-bar-items ${activePage === 'home' ? 'active' : ''}`}>Home</span>
                                </NavLink>
                            </Nav.Item>

                            <Nav.Item className="">
                                <NavLink to="" className="d-flex align-items-center ps-0 text-decoration-none"
                                         onClick={
                                             () => setActivePage('email')
                                         }>
                                    <Image
                                        src={Email}
                                        width='20px'
                                        height='20px'
                                        className={`me-3 svg-icon img-fluid ${activePage === 'email' ? 'svg-icon-active' : ''}`}
                                    />
                                    <span
                                        className={`side-bar-items ${activePage === 'email' ? 'active' : ''}`}>Email</span>
                                </NavLink>
                            </Nav.Item>

                            <Nav.Item className="">
                                <NavLink to="/home/faq" className="d-flex align-items-center ps-0  text-decoration-none"
                                         onClick={
                                             () => setActivePage('faq')
                                         }>
                                    <Image
                                        className={`me-3 svg-icon img-fluid ${activePage === 'faq' ? 'svg-icon-active' : ''}`}
                                        src={FAQ}
                                        width='20px'
                                        height='20px'

                                    />
                                    <span className={`side-bar-items ${activePage === 'faq' ? 'active' : ''}`}>FAQ</span>
                                </NavLink>
                            </Nav.Item>

                            <Nav.Item className="">
                                <NavLink to="/home/contact" className="d-flex align-items-center ps-0 text-decoration-none"
                                         onClick={
                                             () => setActivePage('contact')
                                         }>
                                    <Image
                                        className={`me-3 svg-icon img-fluid ${activePage === 'contact' ? 'svg-icon-active' : ''}`}
                                        src={Contact}
                                        width='20px'
                                        height='20px'
                                    />

                                    <span className={`side-bar-items ${activePage === 'contact' ? 'active' : ''}`}>Contact Us</span>
                                </NavLink>
                            </Nav.Item>


                            {/*{user?.role === UserType.PLAYER && (*/}
                                <Nav.Item className="">
                                    <NavLink to="/home/players" className="d-flex align-items-center ps-0 text-decoration-none"
                                             onClick={
                                                 () => setActivePage('players')
                                             }>
                                        <Image
                                            className={`me-3 svg-icon img-fluid ${activePage === 'players' ? 'svg-icon-active' : ''}`}
                                            src={Player}
                                            width='20px'
                                            height='20px'

                                        />
                                        <span
                                            className={`side-bar-items ${activePage === 'players' ? 'active' : ''}`}>Players</span>
                                    </NavLink>
                                </Nav.Item>
                            {/*)*/}
                            {/*}*/}
                            {/*{user?.role === UserType.COACH && (*/}
                                <Nav.Item className="">
                                    <NavLink to="/home/coaches" className="d-flex align-items-center ps-0 text-decoration-none"
                                             onClick={
                                                 () => setActivePage('coaches')
                                             }>
                                        <Image
                                            className={`me-3 svg-icon img-fluid ${activePage === 'coaches' ? 'svg-icon-active' : ''}`}
                                            src={Player}
                                            width='20px'
                                            height='20px'

                                        />
                                        <span
                                            className={`side-bar-items ${activePage === 'coaches' ? 'active' : ''}`}>Coaches</span>
                                    </NavLink>
                                </Nav.Item>
                            {/*)*/}
                            {/*}*/}
                            <Nav.Item className="">
                                <NavLink to="/settings" className="d-flex align-items-center ps-0 text-decoration-none"
                                         onClick={
                                             () => setActivePage('settings')
                                         }>
                                    <Image
                                        className={`me-3 svg-icon img-fluid ${activePage === 'settings' ? 'svg-icon-active' : ''}`}
                                        src={Settings}
                                        width='20px'
                                        height='20px'
                                    />
                                    <span
                                        className={`side-bar-items ${activePage === 'settings' ? 'active' : ''}`}>Settings</span>
                                </NavLink>
                            </Nav.Item>
                            <Nav.Item>
                                <NavLink className='ps-0 w-100'>
                                    <Image
                                        src={Banner}
                                        className='w-100'
                                        style={{height: '213px'}}
                                    />
                                </NavLink>

                            </Nav.Item>
                        </Nav>
                    </Navbar>
                )
            }
        </>
    )
}
