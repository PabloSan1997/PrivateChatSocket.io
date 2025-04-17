



export function MessageComponent({message, usersend}:MessageDto) {
  return (
    <div className="area_message">
        <span>{usersend.username}</span>
        <p className="message">{message}</p>
    </div>
  );
}
