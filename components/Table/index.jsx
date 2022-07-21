import { useTable, useSortBy } from "react-table";
import { RiArrowDownSLine, RiArrowUpSLine, RiFilter3Line, RiSearch2Line } from "react-icons/ri";
import { useFilters, usePagination, useRowSelect } from 'react-table'
import { matchSorter } from 'match-sorter';
import { CheckIcon } from "@radix-ui/react-icons";
import React from "react";
import { styled } from "stitches.config";
import { blackA, gray, grayA } from "@radix-ui/colors";
import { Pagination } from "components/Pagination";
import Select from "components/Select";



const Icon = styled(`svg`, {
    fill: 'none',
    stroke: 'white',
    strokeWidth: '2px',
})

// Hide checkbox visually but remain accessible to screen readers.
// Source: https://polished.js.org/docs/#hidevisually
const HiddenCheckbox = styled(`input`, {
    border: 0,
    clip: `rect(0 0 0 0)`,
    clippath: `inset(50%)`,
    height: `1px`,
    margin: '-1px',
    overflow: 'hidden',
    padding: 0,
    position: `absolute`,
    whiteSpace: `nowrap`,
    width: `1px`,
})


const StyledCheckbox = styled(`div`, {
    display: 'inline-block',
    width: '16px',
    height: '16px',
    borderRadius: `3px`,
    transition: `all 150ms`,
    [` ${HiddenCheckbox}:focus + & `]: {
        boxShadow: `0 0 0 3px pink`,
    },
})


const CheckboxContainer = styled(`label`, {
    display: 'inline-block',
    verticalAlign: 'middle',
    cursor: "pointer",
    [`& > input[type=checkbox]:checked`]: {
        [`${StyledCheckbox}`]: {
            background: '#111'
        }
    }
});



const StyledTable = styled('table', {
    background: 'white',
    minWidth: 400,
    width: "100%",
    borderCollapse: "collapse",
    borderRadius: '$4',
    overflow: "hidden",
    border: "1px solid $gray2",
    // overflow: "hidden",
    boxShadow: `0 2px 10px $colors$blackA5`,
    '& tbody': {
        padding: 10,
    },
    '& tbody > tr': {
        // borderTop: "1px solid $mauve4",
    },
    '& tbody > tr:nth-child(odd) > td': {
        backgroundColor: "$mauve2"
    },
    '& tr:hover': {
        backgroundColor: "$gray1"
    },



})

const StyledTableHeader = styled('th', {
    // borderBottom:"1px solid $mauve4"
})

const StyledTableHeaderRow = styled('tr', {


})

const StyledTableHead = styled('thead', {
    verticalAlign: "middle",


})

const StyledTableHeaderCell = styled('div', {
    textAlign: "left",

    // borderRadius: '$2',
    userSelect: "none",
    fontWeight: 500,
    padding: 10,

    "& .filtericon": {
        opacity: 0
    },
    "&:hover": {

        "& .filtericon": {
            opacity: 0.5
        },
    }
})

const Checkbox = React.forwardRef(({ className, checked, onChange, ...props }, ref) => (
    <CheckboxContainer className={className}>
        <HiddenCheckbox type='checkbox' checked={checked} onChange={onChange} {...props} ref={ref} />
        <StyledCheckbox css={{ background: checked ? '#eee' : "#eee" }} checked={checked}>
            {checked && <CheckIcon />}
        </StyledCheckbox>
    </CheckboxContainer>
))




const StyledInput = styled('input', {
    borderRadius: '$3',
    boxSizing: "border-box",
    width: "100%",
    padding: '0 10px',
    height: '$6',
    fontSize: 15,
    marginTop: "2px",
    lineHeight: 1,
    color: '$gray11',
    border: "none",
    boxShadow: `0 0 0 1px $colors$blackA4`,
    backgroundColor: gray.gray3,
    '&:focus': { boxShadow: `0 0 0 2px $colors$blackA5`, outline: "none", border: "none" },
})

const StyledTableRow = styled('tr', {


})

const StyledTableData = styled('td', {
    padding: 10
})


// Define a default UI for filtering
function DefaultColumnFilter({
    column: { filterValue, preFilteredRows, setFilter },
}) {
    const count = preFilteredRows.length

    return (
        <StyledInput
            value={filterValue || ''}
            onClick={(e) => {
                e.stopPropagation();
            }}
            onChange={e => {
                setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
            }}
            placeholder={`search ${count} records...`}
        />
    )
}

function fuzzyTextFilterFn(rows, id, filterValue) {
    return matchSorter(rows, filterValue, { keys: [row => row.values[id]] })
}

// Let the table remove the filter if the string is empty
fuzzyTextFilterFn.autoRemove = val => !val



const IndeterminateCheckbox = React.forwardRef(
    ({ indeterminate, ...rest }, ref) => {
        const defaultRef = React.useRef()
        const resolvedRef = ref || defaultRef

        React.useEffect(() => {
            resolvedRef.current.indeterminate = indeterminate
        }, [resolvedRef, indeterminate])

        return (
            <Checkbox ref={resolvedRef} {...rest}></Checkbox>
        )
    }
)

