import { Navigate, useNavigate } from 'react-router-dom';
import SplitText from './Components/SplitText';
import './Home.css';

function Home() {

    const navigator = useNavigate();
    return (
        <>
            <div className='landing'>
                <div>
                    <h1>
                        <SplitText
                            text={"Splitzee"}
                            ease='elastic.out(0.2, 0.6)'
                        />
                    </h1>
                    <p>
                        <SplitText
                            text={"No nonsense bill splitting app designed for friends, roommates, travel buddies, and anyone tired of chasing payments or doing mental math after dinner."}
                            splitType='words'
                        />
                    </p>

                    <div className='btngroup'>
                        <button onClick={() => navigator("/login")}>Login</button>
                        <button onClick={() => navigator("/signup")}>Signup</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;
