import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, useParams } from 'react-router-dom';
import { usePlayer } from './usePlayer';
import { useEffect, useState } from 'react';
import { Player } from './playerContext';
import '../WaitingRoom.css';

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

  const numRows = Math.ceil(players.length / 2);

  return (
    <>
      <div
        style={{
          backgroundImage: 'url(/Images/welcome.jpeg)',
          backgroundSize: 'cover',
          width: '100vw',
          height: '300px',
        }}></div>
      <div className="container mt-4">
        <div className="lobby-container">
          <h1>LOBBY</h1>
          <h2>GAME PIN: {game.gamePin}</h2>
          <h2>CATEGORY: {game.categoryName}</h2>
          <h5>Press refresh players until all players join the lobby!</h5>
        </div>
        <p></p>
        <div className="players-grid">
          {[...Array(numRows)].map((_, rowIndex) => (
            <div key={rowIndex} className="row">
              {[0, 1].map((colIndex) => {
                const playerIndex = rowIndex * 2 + colIndex;
                if (playerIndex < players.length) {
                  const currentPlayer = players[playerIndex];
                  return (
                    <div
                      key={currentPlayer.playerName}
                      className="col bold-text">
                      {currentPlayer.playerName}
                    </div>
                  );
                } else {
                  return null;
                }
              })}
            </div>
          ))}
        </div>
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
    </>
  );
}
