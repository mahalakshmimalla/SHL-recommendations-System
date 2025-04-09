
import { getRecommendations, loadPredefinedDataset } from "../services/recommendationService";

// Updated dataset based on the user's provided data
const sampleDataset = [
  {
    "Assessment Name": "Global Skills Development Report",
    "Link": "https://www.shl.com/solutions/products/product-catalog/view/global-skills-development-report/",
    "Remote Testing": "Yes",
    "Adaptive/IRT": "No",
    "Test Type": "AEBCDP",
    "Time": "N/A"
  },
  {
    "Assessment Name": ".NET Framework 4.5",
    "Link": "https://www.shl.com/solutions/products/product-catalog/view/net-framework-4-5/",
    "Remote Testing": "Yes",
    "Adaptive/IRT": "Yes",
    "Test Type": "K",
    "Time": 30
  },
  {
    "Assessment Name": ".NET MVC (New)",
    "Link": "https://www.shl.com/solutions/products/product-catalog/view/net-mvc-new/",
    "Remote Testing": "Yes",
    "Adaptive/IRT": "No",
    "Test Type": "K",
    "Time": 17
  },
  {
    "Assessment Name": ".NET MVVM (New)",
    "Link": "https://www.shl.com/solutions/products/product-catalog/view/net-mvvm-new/",
    "Remote Testing": "Yes",
    "Adaptive/IRT": "No",
    "Test Type": "K",
    "Time": 5
  },
  {
    "Assessment Name": ".NET WCF (New)",
    "Link": "https://www.shl.com/solutions/products/product-catalog/view/net-wcf-new/",
    "Remote Testing": "Yes",
    "Adaptive/IRT": "No",
    "Test Type": "K",
    "Time": 11
  },
  {
    "Assessment Name": ".NET WPF (New)",
    "Link": "https://www.shl.com/solutions/products/product-catalog/view/net-wpf-new/",
    "Remote Testing": "Yes",
    "Adaptive/IRT": "No",
    "Test Type": "K",
    "Time": 9
  },
  {
    "Assessment Name": ".NET XAML (New)",
    "Link": "https://www.shl.com/solutions/products/product-catalog/view/net-xaml-new/",
    "Remote Testing": "Yes",
    "Adaptive/IRT": "No",
    "Test Type": "K",
    "Time": 5
  },
  {
    "Assessment Name": "Accounts Payable (New)",
    "Link": "https://www.shl.com/solutions/products/product-catalog/view/accounts-payable-new/",
    "Remote Testing": "Yes",
    "Adaptive/IRT": "No",
    "Test Type": "K",
    "Time": 9
  },
  {
    "Assessment Name": "Accounts Payable Simulation (New)",
    "Link": "https://www.shl.com/solutions/products/product-catalog/view/accounts-payable-simulation-new/",
    "Remote Testing": "Yes",
    "Adaptive/IRT": "No",
    "Test Type": "S",
    "Time": 8
  },
  {
    "Assessment Name": "Accounts Receivable (New)",
    "Link": "https://www.shl.com/solutions/products/product-catalog/view/accounts-receivable-new/",
    "Remote Testing": "Yes",
    "Adaptive/IRT": "No",
    "Test Type": "K",
    "Time": 13
  },
  {
    "Assessment Name": "Accounts Receivable Simulation (New)",
    "Link": "https://www.shl.com/solutions/products/product-catalog/view/accounts-receivable-simulation-new/",
    "Remote Testing": "Yes",
    "Adaptive/IRT": "No",
    "Test Type": "S",
    "Time": 8
  },
  {
    "Assessment Name": "ADO.NET (New)",
    "Link": "https://www.shl.com/solutions/products/product-catalog/view/ado-net-new/",
    "Remote Testing": "Yes",
    "Adaptive/IRT": "No",
    "Test Type": "K",
    "Time": 10
  },
  {
    "Assessment Name": "Manual Testing (New)",
    "Link": "https://www.shl.com/solutions/products/product-catalog/view/manual-testing-new/",
    "Remote Testing": "Yes",
    "Adaptive/IRT": "No",
    "Test Type": "K",
    "Time": 10
  },
  {
    "Assessment Name": "Manufac. & Indust. - Mechanical & Vigilance 8.0",
    "Link": "https://www.shl.com/solutions/products/product-catalog/view/mechanical-and-vigilance-focus-8-0/",
    "Remote Testing": "Yes",
    "Adaptive/IRT": "No",
    "Test Type": "AP",
    "Time": 49
  },
  {
    "Assessment Name": "Manufac. & Indust. - Safety & Dependability 8.0",
    "Link": "https://www.shl.com/solutions/products/product-catalog/view/safety-and-dependability-focus-8-0/",
    "Remote Testing": "Yes",
    "Adaptive/IRT": "No",
    "Test Type": "P",
    "Time": 16
  },
  {
    "Assessment Name": "Manufacturing & Industrial - Essential Focus 8.0",
    "Link": "https://www.shl.com/solutions/products/product-catalog/view/essential-focus-8-0/",
    "Remote Testing": "Yes",
    "Adaptive/IRT": "No",
    "Test Type": "P",
    "Time": 16
  },
  {
    "Assessment Name": "Manufacturing & Industrial - Mechanical Focus 8.0",
    "Link": "https://www.shl.com/solutions/products/product-catalog/view/mechanical-focus-8-0/",
    "Remote Testing": "Yes",
    "Adaptive/IRT": "No",
    "Test Type": "AP",
    "Time": 31
  },
  {
    "Assessment Name": "Manufacturing & Industrial - Vigilance Focus 8.0",
    "Link": "https://www.shl.com/solutions/products/product-catalog/view/vigilance-focus-8-0/",
    "Remote Testing": "Yes",
    "Adaptive/IRT": "No",
    "Test Type": "AP",
    "Time": 34
  },
  {
    "Assessment Name": "Marketing (New)",
    "Link": "https://www.shl.com/solutions/products/product-catalog/view/marketing-new/",
    "Remote Testing": "Yes",
    "Adaptive/IRT": "No",
    "Test Type": "K",
    "Time": 9
  },
  {
    "Assessment Name": "Maven (New)",
    "Link": "https://www.shl.com/solutions/products/product-catalog/view/maven-new/",
    "Remote Testing": "Yes",
    "Adaptive/IRT": "No",
    "Test Type": "K",
    "Time": 7
  },
  {
    "Assessment Name": "Mechanical Engineering (New)",
    "Link": "https://www.shl.com/solutions/products/product-catalog/view/mechanical-engineering-new/",
    "Remote Testing": "Yes",
    "Adaptive/IRT": "No",
    "Test Type": "K",
    "Time": 7
  },
  {
    "Assessment Name": "Mechatronics Engineering (New)",
    "Link": "https://www.shl.com/solutions/products/product-catalog/view/mechatronics-engineering-new/",
    "Remote Testing": "Yes",
    "Adaptive/IRT": "No",
    "Test Type": "K",
    "Time": 19
  },
  {
    "Assessment Name": "Medical Terminology (New)",
    "Link": "https://www.shl.com/solutions/products/product-catalog/view/medical-terminology-new/",
    "Remote Testing": "Yes",
    "Adaptive/IRT": "No",
    "Test Type": "K",
    "Time": 3
  },
  {
    "Assessment Name": "Metallurgical Engineering (New)",
    "Link": "https://www.shl.com/solutions/products/product-catalog/view/metallurgical-engineering-new/",
    "Remote Testing": "Yes",
    "Adaptive/IRT": "No",
    "Test Type": "K",
    "Time": 10
  },
  {
    "Assessment Name": "Adobe Experience Manager (New)",
    "Link": "https://www.shl.com/solutions/products/product-catalog/view/adobe-experience-manager-new/",
    "Remote Testing": "Yes",
    "Adaptive/IRT": "No",
    "Test Type": "K",
    "Time": 17
  },
  {
    "Assessment Name": "Adobe Photoshop CC",
    "Link": "https://www.shl.com/solutions/products/product-catalog/view/adobe-photoshop-cc/",
    "Remote Testing": "Yes",
    "Adaptive/IRT": "Yes",
    "Test Type": "K",
    "Time": 20
  },
  {
    "Assessment Name": "Aeronautical Engineering (New)",
    "Link": "https://www.shl.com/solutions/products/product-catalog/view/aeronautical-engineering-new/",
    "Remote Testing": "Yes",
    "Adaptive/IRT": "No",
    "Test Type": "K",
    "Time": 10
  },
  {
    "Assessment Name": "Aerospace Engineering (New)",
    "Link": "https://www.shl.com/solutions/products/product-catalog/view/aerospace-engineering-new/",
    "Remote Testing": "Yes",
    "Adaptive/IRT": "No",
    "Test Type": "K",
    "Time": 10
  },
  {
    "Assessment Name": "Agile Software Development",
    "Link": "https://www.shl.com/solutions/products/product-catalog/view/agile-software-development/",
    "Remote Testing": "Yes",
    "Adaptive/IRT": "No",
    "Test Type": "K",
    "Time": 7
  },
  {
    "Assessment Name": "Agile Testing (New)",
    "Link": "https://www.shl.com/solutions/products/product-catalog/view/agile-testing-new/",
    "Remote Testing": "Yes",
    "Adaptive/IRT": "No",
    "Test Type": "K",
    "Time": 13
  },
  {
    "Assessment Name": "AI Skills",
    "Link": "https://www.shl.com/solutions/products/product-catalog/view/ai-skills/",
    "Remote Testing": "Yes",
    "Adaptive/IRT": "No",
    "Test Type": "P",
    "Time": 16
  },
  {
    "Assessment Name": "Amazon Web Services (AWS) Development (New)",
    "Link": "https://www.shl.com/solutions/products/product-catalog/view/amazon-web-services-aws-development-new/",
    "Remote Testing": "Yes",
    "Adaptive/IRT": "No",
    "Test Type": "K",
    "Time": 6
  },
  {
    "Assessment Name": "Android Development (New)",
    "Link": "https://www.shl.com/solutions/products/product-catalog/view/android-development-new/",
    "Remote Testing": "Yes",
    "Adaptive/IRT": "No",
    "Test Type": "K",
    "Time": 7
  },
  {
    "Assessment Name": "Angular 6 (New)",
    "Link": "https://www.shl.com/solutions/products/product-catalog/view/angular-6-new/",
    "Remote Testing": "Yes",
    "Adaptive/IRT": "No",
    "Test Type": "K",
    "Time": 11
  },
  {
    "Assessment Name": "AngularJS (New)",
    "Link": "https://www.shl.com/solutions/products/product-catalog/view/angularjs-new/",
    "Remote Testing": "Yes",
    "Adaptive/IRT": "No",
    "Test Type": "K",
    "Time": 9
  },
  {
    "Assessment Name": "Apache Hadoop (New)",
    "Link": "https://www.shl.com/solutions/products/product-catalog/view/apache-hadoop-new/",
    "Remote Testing": "Yes",
    "Adaptive/IRT": "No",
    "Test Type": "K",
    "Time": 7
  },
  {
    "Assessment Name": "Docker (New)",
    "Link": "https://www.shl.com/solutions/products/product-catalog/view/docker-new/",
    "Remote Testing": "Yes",
    "Adaptive/IRT": "No",
    "Test Type": "K",
    "Time": 10
  }
  // Note: This is a subset of the data. The actual dataset is much larger.
];

// Initialize the dataset when the application loads
const initializeDataset = () => {
  // Load the sample dataset initially
  const mappedData = loadPredefinedDataset(sampleDataset);
  console.log("Initial dataset loaded:", mappedData.length, "assessments");
  console.log("Sample assessment:", mappedData[0]);
};

// Run the initialization
initializeDataset();

// This is a simulated API endpoint function
export async function fetchRecommendations(query: string) {
  console.log("Fetching recommendations for query:", query);
  try {
    const result = getRecommendations({ query });
    console.log(`Found ${result.assessments.length} matches for "${query}"`);
    return result;
  } catch (error) {
    console.error("Error in recommendation API:", error);
    throw new Error("Failed to get recommendations");
  }
}
