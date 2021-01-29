import React, { useContext } from 'react';
import styled from 'styled-components';
import {
  useTable,
  usePagination,
  useSortBy,
  useFilters,
  useGroupBy,
  useExpanded,
} from 'react-table';

import { CommsContext } from '../context/CommsContext';

//Styling for the table
const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }
`

// const LogsTable = React.memo(() => {
//   const communicationsData = useContext(CommsContext).commsData

const Table = () => 
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state: { groupBy, expanded },
  } = useTable(
    {
      columns, data,
    },
    useGroupBy,
    useExpanded
  )

  // set the number of rows to render
  const numberOfRows = 20
  const firstPageRows = rows.slice(0, numberOfRows)

  return (
    <div>
      <Legend />   
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroups.headers.map(column => (
                <th {...column.getHeaderGroupProps()}>
                  {column.canGroupBy ? (
                    <span {...column.getGroupByToggleProps()}>
                      {column.isGrouped ? '➖ ' : '➕ '} 
                    </span>
                  ): null}
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {firstPageRows.map((row, 1) => {
            prepareRow(row)
            return (
              <tr {...row.getTowProps()}>
              {row.cells.map(cell => {
                return (
                  <td 
                    //Cell color depending on what type it is given from the useGroupBy hook
                    {...cell.getCellProps()}
                    style= {{
                      background: cell.isGrouped
                        ? '#0af0082'
                        : cell.isAggregated
                        ? '#ffa50078'
                        : cell.isPlaceholder
                        ? '#ff000042'
                        : 'white',
                    }}
                  >
                    {cell.isGroup ? (
                      // If it's a grouped cell, add an expander and row count
                      <>
                        <span {...row.getToggleRowExpandedProps()}>
                          {row.isExpanded ? '⬇️' : '➡️'}
                        </span>{' '}
                        {cell.render('Cell')} ({row.subRows.length})
                      </>

                    ) : cell.isAggregated ? (
                      // If the cell is aggregated, use the Aggregated renderer for cell
                      cell.render('Aggregated')  
                    ) : cell.isPlaceholder ? null : ( // For cells with repeated values, render null
                      // Otherwise, just render the regular cell
                      cell.render('Cell')
                    )}
                  </td>
                )
              })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div>Showing the first {numberOfRows} of {row.length} rows</div>
    </div>
  );
};


const LogsTable = () => {
  const columns = React.useMemo(() => [
    {
      Header: 'Time',
      accessor: 'time',
      //No aggregate
    },
    {
      Header: 'CorrelatingID',
      accessor: 'correlatingid',
      aggregate: 'count',
      Aggregated: ({ value }) => `${value} logs`,
    },
    {
      Header: 'Microservice',
      accessor: 'microservice',
    },
    {
      Header: 'Endpoint',
      accessor: 'endpoint',
    },
    {
      Header: 'Request Method',
      accessor: 'request',
    },
    {
      Header: 'Response Status',
      accessor: 'responsestatus',
    },
    {
      Header: 'Response Message',
      accessor: 'responsemessage',
    }
  ], [])
}

const data = React.useMemo(() => {
  const communicationsData = useContext(CommsContext).commsData;
})

export default LogsTable;


// import { useTable } from 'react-table';
// import React, { useContext } from 'react';


//  export default function LogsTable() {
//    const data = React.useMemo(
//      () => [
//        {
//          col1: 'Hello',
//          col2: 'World',
//        },
//        {
//          col1: 'react-table',
//          col2: 'rocks',
//        },
//        {
//          col1: 'whatever',
//          col2: 'you want',
//        },
//      ],
//      []
//    )
 
//    const columns = React.useMemo(
//      () => [
//        {
//          Header: 'Column 1',
//          accessor: 'col1', // accessor is the "key" in the data
//        },
//        {
//          Header: 'Column 2',
//          accessor: 'col2',
//        },
//      ],
//      []
//    )
 
//    const {
//      getTableProps,
//      getTableBodyProps,
//      headerGroups,
//      rows,
//      prepareRow,
//    } = useTable({ columns, data })
 
//    return (
//      <table {...getTableProps()} style={{ border: 'solid 1px blue' }}>
//        <thead>
//          {headerGroups.map(headerGroup => (
//            <tr {...headerGroup.getHeaderGroupProps()}>
//              {headerGroup.headers.map(column => (
//                <th
//                  {...column.getHeaderProps()}
//                  style={{
//                    borderBottom: 'solid 3px red',
//                    background: 'aliceblue',
//                    color: 'black',
//                    fontWeight: 'bold',
//                  }}
//                >
//                  {column.render('Header')}
//                </th>
//              ))}
//            </tr>
//          ))}
//        </thead>
//        <tbody {...getTableBodyProps()}>
//          {rows.map(row => {
//            prepareRow(row)
//            return (
//              <tr {...row.getRowProps()}>
//                {row.cells.map(cell => {
//                  return (
//                    <td
//                      {...cell.getCellProps()}
//                      style={{
//                        padding: '10px',
//                        border: 'solid 1px gray',
//                        background: 'papayawhip',
//                      }}
//                    >
//                      {cell.render('Cell')}
//                    </td>
//                  )
//                })}
//              </tr>
//            )
//          })}
//        </tbody>
//      </table>
//    )
//  }