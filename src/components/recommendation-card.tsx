import { Card, CardHeader, CardContent } from "@/components/ui/card";

interface RecommendationCardProps {
  name: string;
  title: string;
  relationship: string;
  date: string;
  content: string;
  linkedIn?: string;
}

export function RecommendationCard({
  name,
  title,
  relationship,
  date,
  content,
  linkedIn,
}: RecommendationCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between gap-x-2 text-base">
          <div className="flex-1">
            {linkedIn ? (
              <a 
                href={linkedIn} 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:underline"
              >
                <h3 className="font-semibold leading-none">{name}</h3>
              </a>
            ) : (
              <h3 className="font-semibold leading-none">{name}</h3>
            )}
            <p className="text-sm text-muted-foreground mt-1">{title}</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              {relationship} • {date}
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="mt-2 text-xs print:text-[10px]">
        &ldquo;{content}&rdquo;
      </CardContent>
    </Card>
  );
} 