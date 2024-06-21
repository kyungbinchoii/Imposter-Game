import { useLocation } from 'react-router-dom';
import { Player, Game } from './playerContext';

interface LocationState {
  players: Player[];
  game: Game;
}

export default function StartingRoom() {
  const location = useLocation();
  const state = location.state as LocationState;
  const { players, game } = state;

  return (
    <div className="container mt-4">
      <h2 className="mb-4">The Imposter Game!</h2>
      <h3>Game Pin: {game.gamePin}</h3>
      <h3>Category: {game.categoryId}</h3>
      <ul className="list-group">
        {players.map((player, index) => (
          <li key={index} className="list-group-item">
            {player.playerName}
          </li>
        ))}
      </ul>
    </div>
  );
}
