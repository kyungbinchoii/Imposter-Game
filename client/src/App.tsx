import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Components/Home';
import WaitingRoom from './Components/WaitingRoom';
import { PlayerProvider } from './Components/playerContext.tsx';
import GameRoom from './Components/GameRoom.tsx';
import VoteRoom from './Components/voteRoom.tsx';

export default function App() {
  return (
    <PlayerProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/lobby/:gamePin" element={<WaitingRoom />} />
          <Route path="/gameRoom/:gamePin" element={<GameRoom />} />
          <Route path="/voteRoom/:gamePin" element={<VoteRoom />} />
        </Routes>
      </BrowserRouter>
    </PlayerProvider>
  );
}
