import React from "react";
import { Tooltip } from "react-tooltip";

function CustomTooltip({ id, content }) {
  return (
    <Tooltip id={id}>
      <span>{content}</span>
    </Tooltip>
  );
}

export default CustomTooltip;
