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


const commsData = [
  {
    "_id":{"$oid":"6004b4e1d3f0bbd0f6a4081b"},
    "microservice":"reverse-proxy",
    "endpoint":"/books/createbook",
    "request":"POST",
    "correlatingid":"700e36a8-334f-4ffb-babd-c0b3ec2a27f0",
    "responsestatus":{"$numberInt":"200"},
    "responsemessage":"OK",
    "time":{"$date":{"$numberLong":"1610921185595"}},
    "__v":{"$numberInt":"0"}
  },
  {
    "_id":{"$oid":"6004b4e18582d3dda5bb940f"},
    "microservice":"books",
    "endpoint":"/books/createbook",
    "request":"POST",
    "correlatingid":"700e36a8-334f-4ffb-babd-c0b3ec2a27f0",
    "responsestatus":{"$numberInt":"200"},
    "responsemessage":"OK",
    "time":{"$date":{"$numberLong":"1610921185582"}},
    "__v":{"$numberInt":"0"}
  },
  {
    "_id":{"$oid":"6004b507d3f0bbd0f6a4082f"},
    "microservice":"reverse-proxy",
    "endpoint":"/customers/createcustomer",
    "request":"POST",
    "correlatingid":"8d77bfc8-fce2-4279-ae6f-cccbb9277686",
    "responsestatus":{"$numberInt":"200"},
    "responsemessage":"OK",
    "time":{"$date":{"$numberLong":"1610921223980"}},
    "__v":{"$numberInt":"0"}
  },
  {
    "_id":{"$oid":"6004b507d3f0bbd0f6a4082f"},
    "microservice":"reverse-proxy",
    "endpoint":"/customers/createcustomer",
    "request":"POST",
    "correlatingid":"8d77bfc8-fce2-4279-ae6f-cccbb9277686",
    "responsestatus":{"$numberInt":"200"},
    "responsemessage":"OK",
    "time":{"$date":{"$numberLong":"1610921223980"}},
    "__v":{"$numberInt":"0"}
  },
  {
    "_id":{"$oid":"6004b52e4a699be366634bf2"},
    "microservice":"customers",
    "endpoint":"/customers/createcustomer",
    "request":"POST",
    "correlatingid":"1086e81d-01b6-4b52-aabb-ae47430fccaf",
    "responsestatus":{"$numberInt":"200"},
    "responsemessage":"OK",
    "time":{"$date":{"$numberLong":"1610921262603"}},
    "__v":{"$numberInt":"0"}
  },
  {
    "_id":{"$oid":"6004b52ed3f0bbd0f6a40843"},
    "microservice":"reverse-proxy",
    "endpoint":"/customers/createcustomer",
    "request":"POST",
    "correlatingid":"1086e81d-01b6-4b52-aabb-ae47430fccaf",
    "responsestatus":{"$numberInt":"200"},
    "responsemessage":"OK",
    "time":{"$date":{"$numberLong":"1610921262603"}},
    "__v":{"$numberInt":"0"}
  },
  {
    "_id":{"$oid":"6004b543d3f0bbd0f6a4084e"},
    "microservice":"reverse-proxy",
    "endpoint":"/orders/createorder",
    "request":"POST",
    "correlatingid":"43f0cc03-7e1d-49b0-84bd-740e82fa4326",
    "responsestatus":{"$numberInt":"200"},
    "responsemessage":"OK",
    "time":{"$date":{"$numberLong":"1610921283121"}},
    "__v":{"$numberInt":"0"}
  },
  {
    "_id":{"$oid":"6004b5433c9fc5eb9216873c"},
    "microservice":"orders",
    "endpoint":"/orders/createorder",
    "request":"POST",
    "correlatingid":"43f0cc03-7e1d-49b0-84bd-740e82fa4326",
    "responsestatus":{"$numberInt":"200"},
    "responsemessage":"OK",
    "time":{"$date":{"$numberLong":"1610921283123"}},
    "__v":{"$numberInt":"0"}
  },
]



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

const data = commsData;

const Table = () => {

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
          {/* {firstPageRows.map((row, 0) => {
            prepareRow(row) */}
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
          {/* })} */}

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

  return (
    <Styles>
      <Table columns={columns} data={data} />
    </Styles>
  )
}


// const data = React.useMemo(() => {
//   const communicationsData = useContext(CommsContext).commsData;
// })

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