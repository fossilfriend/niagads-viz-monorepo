import { GenericColumn } from '../../src/components/Table/Column';

const data = [
    {
        label: { color: "blue", value: "r1" },
        population: "european",
        valid: true,
        count: 5,
        percent: 0.5,
        p_value: {value: 0.000001, color: 'red'},
        website: { url: "https://amazon.com", displayText: "Amazon" },
        state: { value: 'PASS', color: 'white', backgroundColor: 'green', icon: "solidCheck" }
    },
    {
        label: { value: "r2", tooltip: "my favorite group" },
        population: {
            value: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Turpis massa sed elementum tempus. Aenean sed adipiscing diam donec adipiscing tristique. Maecenas sed enim ut sem viverra aliquet.",
            color: 'purple'
        },
        valid: { value: false, color: 'green' },
        count: 6,
        p_value: { value: 0.0000510001, precision: 3 },
        percent: 0.2,
        website: null,
        state: { value: 'PASS', backgroundColor: 'green' }
    },
    {
        label: "r3",
        population: null,
        valid: null,
        count: 0,
        percent: {value: 0.9121335},
        p_value: 0.0000999,
        website: { url: "https://google.com", tooltip: "google!" },
        state: null,
    },
    {
        label: "r4",
        valid: { value: true, icon: "solidCheck", color: "orange" },
        count: null,
        population: {
            color: "teal", value: "other",
            tooltip: "non-standard population"
        },
        percent: null,
        p_value: {value:.222, precision: 2},
        website: { displayText: "FedEx" },
        state: { value: 'FAIL', icon: 'xMark', color: 'red', borderColor: 'red', tooltip: "This one didn't pass :(" }
    },
];

const columns: GenericColumn[] = [
    {
        header: "Label",
        id: "label"
    },
    {
        header: "State",
        id: "state",
        description: "badge test",
        type: "badge"
    },
    {
        header: "Population",
        id: "population",
        description: "sample population",
        nullValue: "NA"
    },
    {
        header: "Is Valid?",
        id: "valid",
        info: "boolean test",
        type: "boolean",
        nullValue: false,
        sort: {
            enable: true,
            sortingFn: 'boolean'
        }
    },
    {
        header: "Count",
        id: "count",
        info: "integer test",
        sort: {
            enable: true,
        }
    },
    {
        header: "Percent",
        id: "percent",
        info: "% bar test",
        type: "percentage_bar",
    },
    {
        header: "p-Value",
        id: "p_value",
        info: "numeric test",
        type: "float",
        precision: 2,
        useScientificNotation: true,
        sort: {
            enable: true,
            sortingFn: 'scientific'
        }
    },
    {
        header: "Website",
        id: "website",
        // type: "link"
    }

];

const options = {}

export const ExampleTable = {
    data: data,
    columns: columns,
    options: options,
} 
