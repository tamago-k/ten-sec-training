'use client';
import { useEffect, useState } from 'react';

type Exercise = {
  id: number;
  name: string;
  duration: number;
  target?: string;  // 追加で受け取る想定
  points?: string;  // 追加で受け取る想定
};

type Props = {
  onComplete: (newCount: number) => void;
};

export default function ExerciseCard({ onComplete }: Props) {
  const [exercise, setExercise] = useState<Exercise | null>(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchExercise = async () => {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
      const res = await fetch(`${backendUrl}/api/exercises`);
      const data = await res.json();
      const random = data[Math.floor(Math.random() * data.length)];
      setExercise(random);
    };

    const checkStorage = () => {
      const raw = localStorage.getItem('exerciseData');
      if (!raw) return;

      const saved = JSON.parse(raw);
      const now = new Date();
      const last = new Date(saved.lastCompletedAt);
      const diff = now.getTime() - last.getTime();

      if (diff > 24 * 60 * 60 * 1000) {
        localStorage.removeItem('exerciseData');
        setCount(0);
      } else {
        setCount(saved.count);
      }
    };

    fetchExercise();
    checkStorage();
  }, []);

  const handleClick = () => {
    const newCount = count + 1;
    const now = new Date().toISOString();
    localStorage.setItem(
      'exerciseData',
      JSON.stringify({ count: newCount, lastCompletedAt: now })
    );
    setCount(newCount);
    onComplete(newCount);
  };

  if (!exercise) return <div>読み込み中...</div>;

  return (
    <div style={{ textAlign: 'center' }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.5rem' }}>今回の筋トレ</h2>
      <img
        src={`/images/${exercise.id}.png`}
        alt={exercise.name}
        style={{
          display: 'block',
          margin: '0 auto 1rem auto',
          width: '6rem',
          height: '6rem',
          objectFit: 'contain',
        }}
      />
      <p style={{ fontSize: '2rem', marginBottom: '1rem' }}>{exercise.name}</p>
      {exercise.target && (
        <p style={{ fontSize: '0.875rem', fontWeight: '600', marginTop: '1rem' }}>
          目標: {exercise.target}
        </p>
      )}
      {exercise.points && (
        <p style={{ color: '#4B5563', fontSize: '0.875rem', marginBottom: '1rem' }}>
          {exercise.points}
        </p>
      )}
      <p style={{ color: '#6B7280', marginBottom: '1.5rem' }}>全力で10秒！</p>
      <button
        onClick={handleClick}
        style={{
          cursor: 'pointer',
          backgroundColor: '#16A34A',
          color: 'white',
          padding: '0.75rem 2rem',
          border: 'none',
          borderRadius: '9999px',
          fontSize: '1rem',
          transition: 'background-color 0.3s ease',
        }}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#15803D')}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#16A34A')}
      >
        完了！
      </button>
    </div>
  );
}
