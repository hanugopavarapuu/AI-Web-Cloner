export default function ErrorAlert({ error, dark }: { error: string, dark: boolean }) {
    if (!error) return null;
    return (
        <div
            style={{
                width: '100%',
                marginBottom: 16,
                padding: '0.75rem 1rem',
                borderRadius: 6,
                background: dark ? '#4b1e1e' : '#ffeaea',
                color: dark ? '#ffbdbd' : '#e53935',
                border: `1px solid ${dark ? '#a94442' : '#e53935'}`,
                fontWeight: 600,
            }}
        >
            {error}
        </div>
    );
}