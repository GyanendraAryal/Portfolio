export default function Button({ children }) {
  return (
    <button className="px-6 py-3 bg-accent rounded-xl">
      {children}
    </button>
  );
}