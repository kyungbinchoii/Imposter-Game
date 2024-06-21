import { useContext } from 'react';
import { PlayerContext, PlayerContextType } from './playerContext';

export function usePlayer(): PlayerContextType {
  const value = useContext(PlayerContext);
  if (value === null) throw new Error('Must be a wrapped in a provider');
  return value;
}
