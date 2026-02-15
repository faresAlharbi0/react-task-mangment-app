export default function Tasks({ title, description }) {
  return (
    <div className="task">
      <div className="task_header">
        <span>{title}</span>
        <br></br>
        <span>{description}</span>
      </div>
    </div>
  );
}
