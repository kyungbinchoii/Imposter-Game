import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

interface Vote {
  voterName: string;
  votedName: string;
}
interface Player {
  playerName: string;
  isAlive: boolean;
  isImposter: boolean;
}
export default function VoteOutcomeRoom() {
  const { gamePin } = useParams();
  const [votes, setVotes] = useState<Vote[]>([]);
  const [voteCounts, setVoteCounts] = useState<{ [key: string]: number }>({});
  const [players, setPlayers] = useState<Player[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVotesAndPlayers = async () => {
      try {
        const [votesResponse, playersResponse] = await Promise.all([
          fetch(`/api/getVotes/${gamePin}`),
          fetch(`/api/players?gamePin=${gamePin}`),
        ]);

        if (votesResponse.ok && playersResponse.ok) {
          const voteData = await votesResponse.json();
          const playerData = await playersResponse.json();
          setVotes(voteData);
          setPlayers(playerData);
        } else {
          throw new Error('Error fetching data');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchVotesAndPlayers();
  }, [gamePin]);

  useEffect(() => {
    const counts: { [key: string]: number } = {};
    votes.forEach((vote) => {
      if (counts[vote.votedName]) {
        counts[vote.votedName]++;
      } else {
        counts[vote.votedName] = 1;
      }
    });
    setVoteCounts(counts);
  }, [votes]);

  const fetchVotes = async () => {
    try {
      const response = await fetch(`/api/getVotes/${gamePin}`);
      if (response.ok) {
        const voteData = await response.json();
        setVotes(voteData);
      } else {
        throw new Error('Error fetching votes');
      }
    } catch (error) {
      console.error('Error fetching votes:', error);
    }
  };

  const isGameOver = votes.length === players.length;
  const mostVotedPlayer = Object.keys(voteCounts).reduce(
    (a, b) => (voteCounts[a] > voteCounts[b] ? a : b),
    ''
  );
  const imposter = players.find((player) => player.isImposter);
  const mostVotedPlayerIsImposter = players.find(
    (player) => player.playerName === mostVotedPlayer
  )?.isImposter;
  const goHome = () => {
    navigate('/');
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
        <h1 className="mb-4 lobby-container">Vote Outcome</h1>
        <ul>
          {Object.entries(voteCounts).map(([playerName, count]) => (
            <li key={playerName} className="list-group-item lobby-container">
              {playerName}: {count} vote{count !== 1 ? 's' : ''}
            </li>
          ))}
          <button className="btn btn-secondary mt-4 " onClick={fetchVotes}>
            Refresh Votes
          </button>
        </ul>
        {isGameOver && (
          <div className="mt-4 lobby-container">
            <h2>Game Over</h2>
            <div>Most Voted Player: {mostVotedPlayer}</div>
            <div>Imposter: {imposter?.playerName}</div>
            {mostVotedPlayerIsImposter ? (
              <div>The CREWMATES win!</div>
            ) : (
              <div>The IMPOSTER wins!</div>
            )}
          </div>
        )}
        {isGameOver && (
          <div className="mt-4">
            <button className="btn btn-secondary" onClick={goHome}>
              Go Home
            </button>
          </div>
        )}
      </div>
    </>
  );
}
