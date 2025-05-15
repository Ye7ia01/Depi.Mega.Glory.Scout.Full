import {Image} from "react-bootstrap";
import Brand from "../assets/logo.svg";

export const NavbarLogo = () => {
    return (
        <div className='d-flex align-items-center d-none d-sm-inline-flex d-md-inline-flex d-lg-inline-flex logo-info'>
            <Image
                src={Brand}
                width='80'
                height='80'
                alt=''
                className='img-fluid'
            />
            <div className="d-flex flex-column">
                <h1 className='logo-text-header m-0'>Glory</h1>
                <p className='logo-text m-0'>Scout</p>
            </div>
        </div>
    )
}