import Bucket from "./Bucket";
import EmptyBucket from "./EmptyBucket";
import { useRef, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

export default function TasksBoard() {
  const [buckets, setBuckets] = useState([]);
  const [active_bucket, setActiveBucket] = useState(null);
  const [task_title, setTaskTitle] = useState(null);
  const [task_description, setTaskDescription] = useState(null);
  const dialogRef = useRef(null);
  const addBucket = (title) => {
    const newBucket = {
      id: uuidv4(),
      title,
      tasks: [],
    };
    setBuckets((prevBuckets) => [...prevBuckets, newBucket]);
  };

  useEffect(() => {
    const savedBuckets = localStorage.getItem("buckets");
    if (savedBuckets) {
      setBuckets(JSON.parse(savedBuckets));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("buckets", JSON.stringify(buckets));
  }, [buckets]);

  const addTask = (e) => {
    e.preventDefault();
    if (task_title && task_description) {
      const newTask = {
        id: uuidv4(),
        title: task_title,
        description: task_description,
      };
      setBuckets((prevBuckets) =>
        prevBuckets.map((bucket) =>
          bucket.id === active_bucket
            ? {
                ...bucket,
                tasks: [...bucket.tasks, newTask],
              }
            : bucket,
        ),
      );
    }
    dialogRef.current.close();
    setTaskTitle("");
    setTaskDescription("");
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
          <span>task</span>
          <input
            type="text"
            id="task_id"
            value={task_title}
            placeholder="enter task"
            onChange={(e) => setTaskTitle(e.target.value)}
          />
          <span>task description</span>
          <input
            type="text"
            value={task_description}
            placeholder="enter task description"
            onChange={(e) => setTaskDescription(e.target.value)}
          />
          <button type="submit">submit</button>
        </form>
      </dialog>
      <div className="buckets_board">
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
