import { Assessment } from "../data/assessments";

export interface RecommendationRequest {
  query: string;
  maxDuration?: number;
}

export interface RecommendationResult {
  assessments: Assessment[];
  query: string;
}

// Store for custom dataset - this will be preloaded
let customDataset: Assessment[] = [];

// Allow setting a custom dataset directly
export function setCustomDataset(dataset: Assessment[]) {
  customDataset = dataset;
  console.log("Custom dataset loaded with", dataset.length, "assessments");
}

// Get the current dataset (only custom dataset)
export function getCurrentDataset(): Assessment[] {
  return customDataset;
}

// Load the dataset directly from a predefined source
export function loadPredefinedDataset(dataset: any[]) {
  // Map the dataset to Assessment structure
  const mappedDataset = dataset.map((item, index) => {
    // Convert duration strings to numbers or keep as string for "N/A"
    let duration: number | string = "N/A";
    
    if (item["Time"] !== undefined) {
      if (typeof item["Time"] === "number") {
        duration = item["Time"];
      } else if (typeof item["Time"] === "string") {
        if (item["Time"] === "N/A") {
          duration = "N/A";
        } else {
          // Extract number from strings like "30minutes"
          const match = item["Time"].match(/(\d+)/);
          duration = match ? parseInt(match[1]) : "N/A";
        }
      }
    } else if (item["duration"]) {
      duration = item["duration"];
    }
    
    // Handle remote testing field (can be string "Yes"/"No" or boolean)
    let remoteSupport = false;
    if (item["Remote Testing"]) {
      remoteSupport = item["Remote Testing"] === "Yes" || item["Remote Testing"] === true;
    } else if (item["remote"] !== undefined) {
      remoteSupport = item["remote"] === "Yes" || item["remote"] === true;
    }
    
    // Handle adaptive testing field (can be string "Yes"/"No" or boolean)
    let adaptiveSupport = false;
    if (item["Adaptive/IRT"]) {
      adaptiveSupport = item["Adaptive/IRT"] === "Yes" || item["Adaptive/IRT"] === true;
    } else if (item["adaptive"] !== undefined) {
      adaptiveSupport = item["adaptive"] === "Yes" || item["adaptive"] === true;
    }
    
    // Handle test type
    let testType = "";
    if (item["Test Type"]) {
      testType = item["Test Type"];
    } else if (item["type"]) {
      testType = item["type"];
    } else if (item["testType"]) {
      testType = item["testType"];
    }
    
    return {
      id: String(index + 1),
      name: item["Assessment Name"] || item["name"] || "",
      url: item["Link"] || item["url"] || "",
      remoteTestingSupport: remoteSupport,
      adaptiveSupport: adaptiveSupport,
      duration: duration,
      testType: testType,
      // Since your data doesn't have these fields, we'll set defaults
      skillCategories: [],
      description: `${item["Assessment Name"] || item["name"] || "Assessment"} - ${testType || "Unknown type"}`,
      targetRoles: []
    };
  }).filter(item => item.name && item.url); // Only include items with at least a name and URL

  // Set the mapped dataset
  setCustomDataset(mappedDataset);
  return mappedDataset;
}

