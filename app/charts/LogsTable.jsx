/** From Version 5.2 Team:
 * We didn't really touch this file; mostly just cleaned a little bit of linting errors...
 * But we left all the 'Missing "key" props,' 'Prop spreading is forbidden,' and 'Do not nest ternary expressions.'
 */

import React, { useContext } from 'react';
import styled from 'styled-components';
import { useTable, useGroupBy, useExpanded } from 'react-table';

import { CommsContext } from '../context/CommsContext';

/**
 * Styling for the Logs Table
 */

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
`;

const Table = ({ columns, data }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state: { groupBy, expanded },
  } = useTable({ columns, data }, useGroupBy, useExpanded)

  const numberOfRows = 20;
  const firstPageRows = rows.slice(0, numberOfRows);

  return (
    <div>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>
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
          {firstPageRows.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                  return (
                    <td 
                      {...cell.getCellProps()}
                      style={{
                        background: cell.isGrouped
                          ? '#0af0082'
                          : cell.isAggregated
                          ? '#ffa50078'
                          : cell.isPlaceholder
                          ? '#ff000042'
                          : 'white',
                      }}
                    >
                    {cell.isGrouped ? (
                      <>
                        <span {...row.getToggleRowExpandedProps()}>
                          {row.isExpanded ? '⬇️' : '➡️'}
                        </span>{' '}
                        {cell.render('Cell')} ({row.subRows.length})
                      </>
                    ) : cell.isAggregated ? (
                      cell.render('Aggregated')  
                    ) : cell.isPlaceholder ? null : (
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
      <div>
        Showing the first {rows.length} of {rows.length} rows
      </div>
    </div>
  );
};

const LogsTable = () => {
  const columns = React.useMemo(
    () => [
      {
        Header: 'Time',
        accessor: 'time',
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
      },
    ],
    []
  );

  const data = useContext(CommsContext).commsData;

  return (
    <Styles>
      <Table columns={columns} data={data} />
    </Styles>
  );
};

export default LogsTable;
