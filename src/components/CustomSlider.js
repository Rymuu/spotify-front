import * as React from "react";
import Slider from "@mui/material/Slider";

const CustomSlider = ({
  onChange,
  onChangeCommitted,
  max,
  value,
  disabled,
  width,
}) => {
  return (
    <Slider
      width={width}
      disabled={disabled}
      aria-label="time-indicator"
      size="small"
      value={value}
      min={0}
      step={0.01}
      max={max}
      onChange={onChange}
      onChangeCommitted={onChangeCommitted}
      sx={{
        color: "#fff",
        height: 4,
        width: width,
        padding: 0,
        "& .MuiSlider-thumb": {
          width: 8,
          height: 8,
          transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
          "&:before": {
            boxShadow: "0 2px 12px 0 rgba(0,0,0,0.4)",
          },
          "&:hover, &.Mui-focusVisible": {
            boxShadow: "0px 0px 0px 8px rgb(255 255 255 / 16%)",
          },
          "&.Mui-active": {
            width: 20,
            height: 20,
          },
        },
        "& .MuiSlider-rail": {
          opacity: 0.28,
        },
      }}
    />
  );
};

export default CustomSlider;
