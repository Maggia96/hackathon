import './styles.css';

const UserProfile = (props) => {

    return (
        <>
            <div className={`developer-container ${props?.border}`}>
                <h3>{props?.name ? props.name : 'Developer'}</h3>
                <img className='profile mb-5 mt-2' src={props.developer?.picture} alt="" />
                <p><strong>Username: </strong>{props.developer?.user_name}</p>
                <p><strong>Phone: </strong>{props.developer?.phone}</p>
                <p><strong>Gender: </strong>{props.developer?.gender}</p>
                <p><strong>City: </strong>{props.developer?.city}</p>
                {
                    props.ranking ?
                        <p><strong>Ranking: </strong>°{props?.ranking} place</p>
                        : <p><strong>Ranking: </strong>°{props.developer?.winner?.ranking ?? '-'} place</p>
                }
            </div>
        </>
    );
};

export default UserProfile;
