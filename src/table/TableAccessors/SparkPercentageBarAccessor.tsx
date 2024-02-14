import React from "react";
import { ColumnAccessor } from "../Common/types";

export const SparkPercentageBarAccessor: React.FC<ColumnAccessor> = ({
  value,
}) => {
  return value ? (
    <div>
      <span>{value.value}&nbsp;</span>
      <div>
        <span>
          <span>percentage: {value.percentage}</span>
        </span>
      </div>
    </div>
  ) : null;
};

