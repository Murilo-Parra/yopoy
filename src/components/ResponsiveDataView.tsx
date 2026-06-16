import React, { ReactNode } from 'react';
import { useMediaQuery } from '../hooks/useMediaQuery'; // we'll create this or use simple logic

type RowData = Record<string, any>;

interface ResponsiveDataViewProps {
  headers: { key: string; label: string; render?: (val: any, row: RowData) => ReactNode }[];
  data: RowData[];
  keyExtractor: (item: RowData) => string;
  emptyMessage?: string;
}

export function ResponsiveDataView({ headers, data, keyExtractor, emptyMessage = "Nenhum registro encontrado" }: ResponsiveDataViewProps) {
  const isMobile = useMediaQuery('(max-width: 768px)');
  
  if (data.length === 0) {
    return <div className="p-4 text-center text-sm text-gray-500">{emptyMessage}</div>;
  }

  if (isMobile) {
    return (
      <div className="flex flex-col gap-4">
        {data.map((row) => (
          <div key={keyExtractor(row)} className="bg-white dark:bg-[#16161a] border border-slate-200 dark:border-[#222228] p-4 rounded-xl shadow-sm">
            {headers.map((h, index) => (
              <div key={h.key} className={`flex justify-between items-center py-1.5 ${index !== headers.length - 1 ? 'border-b border-slate-100 dark:border-slate-800' : ''}`}>
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">{h.label}</span>
                <span className="text-sm font-medium text-right text-slate-800 dark:text-slate-200">
                  {h.render ? h.render(row[h.key], row) : row[h.key]}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="w-full overflow-hidden rounded-xl border border-slate-200 dark:border-[#222228] bg-white dark:bg-[#111114]">
      <table className="w-full text-left border-collapse text-sm">
        <thead>
          <tr className="bg-slate-50 dark:bg-[#16161a] border-b border-slate-200 dark:border-[#222228]">
            {headers.map(h => (
              <th key={h.key} className="py-3 px-4 font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-gray-400">
                {h.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-[#222228]">
          {data.map((row) => (
            <tr key={keyExtractor(row)} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
              {headers.map((h) => (
                <td key={h.key} className="py-3 px-4 font-medium text-slate-700 dark:text-slate-300">
                   {h.render ? h.render(row[h.key], row) : row[h.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
