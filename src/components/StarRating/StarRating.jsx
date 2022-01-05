import React from "react";

export function StarRating({
  count,
  value,
  inactiveColor = "#ddd",
  size = 15,
  activeColor = "#f00",
  onChange,
}) {
  const stars = Array.from({ length: count }, () => "★");

  const handleChange = (value) => {
    onChange(value + 1);
  };

  return (
    <div style={{ marginTop: "11px", cursor: "pointer" }}>
      {stars.map((s, index) => {
        let style = inactiveColor;
        if (index < value) {
          style = activeColor;
        }
        return (
          <span
            className={"star"}
            key={index}
            style={{ color: style, width: size, height: size, fontSize: size }}
            onClick={() => handleChange(index)}
          >
            {s}
          </span>
        );
      })}
      {value}
    </div>
  );
}

export default StarRating;
