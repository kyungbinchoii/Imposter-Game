// Components/WaitingRoom.tsx
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, useParams } from 'react-router-dom';
import { usePlayer } from './usePlayer';
import { useEffect, useState } from 'react';

export interface Player {
  gamePlayersId: number;
  gamePin: string;
  playerName: string;
  isImposter: boolean;
  isAlive: boolean;
}

export interface Game {
  gamePin: string;
  categoryId: number;
  hostName: string;
  itemId: number;
  gameState: string;
}

export default function WaitingRoom() {
  const navigate = useNavigate();
  const { game, player } = usePlayer();
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

  const startGame = () => {
    if (game) {
      navigate('/startingRoom', { state: { players, game } });
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Waiting Room</h2>
      <ul className="list-group">
        {players.map((player, index) => (
          <li key={index} className="list-group-item">
            {player.playerName}
          </li>
        ))}
      </ul>
      {player?.isHost && (
        <button className="btn btn-primary mt-4" onClick={startGame}>
          Start Game
        </button>
      )}
    </div>
  );
}
