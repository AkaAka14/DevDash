export default function Bookmarks({ user }) {
  return (
    <div>
      <h2>Bookmarks</h2>
      {user ? <p>No bookmarks yet.</p> : <p>Please sign in.</p>}
    </div>
  );
}
