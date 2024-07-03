import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ImageCard from './ImageCard';
import NextButton from './NextButton';
import PrevButton from './PrevButton';
import Dots from './Dots';

export default function DemoRoom() {
  const navigate = useNavigate();
  const intervalRef = useRef<number | null>(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [
    {
      src: '/Images/Host.png',
      alt: 'Host',
    },
    {
      src: '/Images/Guest.png',
      alt: 'Guest',
    },
    {
      src: '/Images/Lobby.png',
      alt: 'lobby',
    },
    {
      src: '/Images/submitHint.png',
      alt: 'submit hint',
    },
    {
      src: '/Images/imposterPOV.png',
      alt: 'imposter pov',
    },
    {
      src: '/Images/vote.png',
      alt: 'vote',
    },
    {
      src: '/Images/endGame.png',
      alt: 'end game',
    },
  ];
  const nextImage = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  }, [images.length]);
  const prevImage = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };
  const setActiveImage = (index: number) => {
    setCurrentIndex(index);
  };
  const resetInterval = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = window.setInterval(nextImage, 5000);
  }, [nextImage]);

  useEffect(() => {
    resetInterval();
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [resetInterval]);

  useEffect(() => {
    resetInterval();
  }, [currentIndex, resetInterval]);

  return (
    <>
      <div>
        <header className="d-flex justify-content-between align-items-center p-3 bg-body-tertiary w-100">
          <h1 className="m-0">The Imposter Game</h1>

          <button
            className="btn btn-primary me-2"
            onClick={() => navigate('/')}>
            Home
          </button>
        </header>
      </div>
      <div>
        <PrevButton onClick={prevImage} />
        <ImageCard
          src={images[currentIndex].src}
          alt={images[currentIndex].alt}
        />
        <NextButton onClick={nextImage} />
        <Dots
          count={images.length}
          currentIndex={currentIndex}
          onClick={setActiveImage}
        />
      </div>
    </>
  );
}
