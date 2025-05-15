import {useContext, useState} from "react";
import getPlayers from '../API/players/players.js';
import getCoaches from '../API/coaches/coaches.js'
import {PlayersCoachesCard} from '../Components/PlayersCoachesCard.jsx';
import {NewPlayerButton} from "../Components/NewPlayerButton.jsx";
import {NewClubButton} from "../Components/NewClubButton.jsx";
import {AuthContext} from "../context/AuthContext.jsx";
import {useNavigate} from "react-router-dom";
import useGetPlayers from "../API/players/useGetPlayersScouts.jsx";
import useGetPlayersScouts from "../API/players/useGetPlayersScouts.jsx";
import {FaSpinner} from "react-icons/fa";

/**
 * PlayersCoachesHomeScreen component
 *
 * This component displays a list of players or coaches based on the `dataType` prop.
 * It includes a navigation bar, a header, and a grid of player/coach cards.
 *
 * @param {Object} props - The component props
 * @param {string} props.dataType - The type of data to display ('players' or 'coaches')
 * @returns {JSX.Element} The rendered component
 */
export const PlayersCoachesHomeScreen = ({dataType}) => {

    const {user} = useContext(AuthContext);
    const navigate = useNavigate();
    // State to manage the collapsed state of the navigation bar
    const [collapsed, setCollapsed] = useState(false);
    // State to store the data (players or coaches)

    const {data, isLoading, isError, errorMessage} = useGetPlayersScouts(dataType);
    console.log("DATA : ",data)

    // useEffect(() => {
    //     console.log
    //     if (!user?.token) {
    //         navigate('/login');
    //     }
    // }, []);

    // Effect to fetch data based on the dataType prop
    // useEffect(() => {
    //     if (dataType == 'players') {
    //         setData(getPlayers)
    //     } else if(dataType == 'coaches') {
    //         setData(getCoaches)
    //     }
    // }, [dataType]);

    return (
        <>
            {isLoading && (
                <div style={{
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    fontSize: '3rem',
                    zIndex: 1000,
                }}>
                    <FaSpinner className="loading-login" />
                </div>
            )}

            { data &&
            <div className='players-home-screen pb-2'>


                <div className='d-flex align-items-center justify-content-between flex-wrap players-header-div '>
                    <div className='d-flex ms-sm-5 ms-md-5 ps-sm-5 ps-md-5 ps-lg-5 ms-lg-5 mt-sm-4 mt-md-4 mt-lg-4'>
                        <h1 className='players-heading'>
                            {dataType == 'players' && (<span>Players</span>)}
                            {dataType == 'coaches' && (<span>Coaches</span>)}
                        </h1>
                    </div>

                    {/* <div className='border'>
                        {dataType == 'players' && (<NewPlayerButton/>)}
                        {dataType == 'coaches' && (<NewClubButton/>)}
                    </div> */}
                </div>

                <div className="row g-4 m-auto mt-5 mb-5 " style={{width: '95%'}}>
                    {data?.map((player, index) => (
                        <div key={index} className='col-12 col-lg-2 col-md-4 col-sm-6 custom-col-sm'>
                            <PlayersCoachesCard data={player} type={dataType}/>
                        </div>
                    ))}
                </div>
            </div>
            }
        </>
    )
}