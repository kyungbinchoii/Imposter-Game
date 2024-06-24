// import { useState } from 'react';
// import { usePlayer } from './usePlayer';
// import { Player } from './playerContext';

// export default function StartingRoom() {
//   const { game, player } = usePlayer();
//   const [players, setPlayers] = useState<Player[]>([]);

//   return (
//     <div className="container mt-4">
//       <h2 className="mb-4">The Imposter Game!</h2>
//       <h3>Game Pin: {game.gamePin}</h3>
//       <h3>Category: {game.categoryName}</h3>
//       <ul className="list-group">
//         {players.map((player, index) => (
//           <li key={index} className="list-group-item">
//             {player.playerName}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }
