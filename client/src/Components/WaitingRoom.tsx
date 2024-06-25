import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, useParams } from 'react-router-dom';
import { usePlayer } from './usePlayer';
import { useEffect, useState } from 'react';
import { Player } from './playerContext';

export default function WaitingRoom() {
  const navigate = useNavigate();
  const { game, player, setGame } = usePlayer();
  const [players, setPlayers] = useState<Player[]>([]);
  const { gamePin } = useParams();
  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const playerResponse = await fetch(`/api/players?gamePin=${gamePin}`);
        if (playerResponse.ok) {
          const playersData = await playerResponse.json();
          setPlayers(playersData);
        } else {
          throw new Error('Error fetching players');
        }
      } catch (error) {
        console.error('Error fetching players:', error);
      }
    };
    fetchPlayers();
  }, [gamePin]);

  const startGame = async () => {
    try {
      const gameResponse = await fetch(`/api/startGame`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ gamePin }),
      });
      if (gameResponse.ok) {
        const gameData = await gameResponse.json();
        setGame(gameData);
      } else {
        throw new Error('Error cannot start game');
      }
    } catch (error) {
      console.error('Error cannot start game:', error);
    }
    navigate(`/gameRoom/${gamePin}`);
  };
  const enterGame = async () => {
    navigate(`/gameRoom/${gamePin}`);
  };

  const fetchPlayers = async () => {
    try {
      const playerResponse = await fetch(`/api/players?gamePin=${gamePin}`);
      if (playerResponse.ok) {
        const playersData = await playerResponse.json();
        setPlayers(playersData);
      } else {
        throw new Error('Error fetching players');
      }
    } catch (error) {
      console.error('Error fetching players:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Lobby</h2>
      <h3>Game Pin: {game.gamePin}</h3>
      <h3>Category: {game.categoryName}</h3>
      <ul className="list-group">
        {players.map((player, index) => (
          <li key={index} className="list-group-item">
            {player.playerName}
          </li>
        ))}
      </ul>
      <button className="btn btn-secondary mt-4" onClick={fetchPlayers}>
        Refresh Players
      </button>
      {player?.isHost ? (
        <button className="btn btn-primary mt-4" onClick={startGame}>
          Start Game
        </button>
      ) : (
        <button className="btn btn-primary mt-4" onClick={enterGame}>
          Enter Game
        </button>
      )}
    </div>
  );
}
