import React, { ReactNode, createContext, useState } from 'react';

export type Player = {
  gamePin: string;
  playerName: string;
  isImposter: boolean;
  isAlive: boolean;
  isHost: boolean;
};
export type Game = {
  gamePin: string;
  categoryId: number;
  hostName: string;
  itemId: number;
  gameState: string;
};
type Props = {
  children: ReactNode;
};
export type PlayerContextType = {
  game: Game;
  setGame: React.Dispatch<React.SetStateAction<Game>>; // this updates the game state. function that just takes the game.
  player: Player | undefined;
  setPlayer: React.Dispatch<React.SetStateAction<Player | undefined>>;
};

export const PlayerContext = createContext<PlayerContextType | null>(null);

export function PlayerProvider({ children }: Props) {
  const [player, setPlayer] = useState<Player>();
  const [game, setGame] = useState<Game>({
    gamePin: '',
    categoryId: 0,
    hostName: '',
    itemId: 0,
    gameState: '',
  });
  return (
    <PlayerContext.Provider value={{ game, setGame, player, setPlayer }}>
      {children}
    </PlayerContext.Provider>
  );
}
