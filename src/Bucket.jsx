import Tasks from "./Tasks";
export default function Bucket({
  title,
  bucket_id,
  bucket_tasks,
  onOpenDialog,
}) {
  return (
    <div className="buckets">
      <div className="bucket_header">
        <span>{title}</span>
      </div>
      {bucket_tasks && bucket_tasks.length > 0 ? (
        <div className="bucket_body">
          {bucket_tasks &&
            bucket_tasks.map((bucket_tasks) => (
              <Tasks
                key={bucket_tasks.id}
                title={bucket_tasks.title}
                description={bucket_tasks.description}
              />
            ))}
        </div>
      ) : null}
      <div className="bucket_header">
        <button
          id={bucket_id}
          className="add_task_btn"
          onClick={() => onOpenDialog(bucket_id)}
        >
          +
        </button>
        <span>add new task</span>
      </div>
    </div>
  );
}
