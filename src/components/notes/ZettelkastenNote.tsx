import { NoteContent } from "@/data/mockNotes";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link2, Tag } from "lucide-react";

export const ZettelkastenNote = ({ content }: { content: NoteContent }) => {
  return (
    <div className="max-w-5xl mx-auto p-4 lg:p-8 space-y-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-black mb-2">{content.title}</h1>
        <p className="text-muted-foreground">Slip-box System</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {content.notes?.map((cards, i) => (
          <Card key={i} className="group hover:border-primary/50 hover:shadow-lg transition-all duration-300">
            <CardHeader className="pb-3 border-b border-border/50 bg-muted/20">
              <div className="flex justify-between items-start">
                <span className="font-mono text-xs font-bold text-muted-foreground">#{cards.id}</span>
                <div className="flex gap-1">
                  {cards.links.map(link => (
                    <Badge key={link} variant="outline" className="text-[10px] h-5 px-1 gap-1 hover:bg-primary hover:text-white cursor-pointer transition-colors">
                      <Link2 className="w-2 h-2" /> {link}
                    </Badge>
                  ))}
                </div>
              </div>
              <CardTitle className="text-lg leading-tight pt-2">{cards.title}</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-6 space-y-4">
              <p className="text-sm leading-relaxed text-muted-foreground group-hover:text-foreground transition-colors">
                {cards.content}
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                {cards.tags.map(tag => (
                  <span key={tag} className="text-[10px] font-bold uppercase text-primary/70 flex items-center gap-1">
                    <Tag className="w-2 h-2" /> {tag}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
