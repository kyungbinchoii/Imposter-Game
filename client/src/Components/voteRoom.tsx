import { useCallback, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePlayer } from './usePlayer';

type Hint = {
  playerName: string;
  hint: string;
};

export default function VoteRoom() {
  const { gamePin } = useParams();
  const [hints, setHints] = useState<Hint[]>([]);
  const [selectedHint, setSelectedHint] = useState<string | null>(null);
  const navigate = useNavigate();
  const { player } = usePlayer();

  const fetchHints = useCallback(async () => {
    try {
      const response = await fetch(`/api/getHints/${gamePin}`);
      if (response.ok) {
        const data = await response.json();
        setHints(data);
      } else {
        throw new Error('Error fetching hints');
      }
    } catch (error) {
      console.error('Error fetching hints:', error);
    }
  }, [gamePin]);

  useEffect(() => {
    fetchHints();
  }, [fetchHints]);

  const handleRefresh = async () => {
    await fetchHints();
    setSelectedHint(null);
  };

  const handleVote = async () => {
    try {
      await fetch(`/api/vote/${gamePin}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          gamePin,
          voterName: player?.playerName,
          votedName: selectedHint,
        }),
      });
    } catch (error) {
      console.error('Error voting:', error);
    }
    navigate(`/voteOutcomeRoom/${gamePin}`);
  };

  const handleHintSelect = (hintPlayerName: string) => {
    setSelectedHint(hintPlayerName === selectedHint ? null : hintPlayerName);
  };

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
      <div className="container mt-4 lobby-container">
        <h2 className="lobby-container">THE IMPOSTER GAME VOTING ROOM</h2>
        <button onClick={handleRefresh} className="btn btn-secondary mb-3">
          Refresh Hints
        </button>
        <ul className="list-group">
          {hints.map((hint, index) => (
            <li key={index} className="list-group-item lobby-container">
              <input
                type="radio"
                name="hintSelection"
                checked={hint.playerName === selectedHint}
                onChange={() => handleHintSelect(hint.playerName)}
              />
              <strong>{hint.playerName}:</strong> {hint.hint}
            </li>
          ))}
        </ul>
        <button
          onClick={handleVote}
          className="btn btn-primary"
          disabled={!selectedHint}>
          Vote Player
        </button>
      </div>
    </>
  );
}
