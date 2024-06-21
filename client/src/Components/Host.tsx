import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePlayer } from './usePlayer';

interface Category {
  categoryId: number;
  categoryName: string;
}

export default function Host() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null
  );
  const [hostUsername, setHostUsername] = useState('');
  const [gamePin, setGamePin] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { setGame, setPlayer } = usePlayer();
  useEffect(() => {
    fetch('/api/categories')
      .then((response) => response.json())
      .then((data) => {
        console.log('Fetched categories:', data);
        setCategories(data);
      })
      .catch((error) => console.error('Error fetching categories:', error));
  }, []);

  const handleStartGame = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!hostUsername) {
      setError('Username is required.');
      return;
    }
    if (!gamePin) {
      setError('Game Pin is required.');
      return;
    }
    if (!gamePin.match(/^\w+$/)) {
      setError('Game Pin can only have letters or numbers!');
      return;
    }
    if (selectedCategoryId === null) {
      setError('You must select a category.');
      return;
    }
    setError(null);
    console.log('Starting game with category ID:', selectedCategoryId);

    try {
      const response = await fetch(
        `/api/categories/${selectedCategoryId}/items`
      );
      const randomItem = await response.json();
      console.log('Random item:', randomItem);

      const insertGameInfo = await fetch('/api/newGame', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          hostName: hostUsername,
          gamePin: gamePin,
          categoryId: selectedCategoryId,
          itemId: randomItem.itemId,
        }),
      });

      const gameInfo = await insertGameInfo.json();
      console.log('Insert game info:', gameInfo);
      const host = {
        gamePin: gamePin,
        playerName: hostUsername,
        isImposter: false,
        isAlive: true,
        isHost: true,
      };

      setGame(gameInfo);
      setPlayer(host);
      navigate(`/lobby/${gameInfo.gamePin}`);
    } catch (error) {
      console.error('Error fetching random item:', error);
    }
  };
  const handleHostUsernameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setHostUsername(event.target.value);
  };

  const handleGamePinChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGamePin(event.target.value);
  };

  return (
    <div className="row mt-3">
      <div className="col-sm-12 mb-3">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title mb-3">HOST</h5>
            <form onSubmit={handleStartGame}>
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Create Username"
                value={hostUsername}
                onChange={handleHostUsernameChange}
              />
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Create Game Pin"
                value={gamePin}
                onChange={handleGamePinChange}
              />
              <div className="mb-3">
                <select
                  className="form-select"
                  value={selectedCategoryId ?? ''}
                  onChange={(e) =>
                    setSelectedCategoryId(Number(e.target.value))
                  }>
                  <option value="" disabled>
                    Select Category
                  </option>
                  {categories.map((category) => (
                    <option
                      key={category.categoryId}
                      value={category.categoryId}>
                      {category.categoryName}
                    </option>
                  ))}
                </select>
              </div>
              {error && <div className="alert alert-danger">{error}</div>}
              <div className="mb-3">
                <button type="submit" className="btn btn-primary">
                  Create Game
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