export default function Table({ columns, filterable = false, selectable = false, sortable = true, data, rowsPerPage = 10, renderRowSelectedActions = (selectedRowIds) => { } }) {


    const filterTypes = React.useMemo(
        () => ({
            // Add a new fuzzyTextFilterFn filter type.
            fuzzyText: fuzzyTextFilterFn,
            // Or, override the default text filter to use
            // "startWith"
            text: (rows, id, filterValue) => {
                return rows.filter(row => {
                    const rowValue = row.values[id]
                    return rowValue !== undefined
                        ? String(rowValue)
                            .toLowerCase()
                            .startsWith(String(filterValue).toLowerCase())
                        : true
                })
            },
        }),
        []
    )

    const defaultColumn = React.useMemo(
        () => ({
            // Let's set up our default Filter UI
            Filter: DefaultColumnFilter,
        }),
        []
    )
    // Use the useTable Hook to send the columns and data to build the table

    const plugins = {};


    if (filterable) {
        plugins.useFilters = useFilters
    }
    if (sortable) {
        plugins.useSortBy = useSortBy
    }
    // if(selectable){
    //     plugins.useRowSelect = useRowSelect
    // }

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        state,
        visibleColumns,
        page,

        // pagination
        pageOptions,
        pageCount,
        gotoPage,
        setPageSize,
        state: { pageIndex, pageSize, selectedRowIds },

    } = useTable(
        {
            columns,
            data,
            defaultColumn, // pass the defaultColumn option
            filterTypes,
            initialState: { pageIndex: 0, pageSize: rowsPerPage, },
        },

        // useFilters, // useFilters!
        // useSortBy,
        ...Object.values(plugins),


        usePagination,
        useRowSelect,
        hooks => {
            if (!selectable) {
                return
            }
            hooks.visibleColumns.push(columns => [
                // Let's make a column for selection
                {
                    id: 'selection',
                    // The header can use the table's getToggleAllRowsSelectedProps method
                    // to render a checkbox
                    Header: ({ getToggleAllPageRowsSelectedProps }) => (
                        <div style={{ width: 0 }}>
                            <IndeterminateCheckbox {...getToggleAllPageRowsSelectedProps()} />
                        </div>
                    ),
                    // The cell can use the individual row's getToggleRowSelectedProps method
                    // to the render a checkbox
                    Cell: ({ row }) => (
                        <div style={{ width: 0 }}>
                            <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
                        </div>
                    ),
                },
                ...columns,
            ])
        }
    )






    return <>
        <div style={{
            maxHeight: '70vh', overflow: "scroll",
            paddingLeft: 10,
            paddingRight: 10
        }}>
            <StyledTable >
                <StyledTableHead>
                    {headerGroups.map(headerGroup => (
                        <StyledTableHeaderRow {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column, id) => (
                                <StyledTableHeader key={id} >

                                    <StyledTableHeaderCell  {...column.getHeaderProps(column.getSortByToggleProps?.call())}>
                                        <div style={{ display: "flex", alignItems: "center", width: '100%', justifyContent: "space-between" }}>
                                            {column.render('Header')}
                                            {
                                                (column.id === 'selection') || !sortable ? null :

                                                    column.isSorted
                                                        ? column.isSortedDesc
                                                            ? <RiArrowDownSLine fontSize={18} opacity={0.8} />
                                                            : <RiArrowUpSLine fontSize={18} opacity={0.8} />
                                                        : <RiFilter3Line className="filtericon" fontSize={18} />


                                            }
                                        </div>
                                        <div style={{ padding: '0px 0px' }}>{column.canFilter && filterable ? column.render('Filter') : null}</div>
                                    </StyledTableHeaderCell>

                                </StyledTableHeader>

                            ))}
                        </StyledTableHeaderRow>
                    ))}
                </StyledTableHead>
                <tbody {...getTableBodyProps()}>

                    {page.map((row, i) => {
                        prepareRow(row); // This line is necessary to prepare the rows and get the row props from react-table dynamically
                        // Each row can be rendered directly as a string using the react-table render method
                        return (
                            <StyledTableRow {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    return <StyledTableData {...cell.getCellProps()}>{cell.render("Cell")}</StyledTableData>;
                                })}
                            </StyledTableRow>
                        );
                    })}
                </tbody>
            </StyledTable>


        </div>
        {data?.length ? <div style={{ marginTop: 5, display: "inline-flex", float: "right", boxShadow: `0 2px 10px ${blackA.blackA2}`, padding: '4px 4px', borderRadius: 10, alignItems: "center", gap: 10, background: "white" }}>
            <Pagination currentPage={pageIndex + 1} maxPage={pageCount} onPageChange={(page) => gotoPage(page - 1)} />
            <Select placeholder="page size" defaultSelectedKey={'10'} onSelectionChange={(val) => setPageSize(parseInt(val))}>
                <Select.Item key={'10'} textValue="10">10 per page</Select.Item>
                <Select.Item key={'20'} textValue="20">20 per page</Select.Item>
                <Select.Item key={'30'} textValue="30">30 per page</Select.Item>
                <Select.Item key={'40'} textValue="40">40 per page</Select.Item>
                <Select.Item key={'50'} textValue="50">50 per page</Select.Item>

            </Select>
            <span>{pageSize} of {data?.length} records</span>


        </div> : null
        }
        {Object.values(selectedRowIds).indexOf(true) >= 0 && renderRowSelectedActions(selectedRowIds)}
    </>
}