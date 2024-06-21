import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePlayer } from './usePlayer';

export default function Guest() {
  const [guestUsername, setGuestUsername] = useState('');
  const [gamePin, setGamePin] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { setPlayer } = usePlayer();

  const navigate = useNavigate();

  const handleJoinGame = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!guestUsername) {
      setError('Username is required.');
      return;
    }
    if (!gamePin) {
      setError('Game Pin is required.');
      return;
    }
    setError(null);
    console.log(
      'Joining game with username:',
      guestUsername,
      'and game pin:',
      gamePin
    );
    try {
      const insertGuestJoin = await fetch('/api/joinGame', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          playerName: guestUsername,
          gamePin: gamePin,
        }),
      });
      const gameInfo = await insertGuestJoin.json();
      console.log('Game info:', gameInfo);

      const guest = {
        gamePin: gamePin,
        playerName: guestUsername,
        isImposter: false,
        isAlive: true,
        isHost: false,
      };

      setPlayer(guest);
      navigate(`/lobby/${gameInfo.gamePin}`);
    } catch (error) {
      console.error('Error joining game:', error);
    }
  };

  const handleGuestUsernameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setGuestUsername(event.target.value);
  };

  const handleGamePinChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGamePin(event.target.value);
  };

  return (
    <div className="col-sm-12">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title mb-3">GUEST</h5>
          <form onSubmit={handleJoinGame}>
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Create Username"
              value={guestUsername}
              onChange={handleGuestUsernameChange}
            />
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Enter Game Pin"
              value={gamePin}
              onChange={handleGamePinChange}
            />
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="mb-3">
              <button type="submit" className="btn btn-primary">
                Join
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
