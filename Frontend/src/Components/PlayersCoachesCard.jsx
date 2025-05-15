import {Image} from "react-bootstrap";
// import IconPhone from '../assets/iconPhone.svg'
// import IconEmail from '../assets/iconEmail.svg'
import {Link} from "react-router-dom";

export const PlayersCoachesCard = ({data, type}) => {
    // console.log("Type : ", type);
    return (

        <>

            {type == 'players' &&
                <Link className="Player-Links" to={`${`/home/player/${data?.id}`}`}>
                    <div className='players-coaches-card d-flex flex-column align-items-center p-4 shadow-lg rounded bg-white' style={{ border: '1px solid #ddd' }}>

                        <div className="outer mb-3">
                            <Image src={data?.profilePhoto} width='100%' height='100px' roundedCircle
                                   className='player-image border border-2 border-primary'/>
                        </div>

                        <div className='text-center w-100 card-font'>
                            <h5 className='player-name text-truncate fw-bold mb-1 card-font' style={{ fontSize: '1.2rem', color: '#333' }}>{data?.userName}</h5>
                            <p className='player-position text-muted mb-1 card-font' style={{ fontSize: '0.9rem' }}>{data?.position}</p>
                            <p className='player-company card-font' style={{ fontSize: '0.9rem', color: '#555' }}>{data?.currentTeam}</p>
                        </div>

                        <hr className='w-100 my-2' style={{ border: '1px solid #3aff53' }} />

                        <div className='details w-100 card-font'>
                            <div className='d-flex justify-content-between mb-1'>
                                <span className='text-muted card-font' style={{ fontSize: '0.9rem' }}>Age:</span>
                                <span className='fw-bold card-font' style={{ fontSize: '0.9rem' }}>{data?.age}</span>
                            </div>
                            <div className='d-flex justify-content-between mb-1'>
                                <span className='text-muted card-font' style={{ fontSize: '0.9rem' }}>Height:</span>
                                <span className='fw-bold card-font' style={{ fontSize: '0.9rem' }}>{data?.height}</span>
                            </div>
                            <div className='d-flex justify-content-between mb-1'>
                                <span className='text-muted card-font' style={{ fontSize: '0.9rem' }}>Weight:</span>
                                <span className='fw-bold card-font' style={{ fontSize: '0.9rem' }}>{data?.weight}</span>
                            </div>
                            <div className='d-flex justify-content-between mb-1 gap-2'>
                                <span className='text-muted card-font' style={{ fontSize: '0.9rem' }}>Nationality:</span>
                                <span className='fw-bold card-font' style={{fontSize:'13px'}}>{data?.nationality}</span>
                            </div>
                        </div>

                    </div>
                </Link>
            }

{type == 'coaches' &&
    <Link className="Player-Links" to={`${`/home/coach/${data?.id}`}`}>
        <div className='players-coaches-card d-flex flex-column align-items-center p-3 shadow-sm rounded bg-white'>

            <div className="outer mb-3">
                <Image src={data?.profilePhoto} width='100%' height='100px' roundedCircle
                       className='player-image border border-2 border-primary'/>
            </div>

            <div className='text-center w-100 card-font'>
                <h5 className='player-name text-truncate fw-bold mb-1 card-font'>{data?.userName}</h5>
                <p className='player-position text-muted mb-0 card-font'>{data?.specialization}</p>
                <p className='player-company card-font'>{data?.currentClubName}</p>
            </div>

            <hr className='w-100 my-3' style={{ border: '1px solid #3aff53' }} />

            <div className='details w-100 card-font'>
                <div className='d-flex justify-content-between'>
                    <span className='text-muted card-font'>Experience:</span>
                    <span className='fw-bold card-font' style={{fontSize:'13px'}}>{data?.experience} years</span>
                </div>
                <div className='d-flex justify-content-between mt-2 gap-2'>
                    <span className='text-muted card-font'>Nationality:</span>
                    <span className='fw-bold card-font' style={{fontSize:'13px'}}>{data?.nationality}</span>
                </div>
            </div>
        </div>
    </Link>
}
        </>
    )
}

