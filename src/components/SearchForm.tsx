
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search } from "lucide-react";

interface SearchFormProps {
  onSearch: (query: string) => void;
  isSearching: boolean;
}

const SearchForm = ({ onSearch, isSearching }: SearchFormProps) => {
  const [query, setQuery] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [activeTab, setActiveTab] = useState("query");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const searchText = activeTab === "query" ? query : jobDescription;
    if (searchText.trim()) {
      onSearch(searchText);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <Tabs defaultValue="query" onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 mb-4">
          <TabsTrigger value="query">Quick Search</TabsTrigger>
          <TabsTrigger value="description">Job Description</TabsTrigger>
        </TabsList>
        
        <form onSubmit={handleSubmit}>
          <TabsContent value="query" className="space-y-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="query" className="text-sm font-medium">
                Enter your search query
              </label>
              <Input
                id="query"
                placeholder="e.g., Java developers with collaboration skills, max 40 minutes"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full"
              />
            </div>
          </TabsContent>
          
          <TabsContent value="description" className="space-y-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="jobDescription" className="text-sm font-medium">
                Paste job description
              </label>
              <Textarea
                id="jobDescription"
                placeholder="Paste the full job description here..."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                className="w-full min-h-[200px]"
              />
            </div>
          </TabsContent>
          
          <div className="mt-6">
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isSearching || (activeTab === "query" ? !query.trim() : !jobDescription.trim())}
            >
              {isSearching ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                  Finding assessments...
                </>
              ) : (
                <>
                  <Search className="mr-2 h-4 w-4" />
                  Find SHL Assessments
                </>
              )}
            </Button>
          </div>
        </form>
      </Tabs>
    </div>
  );
};

export default SearchForm;
