'use client';

type Props = {
  count: number;
  onRestart: () => void;
  onBackToTop: () => void;
};

export default function CompleteScreen({ count, onRestart, onBackToTop }: Props) {
  return (
    <div style={{ textAlign: 'center' }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.5rem' }}>
        お疲れさまでした！
      </h2>
      <p style={{ fontSize: '1.125rem', marginBottom: '1rem' }}>連続記録：{count}</p>
      <div style={{ display: 'inline-flex', gap: '1rem' }}>
        <button
          onClick={onRestart}
          style={{
            cursor: 'pointer',
            backgroundColor: '#16A34A',
            color: 'white',
            padding: '0.75rem 1.5rem',
            border: 'none',
            borderRadius: '9999px',
            fontSize: '1rem',
            transition: 'background-color 0.3s ease',
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#15803D')}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#16A34A')}
        >
          もう1回やる
        </button>
        <button
          onClick={onBackToTop}
          style={{
            cursor: 'pointer',
            backgroundColor: '#9CA3AF',
            color: 'white',
            padding: '0.75rem 1.5rem',
            border: 'none',
            borderRadius: '9999px',
            fontSize: '1rem',
            transition: 'background-color 0.3s ease',
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#6B7280')}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#9CA3AF')}
        >
          トップへ戻る
        </button>
      </div>
    </div>
  );
}
