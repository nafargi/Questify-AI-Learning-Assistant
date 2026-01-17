export interface NoteContent {
    id: string;
    courseId: string;
    title: string;
    date: string;
    method: 'cornell' | 'outline' | 'mindmap' | 'boxing' | 'charting' | 'zettelkasten' | 'feynman' | 'flowchart' | 'sentence' | 'sketchnote';
    // Cornell
    cues?: { keyword: string; content: string }[];
    summary?: string;
    // Outline / Sentence
    sections?: {
        heading?: string;
        level?: 1 | 2 | 3;
        content?: string;
        bullets?: string[];
    }[]; // Also used for Sentence method (as flat list)
    // Mind Map
    center?: string;
    branches?: {
        title: string;
        items: string[];
        color: string;
        subBranches?: { title: string; items: string[] }[] // Added depth
    }[];
    // Boxing
    boxes?: {
        title: string;
        color: string;
        items: string[];
        notes?: string;
    }[];
    // Charting
    headers?: string[];
    rows?: string[][];
    // Zettelkasten
    notes?: {
        id: string;
        title: string;
        content: string;
        links: string[];
        tags: string[]
    }[];
    // Feynman
    concept?: string;
    simpleExplanation?: string;
    gaps?: string[];
    refinedExplanation?: string;
    analogy?: string; // Added analogy
    // Flowchart
    nodes?: {
        id: string;
        type: 'start' | 'process' | 'decision' | 'end';
        text: string;
        connections: string[];
        x?: number; // Optional positioning hints if needed, but we'll try auto-layout or CSS grid
        y?: number;
    }[];
    // Sketch Note (simplified representation for UI)
    sketchSections?: {
        icon: string;
        title: string;
        content: string;
        doodles?: string[]; // E.g., 'arrow', 'star' to denote visuals
    }[];
}

