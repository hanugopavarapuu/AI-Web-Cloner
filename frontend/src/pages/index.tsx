import { useState, useEffect } from 'react';
import CloneForm from '../components/CloneForm';
import ErrorAlert from '../components/ErrorAlert';
import PreviewModal from '@/components/PreviewModel';
export default function Home() {
    const [htmlContent, setHtmlContent] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [dark, setDark] = useState(false);

    useEffect(() => {
        document.body.style.background = dark ? "#181a1b" : "#f8f9fa";
        document.body.style.color = dark ? "#f3f3f3" : "#111";
    }, [dark]);

    async function handleClone(url: string) {
        if (loading) return;
        if (!url || !/^https?:\/\//.test(url)) {
            setError('Please enter a valid URL (must include http/https)');
            return;
        }
        setError('');
        setLoading(true);
        setHtmlContent('');
        try {
            const response = await fetch('http://127.0.0.1:8000/clone/ai', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url }),
            });
            const data = await response.json();
            if (data.status === 'success' && data.html) {
                const baseUrl = url.endsWith('/') ? url : url + '/';
                const htmlWithBase = data.html.replace(
                    /<head([^>]*)>/i,
                    `<head$1><base href="${baseUrl}">`
                );
                setHtmlContent(htmlWithBase);
            } else {
                setError(data.message || 'No HTML returned from AI');
            }
        } catch (err: any) {
            setError('Failed to clone: ' + err.message);
        }
        setLoading(false);
    }

    return (
        <div
            style={{
                minHeight: '100vh',
                background: dark ? '#181a1b' : '#f8f9fa',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <div
                style={{
                    width: '100%',
                    maxWidth: 700,
                    background: dark ? '#23272a' : '#fff',
                    borderRadius: 18,
                    boxShadow: '0 4px 32px rgba(0,0,0,0.07)',
                    padding: '2rem 2.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <div
                    style={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: 24,
                    }}
                >
                    <h1
                        style={{
                            fontSize: '2rem',
                            fontWeight: 'bold',
                            color: dark ? '#f3f3f3' : '#111',
                            margin: 0,
                        }}
                    >
                        🧠 AI Web Cloner
                    </h1>
                    <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                        <input
                            type="checkbox"
                            checked={dark}
                            onChange={() => setDark(d => !d)}
                            style={{ marginRight: 8 }}
                        />
                        <span style={{ fontSize: 20 }}>{dark ? '🌙' : '☀️'}</span>
                    </label>
                </div>
                <p
                    style={{
                        marginBottom: 24,
                        color: dark ? '#bdbdbd' : '#555',
                        width: '100%',
                        textAlign: 'left',
                    }}
                >
                    Paste a website URL and click "Generate Clone".
                </p>
                <CloneForm onClone={handleClone} loading={loading} dark={dark} />
                <ErrorAlert error={error} dark={dark} />
                <PreviewModal htmlContent={htmlContent} onClose={() => setHtmlContent('')} dark={dark} />
            </div>
        </div>
    );
}