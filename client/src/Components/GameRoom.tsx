import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePlayer } from './usePlayer';

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
    <div className="container mt-4">
      <h2>Game Room</h2>
      <h3>Player: {player.playerName}</h3>
      <h3>Category: {game.categoryName}</h3>
      <h3>Item: {player.isImposter ? 'Imposter' : game.itemName}</h3>
      {!player.isImposter ? (
        <form onSubmit={handleSubmitHint}>
          <div className="mb-3">
            <label htmlFor="hint" className="form-label">
              Enter your hint:
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
      ) : (
        <form onSubmit={handleSubmitHint}>
          <div className="mb-3">
            <label htmlFor="hint" className="form-label">
              Enter your hint:
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
  );
}
