import React from "react";
import { ColumnAccessor } from "../common/types";

export const RowSelectButtonAccessor: React.FC<ColumnAccessor> = ({ value, userProps }) => {
    return (
        <span>
            <button
                className="button"
                color="primary"
                title={`${userProps.tooltip} ${value}`}
                aria-label={`${userProps.tooltip} ${value}`}
                onClick={() => userProps.action(value)}
            >
            </button>
        </span>
    );
};
