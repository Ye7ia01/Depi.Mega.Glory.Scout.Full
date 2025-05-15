import {Image} from "react-bootstrap";
import newPlayer from "../assets/newPlayer.svg";

export const NewClubButton = () => {
    return (
        <button className='new-player d-flex flex-row align-items-center ps-4'>
            <Image src={newPlayer}
                   width='30'
                   height='30'
                   className='me-5'
            />
            <span>New Club</span>
        </button>
    )
}