import { cn } from "@/lib/utils";
import { Plus, ArrowUpDown } from "lucide-react";

interface ChartingNoteProps {
  content: {
    headers: string[];
    rows: string[][];
  };
}

export function ChartingNote({ content }: ChartingNoteProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-bold text-lg text-foreground">Charting Method</h3>
          <p className="text-sm text-muted-foreground">Compare and contrast information in a table format</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted text-muted-foreground text-sm hover:bg-muted/80 transition-colors">
            <Plus className="w-4 h-4" />
            Column
          </button>
          <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted text-muted-foreground text-sm hover:bg-muted/80 transition-colors">
            <Plus className="w-4 h-4" />
            Row
          </button>
        </div>
      </div>

      {/* Table Container */}
      <div className="rounded-2xl border-2 border-border overflow-hidden bg-card shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                {content.headers.map((header, i) => (
                  <th
                    key={i}
                    className={cn(
                      "p-4 text-left text-sm font-bold",
                      "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground",
                      i === 0 && "rounded-tl-none",
                      i === content.headers.length - 1 && "rounded-tr-none",
                      "relative group cursor-pointer hover:from-primary/90 hover:to-primary/70 transition-colors"
                    )}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span>{header}</span>
                      <ArrowUpDown className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    {/* Column resize handle */}
                    <div className="absolute right-0 top-0 bottom-0 w-1 hover:bg-primary-foreground/30 cursor-col-resize" />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {content.rows.map((row, i) => (
                <tr
                  key={i}
                  className={cn(
                    "group transition-colors",
                    i % 2 === 0 ? "bg-muted/30" : "bg-muted/10",
                    "hover:bg-primary/5"
                  )}
                >
                  {row.map((cell, j) => (
                    <td
                      key={j}
                      className={cn(
                        "p-4 text-sm border-b border-border/50",
                        j === 0 && "font-medium text-foreground",
                        j !== 0 && "text-muted-foreground",
                        "group-hover:text-foreground transition-colors"
                      )}
                    >
                      {/* Highlight complexity values */}
                      {cell.includes("O(") ? (
                        <span className={cn(
                          "px-2 py-1 rounded-md text-xs font-mono",
                          cell === "O(1)" && "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300",
                          cell === "O(log n)" && "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300",
                          cell === "O(n)" && "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300",
                          cell === "O(n²)" && "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300",
                          cell === "N/A" && "bg-gray-100 dark:bg-gray-800 text-gray-500"
                        )}>
                          {cell}
                        </span>
                      ) : cell === "N/A" ? (
                        <span className="px-2 py-1 rounded-md text-xs bg-muted text-muted-foreground">
                          {cell}
                        </span>
                      ) : (
                        cell
                      )}
                    </td>
                  ))}
                </tr>
              ))}

              {/* Add Row */}
              <tr className="opacity-0 hover:opacity-100 transition-opacity">
                <td colSpan={content.headers.length} className="p-3 text-center">
                  <button className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    + Add new row
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Footer Stats */}
        <div className="bg-muted/30 px-4 py-3 flex items-center justify-between text-xs text-muted-foreground border-t border-border">
          <span>{content.rows.length} rows × {content.headers.length} columns</span>
          <div className="flex gap-4">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-green-500" /> O(1) Best
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-yellow-500" /> O(n) Linear
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-red-500" /> O(n²) Quadratic
            </span>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-muted/30 rounded-xl p-4 text-center">
        <p className="text-xs text-muted-foreground">
          💡 Click headers to sort • Drag columns to reorder • Highlight cells for emphasis
        </p>
      </div>
    </div>
  );
}
