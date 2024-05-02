
import { Cell } from "./cell"
import { isJSON } from "@text/utils";

export const getCellValue = (value: Cell ) => { // all cells hava a "value" field
    return value.value
}

