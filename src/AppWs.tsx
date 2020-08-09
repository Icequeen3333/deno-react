import React, {useState, useEffect, useRef} from 'react'

export default function AppWs() {
    const [isPaused, setPause] = useState(false);
    const ws: any = useRef<any| null>(null);

    useEffect(() => {
        ws.current = new WebSocket("ws://localhost:6789");
        ws.current.onopen = () => console.log("ws opened");
        ws.current.onclose = () => console.log("ws closed");

        console.log("WS:", ws.current )

        return () => {
            ws.current.close();
        };
    }, []);

    useEffect(() => {
        if (!ws.current) return;

        ws.current.onmessage = (e:any) => {
            if (isPaused) return;
            const message = JSON.parse(e.data);
            console.log("e", message);
        };
    }, [isPaused]);

    return (
        <div>
            <button onClick={() => setPause(!isPaused)}>
                {isPaused ? "Resume" : "Pause"}
            </button>
        </div>
    );
}