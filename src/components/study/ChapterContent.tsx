import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { BookOpen, Lightbulb, AlertCircle, CheckCircle2, Quote, Code, ListOrdered } from "lucide-react";

interface ChapterContentProps {
  title: string;
  courseName?: string;
  readingProgress?: number;
  onProgressChange?: (progress: number) => void;
}

// Full realistic academic chapter content - equivalent to 10+ pages
export function ChapterContent({ title, courseName, readingProgress = 0, onProgressChange }: ChapterContentProps) {
  return (
    <div className="prose prose-lg dark:prose-invert max-w-none">
      {/* Chapter Header */}
      <div className="mb-8 pb-6 border-b border-border">
        <Badge variant="outline" className="mb-3">{courseName || "Database Systems"}</Badge>
        <h1 className="text-3xl font-bold mb-2 text-foreground">{title}</h1>
        <p className="text-muted-foreground text-lg">
          A comprehensive exploration of database normalization principles, techniques, and practical applications in modern database design.
        </p>
        <div className="flex items-center gap-4 mt-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <BookOpen className="w-4 h-4" />
            <span>Estimated reading time: 45-60 minutes</span>
          </div>
          {readingProgress > 0 && (
            <div className="flex items-center gap-2">
              <Progress value={readingProgress} className="w-32 h-2" />
              <span className="text-sm text-muted-foreground">{readingProgress}%</span>
            </div>
          )}
        </div>
      </div>

      {/* Introduction */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4 text-foreground">1. Introduction to Database Normalization</h2>
        
        <p className="text-foreground/90 leading-relaxed mb-4">
          Database normalization is a systematic approach to organizing data in a relational database to minimize redundancy and dependency. Developed by Edgar F. Codd in the early 1970s as part of his relational model, normalization remains one of the most fundamental concepts in database design and is essential knowledge for any database professional, software engineer, or data analyst.
        </p>

        <p className="text-foreground/90 leading-relaxed mb-4">
          The process of normalization involves decomposing tables to eliminate data redundancy and undesirable characteristics like insertion, update, and deletion anomalies. While the concept may seem straightforward at first, its proper application requires a deep understanding of functional dependencies, keys, and the various normal forms that serve as progressive milestones in the normalization journey.
        </p>

        <div className="p-5 rounded-xl bg-primary/5 border border-primary/10 my-6">
          <div className="flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-warning flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-semibold text-foreground mb-1">Key Concept</h4>
              <p className="text-sm text-muted-foreground m-0">
                Normalization is not about making databases faster—it's about making them correct. A well-normalized database ensures data integrity and makes the database easier to maintain over time.
              </p>
            </div>
          </div>
        </div>

        <p className="text-foreground/90 leading-relaxed mb-4">
          Before diving into the normal forms themselves, it's crucial to understand why normalization matters in practice. Consider a simple example: an e-commerce company storing customer orders. Without proper normalization, you might store the customer's name and address with every order they place. This leads to several problems:
        </p>

        <ul className="space-y-2 mb-6">
          <li className="text-foreground/90"><strong>Update Anomalies:</strong> If a customer changes their address, you need to update it in every row where that customer appears.</li>
          <li className="text-foreground/90"><strong>Insertion Anomalies:</strong> You cannot store information about a new customer until they place an order.</li>
          <li className="text-foreground/90"><strong>Deletion Anomalies:</strong> If you delete a customer's only order, you lose all information about that customer.</li>
        </ul>

        <p className="text-foreground/90 leading-relaxed">
          These anomalies represent real-world problems that can cause data inconsistency, wasted storage space, and application bugs that are difficult to track down. Normalization provides a principled approach to avoiding these issues.
        </p>
      </section>

      {/* Functional Dependencies */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4 text-foreground">2. Understanding Functional Dependencies</h2>

        <p className="text-foreground/90 leading-relaxed mb-4">
          Before we can properly understand normalization, we must first grasp the concept of functional dependencies. A functional dependency is a constraint between two sets of attributes in a relation. If we have a table R with attributes X and Y, we say that Y is functionally dependent on X (written X → Y) if each value of X is associated with exactly one value of Y.
        </p>

        <p className="text-foreground/90 leading-relaxed mb-4">
          More formally, a functional dependency X → Y holds if and only if for any two tuples t1 and t2 in R, whenever t1[X] = t2[X], it must also be that t1[Y] = t2[Y]. This might sound abstract, but it's actually quite intuitive when you think about it in terms of real-world relationships.
        </p>

        <Card className="my-6">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Code className="w-5 h-5" />
              Example: Student Records
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Consider a student records table with the following attributes:
            </p>
            <div className="font-mono text-sm bg-muted p-4 rounded-lg mb-4">
              StudentID, StudentName, DateOfBirth, Major, Department, DepartmentHead
            </div>
            <p className="text-sm text-foreground/90 mb-2">The following functional dependencies exist:</p>
            <ul className="text-sm space-y-1">
              <li className="font-mono">StudentID → StudentName, DateOfBirth, Major</li>
              <li className="font-mono">Major → Department</li>
              <li className="font-mono">Department → DepartmentHead</li>
            </ul>
          </CardContent>
        </Card>

        <p className="text-foreground/90 leading-relaxed mb-4">
          Understanding these dependencies is crucial because they tell us which attributes depend on which keys. A <strong>superkey</strong> is any set of attributes that functionally determines all other attributes in the relation. A <strong>candidate key</strong> is a minimal superkey—that is, a superkey from which you cannot remove any attribute while still maintaining the property of being a superkey.
        </p>

        <p className="text-foreground/90 leading-relaxed mb-4">
          The <strong>primary key</strong> is the candidate key chosen by the database designer to uniquely identify tuples in the relation. In our student example, StudentID would typically be the primary key. Non-key attributes are all attributes that are not part of any candidate key. Understanding the distinction between key and non-key attributes is essential for applying the normal forms correctly.
        </p>

        <h3 className="text-xl font-semibold mt-8 mb-4 text-foreground">2.1 Types of Functional Dependencies</h3>

        <p className="text-foreground/90 leading-relaxed mb-4">
          Functional dependencies come in several varieties, each with implications for database design:
        </p>

        <div className="space-y-4 mb-6">
          <div className="p-4 rounded-lg border border-border">
            <h4 className="font-semibold text-foreground mb-2">Trivial Dependencies</h4>
            <p className="text-sm text-muted-foreground">
              A functional dependency X → Y is trivial if Y is a subset of X. For example, {StudentID, StudentName} → StudentName is trivial. These dependencies always hold and don't tell us anything useful about the data.
            </p>
          </div>
          <div className="p-4 rounded-lg border border-border">
            <h4 className="font-semibold text-foreground mb-2">Partial Dependencies</h4>
            <p className="text-sm text-muted-foreground">
              A partial dependency exists when a non-key attribute depends on only part of a composite key. For example, if our key is {StudentID, CourseID} and StudentName depends only on StudentID, we have a partial dependency.
            </p>
          </div>
          <div className="p-4 rounded-lg border border-border">
            <h4 className="font-semibold text-foreground mb-2">Transitive Dependencies</h4>
            <p className="text-sm text-muted-foreground">
              A transitive dependency occurs when a non-key attribute depends on another non-key attribute. In our earlier example, DepartmentHead depends on Department, which depends on Major, which depends on StudentID. This creates a transitive chain: StudentID → Major → Department → DepartmentHead.
            </p>
          </div>
        </div>
      </section>

      {/* First Normal Form */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4 text-foreground">3. First Normal Form (1NF)</h2>

        <p className="text-foreground/90 leading-relaxed mb-4">
          The First Normal Form (1NF) represents the foundational level of database normalization. A relation is said to be in 1NF if and only if it satisfies the following conditions: the domain of each attribute contains only atomic (indivisible) values, and each column contains values of a single type. In practical terms, this means no repeating groups, no arrays, and no composite attributes.
        </p>

        <p className="text-foreground/90 leading-relaxed mb-4">
          The concept of atomicity is central to 1NF but can be somewhat subjective depending on the application context. For instance, an address could be considered atomic if we never need to query or manipulate its individual components, or it could be decomposed into street, city, state, and zip code if those components are queried independently.
        </p>

        <div className="p-5 rounded-xl bg-destructive/5 border border-destructive/10 my-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-semibold text-foreground mb-1">Common Mistake</h4>
              <p className="text-sm text-muted-foreground m-0">
                Storing comma-separated values in a single column (e.g., "Math, Physics, Chemistry" for courses) violates 1NF. Each value must be in its own row or the data should be restructured into a separate table.
              </p>
            </div>
          </div>
        </div>

        <h3 className="text-xl font-semibold mt-8 mb-4 text-foreground">3.1 Converting to First Normal Form</h3>

        <p className="text-foreground/90 leading-relaxed mb-4">
          Consider a table that stores employee skills in a non-normalized format. The original structure might look like this:
        </p>

        <Card className="my-6">
          <CardContent className="pt-6">
            <p className="text-sm font-semibold mb-3">Before 1NF (Violates normalization):</p>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2 font-semibold">EmployeeID</th>
                    <th className="text-left p-2 font-semibold">Name</th>
                    <th className="text-left p-2 font-semibold">Skills</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="p-2">E001</td>
                    <td className="p-2">John Smith</td>
                    <td className="p-2">Java, Python, SQL, AWS</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2">E002</td>
                    <td className="p-2">Sarah Johnson</td>
                    <td className="p-2">React, TypeScript</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <p className="text-foreground/90 leading-relaxed mb-4">
          To convert this to 1NF, we need to eliminate the multi-valued Skills column. There are two common approaches:
        </p>

        <p className="text-foreground/90 leading-relaxed mb-4">
          <strong>Approach 1:</strong> Create a separate row for each skill. This results in data redundancy for the employee information but achieves 1NF.
        </p>

        <p className="text-foreground/90 leading-relaxed mb-4">
          <strong>Approach 2:</strong> Create a separate table for skills with a foreign key reference to the employee table. This is typically the preferred approach as it prepares the data for higher normal forms.
        </p>

        <Card className="my-6">
          <CardContent className="pt-6">
            <p className="text-sm font-semibold mb-3">After 1NF (Preferred structure):</p>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-xs font-medium mb-2 text-muted-foreground">Employees Table:</p>
                <table className="min-w-full text-sm border-collapse border">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="text-left p-2 font-semibold">EmployeeID</th>
                      <th className="text-left p-2 font-semibold">Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-2">E001</td>
                      <td className="p-2">John Smith</td>
                    </tr>
                    <tr>
                      <td className="p-2">E002</td>
                      <td className="p-2">Sarah Johnson</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div>
                <p className="text-xs font-medium mb-2 text-muted-foreground">EmployeeSkills Table:</p>
                <table className="min-w-full text-sm border-collapse border">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="text-left p-2 font-semibold">EmployeeID</th>
                      <th className="text-left p-2 font-semibold">Skill</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b"><td className="p-2">E001</td><td className="p-2">Java</td></tr>
                    <tr className="border-b"><td className="p-2">E001</td><td className="p-2">Python</td></tr>
                    <tr className="border-b"><td className="p-2">E001</td><td className="p-2">SQL</td></tr>
                    <tr className="border-b"><td className="p-2">E001</td><td className="p-2">AWS</td></tr>
                    <tr className="border-b"><td className="p-2">E002</td><td className="p-2">React</td></tr>
                    <tr><td className="p-2">E002</td><td className="p-2">TypeScript</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Second Normal Form */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4 text-foreground">4. Second Normal Form (2NF)</h2>

        <p className="text-foreground/90 leading-relaxed mb-4">
          A relation is in Second Normal Form (2NF) if it is in 1NF and every non-key attribute is fully functionally dependent on the entire primary key. This normal form specifically addresses the issue of partial dependencies, which occur when an attribute depends on only part of a composite key rather than the whole key.
        </p>

        <p className="text-foreground/90 leading-relaxed mb-4">
          2NF is only relevant when you have a composite primary key (a key made up of multiple attributes). If your table has a single-column primary key, and it's already in 1NF, then it automatically satisfies 2NF because there's no possibility of a partial dependency.
        </p>

        <div className="p-5 rounded-xl bg-success/5 border border-success/10 my-6">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-semibold text-foreground mb-1">Remember</h4>
              <p className="text-sm text-muted-foreground m-0">
                2NF = 1NF + No partial dependencies. Every non-key attribute must depend on the <em>entire</em> primary key, not just a portion of it.
              </p>
            </div>
          </div>
        </div>

        <h3 className="text-xl font-semibold mt-8 mb-4 text-foreground">4.1 Identifying Partial Dependencies</h3>

        <p className="text-foreground/90 leading-relaxed mb-4">
          Consider a table tracking student course enrollments with grades. The table has a composite primary key of (StudentID, CourseID):
        </p>

        <Card className="my-6">
          <CardContent className="pt-6">
            <p className="text-sm font-semibold mb-3">StudentCourses Table (Violates 2NF):</p>
            <div className="font-mono text-sm bg-muted p-4 rounded-lg mb-4">
              <strong>Primary Key:</strong> (StudentID, CourseID)<br />
              <strong>Attributes:</strong> StudentID, CourseID, StudentName, CourseName, InstructorName, Grade
            </div>
            <p className="text-sm text-muted-foreground">
              Here, StudentName depends only on StudentID (not on CourseID), and CourseName and InstructorName depend only on CourseID. These are partial dependencies that violate 2NF.
            </p>
          </CardContent>
        </Card>

        <p className="text-foreground/90 leading-relaxed mb-4">
          The dependencies in this table are:
        </p>

        <ul className="space-y-2 mb-6">
          <li className="text-foreground/90"><strong>(StudentID, CourseID) → Grade</strong> - Full dependency (correct)</li>
          <li className="text-foreground/90"><strong>StudentID → StudentName</strong> - Partial dependency (violates 2NF)</li>
          <li className="text-foreground/90"><strong>CourseID → CourseName, InstructorName</strong> - Partial dependency (violates 2NF)</li>
        </ul>

        <h3 className="text-xl font-semibold mt-8 mb-4 text-foreground">4.2 Converting to Second Normal Form</h3>

        <p className="text-foreground/90 leading-relaxed mb-4">
          To achieve 2NF, we decompose the table to remove partial dependencies. Each partial dependency becomes its own table:
        </p>

        <Card className="my-6">
          <CardContent className="pt-6">
            <p className="text-sm font-semibold mb-3">After decomposition to 2NF:</p>
            <div className="space-y-4">
              <div className="p-3 rounded-lg bg-muted/50">
                <p className="text-sm font-medium mb-1">Students Table:</p>
                <p className="text-xs font-mono">StudentID (PK), StudentName</p>
              </div>
              <div className="p-3 rounded-lg bg-muted/50">
                <p className="text-sm font-medium mb-1">Courses Table:</p>
                <p className="text-xs font-mono">CourseID (PK), CourseName, InstructorName</p>
              </div>
              <div className="p-3 rounded-lg bg-muted/50">
                <p className="text-sm font-medium mb-1">Enrollments Table:</p>
                <p className="text-xs font-mono">StudentID (PK, FK), CourseID (PK, FK), Grade</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <p className="text-foreground/90 leading-relaxed mb-4">
          This decomposition eliminates redundancy. Now, if a student's name changes, we only need to update one row in the Students table. If a course changes instructors, we update one row in the Courses table. The Enrollments table contains only the information that truly depends on both StudentID and CourseID together.
        </p>
      </section>

      {/* Third Normal Form */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4 text-foreground">5. Third Normal Form (3NF)</h2>

        <p className="text-foreground/90 leading-relaxed mb-4">
          A relation is in Third Normal Form (3NF) if it is in 2NF and no non-key attribute is transitively dependent on the primary key. In other words, every non-key attribute must depend directly on the primary key, not through another non-key attribute.
        </p>

        <p className="text-foreground/90 leading-relaxed mb-4">
          The formal definition states that a relation R is in 3NF if, for every non-trivial functional dependency X → A where A is a single attribute, at least one of the following holds: (1) X is a superkey, or (2) A is a prime attribute (part of some candidate key).
        </p>

        <div className="p-5 rounded-xl bg-primary/5 border border-primary/10 my-6">
          <div className="flex items-start gap-3">
            <Quote className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-semibold text-foreground mb-1">Codd's Definition</h4>
              <p className="text-sm text-muted-foreground m-0 italic">
                "Every non-key attribute must provide a fact about the key, the whole key, and nothing but the key."
              </p>
            </div>
          </div>
        </div>

        <h3 className="text-xl font-semibold mt-8 mb-4 text-foreground">5.1 Understanding Transitive Dependencies</h3>

        <p className="text-foreground/90 leading-relaxed mb-4">
          A transitive dependency exists when a non-key attribute depends on the primary key through another non-key attribute. Consider this example:
        </p>

        <Card className="my-6">
          <CardContent className="pt-6">
            <p className="text-sm font-semibold mb-3">Employees Table (Violates 3NF):</p>
            <table className="min-w-full text-sm border-collapse border">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="text-left p-2 font-semibold">EmployeeID</th>
                  <th className="text-left p-2 font-semibold">Name</th>
                  <th className="text-left p-2 font-semibold">DepartmentID</th>
                  <th className="text-left p-2 font-semibold">DepartmentName</th>
                  <th className="text-left p-2 font-semibold">DepartmentLocation</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-2">E001</td>
                  <td className="p-2">John Smith</td>
                  <td className="p-2">D10</td>
                  <td className="p-2">Engineering</td>
                  <td className="p-2">Building A</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">E002</td>
                  <td className="p-2">Sarah Johnson</td>
                  <td className="p-2">D10</td>
                  <td className="p-2">Engineering</td>
                  <td className="p-2">Building A</td>
                </tr>
                <tr>
                  <td className="p-2">E003</td>
                  <td className="p-2">Mike Brown</td>
                  <td className="p-2">D20</td>
                  <td className="p-2">Marketing</td>
                  <td className="p-2">Building B</td>
                </tr>
              </tbody>
            </table>
          </CardContent>
        </Card>

        <p className="text-foreground/90 leading-relaxed mb-4">
          The transitive dependency here is:
        </p>

        <div className="font-mono text-sm bg-muted p-4 rounded-lg mb-6">
          EmployeeID → DepartmentID → (DepartmentName, DepartmentLocation)
        </div>

        <p className="text-foreground/90 leading-relaxed mb-4">
          DepartmentName and DepartmentLocation depend on DepartmentID, not directly on EmployeeID. This creates redundancy: "Engineering, Building A" is stored multiple times. It also creates update anomalies—if the Engineering department moves to a new building, we need to update multiple rows.
        </p>

        <h3 className="text-xl font-semibold mt-8 mb-4 text-foreground">5.2 Converting to Third Normal Form</h3>

        <p className="text-foreground/90 leading-relaxed mb-4">
          To achieve 3NF, we decompose the table to eliminate the transitive dependency:
        </p>

        <Card className="my-6">
          <CardContent className="pt-6">
            <p className="text-sm font-semibold mb-3">After decomposition to 3NF:</p>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-xs font-medium mb-2 text-muted-foreground">Employees Table:</p>
                <table className="min-w-full text-sm border-collapse border">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="text-left p-2 font-semibold">EmployeeID</th>
                      <th className="text-left p-2 font-semibold">Name</th>
                      <th className="text-left p-2 font-semibold">DepartmentID</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b"><td className="p-2">E001</td><td className="p-2">John Smith</td><td className="p-2">D10</td></tr>
                    <tr className="border-b"><td className="p-2">E002</td><td className="p-2">Sarah Johnson</td><td className="p-2">D10</td></tr>
                    <tr><td className="p-2">E003</td><td className="p-2">Mike Brown</td><td className="p-2">D20</td></tr>
                  </tbody>
                </table>
              </div>
              <div>
                <p className="text-xs font-medium mb-2 text-muted-foreground">Departments Table:</p>
                <table className="min-w-full text-sm border-collapse border">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="text-left p-2 font-semibold">DepartmentID</th>
                      <th className="text-left p-2 font-semibold">Name</th>
                      <th className="text-left p-2 font-semibold">Location</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b"><td className="p-2">D10</td><td className="p-2">Engineering</td><td className="p-2">Building A</td></tr>
                    <tr><td className="p-2">D20</td><td className="p-2">Marketing</td><td className="p-2">Building B</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* BCNF */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4 text-foreground">6. Boyce-Codd Normal Form (BCNF)</h2>

        <p className="text-foreground/90 leading-relaxed mb-4">
          Boyce-Codd Normal Form (BCNF) is a stronger version of 3NF. A relation is in BCNF if and only if, for every non-trivial functional dependency X → Y, X is a superkey. In other words, every determinant must be a candidate key.
        </p>

        <p className="text-foreground/90 leading-relaxed mb-4">
          While 3NF allows non-key attributes to be determined by candidate keys (not just the primary key), BCNF is stricter and eliminates all remaining anomalies that 3NF might miss. However, there's a tradeoff: decomposing to BCNF can sometimes lose dependency preservation, meaning that enforcing all functional dependencies might require joins across multiple tables.
        </p>

        <h3 className="text-xl font-semibold mt-8 mb-4 text-foreground">6.1 When 3NF ≠ BCNF</h3>

        <p className="text-foreground/90 leading-relaxed mb-4">
          Consider a table tracking student tutoring sessions. The business rules are:
        </p>

        <ul className="space-y-2 mb-6">
          <li className="text-foreground/90">Each student is tutored by one tutor per subject</li>
          <li className="text-foreground/90">Each tutor teaches only one subject</li>
        </ul>

        <Card className="my-6">
          <CardContent className="pt-6">
            <p className="text-sm font-semibold mb-3">TutoringSessions Table:</p>
            <div className="font-mono text-sm bg-muted p-4 rounded-lg mb-4">
              <strong>Attributes:</strong> StudentID, Subject, TutorID<br />
              <strong>Candidate Keys:</strong> (StudentID, Subject) and (StudentID, TutorID)<br />
              <strong>Functional Dependencies:</strong><br />
              &nbsp;&nbsp;(StudentID, Subject) → TutorID<br />
              &nbsp;&nbsp;TutorID → Subject
            </div>
          </CardContent>
        </Card>

        <p className="text-foreground/90 leading-relaxed mb-4">
          This table is in 3NF because Subject is a prime attribute (part of a candidate key). However, it's not in BCNF because TutorID → Subject exists, and TutorID is not a superkey.
        </p>

        <p className="text-foreground/90 leading-relaxed mb-4">
          To convert to BCNF, we would decompose into two tables: (TutorID, Subject) and (StudentID, TutorID). However, this decomposition loses the ability to enforce the dependency (StudentID, Subject) → TutorID without performing a join.
        </p>
      </section>

      {/* Higher Normal Forms */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4 text-foreground">7. Higher Normal Forms</h2>

        <p className="text-foreground/90 leading-relaxed mb-4">
          Beyond BCNF, there are additional normal forms that address more subtle forms of data redundancy. While these are less commonly applied in practice, understanding them completes your knowledge of normalization theory.
        </p>

        <h3 className="text-xl font-semibold mt-8 mb-4 text-foreground">7.1 Fourth Normal Form (4NF)</h3>

        <p className="text-foreground/90 leading-relaxed mb-4">
          4NF addresses multi-valued dependencies (MVDs). A multi-valued dependency X →→ Y exists when, for each X value, there is a set of associated Y values that is independent of the other attributes in the relation. A relation is in 4NF if it is in BCNF and contains no non-trivial multi-valued dependencies.
        </p>

        <h3 className="text-xl font-semibold mt-8 mb-4 text-foreground">7.2 Fifth Normal Form (5NF)</h3>

        <p className="text-foreground/90 leading-relaxed mb-4">
          5NF, also known as Project-Join Normal Form (PJNF), addresses join dependencies. A relation is in 5NF if every join dependency in it is implied by its candidate keys. In practice, 5NF is rarely needed because most real-world schemas don't have join dependencies that aren't implied by keys.
        </p>

        <h3 className="text-xl font-semibold mt-8 mb-4 text-foreground">7.3 Domain-Key Normal Form (DKNF)</h3>

        <p className="text-foreground/90 leading-relaxed mb-4">
          DKNF is the theoretical ideal of normalization. A relation is in DKNF if every constraint on the relation is a logical consequence of domain constraints and key constraints. While DKNF eliminates all redundancy and anomalies, achieving it is often impractical because it may require complex domain constraints.
        </p>
      </section>

      {/* Denormalization */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4 text-foreground">8. Denormalization: When to Break the Rules</h2>

        <p className="text-foreground/90 leading-relaxed mb-4">
          While normalization provides many benefits, there are situations where controlled denormalization is appropriate. Denormalization involves intentionally introducing redundancy to improve read performance or simplify queries.
        </p>

        <div className="p-5 rounded-xl bg-warning/5 border border-warning/10 my-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-warning flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-semibold text-foreground mb-1">Important Consideration</h4>
              <p className="text-sm text-muted-foreground m-0">
                Denormalization should only be done after careful analysis of query patterns and with full understanding of the maintenance burden it creates. Always normalize first, then denormalize specific areas based on measured performance needs.
              </p>
            </div>
          </div>
        </div>

        <p className="text-foreground/90 leading-relaxed mb-4">
          Common scenarios where denormalization is considered:
        </p>

        <ol className="list-decimal list-inside space-y-3 mb-6">
          <li className="text-foreground/90"><strong>Reporting databases:</strong> Data warehouses often denormalize data into star or snowflake schemas for efficient analytical queries.</li>
          <li className="text-foreground/90"><strong>Read-heavy applications:</strong> When reads vastly outnumber writes, storing computed values can improve performance.</li>
          <li className="text-foreground/90"><strong>Distributed systems:</strong> In NoSQL databases or microservices architectures, denormalization may be necessary to avoid expensive cross-service joins.</li>
          <li className="text-foreground/90"><strong>Caching layers:</strong> Materialized views or caching strategies often involve denormalized data for quick access.</li>
        </ol>

        <p className="text-foreground/90 leading-relaxed mb-4">
          When denormalizing, it's crucial to implement proper update mechanisms to maintain data consistency. This might include database triggers, application-level logic, or eventual consistency patterns depending on your requirements.
        </p>
      </section>

      {/* Practical Application */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4 text-foreground">9. Practical Application: A Complete Example</h2>

        <p className="text-foreground/90 leading-relaxed mb-4">
          Let's walk through a complete normalization exercise for an online bookstore. We'll start with a denormalized structure and progressively apply normalization.
        </p>

        <h3 className="text-xl font-semibold mt-8 mb-4 text-foreground">9.1 Initial Denormalized Table</h3>

        <Card className="my-6">
          <CardContent className="pt-6">
            <p className="text-sm font-semibold mb-3">BookstoreOrders (Original):</p>
            <div className="text-sm overflow-x-auto">
              <p className="mb-2">OrderID, OrderDate, CustomerID, CustomerName, CustomerEmail, CustomerAddress,</p>
              <p className="mb-2">ISBN, BookTitle, AuthorNames, PublisherID, PublisherName, PublisherCity,</p>
              <p>Quantity, UnitPrice, TotalPrice</p>
            </div>
          </CardContent>
        </Card>

        <p className="text-foreground/90 leading-relaxed mb-4">
          This table has numerous problems: multi-valued attributes (AuthorNames), transitive dependencies (PublisherID → PublisherName, PublisherCity), and redundancy (customer info repeated for each order line item).
        </p>

        <h3 className="text-xl font-semibold mt-8 mb-4 text-foreground">9.2 Step-by-Step Normalization</h3>

        <Card className="my-6">
          <CardContent className="pt-6">
            <p className="text-sm font-semibold mb-4">Final Normalized Schema (3NF):</p>
            <div className="space-y-3 text-sm">
              <div className="p-3 rounded-lg bg-muted/50">
                <p className="font-medium">Customers:</p>
                <p className="font-mono text-xs">CustomerID (PK), Name, Email, Address</p>
              </div>
              <div className="p-3 rounded-lg bg-muted/50">
                <p className="font-medium">Publishers:</p>
                <p className="font-mono text-xs">PublisherID (PK), Name, City</p>
              </div>
              <div className="p-3 rounded-lg bg-muted/50">
                <p className="font-medium">Authors:</p>
                <p className="font-mono text-xs">AuthorID (PK), Name</p>
              </div>
              <div className="p-3 rounded-lg bg-muted/50">
                <p className="font-medium">Books:</p>
                <p className="font-mono text-xs">ISBN (PK), Title, PublisherID (FK), Price</p>
              </div>
              <div className="p-3 rounded-lg bg-muted/50">
                <p className="font-medium">BookAuthors (Junction):</p>
                <p className="font-mono text-xs">ISBN (PK, FK), AuthorID (PK, FK)</p>
              </div>
              <div className="p-3 rounded-lg bg-muted/50">
                <p className="font-medium">Orders:</p>
                <p className="font-mono text-xs">OrderID (PK), OrderDate, CustomerID (FK)</p>
              </div>
              <div className="p-3 rounded-lg bg-muted/50">
                <p className="font-medium">OrderItems:</p>
                <p className="font-mono text-xs">OrderID (PK, FK), ISBN (PK, FK), Quantity</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Summary */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4 text-foreground">10. Summary and Key Takeaways</h2>

        <p className="text-foreground/90 leading-relaxed mb-4">
          Database normalization is both an art and a science. While the theoretical foundations provide clear guidelines, applying them effectively requires judgment based on your specific use case, performance requirements, and maintenance considerations.
        </p>

        <div className="p-6 rounded-xl bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 border border-primary/10 my-6">
          <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
            <ListOrdered className="w-5 h-5 text-primary" />
            Normal Forms Quick Reference
          </h4>
          <div className="space-y-3">
            <div className="flex gap-4">
              <Badge className="bg-primary/20 text-primary border-0 flex-shrink-0">1NF</Badge>
              <p className="text-sm text-muted-foreground">Atomic values only; no repeating groups</p>
            </div>
            <div className="flex gap-4">
              <Badge className="bg-secondary/20 text-secondary border-0 flex-shrink-0">2NF</Badge>
              <p className="text-sm text-muted-foreground">1NF + no partial dependencies (full dependency on entire key)</p>
            </div>
            <div className="flex gap-4">
              <Badge className="bg-accent/20 text-accent border-0 flex-shrink-0">3NF</Badge>
              <p className="text-sm text-muted-foreground">2NF + no transitive dependencies</p>
            </div>
            <div className="flex gap-4">
              <Badge className="bg-success/20 text-success border-0 flex-shrink-0">BCNF</Badge>
              <p className="text-sm text-muted-foreground">Every determinant is a candidate key</p>
            </div>
          </div>
        </div>

        <p className="text-foreground/90 leading-relaxed mb-4">
          As you continue your journey in database design, remember that normalization is a tool in your toolkit—not an absolute rule. The goal is to create databases that are correct, maintainable, and performant for your specific application needs.
        </p>
      </section>

      {/* Practice Questions */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4 text-foreground">11. Practice Questions</h2>

        <p className="text-foreground/90 leading-relaxed mb-4">
          Test your understanding with these practice questions:
        </p>

        <div className="space-y-4">
          {[
            "Given a table with attributes (StudentID, CourseID, CourseName, InstructorID, InstructorName, Grade), identify all functional dependencies and determine its highest normal form.",
            "Explain why a table with a single-column primary key is automatically in 2NF if it's already in 1NF.",
            "Design a normalized schema for a hospital patient management system that tracks patients, doctors, appointments, and prescriptions.",
            "Describe a real-world scenario where denormalization would be appropriate, and explain what trade-offs you would be making.",
            "What is the difference between a candidate key and a superkey? Provide examples."
          ].map((question, i) => (
            <Card key={i}>
              <CardContent className="p-4">
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-sm font-semibold text-primary">
                    {i + 1}
                  </span>
                  <p className="text-foreground/90 text-sm">{question}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
