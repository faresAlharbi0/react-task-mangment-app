import Bucket from "./Bucket";
import EmptyBucket from "./EmptyBucket";
import { useRef, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useDraggable } from "react-use-draggable-scroll";
import {
  insertNewBucket,
  getBuckets,
  getTasks,
  insertNewTask,
} from "./database";

export default function TasksBoard() {
  const [buckets, setBuckets] = useState([]);
  const [active_bucket, setActiveBucket] = useState("");
  const [task_title, setTaskTitle] = useState("");
  const [task_description, setTaskDescription] = useState("");
  const dialogRef = useRef(null);
  const ref = useRef(); // We will use React useRef hook to reference the wrapping div:
  const { events } = useDraggable(ref); // Now we pass the reference to the useDraggable hook:

  const addBucket = async (title) => {
    if (!title?.trim()) return; // stop empty/undefined

    await insertNewBucket(title.trim());

    await reloadBuckets();
  };

  useEffect(() => {
    const loadBuckets = async () => {
      await reloadBuckets();
    };

    loadBuckets();
  }, []);

  const addTask = async (e) => {
    e.preventDefault();
    if (task_title && task_description) {
      insertNewTask(active_bucket, task_title, task_description);
      await reloadBuckets();
    }
    dialogRef.current.close();
    setTaskTitle("");
    setTaskDescription("");
  };

  const reloadBuckets = async () => {
    const bucketsData = await getBuckets();
    const formatted = await Promise.all(
      bucketsData.map(async (bucket) => ({
        ...bucket,
        tasks: await getTasks(bucket.id),
      })),
    );
    setBuckets(formatted);
  };

  const handleOpenDialog = (bucketId) => {
    setActiveBucket(bucketId);
    dialogRef.current?.showModal();
  };
  return (
    <div className="main_board">
      <div className="project_info_widget">
        <span>project name</span>
      </div>
      <dialog ref={dialogRef} className="tasks_dialog">
        <form onSubmit={addTask}>
          <input
            type="text"
            id="task_id"
            value={task_title}
            placeholder="enter task"
            className="task_title"
            onChange={(e) => setTaskTitle(e.target.value)}
          />
          <textarea
            type="text"
            value={task_description}
            placeholder="enter task description"
            className="task_description"
            onChange={(e) => setTaskDescription(e.target.value)}
          />
          <button type="submit">submit</button>
        </form>
      </dialog>
      <div className="buckets_board" {...events} ref={ref}>
        {buckets &&
          buckets.map((bucket) => (
            <Bucket
              key={bucket.id}
              title={bucket.title}
              bucket_id={bucket.id}
              bucket_tasks={bucket.tasks}
              onOpenDialog={handleOpenDialog}
            ></Bucket>
          ))}
        <EmptyBucket onAdd={addBucket}></EmptyBucket>
      </div>
    </div>
  );
}
