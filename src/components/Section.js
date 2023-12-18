import React from "react";

const Section = ({ children, label, textSize = "2xl" }) => {
  return (
    <div>
      <h1 className={`font-bold mb-4 text-${textSize}`}>{label}</h1>
      <div className="mb-4">{children}</div>
    </div>
  );
};

export default Section;
