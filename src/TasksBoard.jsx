import Bucket from "./Bucket";
import EmptyBucket from "./EmptyBucket";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function TasksBoard() {
  const [buckets,setBuckets] = useState([])
   const addBucket = (title) => {
    const newBucket = {
      id: uuidv4(),
      title,
    };
    setBuckets((prevBuckets) => [...prevBuckets, newBucket]);
  };
  
  return (
    <div className="main_board">
      <div className="project_info_widget">
        <span>project name</span>
      </div>
      <div className="buckets_board">
         { buckets && buckets.map((bucket) => (
          <Bucket key={bucket.id} title={bucket.title} />
        ))}
        <EmptyBucket onAdd={addBucket}></EmptyBucket>
      </div>
    </div>
  );
}