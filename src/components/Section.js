import React from "react";

const Section = ({ children, label, textSize = "2xl" }) => {
  return (
    <div>
      <h1 className={`font-bold my-4 text-${textSize}`}>{label}</h1>
      {children}
    </div>
  );
};

export default Section;
