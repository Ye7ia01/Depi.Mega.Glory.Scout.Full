import { Link } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { IoIosNotificationsOutline } from "react-icons/io";
import UEFA from "../../Pictures/UEFA.png";
import { basketball, LiveMatch } from "../../../API/API";
import { RiCompassDiscoverLine } from "react-icons/ri";
import { MdKeyboardArrowRight, MdOutlineInsertChartOutlined } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
const LiveStore = () => {
  return (
    <div>
      <div className="live-store">
        <div className="live-container">
          <div className="live-card">
            <div className="image">
              <div className="img"></div>
            </div>
            <div className="title">
              <div className="text">
                <h1>Dicover all about sport</h1>
                <p>
                  Search millions of jobs and get the inside scoop on companies.
                  Wait for what? Let’s get start it!
                </p>
              </div>
              <div className="links">
                <Link to="/login">Sign in</Link>
                <Link to="/register-player">Sign Up</Link>
              </div>
            </div>
          </div>
          <div className="live-card">
            <header>
              <h1>LiveScore</h1>
              <div className="icons">
                <button>
                  <CiSearch />
                </button>
                <button>
                  <IoIosNotificationsOutline />
                </button>
              </div>
            </header>
            <div className="img">
              <img src={UEFA} alt="" />
            </div>
            <div className="live-cards">
              {
                basketball?.map((e,index)=><div className="lists" key={index}>
                <div className="image-football">
                  <img className="image-football" src={e.image} alt="" />
                </div>
                <h1>{e.title}</h1>
              </div>)
              }
            </div>
            {
              LiveMatch?.map((e,index)=><div className="lists-match" key={index}>
              <div className="League">
                <div className="logo-image">
                  <img src={e.imageleague} alt="" />
                  <div className="text-League">
                    <h1>{e.title}</h1>
                    <p>{e.country}</p>
                  </div>
                </div>
                <button><MdKeyboardArrowRight /></button>
              </div>
              {/* Live Match */}
              <div className="live-match">
                <div className="img-match">
                  <div className="box-imgs">
                  <img src={e.twoimage} alt="" />
                  </div>
                  <div className="box-imgs">
                  <img src={e.oneimage} alt="" />
                  </div>
                </div>
                <div className="title-match">
                  <h1><span>{e.titleteamone}</span>  vs <span>{e.titleteamtwo}</span></h1>
                  <h3><span>{e.score}</span> - <span>{e.twoxScore}</span></h3>
                </div>
                <div className="time-match">
                  <h3>HT</h3>
                </div>
              </div>
            </div>)
            }
            <nav>
              <div className="text">
                <h1>Home</h1>
                <p></p>
              </div>
              <div className="icon">
                <Link><RiCompassDiscoverLine /></Link>
                <Link><MdOutlineInsertChartOutlined /></Link>
                <Link><FaRegUser /></Link>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveStore;
