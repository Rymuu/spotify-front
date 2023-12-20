import React from "react";

const Section = ({ children, label, textSize = "2xl" }) => {
  return (
    <div>
      <h1 className={`font-bold my-4 text-${textSize}`}>{label}</h1>
      <div className="flex gap-x-5 mt-4 mb-8">{children}</div>
    </div>
  );
};

export default Section;
