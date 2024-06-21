// Components/StartingRoom.tsx
import React from 'react';
import { useLocation } from 'react-router-dom';
import { Player, Game } from './WaitingRoom';

interface LocationState {
  players: Player[];
  game: Game;
}

const StartingRoom: React.FC = () => {
  const location = useLocation();
  const state = location.state as LocationState;
  const { players, game } = state;

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Starting Room</h2>
      <h3>Game: {game.gamePin}</h3>
      <ul className="list-group">
        {players.map((player, index) => (
          <li key={index} className="list-group-item">
            {player.playerName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StartingRoom;
