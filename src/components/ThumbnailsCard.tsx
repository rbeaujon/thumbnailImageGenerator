import { useState, useRef, useEffect } from 'react';
import "./ThumbnailsCard.css"

interface Game {
    label: string;
    provider: string;
    url_thumb: string;
}

interface Props {
    game: Game;
}



export const ThumbnailCard: React.FC<Props> = ({ game }) => {
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    const generateThumbnail = async () => {
        setLoading(true);
        try {
            const res = await fetch('https://rollhub.rbeaujon.com/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    gameName: game.label,
                    providerName: game.provider,
                    imageUrl: game.url_thumb
                })
            });
            const data = await res.json();
            setImageUrl(data.imageUrl.url);
        } catch (err) {
            console.error('Error generando thumbnail:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!imageUrl || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d')!;
        const img = new Image();

        img.onload = () => {
            canvas.width = 420;
            canvas.height = 420;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0, 420, 420);

            // Provider
            ctx.font = 'bold 32px Anton, sans-serif';
            ctx.fillStyle = 'white';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(game.label, canvas.width / 2, canvas.height - 80);

            // Game
            ctx.font = '18px Anton, sans-serif';
            ctx.fillStyle = 'rgba(255,255,255,0.85)';
            ctx.textAlign = 'center';
            ctx.fillText(game.provider, canvas.width / 2, canvas.height - 40);
        };

        img.onerror = (e) => {
            console.error('Error cargando imagen en canvas', e);
        };

        img.src = imageUrl;
    }, [imageUrl, game.label, game.provider]);


    const downloadPNG = () => {
        if (!canvasRef.current) return;
        const link = document.createElement('a');
        link.href = canvasRef.current.toDataURL('image/png');
        link.download = `${game.label.replace(/\s+/g, '_')}_${game.provider.replace(/\s+/g, '_')}.png`;
        link.click();
    };

    return (
        <div id="thumbnail-container">
            <p className="title">{game.label}</p>
            <div><img src={game.url_thumb} alt={game.label} /></div>
            <div>
                <button onClick={generateThumbnail} disabled={loading}>
                    {loading ? 'Generando...' : 'Generate'}
                </button>
            </div>
            {imageUrl && (
                <>
                    <canvas
                        ref={canvasRef}
                        style={{ marginTop: 10 }}
                    />
                    <div>
                        <button type="button" className="downloadPNG" onClick={downloadPNG}>Download PNG</button>
                    </div>
                </>
            )}
        </div>
    );
};


