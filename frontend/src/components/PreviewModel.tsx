export default function PreviewModal({ htmlContent, onClose, dark }: {
    htmlContent: string,
    onClose: () => void,
    dark: boolean
}) {
    if (!htmlContent) return null;
    return (
        <div
            style={{
                position: 'fixed',
                inset: 0,
                background: dark ? '#181a1b' : '#fafafa',
                zIndex: 1000,
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <div
                style={{
                    padding: 16,
                    fontWeight: 600,
                    color: dark ? '#f3f3f3' : '#333',
                    background: dark ? '#23272a' : '#fff',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}
            >
                Cloned Website Preview
                <button
                    style={{
                        marginLeft: 16,
                        padding: '6px 18px',
                        borderRadius: 6,
                        background: '#e53935',
                        color: '#fff',
                        border: 'none',
                        fontWeight: 600,
                        cursor: 'pointer',
                    }}
                    onClick={onClose}
                >
                    Close
                </button>
            </div>
            <iframe
                title="Cloned Page"
                srcDoc={htmlContent}
                sandbox="allow-scripts allow-forms"
                style={{
                    flex: 1,
                    width: '100vw',
                    height: '100vh',
                    border: 'none',
                    background: dark ? '#23272a' : '#fafafa',
                }}
            />
        </div>
    );
}