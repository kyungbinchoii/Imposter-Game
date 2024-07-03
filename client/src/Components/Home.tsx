import 'bootstrap/dist/css/bootstrap.min.css';
import Host from './Host';
import Guest from './Guest';
import '../WaitingRoom.css';
import { useNavigate } from 'react-router-dom';
import DemoRoom from './DemoButton';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <header className="d-flex justify-content-between align-items-center p-3 bg-body-tertiary w-100">
        <h1 className="m-0">The Imposter Game</h1>

        <button className="btn btn-primary me-2" onClick={() => navigate('/')}>
          Home
        </button>
      </header>
      <div
        style={{
          backgroundImage: 'url(/Images/welcome.jpeg)',
          backgroundSize: 'cover',
          width: '100vw',
          height: '300px',
        }}></div>
      <div className="container mt-4">
        <div className="row mt-4 align-items-center lobby-container">
          <div className="col-md-8  ">
            <h1 className="text-center lobby-container ">THE IMPOSTER GAME</h1>
            <h4 className="lobby-container">
              TEST OUT YOUR DETECTIVE SKILLS AND SUS OUT THE IMPOSTER HERE WITH
              YOUR FRIENDS. IMPOSTERS! TRY NOT TO BE SUS!
            </h4>
            <h5 className="lobby-container">
              Host to play Who's The Imposter with your friends! Choose a
              category, invite Guests with the Game Pin and vote off the
              imposter in the group!
            </h5>
            <h3 className="lobby-container">GAME RULES!</h3>
            <div className="lobby-container">
              <ol>
                <li>IF YOU ARE HOST CHOOSE A CATEGORY!</li>
                <li>MUST HAVE 3 OR MORE PLAYERS TO PLAY!</li>
                <li>
                  GUESTS: ENTER GAME PIN THE HOST SENT YOU AND ENTER A USERNAME
                  AND THE GAME PIN TO START!
                </li>
                <li>
                  GIVE A HINT OF WHAT THE WORD IS WITHOUT GIVING AWAY THE WORD
                </li>
                <li>VOTE WHO YOU THINK IS THE IMPOSTER BASED OFF THE HINTS!</li>
                <li>IMPOSTERS TRY TO BLEND IN AS BEST AS POSSIBLE!</li>
              </ol>
              <p>
                TLDR: For example: 3 of us knows the word. One doesn't. Guess
                the imposter by giving clues on what the word is.
              </p>
              <p>click below for visual learners/recruiters/hiring managers</p>
              <DemoRoom></DemoRoom>
            </div>
          </div>
          <div className="col-md-4 text-center">
            <img
              src="/Images/confused.jpeg"
              alt="Your Photo"
              className="img-fluid"
            />
            <Host></Host>
            <Guest></Guest>
          </div>
        </div>
      </div>
    </div>
  );
}
