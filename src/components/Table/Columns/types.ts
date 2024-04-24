import { CellTypes, NAString, DefaultCell, LinkCell, TextCell, AnnotatedTextCell, FloatCell, } from "../cell"
import { CustomSortingFn } from './sorting';


interface ColumnFormat {
    cellType: CellTypes
    sortingFn: CustomSortingFn,
    naString: NAString,
    allowArray: boolean
}


const ColumnFormatMapper: { string: ColumnFormat } = {
    string: {
        cellType: AnnotatedTextCell,
        sortingFn: "alphanumeric",
        naString: "N/A",
        allowArray: true
    },
    integer: {
        cellType: CustomCell.DefaultCell,
        defaultSort: CustomSortingFn,
        naString: "N/A",
        allowArray: true
    }
    float: {
        cellType: Cells.FloatCell,
        defaultSort: CustomSortingFn,
        naString: "N/A",
        allowArray: true
    }
    double: {
        cellType: Cells.FloatCell,
        defaultSort: CustomSortingFn,
        naString: "N/A",
        allowArray: true
    }
    percentageBar: {
        cellType: Cells.PercentageBarCell,
        defaultSort: CustomSortingFn,
        naString: "N/A",
        allowArray: false
    }

}