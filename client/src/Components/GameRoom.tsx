import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePlayer } from './usePlayer';
import '../WaitingRoom.css';

export default function GameRoom() {
  const { gamePin } = useParams();
  const { game, player, setPlayer } = usePlayer();
  const [hint, setHint] = useState<string>('');
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getPlayers = async () => {
      try {
        const response = await fetch(`/api/players/${player?.playerName}`);
        if (response.ok) {
          const data = await response.json();
          setPlayer(data);
        } else {
          throw new Error('Error fetching player');
        }
      } catch (error) {
        console.error('Error fetching player:', error);
      } finally {
        setIsLoading(false);
      }
    };
    getPlayers();
  }, [player?.playerName]);

  const handleHintChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHint(event.target.value);
  };

  const handleSubmitHint = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!hint.trim()) {
      alert('You must type a word to submit your hint.');
      return;
    }
    try {
      await fetch('/api/submitHint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          hint,
          playerName: player?.playerName,
          gamePin,
        }),
      });
    } catch (error) {
      console.error('Error submitting hint:', error);
    }
    navigate(`/voteRoom/${gamePin}`);
  };
  if (!player || isLoading) return null;
  return (
    <>
      <div>
        <header className="d-flex justify-content-between align-items-center p-3 bg-body-tertiary w-100">
          <h1 className="m-0">The Imposter Game</h1>

          <button
            className="btn btn-primary me-2"
            onClick={() => navigate('/')}>
            Home
          </button>
        </header>
      </div>
      <div
        style={{
          backgroundImage: 'url(/Images/welcome.jpeg)',
          backgroundSize: 'cover',
          width: '100vw',
          height: '300px',
        }}></div>
      <div className="container mt-4">
        <div className="lobby-container">
          <h2>Game Room</h2>
          <h3>Player: {player.playerName}</h3>
          <h3>Category: {game.categoryName}</h3>
          <h3>Item: {player.isImposter ? 'Imposter' : game.itemName}</h3>
        </div>
        {!player.isImposter ? (
          <form onSubmit={handleSubmitHint}>
            <div className="mb-3  ">
              <label htmlFor="hint" className="form-label lobby-container ">
                ENTER YOUR HINT!
              </label>
              <input
                type="text"
                className="form-control "
                id="hint"
                value={hint}
                onChange={handleHintChange}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit Hint
            </button>
          </form>
        ) : (
          <form onSubmit={handleSubmitHint}>
            <div className="mb-3">
              <label htmlFor="hint" className="form-label imposter">
                Try to fit in imposter! Type a hint to fit in with the
                crewmates!:
              </label>
              <input
                type="text"
                className="form-control"
                id="hint"
                value={hint}
                onChange={handleHintChange}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit Hint
            </button>
          </form>
        )}
      </div>
    </>
  );
}
