'use client';
import { useState } from 'react';
import ExerciseCard from '../components/ExerciseCard';
import CompleteScreen from '../components/CompleteScreen';

export default function HomePage() {
  const [isStarted, setIsStarted] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [count, setCount] = useState(0);

  const handleStart = () => {
    setIsStarted(true);
    setIsComplete(false);
  };

  return (
    <main>
      {!isStarted && (
        <>
          <h1>10秒フィット！</h1>
          <p>全力10秒で体をリセット</p>
          <button onClick={handleStart}>スタート</button>
        </>
      )}

      {isStarted && !isComplete && (
        <ExerciseCard
          onComplete={(newCount) => {
            setCount(newCount);
            setIsComplete(true);
          }}
        />
      )}

      {isStarted && isComplete && (
        <CompleteScreen
          count={count}
          onRestart={() => {
            setIsComplete(false);
          }}
          onBackToTop={() => {
            setIsStarted(false);
            setIsComplete(false);
          }}
        />
      )}
    </main>
  );
}
