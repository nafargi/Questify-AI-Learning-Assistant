import { Book, FileText, ArrowRight } from "@phosphor-icons/react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DashboardLayout } from "@/components/layout/DashboardLayout";

// In a real app, this would come from an API. 
// Hardcoding based on the file system check for now.
export const AVAILABLE_BOOKS = [
    { id: "dbms", title: "DATABASE MANAGEMENT SYSTEMS.pdf", filename: "DATABASE MANAGEMENT SYSTEMS.pdf", size: "11.2 MB" },
    { id: "js_notes", title: "JavaScript Notes For Professionals.pdf", filename: "JavaScriptNotesForProfessionals.pdf", size: "4.3 MB" },
    { id: "pgdca", title: "PGDCA203_slm.pdf", filename: "PGDCA203_slm.pdf", size: "6.9 MB" },
    { id: "networking", title: "Networking Fundamentals.pdf", filename: "SMB_University_120307_Networking_Fundamentals.pdf", size: "0.9 MB" },
    { id: "php", title: "PHP Cookbook.pdf", filename: "php_cookbook.pdf", size: "2.1 MB" }
];

interface BookSelectorProps {
    onSelect: (filename: string) => void;
}

export function BookSelector({ onSelect }: BookSelectorProps) {
    return (
        <DashboardLayout>
            <div className="flex flex-col items-center justify-center p-8 min-h-[80vh]">
                <div className="max-w-5xl w-full space-y-8">
                    <div className="text-left space-y-2 border-b pb-6">
                        <h1 className="text-3xl font-black tracking-tight">Library & Resources</h1>
                        <p className="text-muted-foreground">Select a source material to begin your study session.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {AVAILABLE_BOOKS.map((book) => (
                            <button
                                key={book.id}
                                onClick={() => onSelect(book.filename)}
                                className="group relative flex flex-col items-start p-6 border bg-card hover:border-primary/50 hover:shadow-xl transition-all duration-300 text-left"
                            >
                                <div className="p-3 rounded-xl bg-primary/10 mb-4 group-hover:scale-110 transition-transform">
                                    <FileText className="w-8 h-8 text-primary" />
                                </div>
                                <h3 className="font-bold text-lg mb-1 leading-tight group-hover:text-primary transition-colors line-clamp-2">
                                    {book.title}
                                </h3>
                                <p className="text-xs text-muted-foreground mb-4">{book.size}</p>

                                <div className="mt-auto w-full pt-4 border-t border-border/50 flex items-center justify-between text-xs font-medium text-muted-foreground group-hover:text-primary transition-colors">
                                    <span>Open Book</span>
                                    <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:translate-x-0 group-hover:opacity-100 transition-all" />
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