export const mockDeepNotes: Record<string, NoteContent> = {
    // 1. Cornell
    'cornell-demo': {
        id: 'cornell-1',
        courseId: 'cs101',
        title: 'Introduction to System Analysis',
        date: 'Oct 12, 2025',
        method: 'cornell',
        cues: [
            { keyword: 'System Definition', content: 'A system is a set of interacting or interdependent component parts forming a complex/intricate whole. In computing, this often refers to hardware, software, and data working together.' },
            { keyword: 'SDLC Phases', content: 'The Systems Development Life Cycle (SDLC) consists of: \n1. Planning\n2. Analysis\n3. Design\n4. Implementation\n5. Maintenance\n\nEach phase produces deliverables required for the next.' },
            { keyword: 'Role of Analyst', content: 'The System Analyst bridges the gap between business requirements and technology solutions. They must understand both specific user needs and the technical limitations of the architecture.' },
            { keyword: 'Feasibility', content: 'Three key types of feasibility analysis:\n- Technical: Can we build it?\n- Economic: Should we build it (ROI)?\n- Organizational: Will they use it?' }
        ],
        summary: 'System Analysis is the fundamental process of understanding business needs and translating them into technical specifications. The SDLC provides the rigid framework for this process, while the Analyst acts as the critical translator between stakeholders and developers.'
    },

    // 2. Outline
    'outline-demo': {
        id: 'outline-1',
        courseId: 'bus101',
        title: 'Market Structure & Competition',
        date: 'Nov 05, 2025',
        method: 'outline',
        sections: [
            { heading: 'I. Perfect Competition', level: 1, content: 'A theoretical market structure characterized by a complete absence of rivalry among the individual firms.', bullets: ['Infinite buyers/sellers', 'Zero barriers', 'Perfect information', 'Homogeneous products'] },
            { heading: 'A. Implications for Pricing', level: 2, content: 'Firms are "price takers".', bullets: ['MR = P', 'Profit max at MR = MC'] },
            { heading: 'II. Monopoly', level: 1, content: 'A market structure characterized by a single seller.', bullets: ['Single seller', 'High barriers', 'Price maker'] },
            { heading: 'A. Social Cost', level: 2, content: 'Leads to deadweight loss.', bullets: [] }
        ]
    },

    // 3. Mind Map
    'mindmap-demo': {
        id: 'mindmap-1',
        courseId: 'cs101',
        title: 'Database Normalization',
        date: 'Dec 01, 2025',
        method: 'mindmap',
        center: 'Start Normalization',
        branches: [
            {
                title: '1NF',
                color: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-100',
                items: ['Atomic Values', 'No Repeating Groups', 'Unique Columns'],
                subBranches: []
            },
            {
                title: '2NF',
                color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-100',
                items: ['Must be in 1NF', 'No Partial Dependency'],
                subBranches: [
                    { title: 'Composite Key', items: ['All non-key attributes dependent on full key'] }
                ]
            },
            {
                title: '3NF',
                color: 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-100',
                items: ['Must be in 2NF', 'No Transitive Dependency'],
                subBranches: [
                    { title: 'Transitive', items: ['Non-key depends on another non-key'] }
                ]
            },
            {
                title: 'BCNF',
                color: 'bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-100',
                items: ['Stricter 3NF', 'Every determinant is a candidate key'],
                subBranches: []
            }
        ]
    },

    // 4. Charting
    'charting-demo': {
        id: 'charting-1',
        courseId: 'hist101',
        title: 'Comparison of Agile vs Waterfall',
        date: 'Dec 10, 2025',
        method: 'charting',
        headers: ['Feature', 'Waterfall Model', 'Agile Methodology'],
        rows: [
            ['Structure', 'Linear, Sequential', 'Iterative, Cyclic'],
            ['Flexibility', 'Rigid, hard to change', 'High, welcomes change'],
            ['Customer Involvement', 'Low (only at start/end)', 'High (continuous feedback)'],
            ['Delivery', 'Single "Big Bang" release', 'Frequent increments / Sprints'],
            ['Risk', 'High (late discovery of issues)', 'Low (early failure/adaption)']
        ]
    },

    // 5. Boxing
    'boxing-demo': {
        id: 'boxing-1',
        courseId: 'bio101',
        title: 'Eukaryotic Cell Components',
        date: 'Jan 05, 2026',
        method: 'boxing',
        boxes: [
            { title: 'Nucleus', color: 'border-purple-500 bg-purple-50 dark:bg-purple-950/20', items: ['Contains DNA', 'Controls cell activity', 'Nuclear envelope'] },
            { title: 'Mitochondria', color: 'border-red-500 bg-red-50 dark:bg-red-950/20', items: ['Powerhouse of cell', 'ATP production', 'Double membrane', 'Has own DNA'] },
            { title: 'Endoplasmic Reticulum', color: 'border-blue-500 bg-blue-50 dark:bg-blue-950/20', items: ['Rough ER: Protein synthesis', 'Smooth ER: Lipid synthesis', 'Transport network'] },
            { title: 'Golgi Apparatus', color: 'border-orange-500 bg-orange-50 dark:bg-orange-950/20', items: ['Modifies proteins', 'Packaging center', 'Creates vesicles'] },
            { title: 'Lysosomes', color: 'border-green-500 bg-green-50 dark:bg-green-950/20', items: ['Digestive enzymes', 'Waste disposal', 'Apoptosis'] }
        ]
    },

    // 6. Zettelkasten
    'zettelkasten-demo': {
        id: 'zettelkasten-1',
        courseId: 'cs101',
        title: 'Network Topologies',
        date: 'Jan 08, 2026',
        method: 'zettelkasten',
        notes: [
            { id: '1', title: 'Network Topology Definition', content: 'The physical or logical arrangement of links and nodes in a network.', links: ['2', '3', '4'], tags: ['networking', 'basics'] },
            { id: '2', title: 'Star Topology', content: 'All nodes connects to a central hub. Failure of one node doesn\'t affect others. Hub failure kills network.', links: ['1', '5'], tags: ['topology', 'star'] },
            { id: '3', title: 'Mesh Topology', content: 'Every node connects to every other node. Highest redundancy and cost. No single point of failure.', links: ['1', '2'], tags: ['topology', 'mesh', 'redundancy'] },
            { id: '4', title: 'Bus Topology', content: 'Single central cable (backbone). Easy to install, but cable break stops entire network.', links: ['1'], tags: ['topology', 'bus'] },
            { id: '5', title: 'Central Point of Failure', content: 'A critical component whose failure causes the entire system to stop working. Common in Star topology (the Hub).', links: ['2'], tags: ['risk', 'reliability'] }
        ]
    },

    // 7. Feynman
    'feynman-demo': {
        id: 'feynman-1',
        courseId: 'math201',
        title: 'Understanding APIs',
        date: 'Jan 12, 2026',
        method: 'feynman',
        concept: 'Application Programming Interface (API)',
        simpleExplanation: 'Think of an API like a waiter in a restaurant. You (the user) are looking at the menu (interface) and want a specific dish (data/action). You can\'t go into the kitchen (server/database) and cook it yourself. The waiter allows you to request what you want, takes the order to the kitchen, and brings you back the food, without you needing to know how the stove works.',
        analogy: 'Waiter in a Restaurant',
        gaps: ['Need to explain REST vs SOAP roughly', 'Authentication part is missing in analogy'],
        refinedExplanation: 'An API is a set of rules that allows different software entities to talk to each other. It acts as an intermediary layer that processes requests and ensures that only authorized/valid commands reach the core system, returning the requested data in a standardized format.'
    },

    // 8. Flowchart
    'flowchart-demo': {
        id: 'flowchart-1',
        courseId: 'cs101',
        title: 'User Login Authentication Process',
        date: 'Jan 13, 2026',
        method: 'flowchart',
        nodes: [
            { id: '1', type: 'start', text: 'User Enters Credentials', connections: ['2'] },
            { id: '2', type: 'decision', text: 'Input Valid format?', connections: ['3', '4'] },
            { id: '3', type: 'process', text: 'Show Format Error', connections: ['1'] },
            { id: '4', type: 'process', text: 'Query Database', connections: ['5'] },
            { id: '5', type: 'decision', text: 'Match Found?', connections: ['6', '7'] },
            { id: '6', type: 'process', text: 'Generate Session Token', connections: ['8'] },
            { id: '7', type: 'process', text: 'Increment Failure Count', connections: ['9'] },
            { id: '8', type: 'end', text: 'Login Success', connections: [] },
            { id: '9', type: 'end', text: 'Login Failed', connections: [] }
        ]
    },

    // 9. Sentence
    'sentence-demo': {
        id: 'sentence-1',
        courseId: 'hist101',
        title: 'Causes of WWI',
        date: 'Jan 14, 2026',
        method: 'sentence',
        sections: [
            { content: '1. The assassination of Archduke Franz Ferdinand was the immediate spark that triggered the war.' },
            { content: '2. The complex web of alliances (Triple Alliance vs Triple Entente) pulled nations into conflict sequentially.' },
            { content: '3. Imperialism created tension as European powers competed for colonies in Africa and Asia.' },
            { content: '4. Nationalism fueled the desire for self-determination, particularly in the Balkans ("Powder Keg of Europe").' },
            { content: '5. Militarism led to an arms race, with countries expanding their armies and navies significantly before 1914.' }
        ]
    },

    // 10. Sketchnote
    'sketchnote-demo': {
        id: 'sketchnote-1',
        courseId: 'bus101',
        title: 'The 4 Ps of Marketing',
        date: 'Jan 15, 2026',
        method: 'sketchnote',
        sketchSections: [
            { icon: '📦', title: 'Product', content: 'What are you selling? Features, Quality, Branding, Packaging.', doodles: ['box', 'star'] },
            { icon: '💲', title: 'Price', content: 'Strategy (Skimming vs Penetration), Discounts, Payment terms.', doodles: ['tag', 'coin'] },
            { icon: '📍', title: 'Place', content: 'Distribution channels, Coverage, Logistics, Locations.', doodles: ['map', 'truck'] },
            { icon: '📢', title: 'Promotion', content: 'Advertising, PR, Sales Force, Direct Marketing.', doodles: ['megaphone', 'bulb'] }
        ]
    }
};
