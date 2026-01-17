import { NoteContent } from "@/data/mockNotes";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card } from "@/components/ui/card";

export const ChartingNote = ({ content }: { content: NoteContent }) => {
  return (
    <div className="max-w-5xl mx-auto p-4 lg:p-8">
      <h1 className="text-3xl font-black mb-8 text-center">{content.title}</h1>
      <Card className="overflow-hidden border shadow-lg">
        <Table>
          <TableHeader className="bg-primary/5">
            <TableRow>
              {content.headers?.map((header, i) => (
                <TableHead key={i} className="font-black text-primary uppercase tracking-wider py-4">
                  {header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {content.rows?.map((row, i) => (
              <TableRow key={i} className="hover:bg-muted/50 transition-colors odd:bg-background even:bg-muted/10">
                {row.map((cell, cIdx) => (
                  <TableCell key={cIdx} className="font-medium py-4 text-base">
                    {cell}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <div className="mt-8 p-4 rounded-xl bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800 text-sm text-blue-700 dark:text-blue-300 flex items-center gap-3">
        <div className="font-bold uppercase tracking-widest text-xs shrink-0">Charting Method</div>
        <p>Ideal for factual comparisons and statistics. Helps in identifying correlations and contrasting features.</p>
      </div>
    </div>
  );
};
