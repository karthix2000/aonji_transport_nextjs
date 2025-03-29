// components/Table.js
import React from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
} from '@tanstack/react-table';

const TableComponent = ({ data, columns }) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div>
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(
                    cell.column.columnDef.cell,
                    cell.getContext()
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </button>
        <span>
          Page {table.getState().pagination.pageIndex + 1} of{' '}
          {table.getPageCount()}
        </span>
        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TableComponent;
