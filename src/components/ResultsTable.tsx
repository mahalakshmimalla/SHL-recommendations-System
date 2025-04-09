
import { useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Assessment } from "@/data/assessments";
import { Button } from "@/components/ui/button";
import { Check, X, Copy, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface ResultsTableProps {
  assessments: Assessment[];
}

const ResultsTable = ({ assessments }: ResultsTableProps) => {
  const { toast } = useToast();
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  const handleCopy = (index: number) => {
    const assessment = assessments[index];
    
    const textToCopy = `
Assessment: ${assessment.name}
URL: ${assessment.url}
Remote Testing: ${assessment.remoteTestingSupport ? 'Yes' : 'No'}
Adaptive/IRT Support: ${assessment.adaptiveSupport ? 'Yes' : 'No'}
Duration: ${assessment.duration}
Test Type: ${assessment.testType}
    `.trim();
    
    navigator.clipboard.writeText(textToCopy);
    
    setCopiedIndex(index);
    toast({
      title: "Copied to clipboard",
      description: "Assessment details have been copied to your clipboard.",
      duration: 2000
    });
    
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  if (assessments.length === 0) {
    return null;
  }

  // Calculate pagination
  const totalPages = Math.ceil(assessments.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, assessments.length);
  const currentItems = assessments.slice(startIndex, endIndex);

  return (
    <div className="w-full overflow-auto">
      <div className="mb-2 text-sm text-muted-foreground">
        Showing {startIndex + 1}-{endIndex} of {assessments.length} assessments
      </div>
      
      <Table className="min-w-full border-collapse">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[250px]">Assessment</TableHead>
            <TableHead>Type</TableHead>
            <TableHead className="text-center">Remote Testing</TableHead>
            <TableHead className="text-center">Adaptive/IRT</TableHead>
            <TableHead className="text-center">Duration</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentItems.map((assessment, index) => (
            <TableRow key={assessment.id}>
              <TableCell className="font-medium">
                {assessment.url ? (
                  <a 
                    href={assessment.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center hover:text-blue-600 transition-colors"
                  >
                    {assessment.name}
                    <ExternalLink className="ml-1 h-3 w-3" />
                  </a>
                ) : (
                  assessment.name
                )}
              </TableCell>
              <TableCell>{assessment.testType || "Unknown"}</TableCell>
              <TableCell className="text-center">
                {assessment.remoteTestingSupport ? 
                  <Check className="mx-auto h-4 w-4 text-green-500" /> : 
                  <X className="mx-auto h-4 w-4 text-red-500" />
                }
              </TableCell>
              <TableCell className="text-center">
                {assessment.adaptiveSupport ? 
                  <Check className="mx-auto h-4 w-4 text-green-500" /> : 
                  <X className="mx-auto h-4 w-4 text-red-500" />
                }
              </TableCell>
              <TableCell className="text-center">
                {typeof assessment.duration === 'number' 
                  ? `${assessment.duration} min` 
                  : assessment.duration}
              </TableCell>
              <TableCell className="text-right">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => handleCopy(startIndex + index)}
                >
                  {copiedIndex === startIndex + index ? 
                    "Copied!" : 
                    <Copy className="h-4 w-4" />
                  }
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {totalPages > 1 && (
        <Pagination className="mt-4">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
            
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              // Show pages around the current one
              let pageToShow: number;
              if (totalPages <= 5) {
                pageToShow = i + 1;
              } else if (currentPage <= 3) {
                pageToShow = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageToShow = totalPages - 4 + i;
              } else {
                pageToShow = currentPage - 2 + i;
              }
              
              return (
                <PaginationItem key={i}>
                  <PaginationLink 
                    onClick={() => setCurrentPage(pageToShow)}
                    isActive={currentPage === pageToShow}
                  >
                    {pageToShow}
                  </PaginationLink>
                </PaginationItem>
              );
            })}
            
            <PaginationItem>
              <PaginationNext 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};

export default ResultsTable;
