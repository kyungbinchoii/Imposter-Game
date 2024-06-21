import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Components/Home';
import WaitingRoom from './Components/WaitingRoom';
import StartingRoom from './Components/StartingRoom.tsx';
import { PlayerProvider } from './Components/playerContext.tsx';

export default function App() {
  return (
    <PlayerProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/lobby/:gamePin" element={<WaitingRoom />} />
          <Route path="/startingRoom" element={<StartingRoom />} />
        </Routes>
      </BrowserRouter>
    </PlayerProvider>
  );
}
