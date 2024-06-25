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
      await fetch('/api/vote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          gamePin,
          voterId: player?.playerName,
          votedId: selectedHint,
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
      <div className="container mt-4">
        <h2>THE IMPOSTER GAME VOTING ROOM</h2>
        <button onClick={handleRefresh} className="btn btn-secondary mb-3">
          Refresh Hints
        </button>
        <ul className="list-group">
          {hints.map((hint, index) => (
            <li key={index} className="list-group-item">
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
        <button onClick={handleVote}>Vote Player</button>
      </div>
    </>
  );
}
