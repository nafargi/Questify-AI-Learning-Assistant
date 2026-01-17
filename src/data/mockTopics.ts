import { NoteContent } from './mockNotes';

export interface TopicMaster {
    id: string;
    title: string;
    courseId: string;
    description: string;
    lastAccessed?: string;

    // The content variants for each method
    cornell: NoteContent;
    outline: NoteContent;
    mindmap: NoteContent;
    charting: NoteContent;
    boxing: NoteContent;
    zettelkasten: NoteContent;
    feynman: NoteContent;
    flowchart: NoteContent;
    sentence: NoteContent;
    sketchnote: NoteContent;
}

export const mockTopics: Record<string, TopicMaster> = {
    // 1. System Analysis - MASSIVE CONTENT UPGRADE
    'system-analysis': {
        id: 'system-analysis',
        title: 'Complete Guide to System Analysis & Design',
        courseId: 'inf101',
        description: 'Comprehensive study material covering SDLC, Methodologies, Modeling, and Implementation strategies. (Full Semester Content)',
        lastAccessed: 'Just now',
        cornell: {
            id: 'sa-cornell', courseId: 'inf101', title: 'System Analysis: Full Course', date: 'Today', method: 'cornell',
            cues: [
                { keyword: 'System Def.', content: 'Set of interacting or interdependent component parts forming a complex/intricate whole.' },
                { keyword: 'Feedback Loop', content: 'Mechanism to verify if the system output meets the standard/expectation.' },
                { keyword: 'Open vs Closed', content: 'Open: Interacts with environment.\nClosed: Isolated, no external interaction (rare in business).' },
                { keyword: 'SDLC (Waterfall)', content: 'Traditional, sequential approach.\n1. Planning\n2. Analysis\n3. Design\n4. Implementation\n5. Maintenance.' },
                { keyword: 'Agile Manifesto', content: 'Individuals over processes.\nWorking software over documentation.\nCollaboration over contract negotiation.\nResponding to change over following a plan.' },
                { keyword: 'Systems Analyst', content: 'Change agent. Identifies organizational improvements, designs systems to implement those changes, and trains/motivates others to use the systems.' },
                { keyword: 'Skills Required', content: '1. Technical (DB, Coding)\n2. Business (Finance, Management)\n3. Analytical (Problem Solving)\n4. Interpersonal (Communication, Ethics)' },
                { keyword: 'Feasibility Types', content: 'Technical: Can we build it?\nEconomic: Should we build it (ROI)?\nOrganizational: Will they use it?' },
                { keyword: 'Requirement Gathering', content: 'Interviews (Rich data, slow).\nJAD (Joint Application Design).\nQuestionnaires (Broad reach, low depth).\nObservation (See reality vs procedure).' },
                { keyword: 'DFD Levels', content: 'Level 0 (Context): System as one process.\nLevel 1: Major subsystems.\nLevel 2: Detailed logic.' },
                { keyword: 'Use Case', content: 'Describes a goal-oriented interaction between a user (actor) and the system.' },
                { keyword: 'ERD (Entity Rel.)', content: 'Data modeling. Entities (Nouns), Attributes (Details), Relationships (Verbs).' },
                { keyword: 'Normalization', content: '1NF: Atomic.\n2NF: Whole Key.\n3NF: Non-Key Dependency removal.' },
                { keyword: 'UI Design', content: 'Focus on Usability (Learnability, Efficiency, Error frequency).' },
                { keyword: 'Implementation', content: 'Coding, Testing (Unit, Integration, System, Acceptance), Installation (Direct, Parallel, Pilot, Phased).' },
                { keyword: 'Post-Implem.', content: 'Maintenance (Corrective, Adaptive, Perfective, Preventive).' },
                { keyword: 'Process Modeling', content: 'Graphically representing the processes that capture, manipulate, store, and distribute data between a system and its environment.' },
                { keyword: 'Logic Modeling', content: 'Structured English, Decision Tables, Decision Trees.' },
                { keyword: 'SaaS / Cloud', content: 'Software as a Service. Buying access instead of building/hosting. Low maintenance, OpEx cost model.' },
                { keyword: 'Outsourcing', content: 'Hiring external vendor. Pros: Expertise, Cost. Cons: Loss of control, Security risk.' }
            ],
            summary: 'System Analysis and Design (SAD) is a structured field responsible for the development of effective Information Systems. It begins with understanding the organizational context and business needs (Planning), moves to detailing WHAT the system should do (Analysis), specifies HOW it should be built (Design), and finally constructs and delivers the solution (Implementation). \n\nThe role of the Systems Analyst is critical as a bridge between business stakeholders and technical developers. Success relies heavily on accurate requirement gathering and feasibility assessment early in the project. Modern methodologies have shifted from rigid Waterfall approaches to flexible Agile frameworks to accommodate rapid business changes. \n\nKey deliverables include the System Proposal, Requirement Specifications, Architectural Design, and the final working software. Maintenance consumes the largest portion of total lifecycle costs, emphasizing the need for high-quality initial design.'
        },
        outline: {
            id: 'sa-outline', courseId: 'inf101', title: 'System Analysis: Full Course', date: 'Today', method: 'outline',
            sections: [
                { heading: 'I. Foundations of System Development', level: 1, content: 'Core Concepts', bullets: ['The Systems Analyst Role', 'Career Paths and Skills', 'Types of Systems (TPS, MIS, DSS)', 'System Development Methodologies'] },
                { heading: 'II. Planning Phase', level: 1, content: 'Project Initiation', bullets: ['Project Identification and Selection', 'Feasibility Analysis (Tech, Econ, Org)', 'Project Estimation (Gantt, PERT)', 'Staffing and Risk Management'] },
                { heading: 'III. Analysis Phase', level: 1, content: 'Determining Requirements', bullets: ['Requirements Determination Techniques', 'Interviews and JAD', 'Use Case Analysis', 'Process Modeling (DFDs)', 'Data Modeling (ERDs)'] },
                { heading: 'IV. Design Phase', level: 1, content: 'Architecture and Interface', bullets: ['System Architecture Design', 'Hardware/Software Selection', 'User Interface Design Principles', 'Input and Output Design', 'Data Storage Design'] },
                { heading: 'V. Object-Oriented Analysis', level: 1, content: 'UML Standards', bullets: ['Unified Modeling Language', 'Class Diagrams', 'Sequence Diagrams', 'State Machine Diagrams', 'Activity Diagrams'] },
                { heading: 'VI. Implementation Phase', level: 1, content: 'Construction', bullets: ['Programming Practices', 'Testing Strategies (Unit, Integration, System, UAT)', 'Documentation (System vs User)', 'Migration Strategies'] },
                { heading: 'VII. Transition and Support', level: 1, content: 'Going Live', bullets: ['Change Management', 'User Training', 'Post-Implementation Audit', 'Help Desk Support'] },
                { heading: 'VIII. Emerging Trends', level: 1, content: 'Future of SAD', bullets: ['Agile Enriched Analysis', 'DevOps Integration', 'AI in Requirement Analysis', 'Low-Code/No-Code Platforms'] }
            ]
        },
        mindmap: {
            id: 'sa-mindmap', courseId: 'inf101', title: 'System Analysis: Full Course', date: 'Today', method: 'mindmap',
            center: 'System Analysis',
            branches: [
                {
                    title: 'The SDLC',
                    color: 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-100',
                    items: ['Planning', 'Analysis', 'Design', 'Implementation'],
                    // Note: Check MindMap renderer to support this deep nesting if not already
                },
                {
                    title: 'Methodologies',
                    color: 'bg-pink-100 dark:bg-pink-900/30 text-pink-800 dark:text-pink-100',
                    items: ['Waterfall', 'Agile (Scrum)', 'V-Model', 'Rapid App Dev (RAD)']
                },
                {
                    title: 'Modeling Tools',
                    color: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-100',
                    items: ['Data Flow (DFD)', 'Entity Rel. (ERD)', 'Use Cases', 'UML Diagrams']
                },
                {
                    title: 'Feasibility',
                    color: 'bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-100',
                    items: ['Economic (ROI)', 'Technical', 'Operational', 'Schedule', 'Legal']
                },
                {
                    title: 'Testing',
                    color: 'bg-cyan-100 dark:bg-cyan-900/30 text-cyan-800 dark:text-cyan-100',
                    items: ['Unit', 'Integration', 'System', 'Acceptance (Alpha/Beta)']
                },
                {
                    title: 'Deployment',
                    color: 'bg-rose-100 dark:bg-rose-900/30 text-rose-800 dark:text-rose-100',
                    items: ['Direct Cutover', 'Parallel', 'Pilot', 'Phased']
                }
            ]
        },
        charting: {
            id: 'sa-charting', courseId: 'inf101', title: 'System Analysis: Full Course', date: 'Today', method: 'charting',
            headers: ['Methodology', 'Description', 'Best For', 'Pros', 'Cons'],
            rows: [
                ['Waterfall', 'Linear, sequential', 'Construction, Hardware', 'Disciplined', 'Rigid, slow to change'],
                ['Agile', 'Iterative, incremental', 'Web, Startups', 'Flexible, fast feedback', 'Scope creep, documentation light'],
                ['V-Model', 'Extension of Waterfall', 'Safety-critical systems', 'High reliability', 'Very rigid'],
                ['RAD', 'Rapid Application Dev', 'Short timelines', 'Fast delivery', 'Requires skilled tooling'],
                ['Spiral', 'Risk-driven iterative', 'Large, risky projects', 'Risk reduction', 'Complex management'],
                ['Scrum', 'Empirical process control', 'Complex product dev', 'Transparency', 'Meeting heavy'],
                ['Kanban', 'Visual flow management', 'Maintenance, Support', 'Flow efficiency', 'No timeboxing'],
                ['XP (Extreme)', 'Technical excellence', 'Unstable requirements', 'Code quality', 'Developer burnout risk'],
                ['SaaS', 'Buy subscription', 'Standard functions', 'Fast, low cost', 'Integration issues'],
                ['Outsourcing', 'Contractor builds', 'Cost saving', 'Access to talent', 'IP risk, communication']
            ]
        },
        boxing: {
            id: 'sa-boxing', courseId: 'inf101', title: 'System Analysis: Full Course', date: 'Today', method: 'boxing',
            boxes: [
                { title: 'The Analyst', color: 'border-blue-500 bg-blue-50 dark:bg-blue-900/10', items: ['Change Agent', 'Problem Solver', 'Communicator', 'Ethical Leader'] },
                { title: 'Information Gathering', color: 'border-green-500 bg-green-50 dark:bg-green-900/10', items: ['Interviewing', 'Questionnaires', 'Document Analysis', 'Observation', 'JAD Sessions'] },
                { title: 'Process Modeling', color: 'border-purple-500 bg-purple-50 dark:bg-purple-900/10', items: ['Gane & Sarson', 'DeMarco & Yourdon', 'Context Diagrams', 'Balancing DFDs'] },
                { title: 'Data Modeling', color: 'border-orange-500 bg-orange-50 dark:bg-orange-900/10', items: ['Conceptual', 'Logical', 'Physical', 'Normalization', 'Cardinality'] },
                { title: 'Architecture', color: 'border-red-500 bg-red-50 dark:bg-red-900/10', items: ['Client-Server', 'Three-Tier', 'Fat Client', 'Thin Client', 'Virtualization'] },
                { title: 'User Interface', color: 'border-teal-500 bg-teal-50 dark:bg-teal-900/10', items: ['Layout', 'Content Awareness', 'Aesthetics', 'User Experience', 'Consistency'] },
                { title: 'Construction', color: 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/10', items: ['Coding Standards', 'Source Control (Git)', 'Code Reviews', 'Refactoring'] },
                { title: 'Migration', color: 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/10', items: ['Data Conversion', 'Training Plan', 'Resistance Management', 'Post-Review'] }
            ]
        },
        zettelkasten: {
            id: 'sa-zettelkasten', courseId: 'inf101', title: 'System Analysis: Complete', date: 'Today', method: 'zettelkasten',
            notes: [
                { id: 'z1', title: 'Systems Definition', content: 'Complex whole of interacting parts.', links: ['z2', 'z3'], tags: ['definition'] },
                { id: 'z2', title: 'Boundary & Environment', content: 'What distinguishes the system from the rest of the universe.', links: ['z1'], tags: ['concept'] },
                { id: 'z3', title: 'Entropy', content: 'Systems decay without energy input (maintenance).', links: ['z1'], tags: ['thermodynamics'] },
                { id: 'z4', title: 'SDLC', content: 'Structuring the process of building systems to reduce chaos.', links: ['z5', 'z6'], tags: ['framework'] },
                { id: 'z5', title: 'Waterfall', content: 'Sequential SDLC. Good for physical engineering, bad for software.', links: ['z4', 'z6'], tags: ['methodology'] },
                { id: 'z6', title: 'Agile', content: 'Iterative SDLC. Embraces change. Scrum is most popular.', links: ['z4', 'z5'], tags: ['methodology'] },
                { id: 'z7', title: 'Analyst Role', content: 'Bridge between Business and Tech.', links: ['z8'], tags: ['career'] },
                { id: 'z8', title: 'Skills Gap', content: 'Analysts often lack soft skills, technically proficient but poor communicators.', links: ['z7'], tags: ['hiring'] },
                { id: 'z9', title: 'Requirement Creep', content: 'New features added during dev. Kills projects.', links: ['z10'], tags: ['risk'] },
                { id: 'z10', title: 'Scope Freeze', content: 'Point where no new changes are allowed. Hard to enforce.', links: ['z9'], tags: ['management'] }
            ]
        },
        feynman: {
            id: 'sa-feynman', courseId: 'inf101', title: 'System Analysis: Complete', date: 'Today', method: 'feynman',
            concept: 'The Systems Development Life Cycle (SDLC)',
            simpleExplanation: 'Building software is like building a skyscraper. You don\'t just start pouring concrete. First, you interview the tenants (Analysis), then you draw detailed blueprints (Design), then you construct it floor by floor (Implementation), and finally you hire a janitor to fix things (Maintenance). If you skip the blueprints, the building collapses.',
            analogy: 'Construction Project',
            refinedExplanation: 'The SDLC is a conceptual model used in project management that describes the stages involved in an information system development project, from an initial feasibility study through maintenance of the completed application. It ensures quality and predictability.',
            gaps: ['Need to better explain DevSecOps integration', 'Clarify "Logical" vs "Physical" designs']
        },
        flowchart: {
            id: 'sa-flowchart', courseId: 'inf101', title: 'System Analysis: Complete', date: 'Today', method: 'flowchart',
            nodes: [
                { id: '1', type: 'start', text: 'Project Request', connections: ['2'] },
                { id: '2', type: 'decision', text: 'Feasibility Study?', connections: ['3', '4'] },
                { id: '3', type: 'process', text: 'Reject Request', connections: ['10'] },
                { id: '4', type: 'process', text: 'Analyze Reqs', connections: ['5'] },
                { id: '5', type: 'process', text: 'Design Arch', connections: ['6'] },
                { id: '6', type: 'decision', text: 'Buy or Build?', connections: ['7', '8'] },
                { id: '7', type: 'process', text: 'Purchase SaaS', connections: ['9'] },
                { id: '8', type: 'process', text: 'Develop Custom', connections: ['9'] },
                { id: '9', type: 'process', text: 'Test & Deploy', connections: ['10'] },
                { id: '10', type: 'end', text: 'Maintenance', connections: [] }
            ]
        },
        sentence: {
            id: 'sa-sentence', courseId: 'inf101', title: 'System Analysis: Complete', date: 'Today', method: 'sentence',
            sections: [
                { content: 'System analysis is the process of studying a procedure or business to identify its goals and purposes and create systems and procedures that will efficiently achieve them.' },
                { content: 'Analysis specifies WHAT the system should do.' },
                { content: 'Design specifies HOW the system should do it.' },
                { content: 'The systems analyst plays a key role as the interlocutor between the business users and technical developers.' },
                { content: 'A feasibility study determines if a project is worth doing from technical, economic, and organizational perspectives.' },
                { content: 'Requirement gathering is the most critical phase; errors here cost 100x more to fix later.' },
                { content: 'Data Flow Diagrams (DFD) model the movement of data through a system.' },
                { content: 'Entity Relationship Diagrams (ERD) model the data storage structure.' },
                { content: 'Agile methodologies prioritize iteration and feedback over rigid planning.' },
                { content: 'Testing must occur at multiple levels: Unit, Integration, System, and Acceptance.' },
                { content: 'Conversion strategies include Direct, Parallel, Pilot, and Phased approaches.' },
                { content: 'Maintenance accounts for 60-80% of total lifecycle costs.' },
                { content: 'A "Project Champion" is a high-level executive who supports the project.' },
                { content: 'Scope creep is the uncontrolled expansion of project boundaries.' },
                { content: 'Documentation is essential for long-term maintainability.' }
            ]
        },
        sketchnote: {
            id: 'sa-sketchnote', courseId: 'inf101', title: 'System Analysis: Complete', date: 'Today', method: 'sketchnote',
            sketchSections: [
                { icon: '🗺️', title: 'Planning', content: 'The Roadmap. Why are we doing this?', doodles: ['map', 'compass'] },
                { icon: '🕵️', title: 'Analysis', content: 'The Detective Work. Gathering clues (requirements).', doodles: ['magnifier', 'footprint'] },
                { icon: '🏗️', title: 'Design', content: 'The Blueprint. Architecting the solution.', doodles: ['ruler', 'blueprint'] },
                { icon: '🧱', title: 'Build', content: 'Construction. Coding and testing.', doodles: ['brick', 'hammer'] },
                { icon: '🧹', title: 'Maintain', content: 'Keeping it running. Fixing bugs.', doodles: ['broom', 'bandage'] }
            ]
        }
    },

    // KEEPING OTHER TOPICS (Shortened for brevity but valid)
    'dbms': {
        id: 'dbms', title: 'Database Management Systems', courseId: 'inf201',
        description: 'Normalization, SQL, ACID Properties.',
        lastAccessed: 'Yesterday',
        cornell: { id: 'dbms-c', courseId: 'inf201', title: 'DBMS', date: 'Today', method: 'cornell', cues: [], summary: 'DB Basics' },
        outline: { id: 'dbms-o', courseId: 'inf201', title: 'DBMS', date: 'Today', method: 'outline', sections: [] },
        mindmap: { id: 'dbms-m', courseId: 'inf201', title: 'DBMS', date: 'Today', method: 'mindmap', center: 'DBMS', branches: [] },
        charting: { id: 'dbms-ch', courseId: 'inf201', title: 'DBMS', date: 'Today', method: 'charting', headers: [], rows: [] },
        boxing: { id: 'dbms-b', courseId: 'inf201', title: 'DBMS', date: 'Today', method: 'boxing', boxes: [] },
        zettelkasten: { id: 'dbms-z', courseId: 'inf201', title: 'DBMS', date: 'Today', method: 'zettelkasten', notes: [] },
        feynman: { id: 'dbms-f', courseId: 'inf201', title: 'DBMS', date: 'Today', method: 'feynman', concept: 'SQL', simpleExplanation: 'Data language' },
        flowchart: { id: 'dbms-fl', courseId: 'inf201', title: 'DBMS', date: 'Today', method: 'flowchart', nodes: [] },
        sentence: { id: 'dbms-s', courseId: 'inf201', title: 'DBMS', date: 'Today', method: 'sentence', sections: [] },
        sketchnote: { id: 'dbms-sk', courseId: 'inf201', title: 'DBMS', date: 'Today', method: 'sketchnote', sketchSections: [] }
    },
    // ... (Repeat for others simply to valid errors, real implementation would fill them)
    'networking': {
        id: 'networking', title: 'Networking & Cloud', courseId: 'inf301', description: 'TCP/IP, OSI, AWS.', lastAccessed: 'Today',
        cornell: { id: 'n-c', courseId: 'inf301', title: 'Net', date: 'Today', method: 'cornell', cues: [], summary: 'Net' },
        outline: { id: 'n-o', courseId: 'inf301', title: 'Net', date: 'Today', method: 'outline', sections: [] },
        mindmap: { id: 'n-m', courseId: 'inf301', title: 'Net', date: 'Today', method: 'mindmap', center: 'Net', branches: [] },
        charting: { id: 'n-ch', courseId: 'inf301', title: 'Net', date: 'Today', method: 'charting', headers: [], rows: [] },
        boxing: { id: 'n-b', courseId: 'inf301', title: 'Net', date: 'Today', method: 'boxing', boxes: [] },
        zettelkasten: { id: 'n-z', courseId: 'inf301', title: 'Net', date: 'Today', method: 'zettelkasten', notes: [] },
        feynman: { id: 'n-f', courseId: 'inf301', title: 'Net', date: 'Today', method: 'feynman', concept: 'Net', simpleExplanation: 'Net' },
        flowchart: { id: 'n-fl', courseId: 'inf301', title: 'Net', date: 'Today', method: 'flowchart', nodes: [] },
        sentence: { id: 'n-s', courseId: 'inf301', title: 'Net', date: 'Today', method: 'sentence', sections: [] },
        sketchnote: { id: 'n-sk', courseId: 'inf301', title: 'Net', date: 'Today', method: 'sketchnote', sketchSections: [] }
    },
    'security': {
        id: 'security', title: 'Cybersecurity', courseId: 'inf401', description: 'Defense, Encryption.', lastAccessed: 'Today',
        cornell: { id: 's-c', courseId: 'inf401', title: 'Sec', date: 'Today', method: 'cornell', cues: [], summary: 'Sec' },
        outline: { id: 's-o', courseId: 'inf401', title: 'Sec', date: 'Today', method: 'outline', sections: [] },
        mindmap: { id: 's-m', courseId: 'inf401', title: 'Sec', date: 'Today', method: 'mindmap', center: 'Sec', branches: [] },
        charting: { id: 's-ch', courseId: 'inf401', title: 'Sec', date: 'Today', method: 'charting', headers: [], rows: [] },
        boxing: { id: 's-b', courseId: 'inf401', title: 'Sec', date: 'Today', method: 'boxing', boxes: [] },
        zettelkasten: { id: 's-z', courseId: 'inf401', title: 'Sec', date: 'Today', method: 'zettelkasten', notes: [] },
        feynman: { id: 's-f', courseId: 'inf401', title: 'Sec', date: 'Today', method: 'feynman', concept: 'Sec', simpleExplanation: 'Sec' },
        flowchart: { id: 's-fl', courseId: 'inf401', title: 'Sec', date: 'Today', method: 'flowchart', nodes: [] },
        sentence: { id: 's-s', courseId: 'inf401', title: 'Sec', date: 'Today', method: 'sentence', sections: [] },
        sketchnote: { id: 's-sk', courseId: 'inf401', title: 'Sec', date: 'Today', method: 'sketchnote', sketchSections: [] }
    }
};

// Auto-fill helpers to ensure no crash on missing fields
Object.values(mockTopics).forEach(topic => {
    if (!topic.outline.sections) topic.outline = { ...topic.outline, sections: [{ heading: 'Loading...', level: 1, content: '...', bullets: [] }] };
    if (!topic.mindmap.branches) topic.mindmap = { ...topic.mindmap, center: topic.title, branches: [{ title: 'Main', color: 'bg-gray-100', items: [] }] };
    if (!topic.charting.rows) topic.charting = { ...topic.charting, headers: ['A', 'B'], rows: [['1', '2']] };
    if (!topic.boxing.boxes) topic.boxing = { ...topic.boxing, boxes: [{ title: 'Overview', color: 'bg-gray-100', items: ['...'] }] };
    if (!topic.zettelkasten.notes) topic.zettelkasten = { ...topic.zettelkasten, notes: [{ id: '1', title: 'Note', content: '...', links: [], tags: [] }] };
    if (!topic.flowchart.nodes) topic.flowchart = { ...topic.flowchart, nodes: [{ id: '1', type: 'start', text: 'Start', connections: [] }] };
    if (!topic.feynman.concept) topic.feynman = { ...topic.feynman, concept: topic.title, simpleExplanation: '...' };
    if (!topic.sentence.sections) topic.sentence = { ...topic.sentence, sections: [{ content: '...' }] };
    if (!topic.sketchnote.sketchSections) topic.sketchnote = { ...topic.sketchnote, sketchSections: [{ icon: '?', title: '...', content: '', doodles: [] }] };
});
