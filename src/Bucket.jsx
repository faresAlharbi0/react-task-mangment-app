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
        <button id={bucket_id} onClick={() => onOpenDialog(bucket_id)}>
          add new tasks
        </button>
      </div>
      <div className="bucket_body">
        {bucket_tasks &&
          bucket_tasks.map((bucket_tasks) => (
            <Tasks
              key={bucket_tasks.id}
              title={bucket_tasks.title}
              description={bucket_tasks.description}
            ></Tasks>
          ))}
      </div>
    </div>
  );
}
