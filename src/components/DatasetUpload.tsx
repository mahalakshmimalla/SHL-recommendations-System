
import { useState } from "react";
import * as XLSX from "xlsx";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { setCustomDataset } from "@/services/recommendationService";

const DatasetUpload = () => {
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.target.files?.[0];
      if (!file) return;

      setIsUploading(true);

      // Read the Excel file
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data);
      
      // Assume first sheet contains the assessment data
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      
      // Convert to JSON
      const jsonData = XLSX.utils.sheet_to_json(worksheet);
      
      // Process and map the data to match our Assessment interface
      const processedData = jsonData.map((row: any, index) => {
        // Extract values using the specified column names
        const name = row["Assessment Name"] || "";
        const url = row["Link"] || "";
        const remoteTestingSupport = Boolean(row["Remote Testing"] === "Yes" || row["Remote Testing"] === true);
        const adaptiveSupport = Boolean(row["Adaptive/IRT"] === "Yes" || row["Adaptive/IRT"] === true);
        const testType = row["Test Type"] || "Unknown";
        const duration = parseInt(row["Time"] || "0", 10); // Default to 0 if not specified

        // Create a unique ID if not provided
        const id = index.toString();

        // Return the formatted assessment object
        return {
          id,
          name,
          url,
          remoteTestingSupport,
          adaptiveSupport,
          duration,
          testType,
          skillCategories: [], // Default empty array since not in your headers
          description: "", // Default empty string since not in your headers
          targetRoles: [], // Default empty array since not in your headers
        };
      });
      
      // Update the dataset in our service
      setCustomDataset(processedData);
      
      toast({
        title: "Dataset uploaded successfully",
        description: `Loaded ${processedData.length} assessments from your Excel file.`,
        duration: 3000,
      });
      
      e.target.value = "";
    } catch (error) {
      console.error("Error processing Excel file:", error);
      toast({
        title: "Error uploading dataset",
        description: "There was a problem processing your Excel file. Check the console for details.",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-start gap-2">
      <Button 
        variant="outline" 
        className="flex items-center gap-2 w-full sm:w-auto"
        disabled={isUploading}
        onClick={() => document.getElementById('excel-upload')?.click()}
      >
        <Upload className="h-4 w-4" />
        {isUploading ? "Uploading..." : "Upload Assessment Dataset"}
      </Button>
      <input
        id="excel-upload"
        type="file"
        accept=".xlsx,.xls,.csv"
        className="hidden"
        onChange={handleFileUpload}
        disabled={isUploading}
      />
      <p className="text-xs text-muted-foreground">
        Upload an Excel file with columns: Assessment Name, Link, Remote Testing, Adaptive/IRT, Test Type, Time
      </p>
    </div>
  );
};

export default DatasetUpload;
