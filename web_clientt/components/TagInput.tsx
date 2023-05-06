import React, { useState } from "react";

function TagInput({ className }) {
  const [tags, setTags] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();
      addTag();
    }
  };

  const addTag = () => {
    const tag = inputValue.trim();
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag]);
      setInputValue("");
    }
  };

  const removeTag = (tag) => {
    const newTags = tags.filter((t) => t !== tag);
    setTags(newTags);
  };

  return (
    <div className={className}>
      <div>
        {tags.map((tag) => (
          <div key={tag} className="tag">
            {tag}
            <button onClick={() => removeTag(tag)}>X</button>
          </div>
        ))}
      </div>
      <textarea
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Add tags separated by commas"
      />
    </div>
  );
}

export default TagInput;
