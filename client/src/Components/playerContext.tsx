import React, { ReactNode, createContext, useState } from 'react';

export type Player = {
  gamePin: string;
  playerName: string;
  isImposter: boolean;
  isAlive: boolean;
  isHost: boolean;
};
export interface Game {
  gamePin: string;
  categoryId: number;
  categoryName: string;
  hostName: string;
  itemId: number;
  itemName: string;
  gameState: string;
}

type Props = {
  children: ReactNode;
};
export type PlayerContextType = {
  game: Game;
  setGame: React.Dispatch<React.SetStateAction<Game>>;
  player: Player | undefined;
  setPlayer: React.Dispatch<React.SetStateAction<Player | undefined>>;
};

export const PlayerContext = createContext<PlayerContextType | null>(null);

export function PlayerProvider({ children }: Props) {
  const [player, setPlayer] = useState<Player>();
  const [game, setGame] = useState<Game>({
    gamePin: '',
    categoryId: 0,
    categoryName: '',
    hostName: '',
    itemId: 0,
    itemName: '',
    gameState: '',
  });
  return (
    <PlayerContext.Provider value={{ game, setGame, player, setPlayer }}>
      {children}
    </PlayerContext.Provider>
  );
}
