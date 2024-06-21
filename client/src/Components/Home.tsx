import 'bootstrap/dist/css/bootstrap.min.css';
import Host from './Host';
import Guest from './Guest';

export default function Home() {
  return (
    <div>
      <header className="d-flex justify-content-between align-items-center p-3 bg-body-tertiary w-100">
        <h1 className="m-0">The Imposter Game</h1>
        <div>
          <button className="btn btn-primary me-2">Sign In</button>
          <button className="btn btn-secondary me-2">Log In</button>
          <button className="btn btn-success">Sign Up</button>
        </div>
      </header>
      <div
        style={{
          backgroundImage: 'url(/Images/welcome.jpeg)',
          backgroundSize: 'cover',
          width: '100vw',
          height: '300px',
        }}></div>
      <div className="container mt-4">
        <div className="row mt-4 align-items-center">
          <div className="col-md-8">
            <h1 className="text-center">THE IMPOSTER GAME</h1>
            <h4>
              Based on the Full Squad Gaming's popular Youtube series "Who's the
              imposter?"
            </h4>
            <h5>
              Host to play Who's The Imposter with your friends! Up to 8
              players, choose a word from a set of categories and vote off the
              imposter in the group!
            </h5>
            <h3>Game Rules</h3>
            <ol>
              <li>Pick a category</li>
              <li>
                Give a hint of what the word is every round without giving away
                the word
              </li>
              <li>Vote who you think is the imposter after every round</li>
              <li>Imposters try to blend in as best as possible!</li>
            </ol>
            <p>CLICK BELOW TO WATCH HOW TO PLAY!</p>
            <a
              href="https://www.youtube.com/watch?v=Trd5hcRUMoM"
              target="_blank"
              rel="noopener noreferrer">
              <img
                src="/Images/fg.jpeg"
                alt="Watch the video"
                className="img-fluid mt-3"
                style={{ width: '400px', height: 'auto' }}
              />
            </a>
          </div>
          <div className="col-md-4 text-center">
            <img src="/Images/imp.png" alt="Your Photo" className="img-fluid" />
            <Host></Host>
            <Guest></Guest>
          </div>
        </div>
      </div>
    </div>
  );
}
