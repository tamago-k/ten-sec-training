'use client';
import { useEffect, useState } from 'react';

type Exercise = {
  id: number;
  name: string;
  duration: number;
  target?: string;
  points?: string;
};

type Props = {
  onComplete: (newCount: number) => void;
};

export default function ExerciseCard({ onComplete }: Props) {
  const [exercise, setExercise] = useState<Exercise | null>(null);
  const [count, setCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [completed, setCompleted] = useState(false); // ← フラグ追加

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

  // ⏱️ タイマー処理（1秒ごとにカウントダウン）
  useEffect(() => {
    if (timeLeft <= 0 || completed) return;

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, completed]);

  // ⏹️ カウントが終わったときに onComplete を呼ぶ（1回だけ）
  useEffect(() => {
    if (timeLeft === 0 && !completed) {
      setCompleted(true);

      const newCount = count + 1;
      const now = new Date().toISOString();
      localStorage.setItem(
        'exerciseData',
        JSON.stringify({ count: newCount, lastCompletedAt: now })
      );
      setCount(newCount);
      onComplete(newCount);
    }
  }, [timeLeft, completed]);

  if (!exercise) return <div>読み込み中...</div>;

  return (
    <div style={{ textAlign: 'center' }}>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '10px' }}>今回の筋トレ</h2>
      <img
        src={`/images/${exercise.id}.png`}
        alt={exercise.name}
        style={{ width: '200px', height: '200px', objectFit: 'contain', marginBottom: '10px' }}
      />
      <p style={{ fontSize: '24px', marginBottom: '8px' }}>{exercise.name}</p>
      <p style={{ color: '#777', marginTop: '10px' }}>全力で10秒！</p>
      <p style={{ fontSize: '40px', marginTop: '0px', fontWeight: 'bold', lineHeight: '1' }}>{timeLeft}</p>
      <p style={{ fontWeight: 'bold' }}>目標: {exercise.target}</p>
      <p style={{ color: '#555', fontSize: '14px' }}>{exercise.points}</p>
    </div>
  );
}
