
import { useState } from "react";
import { Card } from "@/components/ui/card";
import SearchForm from "@/components/SearchForm";
import ResultsTable from "@/components/ResultsTable";
import ExampleQueries from "@/components/ExampleQueries";
import { fetchRecommendations } from "@/api/recommendations";
import { Assessment } from "@/data/assessments";
import { toast } from "@/hooks/use-toast";

const Index = () => {
  const [searchResults, setSearchResults] = useState<Assessment[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      toast({
        title: "Empty search",
        description: "Please enter a search query",
        variant: "destructive",
      });
      return;
    }

    setIsSearching(true);
    console.log("Searching for:", query);
    
    try {
      // Call the API endpoint
      const result = await fetchRecommendations(query);
      console.log("Search results:", result);
      
      setSearchResults(result.assessments);
      setHasSearched(true);
      
      if (result.assessments.length === 0) {
        toast({
          title: "No matches found",
          description: "Try a different search query or use broader terms",
        });
      }
    } catch (error) {
      console.error("Error searching for assessments:", error);
      toast({
        title: "Search error",
        description: "Failed to search assessments. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSearching(false);
    }
  };

  const handleExampleSelect = (query: string) => {
    handleSearch(query);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-brand-700 to-brand-600 py-8 px-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-2">SHL Assessment Matcher</h1>
          <p className="text-brand-100">
            Find the perfect SHL assessments for your hiring needs with our intelligent recommendation system.
          </p>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-5xl mx-auto px-4 py-8 space-y-8">
        <Card className="p-6 shadow-md">
          <h2 className="text-xl font-semibold mb-4">Search for Assessments</h2>
          <SearchForm onSearch={handleSearch} isSearching={isSearching} />
          
          {!hasSearched && (
            <ExampleQueries onSelectExample={handleExampleSelect} />
          )}
        </Card>

        {hasSearched && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">
              {searchResults.length > 0 
                ? `Recommended Assessments (${searchResults.length})` 
                : "No matching assessments found"}
            </h2>
            
            {searchResults.length > 0 && (
              <Card className="p-4 shadow-md overflow-hidden">
                <ResultsTable assessments={searchResults} />
              </Card>
            )}
          </div>
        )}
        
        {/* Info Section */}
        <div className="mt-12 border-t pt-8">
          <h2 className="text-xl font-semibold mb-4">About This Tool</h2>
          <div className="prose max-w-none">
            <p className="text-gray-600">
              This intelligent recommendation system helps hiring managers find the most relevant SHL assessments based on their job requirements. 
              Simply enter your query or paste a job description, and we'll match you with appropriate assessment options.
            </p>
            <p className="text-gray-600 mt-2">
              Each recommendation includes key information such as remote testing support, adaptive capabilities, duration, and test type to help you make informed decisions.
            </p>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-100 border-t py-6 px-4 mt-12">
        <div className="max-w-5xl mx-auto text-center text-gray-500 text-sm">
          SHL Assessment Recommendation System - Built with React, Tailwind CSS, and ShadCN UI
        </div>
      </footer>
    </div>
  );
};

export default Index;
