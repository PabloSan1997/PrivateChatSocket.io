import React from "react";

export function FormMessage({ onSend }: { onSend(m: SaveMessageDto): void }) {
    const [message, setMessage] = React.useState('');

    return (
        <form className="mandar_message" onClick={e => {
            e.preventDefault();
            if (message) {
                onSend({ message });
                setMessage('');
            }

        }}>
            <label htmlFor="agregar">Nuevo mensaje</label>
            <input
                type="text"
                id="agregar"
                value={message}
                onChange={e => setMessage(e.target.value)}
            />
            <button type="submit">Enviar</button>
        </form>
    );
}
