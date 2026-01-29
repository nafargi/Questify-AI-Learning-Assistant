import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Highlighter, MagnifyingGlassPlus, MagnifyingGlassMinus, ArrowsOut } from "@phosphor-icons/react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

interface PDFViewerProps {
    filename: string;
    onHighlight?: (text: string) => void;
}

export function PDFViewer({ filename, onHighlight }: PDFViewerProps) {
    const [zoom, setZoom] = useState(100);
    const pdfUrl = `/books/${filename}`;

    const handleHighlightClick = () => {
        toast.info("Highlight Mode Active", {
            description: "Select text in the PDF to highlight. For now, use the Notes panel on the right."
        });
        if (onHighlight) onHighlight("Simulated highlight for: " + filename);
    };

    const zoomIn = () => setZoom(prev => Math.min(prev + 20, 200));
    const zoomOut = () => setZoom(prev => Math.max(prev - 20, 50));
    const resetZoom = () => setZoom(100);

    return (
        <div className="flex flex-col h-full bg-slate-100 dark:bg-slate-900 rounded-lg overflow-hidden border">
            {/* PDF Toolbar */}
            <div className="h-12 bg-white dark:bg-slate-800 border-b flex items-center justify-between px-4 shrink-0 z-10">
                <div className="flex items-center gap-3 min-w-0">
                    <span className="text-xs font-medium truncate max-w-[150px] text-muted-foreground">{filename}</span>
                    <Badge variant="outline" className="text-[10px] py-0 h-5">{zoom}%</Badge>
                </div>

                <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" onClick={handleHighlightClick} title="Highlight Text" className="h-8 w-8">
                        <Highlighter className="w-4 h-4 text-yellow-500" />
                    </Button>
                    <div className="w-px h-4 bg-border/50 mx-1" />
                    <Button variant="ghost" size="icon" onClick={zoomOut} title="Zoom Out" className="h-8 w-8">
                        <MagnifyingGlassMinus className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={resetZoom} title="Reset Zoom" className="h-8 w-8 text-[10px] font-bold">
                        1:1
                    </Button>
                    <Button variant="ghost" size="icon" onClick={zoomIn} title="Zoom In" className="h-8 w-8">
                        <MagnifyingGlassPlus className="w-4 h-4" />
                    </Button>
                    <div className="w-px h-4 bg-border/50 mx-1" />
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                        <ArrowsOut className="w-4 h-4" />
                    </Button>
                </div>
            </div>

            {/* PDF Embed */}
            <div className="flex-1 relative overflow-auto bg-slate-200 dark:bg-slate-950 p-4 flex justify-center">
                <div
                    className="transition-all duration-200 origin-top shadow-2xl bg-white"
                    style={{
                        width: `${zoom}%`,
                        minWidth: '100%',
                        height: 'fit-content',
                        aspectRatio: '1/1.414' // A4 Ratio
                    }}
                >
                    <iframe
                        src={`${pdfUrl}#toolbar=0&view=FitH`}
                        className="w-full h-full border-none"
                        title="PDF Viewer"
                    />
                </div>
            </div>
        </div>
    );
}
