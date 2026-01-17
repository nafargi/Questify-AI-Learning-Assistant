import { ChapterStructure } from "@/components/study/ChapterContent";

export const MOCK_CHAPTERS: Record<string, ChapterStructure> = {
    "Variables and Data Types": {
        introduction: "In the realm of computer science, variables and data types form the foundational bedrock upon which all software architecture is constructed. A variable, in its simplest form, is a symbolic name for a memory location where data can be stored and later retrieved. However, to truly understand variables, one must delve into the low-level mechanics of memory allocation, the stack vs. heap distinction, and the type systems that govern how data is interpreted by the Central Processing Unit (CPU). This chapter provides an exhaustive exploration of these concepts, starting from the binary representation of data to the higher-level abstractions provided by modern programming languages like Python, Java, and C++. We will examine how different data types occupy different amounts of space in memory and why choosing the correct type is essential for both performance optimization and logical correctness. By the end of this chapter, students will have a profound understanding of how integers, floating-point numbers, characters, and booleans are managed by the operating system and the hardware.",
        learningObjectives: [
            "Understand the relationship between variables and physical memory addresses",
            "Differentiate between primitive and reference data types",
            "Explain the precision limitations of floating-point arithmetic",
            "Analyze memory allocation patterns for different variable scopes",
            "Master the use of strongly-typed vs. weakly-typed variables in various languages"
        ],
        sections: [
            {
                title: "The Architecture of Memory and Variables",
                content: "When a programmer declares a variable, the runtime environment (whether it's the JVM, Python interpreter, or a compiled binary) requests a specific number of bytes from the system memory. For example, a 32-bit integer typically requires four bytes. The variable name acts as an alias for the starting address of this block. This process is governed by the 'symbol table', a data structure used by compilers and interpreters to keep track of variable names and their corresponding memory locations. This section explores the 'Von Neumann architecture' and how it fundamentally shapes our approach to variable storage. We will also discuss 'endianness'—the order in which bytes are stored—and how it affects low-level data manipulation.",
                subsections: [
                    {
                        title: "Stack vs. Heap Allocation",
                        content: "Variables are generally stored in one of two regions: the stack or the heap. The stack is a region of memory that stores temporary variables created by each function (including the main function). It is a 'LIFO' (Last In, First Out) structure managed automatically by the CPU. In contrast, the heap is a larger pool of memory used for dynamic allocation, where variables are stored and stay until they are explicitly deallocated or removed by a garbage collector. Understanding the stack/heap divide is critical for avoiding memory leaks and stack overflow errors."
                    },
                    {
                        title: "Variable Scoping and Lifetime",
                        content: "The lifetime of a variable refers to the duration it exists in memory. A variable's 'scope' defines the region of code where it is accessible. Local variables, declared within a block or function, exist only while that block is executing. Global variables, on the other hand, persist throughout the entire execution of the program. Modern languages also introduce 'block scope' (e.g., using 'let' and 'const' in JavaScript), providing finer control over resource management and reducing the risk of name collisions."
                    }
                ],
                keyConcepts: ["Memory Address", "Symbol Table", "Stack Overflow", "Heap Fragmentation"],
                exampleBox: {
                    title: "Pointer Arithmetic in C",
                    content: "In low-level languages like C, you can directly manipulate the memory address of a variable using pointers. This allows for extremely high-performance data structures but introduces risks like buffer overflows."
                }
            },
            {
                title: "Numerical Data Types: Precision and Limits",
                content: "Integers and floating-point numbers are the primary tools for mathematical computation. However, computer hardware cannot represent infinite precision. An integer has a fixed range depending on its bit-depth; for instance, a signed 16-bit integer can only represent values from -32,768 to 32,767. If you exceed this range, you encounter an 'overflow' error. Floating-point numbers, represented using the IEEE 754 standard, use a mantissa and an exponent to cover a vast range of values at the cost of precision. This section breaks down the binary representation of these numbers and the catastrophic 'round-off' errors that can occur in financial and scientific applications.",
                subsections: [
                    {
                        title: "IEEE 754 Floating Point Standard",
                        content: "The IEEE 754 standard defines how computers store decimals. It uses one bit for the sign, a set of bits for the exponent, and the remaining for the significand (fractional part). Because many decimal numbers cannot be perfectly represented in binary (like 0.1), calculations can sometimes yield unexpected results, such as 0.1 + 0.2 equaling 0.30000000000000004."
                    },
                    {
                        title: "Unsigned vs. Signed Integers",
                        content: "Signed integers use the 'most significant bit' (MSB) as a sign bit (0 for positive, 1 for negative), typically using Two's Complement notation. Unsigned integers use the MSB as part of the magnitude, effectively doubling the positive range but losing the ability to represent negative values. Choosing between them is a critical optimization step in embedded systems and network protocols."
                    }
                ],
                keyConcepts: ["Two's Complement", "Mantissa", "Precision Loss", "Arithmetic Overflow"],
                exampleBox: {
                    title: "The Ariane 5 Disaster",
                    content: "In 1996, the Ariane 5 rocket exploded 40 seconds after launch due to an integer overflow error. A 64-bit floating point number was converted to a 16-bit signed integer, causing the system to crash."
                }
            },
            {
                title: "Characters, Strings, and Encoding",
                content: "Text in a computer is just another form of numerical data. In the early days, ASCII was the standard, using 7 bits to represent 128 characters. As computing became global, Unicode and then UTF-8 were developed to represent every character in every known language. This section examines how 'strings'—sequences of characters—are stored as arrays and the importance of choosing the right encoding to avoid 'mojibake' (garbled text).",
                subsections: [
                    {
                        title: "UTF-8 vs. UTF-16",
                        content: "UTF-8 is variable-length, using 1 to 4 bytes per character, making it backwards compatible with ASCII and extremely efficient for English text. UTF-16 always uses at least 2 bytes, which can be less efficient for web content but is common in Windows and Java internals."
                    },
                    {
                        title: "Immutable vs. Mutable Strings",
                        content: "In many modern languages like Java and Python, strings are 'immutable'. This means once a string variable is created, its value cannot be changed. Any 'modification' actually creates a new string in memory. While this improves thread safety and allows for string interning, it can lead to performance issues if not handled carefully (e.g., in large loops)."
                    }
                ],
                keyConcepts: ["ASCII", "Unicode", "Encoding", "Immutability"],
                exampleBox: {
                    title: "String Interning",
                    content: "Languages like Java use a 'string pool' to store only one copy of each unique string literal, saving memory when the same string is used repeatedly."
                }
            }
        ],
        caseStudy: {
            title: "Optimization in Game Engines",
            content: "In modern game engines like Unreal or Unity, the choice of data types for player positions and physics can significantly impact performance. We look at how engines use 'half-precision' floats (16-bit) for distant objects while maintaining 'double-precision' (64-bit) for larger world coordinates to avoid jittering.",
            discussionQuestions: [
                "Why would a game developer prefer 32-bit floats over 64-bit doubles for real-time physics?",
                "What happens to a character's position far from the map's origin due to floating-point precision constraints?",
                "How can 'type aliasing' help in making game code more readable and maintainable?"
            ]
        },
        summary: "Variables and data types are the linguistic elements of programming. Understanding the underlying memory mechanics—from bit-level representation to stack/heap allocation—empowers developers to write efficient, bug-free, and scalable code. Choosing the correct type isn't just about saving bits; it's about defining the logical boundaries of your data and ensuring the hardware interprets your intentions correctly.",
        practiceProblems: [
            "Convert the decimal number 25 into 8-bit binary using Two's Complement.",
            "Explain the output of '0.1 + 0.2 === 0.3' in JavaScript and why it happens.",
            "Draw a memory map for a function call with three local variables (int, float, char).",
            "Why is a 'NullPointerException' common with reference types but impossible with primitives?",
            "Research and explain the difference between 'Deep Copy' and 'Shallow Copy' for complex data types."
        ]
    },
    "Network Protocols": {
        introduction: "In the modern interconnected world, network protocols serve as the universal language that allows disparate computing systems to communicate. From the moment you type a URL into a browser to the instant a video begins streaming, thousands of protocol-governed packets are exchanged across global infrastructures. This chapter provides a deep, technical dive into the standard models of networking—OSI and TCP/IP—and examines the specific protocols that power the web, including HTTP/3, DNS, and TLS. We will explore the request-response cycle, the mechanics of packet switching, and the critical role of error-correction algorithms in maintaining reliable communication over unreliable physical links. This is not just a study of technology, but a study of the consensus-driven standards that have made the global internet possible.",
        learningObjectives: [
            "Deconstruct the 7 layers of the OSI model and their respective responsibilities",
            "Explain the three-way handshake and 'reliable delivery' in TCP",
            "Analyze the DNS resolution process from recursive resolver up to authoritative servers",
            "Differentiate between stateful and stateless protocols",
            "Compare the performance characteristics of TCP vs. UDP in high-latency environments"
        ],
        sections: [
            {
                title: "The OSI Reference Model vs. TCP/IP",
                content: "To manage the immense complexity of networking, systems are organized into 'layers'. The Open Systems Interconnection (OSI) model provides a seven-layer theoretical framework, while the TCP/IP model provides a four-layer practical implementation used by the actual internet. Each layer provides a service to the layer above it and expects a service from the layer below. As data moves down the stack, it is wrapped in 'headers'—a process known as encapsulation. This section breaks down each layer, from the Physical layer (bits on a wire) to the Application layer (the data you see in your browser).",
                subsections: [
                    {
                        title: "Encapsulation and Decapsulation",
                        content: "Encapsulation is the process where each layer adds its own control information (headers) to the data received from the layer above. For instance, the Transport layer adds a segment header, the Network layer adds an IP header, and the Data Link layer adds an Ethernet frame. On the receiving end, decapsulation happens in reverse, stripping the headers as the data moves up the stack."
                    },
                    {
                        title: "Protocol Data Units (PDUs)",
                        content: "Each layer has its own name for the data it handles. At the Transport layer, it's a 'Segment' or 'Datagram'. At the Network layer, it's a 'Packet'. At the Data Link layer, it's a 'Frame'. Understanding these terms is essential for troubleshooting and communicating in professional network engineering environments."
                    }
                ],
                keyConcepts: ["Abstraction Layers", "Encapsulation", "Logical Addressing", "Interoperability"],
                exampleBox: {
                    title: "The Layer 8 Problem",
                    content: "In networking slang, 'Layer 8' refers to the 'User' layer. Most network issues that aren't technical are often traced back to human error or misconfiguration."
                }
            },
            {
                title: "Transport Layer Protocols: Reliability vs. Speed",
                content: "At the heart of the internet are two primary transport protocols: Transmission Control Protocol (TCP) and User Datagram Protocol (UDP). TCP is a connection-oriented protocol that guarantees delivery, ordering, and error-checking. It is used for applications like web browsing and email where data integrity is paramount. UDP, in contrast, is connectionless and prioritizes speed over reliability, making it ideal for live video, gaming, and VoIP. This section analyzes the TCP 'three-way handshake' and why its overhead can be both a blessing and a curse.",
                subsections: [
                    {
                        title: "The TCP Three-Way Handshake",
                        content: "Before data can be sent, TCP must establish a session. This involves three steps: 1) SYN (synchronize), where the client requests a connection; 2) SYN-ACK (acknowledge), where the server responds; and 3) ACK, where the client confirms. This ensures both sides are ready and in sync. However, this 'round trip' adds latency, which is why newer versions of HTTP aim to minimize or combine these steps."
                    },
                    {
                        title: "Flow Control and Congestion Avoidance",
                        content: "TCP doesn't just send data blindly; it monitors the state of the network. Through 'sliding windows' and algorithms like 'Slow Start', TCP adjusts its rate to avoid overwhelming the receiver or the intermediate routers. If a packet is lost, TCP assumes congestion and immediately reduces its throughput, ensuring the network remains stable under heavy load."
                    }
                ],
                keyConcepts: ["Sequence Numbers", "Checksums", "Sliding Windows", "Jitter"],
                exampleBox: {
                    title: "QUIC and HTTP/3",
                    content: "HTTP/3 is built on top of QUIC, a new protocol that uses UDP to provide TCP-like reliability with much lower latency, especially on lossy mobile networks."
                }
            },
            {
                title: "Application Layer: DNS and The Modern Web",
                content: "The Application layer is where user interaction happens. Protocols like HTTP (Hypertext Transfer Protocol) and DNS (Domain Name System) translate human intentions into machine-readable requests. DNS, often called the 'phonebook of the internet', translates easy-to-remember names like 'google.com' into numerical IP addresses. This section explores the hierarchical nature of DNS and the request-response journey of a typical web page load.",
                subsections: [
                    {
                        title: "DNS Query Lifecycle",
                        content: "When you request a domain, your computer first checks its local cache. If not found, it asks a recursive resolver (usually provided by your ISP). This resolver then queries the Root servers, the TLD (Top-Level Domain) servers (like .com), and finally the Authoritative name servers for the specific domain. This recursive process happens in milliseconds thanks to aggressive caching at every level."
                    },
                    {
                        title: "Statelessness in HTTP",
                        content: "Standard HTTP is stateless—the server does not 'remember' the client between requests. To provide modern experiences (like staying logged in or keeping items in a cart), developers use mechanisms like Cookies, Sessions, and JWT (JSON Web Tokens) to maintain state on top of a stateless protocol."
                    }
                ],
                keyConcepts: ["Recursive DNS", "TTL (Time to Live)", "WebSockets", "API Endpoints"],
                exampleBox: {
                    title: "The Zero-Day DNS Attack",
                    content: "In 2016, a massive DDoS attack against Dyn (a major DNS provider) took down large portions of the internet, including Twitter, Netflix, and Reddit, by overwhelming the recursive query system."
                }
            }
        ],
        caseStudy: {
            title: "Content Delivery Networks (CDNs)",
            content: "CDNs like Akamai and Cloudflare use protocols and clever DNS routing to bring content closer to the user. By caching assets in 'edge' locations around the world, they reduce latency and protect origins from traffic spikes. We analyze how CDNs handle SSL/TLS termination and the 'anycast' routing technique used to send users to the geographically nearest server.",
            discussionQuestions: [
                "How does a CDN improve the load time of a website for a user in Australia accessing a server in London?",
                "What are the security implications of terminating TLS at a CDN edge rather than the original server?",
                "Why is DNS caching both a performance benefit and a potential hurdle for developers during deployment?"
            ]
        },
        summary: "Networking protocols are the backbone of the digital age. By layering responsibilities and adhering to robust, standardized procedures, they ensure that billions of devices can communicate regardless of hardware differences. From the low-level reliability of TCP to the high-level simplicity of HTTP, mastering these protocols is essential for any professional in Information Systems.",
        practiceProblems: [
            "Diagram the encapsulation of an HTTP GET request moving from Layer 7 to Layer 2.",
            "Calculate the theoretical maximum throughput for a 1Gbps link with a 100ms round-trip time and default TCP window size.",
            "Explain the difference between an iterative and recursive DNS query.",
            "Why does a video call stutter when packets are lost in UDP, but a file download just takes longer in TCP?",
            "Research the 'Head-of-Line Blocking' problem in HTTP/1.1 and how HTTP/2 solves it."
        ]
    },
    "Linux Administration": {
        introduction: "In the enterprise world, Linux is the dominant operating system powering servers, cloud infrastructures, and high-performance computing clusters. For a System Administrator, mastery of Linux involves more than just knowing a few commands; it requires a deep understanding of the kernel, file system hierarchies, process management, and security models. This chapter explores the philosophy of the 'everything is a file' design, the intricacies of the shell, and the critical tasks of user and permission management. We will also delve into service management using systemd and the importance of shell scripting for automation. For an Information Systems student, Linux proficiency is not optional—it is the direct gateway to the worlds of DevOps, Cybersecurity, and Data Engineering.",
        learningObjectives: [
            "Navigate the Linux Filesystem Hierarchy Standard (FHS) with precision",
            "Manage users, groups, and advanced file permissions (chmod, chown, ACLs)",
            "Analyze and control system processes using top, ps, and kill",
            "Develop robust Bash scripts for automated system maintenance",
            "Understand the difference between software package managers (APT, YUM) and low-level binaries"
        ],
        sections: [
            {
                title: "The Linux File System and Shell",
                content: "Unlike Windows, which uses drive letters (C:, D:), Linux uses a single unified tree structure. Everything—including hardware devices, networking sockets, and actual files—is accessed through a file path. This is the 'Unix Philosophy'. The Shell (typically Bash or Zsh) is the primary interface for system administrators. It is not just a command line; it is a powerful programming language. This section explores the key directories like /etc (configuration), /var (logs and data), and /bin (essential binaries), and explains the power of 'pipes' and 'redirection' in creating complex workflows from simple tools.",
                subsections: [
                    {
                        title: "The Standard Streams",
                        content: "Every Linux command interacts with three standard streams: stdin (0), stdout (1), and stderr (2). By using redirection (>, >>) and pipes (|), administrators can chain commands together. For instance, 'grep' can filter the 'stdout' of another command, allowing for surgical extraction of system logs or configuration data."
                    },
                    {
                        title: "Kernel and User Space",
                        content: "Linux is divided into 'Kernel Space' (where the core OS runs and talks to hardware) and 'User Space' (where your applications run). System administrators must understand how to interact with the kernel through the /proc and /sys filesystems, which provide a real-time window into the hardware and kernel state without needing complex debugging tools."
                    }
                ],
                keyConcepts: ["Root Directory (/)", "FHS Standard", "Standard Input/Output", "The Path Variable"],
                exampleBox: {
                    title: "The Power of One-Liners",
                    content: "A single command like 'find /var/log -type f -name \"*.log\" | xargs du -sh' can find all log files and calculate their total size instantly."
                }
            },
            {
                title: "User Management and Security Permissions",
                content: "On a multi-user system, security is paramount. The Linux permission model is based on three entities: User, Group, and Others. Each file has a set of Read (r), Write (w), and Execute (x) bits for these entities. Understanding 'sudo' (superuser do) and the 'root' account is the foundation of administrative safety. This section breaks down the numerical (octal) representation of permissions (like 755 or 644) and discusses the dangers of 'over-provisioning' permissions, which is a leading cause of security breaches.",
                subsections: [
                    {
                        title: "Symbolic vs. Octal Modes",
                        content: "chmod handles permissions in two ways. Symbolic mode (u+x, g-w) is easier for small changes. Octal mode (777, 600) is faster for setting the complete state. For example, '755' means the owner can do everything (7=rwx), but others can only read and execute (5=r-x). This is the standard for web server directories."
                    },
                    {
                        title: "The Sudoers File and Least Privilege",
                        content: "Administrators should rarely log in as 'root'. Instead, they use personal accounts with sudo privileges. The /etc/sudoers file controls who can run what commands. Following the 'Principle of Least Privilege', an admin should only grant the minimum necessary access to users to perform their jobs."
                    }
                ],
                keyConcepts: ["Superuser", "Ownership", "Sticky Bit", "SetUID"],
                exampleBox: {
                    title: "CHMOD 777: The Admin's Trap",
                    content: "Never use 'chmod -R 777' on a production server. It allows any visitor to read, modify, or delete your files, effectively handing over control to anyone on the internet."
                }
            }
        ],
        caseStudy: {
            title: "Hardening a Public-Facing Web Server",
            content: "We examine the steps taken to secure a Linux server running Apache and MySQL. This includes moving SSH to a non-standard port, implementing Fail2Ban to stop brute-force attacks, and using SELinux or AppArmor to sandbox processes. We analyze a real-world scenario where a misconfigured permission on a log file led to a localized privilege escalation attack.",
            discussionQuestions: [
                "Why is it safer to use SSH keys instead of passwords for server access?",
                "How does a firewall like UFW or IPtables protect the internal services of the server?",
                "What is the role of 'Log Rotation' in preventing a system crash due to disk exhaustion?"
            ]
        },
        summary: "Linux administration is the art of managing complexity through simplicity and automation. By mastering the command line, understanding the security model, and leveraging the 'everything is a file' philosophy, system administrators can maintain robust, high-availability environments. For IS professionals, Linux isn't just an OS—it's a workspace for innovation and security.",
        practiceProblems: [
            "Write a bash command to find all files larger than 100MB in the /home directory.",
            "Explain what 'drwxr-xr-x' means in an 'ls -l' output.",
            "How would you permanently change the owner of a directory and all its contents to 'www-data'?",
            "Create a simple script to backup the /etc directory to a compressed tarball in /tmp.",
            "Research and explain the difference between 'Soft Links' (ln -s) and 'Hard Links' (ln)."
        ]
    }
};
