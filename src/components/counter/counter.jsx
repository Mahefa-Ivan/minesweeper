import "./counter.css";

export default function Counter({ icon, count }) {
  return (
    <div className="counter">
      {icon}
      <span> {count}</span>
    </div>
  );
}
