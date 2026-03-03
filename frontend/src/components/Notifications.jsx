export default function Notifications({ user }) {
  return (
    <div>
      <h2>Notifications</h2>
      {user ? <p>No notifications yet.</p> : <p>Please sign in.</p>}
    </div>
  );
}
