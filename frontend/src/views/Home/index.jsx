import './style.css';
import { HaskathonBG } from '../../assets/img/index';
const Home = () => {

    return (
        <div className='home-container'>
            <img className='home-bg' src={HaskathonBG} alt="" />
        </div>
    );
};

export default Home;
