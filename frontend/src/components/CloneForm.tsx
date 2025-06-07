import { useState } from 'react';

export default function CloneForm({ onClone, loading, dark }: {
    onClone: (url: string) => void,
    loading: boolean,
    dark: boolean
}) {
    const [url, setUrl] = useState('');
    return (
        <form
            onSubmit={e => {
                e.preventDefault();
                onClone(url);
            }}
            style={{ display: 'flex', width: '100%', marginBottom: 16 }}
        >
            <input
                type="text"
                value={url}
                onChange={e => setUrl(e.target.value)}
                placeholder="https://example.com"
                disabled={loading}
                style={{
                    flex: 1,
                    padding: '0.7rem 1rem',
                    border: `2px solid ${dark ? '#444' : '#e0e0e0'}`,
                    borderRadius: 8,
                    fontSize: '1.1rem',
                    background: dark ? '#23272a' : '#f6f6f6',
                    color: dark ? '#f3f3f3' : '#111',
                    marginRight: 12,
                    outline: 'none',
                }}
            />
            <button
                type="submit"
                disabled={loading}
                style={{
                    padding: '0.7rem 1.5rem',
                    background: loading ? '#bdbdbd' : '#0070f3',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 8,
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    cursor: loading ? 'not-allowed' : 'pointer',
                    transition: 'background 0.2s',
                }}
            >
                {loading ? 'Cloning...' : 'Generate Clone'}
            </button>
        </form>
    );
}