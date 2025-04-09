
import { Assessment } from "@/data/assessments";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, BookOpen } from "lucide-react";

interface AssessmentDetailsProps {
  assessment: Assessment;
}

const AssessmentDetails = ({ assessment }: AssessmentDetailsProps) => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">{assessment.name}</CardTitle>
        <CardDescription className="flex items-center gap-2">
          <Clock className="h-4 w-4" />
          {assessment.duration} minutes
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium mb-2 flex items-center">
              <BookOpen className="h-4 w-4 mr-1" /> Description
            </h4>
            <p className="text-sm text-muted-foreground">{assessment.description}</p>
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-2 flex items-center">
              <Users className="h-4 w-4 mr-1" /> Target Roles
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {assessment.targetRoles.map(role => (
                <Badge key={role} variant="secondary">{role}</Badge>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-2">Skill Categories</h4>
            <div className="flex flex-wrap gap-1.5">
              {assessment.skillCategories.map(skill => (
                <Badge key={skill} variant="outline">{skill}</Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AssessmentDetails;
