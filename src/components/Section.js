import React from "react";

const Section = ({ children, label, textSize = "6xl" }) => {
  return (
    <div className="mt-6">
      <h1 className={`font-bold my-4 text-${textSize}`}>{label}</h1>
      {children}
    </div>
  );
};

export default Section;
