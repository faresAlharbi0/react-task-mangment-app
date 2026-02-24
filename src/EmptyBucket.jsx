import { useState } from "react";

export default function EmptyBucket({ onAdd }) {
  const [value, setValue] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && value.trim() != "") {
      onAdd(value.trim()); // call the parent function
      setValue(""); // reset input
      console.log("getting input: ", value);
    }
  };
  return (
    <div className="buckets">
      <div className="bucket_header">
        <input
          type="text"
          placeholder="enter new bucket"
          className="new_bucket"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
    </div>
  );
}