// Simple keyword-based matching function
function calculateRelevanceScore(assessment: Assessment, query: string): number {
  const queryLower = query.toLowerCase();
  const keywords = queryLower.split(/\s+/).filter(word => word.length > 2);
  
  let score = 0;
  
  // Check name match
  if (assessment.name.toLowerCase().includes(queryLower)) {
    score += 5;
  }
  
  // Check each keyword in the name
  for (const keyword of keywords) {
    if (assessment.name.toLowerCase().includes(keyword)) {
      score += 2;
    }
  }
  
  // Check test type match
  if (assessment.testType && queryLower.includes(assessment.testType.toLowerCase())) {
    score += 3;
  } else if (assessment.testType) {
    // Map abbreviated test types to full words for better matching
    const testTypeMap: Record<string, string[]> = {
      "K": ["knowledge", "technical", "skill", "test"],
      "P": ["personality", "behavioral", "behavior"],
      "S": ["simulation", "practical"],
      "AP": ["aptitude", "ability"],
      "A": ["ability", "aptitude"],
      "E": ["evaluation"],
      "B": ["behavioral", "behavior"],
      "C": ["cognitive"],
      "D": ["development"],
    };
    
    const possibleTypes = testTypeMap[assessment.testType] || [];
    for (const type of possibleTypes) {
      if (queryLower.includes(type)) {
        score += 2;
        break;
      }
    }
  }
  
  // Apply duration-based matching
  const durationMatches = queryLower.match(/(\d+)\s*(?:minute|min|minutes)/);
  if (durationMatches && durationMatches[1] && typeof assessment.duration === 'number') {
    const requestedDuration = parseInt(durationMatches[1]);
    // Give higher score to assessments with similar duration
    const durationDiff = Math.abs(assessment.duration - requestedDuration);
    if (durationDiff <= 5) {
      score += 3;
    } else if (durationDiff <= 10) {
      score += 2;
    } else if (durationDiff <= 15) {
      score += 1;
    }
  }
  
  return score;
}

// Logic for specific requirements in query
function extractRequirements(query: string): { maxDuration?: number, requiredSkills: string[] } {
  const queryLower = query.toLowerCase();
  let maxDuration: number | undefined = undefined;
  const requiredSkills: string[] = [];
  
  // Extract duration requirements
  const durationMatches = queryLower.match(/(\d+)\s*(?:minute|min|minutes)/);
  if (durationMatches && durationMatches[1]) {
    maxDuration = parseInt(durationMatches[1]);
  }
  
  // Common technical skills to look for
  const technicalSkills = ["java", "python", "javascript", "sql", "react", "angular", "node", "css", "html", ".net", "c#", "c++"];
  for (const skill of technicalSkills) {
    if (queryLower.includes(skill)) {
      requiredSkills.push(skill);
    }
  }
  
  // Test types to look for
  const testTypes = ["cognitive", "personality", "technical", "behavioral", "simulation"];
  for (const type of testTypes) {
    if (queryLower.includes(type)) {
      requiredSkills.push(type);
    }
  }
  
  return { maxDuration, requiredSkills };
}

export function getRecommendations(request: RecommendationRequest): RecommendationResult {
  const { query, maxDuration: requestMaxDuration } = request;
  const { maxDuration: extractedMaxDuration, requiredSkills } = extractRequirements(query);
  
  // Use either provided maxDuration or extracted one
  const maxDuration = requestMaxDuration || extractedMaxDuration;
  
  // Use only the uploaded custom dataset
  let filteredAssessments = [...getCurrentDataset()];
  
  // If no dataset is uploaded yet, return empty results
  if (filteredAssessments.length === 0) {
    return {
      assessments: [],
      query
    };
  }
  
  // Apply duration filter if specified
  if (maxDuration && typeof maxDuration === 'number') {
    filteredAssessments = filteredAssessments.filter(a => {
      if (typeof a.duration === 'number') {
        return a.duration <= maxDuration;
      }
      return true; // Include assessments with non-numeric duration (like "N/A")
    });
  }
  
  // Calculate relevance scores
  const scoredAssessments = filteredAssessments.map(assessment => ({
    assessment,
    score: calculateRelevanceScore(assessment, query)
  }));
  
  // Sort by relevance score (descending)
  scoredAssessments.sort((a, b) => b.score - a.score);
  
  // Filter out items with zero score (no relevance)
  const relevantAssessments = scoredAssessments.filter(sa => sa.score > 0);
  
  // If we have no results with scores, return top 20 items at least
  const finalResults = relevantAssessments.length > 0 ? 
    relevantAssessments : 
    scoredAssessments.slice(0, 20);
  
  return {
    assessments: finalResults.map(sa => sa.assessment),
    query
  };
}
