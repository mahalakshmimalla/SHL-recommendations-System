
import { Button } from "@/components/ui/button";

interface ExampleQueriesProps {
  onSelectExample: (query: string) => void;
}

const exampleQueries = [
  "Java developers who can collaborate effectively with business teams, max 40 minutes",
  "Mid-level professionals proficient in Python, SQL and JavaScript, max 60 minutes",
  "Analyst role requiring cognitive and personality tests, max 45 minutes",
  "Technical assessment for full stack developer with frontend and backend skills"
];

const ExampleQueries = ({ onSelectExample }: ExampleQueriesProps) => {
  return (
    <div className="mt-8">
      <h3 className="text-sm font-medium mb-2">Try an example query:</h3>
      <div className="flex flex-wrap gap-2">
        {exampleQueries.map((query) => (
          <Button
            key={query}
            variant="outline"
            size="sm"
            onClick={() => onSelectExample(query)}
            className="text-xs"
          >
            {query.length > 40 ? query.substring(0, 40) + "..." : query}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default ExampleQueries;
