import React from 'react';
import {
  Box, Table, Thead, Tbody, Th, Tr, Td, Button,
} from '@chakra-ui/react';
import { useTable, usePagination, useGlobalFilter } from 'react-table';
import uuid from 'react-uuid';
import TableDataSearch from './TableDataSearch';

function PaginatedTable(props) {
  const { tableColumns, tableRecords } = props;
  const tableInstance = useTable({ columns: tableColumns, data: tableRecords }, useGlobalFilter, usePagination);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    state,
    goToPage,
    pageCount,
    setGlobalFilter,
  } = tableInstance;

  const { pageIndex, globalFilter } = state;
  const { type } = props;
  return (
    <>
      <TableDataSearch type={type} filter={globalFilter} setFilter={setGlobalFilter} />

      <Box>
        <Table variant="striped" size="sm" height="500px" {...getTableProps()}>
          <Thead>
            {
              headerGroups.map((hGroup) => (
                <Tr {...hGroup.getHeaderGroupProps()} key={uuid()}>
                  {hGroup.headers.map((column) => (
                    <Th key={uuid()} {...column.getHeaderProps()} textAlign="center">
                      {column.render('Header')}
                    </Th>
                  ))}
                </Tr>
              ))
            }
          </Thead>
          <Tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <Tr {...row.getRowProps()} key={uuid()}>
                  {row.cells.map((cell) => (
                    <Td {...cell.getCellProps()} key={uuid()} textAlign="center" fontSize="12px">
                      {cell.render('Cell')}
                    </Td>
                  ))}
                </Tr>
              );
            })}

          </Tbody>
        </Table>
        <Box>
          <Box>
            <span>
              <strong>
                {pageIndex + 1}
                {' '}
                of
                {' '}
                {pageOptions.length}
              </strong>
            </span>
          </Box>
          <Box>
            <Button onClick={() => goToPage(0)} disabled={!canPreviousPage}>{'<<'}</Button>
            <Button onClick={() => previousPage()} disabled={!canPreviousPage}>{'<'}</Button>
            <Button onClick={() => nextPage()} disabled={!canNextPage}>{'>'}</Button>
            <Button onClick={() => goToPage(pageCount - 1)} disabled={!canNextPage}>{'>>'}</Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default PaginatedTable;
