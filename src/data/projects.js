const autoQA = {
  slug: "auto-qa",
  title: "Auto-QA",
  category: "AI / Developer Tools",
  year: 2026,
  featured: true,
  logoImg: null,
  thumbnail: "/assets/projects/AutoQA/autoQA-logo.svg",
  uiScreenshots: [
    "/assets/projects/AutoQA/auto-qa-rouge.vercel.app_workspace (1).png",
    "/assets/projects/AutoQA/auto-qa-rouge.vercel.app_workspace.png",
    "/assets/projects/AutoQA/autoqa2.png",
    "/assets/projects/AutoQA/localhost_3000_.png",
    "/assets/projects/AutoQA/localhost_3000_workspace_github=connected.png"
  ],
  demo: {
    type: "local",
    url: null
  },
  liveUrl: "https://auto-qa-rouge.vercel.app/",
  githubUrl: "https://github.com/AhmedRaza186/Auto-QA",
  linkedinUrl: null,
  technologies: [
    "Next.js",
    "React",
    "TypeScript",
    "Drizzle",
    "PostgreSQL/Neon",
    "Gemini AI",
    "GitHub OAuth",
    "Stripe",
    "Clerk",
    "Playwright"
  ],
  description: "AI-powered testing platform that analyzes GitHub repositories, generates intelligent test cases, creates Playwright automation scripts, executes them, and turns execution logs into human-readable reports.",
  caseStudy: {
    intro: "An intelligent testing platform designed to eliminate manual QA overhead by analyzing repositories and generating executable tests.",
    problem: "Quality assurance processes often bottleneck development cycles, requiring significant manual effort to write, maintain, and execute regression tests across rapidly changing codebases.",
    approach: "I integrated Gemini AI to parse and understand codebase logic, bridging it with Playwright to generate structured, repeatable end-to-end testing scripts automatically.",
    solution: "Auto-QA is an autonomous testing tool that connects to GitHub, analyzes the codebase structure, and generates full Playwright test suites. The platform executes these tests in the cloud and compiles the results into readable, actionable reports.",
    features: [
      { name: "Repository Analysis", description: "Automatically fetches and parses GitHub repositories to map out core architecture." },
      { name: "AI Test Generation", description: "Leverages Gemini AI to generate intelligent, context-aware Playwright test scripts." },
      { name: "Cloud Execution", description: "Executes generated tests securely and reliably in the cloud." },
      { name: "Human-Readable Reports", description: "Translates raw execution logs into clear, actionable QA reports." }
    ],
    role: "Full Stack Developer",
    challenges: "Challenge: Handling the unpredictability of AI-generated code while ensuring the Playwright scripts were executable.\n\nSolution: Implemented strict validation middleware and enforced robust JSON schema parsing on the backend API. I built a multi-pass validation logic to structurally verify AI outputs before cloud execution.",
    outcome: "A fully functional MVP that successfully connects to GitHub and generates valid test cases, reducing initial test-writing time by an estimated 70%."
  }
};

const tradeSift = {
  slug: "tradesift",
  title: "TradeSift",
  category: "AI / Automation / Commerce",
  year: 2026,
  featured: true,
  logoImg: null,
  thumbnail: "/assets/projects/TradeSift/TradeSift-logo.png",
  uiScreenshots: [
    "/assets/projects/TradeSift/Dashboard.jpeg",
    "/assets/projects/TradeSift/humanReview.jpeg",
    "/assets/projects/TradeSift/ImportGateIn.jpeg",
    "/assets/projects/TradeSift/ReviewExtraction.jpeg"
  ],
  demo: {
    type: "linkedin",
    url: "https://www.linkedin.com/feed/update/urn:li:activity:7494384936393605121/?originTrackingId=4py4SkekQ9GD%2BexrAnOOyA%3D%3D"
  },
  liveUrl: null,
  githubUrl: null,
  linkedinUrl: null,
  technologies: null,
  description: "AI-powered trade compliance platform focused on verifying and cross-checking information across trade documents before data entry.",
  caseStudy: {
    intro: "A specialized automation tool designed to streamline trade compliance processes by cross-checking complex documents.",
    problem: "Trade compliance involves verifying vast amounts of information across disjointed documents, a process that is traditionally highly manual, error-prone, and time-consuming.",
    approach: "We focused on leveraging AI to handle data extraction and reconciliation before human operators needed to perform manual data entry.",
    solution: "TradeSift provides a unified dashboard where trade documents are ingested, scanned, and cross-referenced by AI to flag discrepancies and ensure compliance before the data is committed to the main system.",
    features: [
      { name: "Document Ingestion", description: "Accepts various formats of trade documents for processing." },
      { name: "AI Cross-Referencing", description: "Automatically compares data points across different documents to ensure consistency." },
      { name: "Discrepancy Flagging", description: "Highlights potential errors and compliance risks for human review." }
    ],
    role: "Full Stack Developer",
    challenges: null,
    outcome: "A robust automation pipeline that significantly reduces the time required for document verification and data entry."
  }
};

const goldenKeyEstates = {
  slug: "goldenkey-estates",
  title: "GoldenKey Estates",
  category: "Real Estate / Full Stack",
  year: 2026,
  featured: true,
  logoImg: null,
  thumbnail: "/assets/projects/GoldenKey/thumbnail.png",
  uiScreenshots: [
    "/assets/projects/GoldenKey/Screenshot 2026-05-14 164846.png",
    "/assets/projects/GoldenKey/Screenshot 2026-05-15 154512.png",
    "/assets/projects/GoldenKey/Screenshot 2026-05-15 155820.png",
    "/assets/projects/GoldenKey/Screenshot 2026-05-15 170431.png",
    "/assets/projects/GoldenKey/Screenshot 2026-05-15 184822.png",
    "/assets/projects/GoldenKey/Screenshot 2026-05-15 190712.png"
  ],
  demo: {
    type: "linkedin",
    url: "https://www.linkedin.com/feed/update/urn:li:activity:7462879830749937664/?originTrackingId=0Y7VVCDTRgK9qnq1ZIxfIA%3D%3D"
  },
  liveUrl: "https://golden-key-estates.vercel.app/",
  githubUrl: "https://github.com/AhmedRaza186/GoldenKey-Estates",
  linkedinUrl: null,
  technologies: [
    "React",
    "Node.js",
    "Express.js",
    "MongoDB",
    "Socket.io",
    "Cloudinary"
  ],
  description: "Full-stack real estate platform focused on property discovery, communication, and real-time interaction.",
  caseStudy: {
    intro: "A comprehensive full-stack real estate platform that connects buyers with properties while offering real-time communication tools.",
    problem: "Many real estate platforms lack integrated, real-time communication, forcing users to rely on external tools to negotiate or ask questions about properties.",
    approach: "I built a unified platform where property discovery and client-agent communication happen seamlessly in the same environment, leveraging WebSockets for real-time chat.",
    solution: "GoldenKey Estates is a responsive web application featuring advanced property search, filtering, detailed listings, and an integrated real-time chat system powered by Socket.io to facilitate immediate communication.",
    features: [
      { name: "Property Discovery", description: "Advanced search and filtering capabilities to find specific real estate listings." },
      { name: "Real-Time Chat", description: "Integrated messaging system using Socket.io for instant communication." },
      { name: "Media Management", description: "Cloudinary integration for handling high-quality property images." }
    ],
    role: "Full Stack Developer",
    challenges: "Ensuring reliable real-time messaging performance while handling simultaneous image uploads and complex search queries.",
    outcome: "A fully functional real estate platform demonstrating complex full-stack capabilities including real-time features and third-party API integrations."
  }
};

const userManagementSystem = {
  slug: "user-management-system",
  title: "User Management System",
  category: "Authentication / Full Stack",
  year: 2025,
  featured: true,
  logoImg: null,
  thumbnail: null,
  uiScreenshots: [],
  demo: {
    type: "linkedin",
    url: "https://www.linkedin.com/feed/update/urn:li:activity:7452359894923460608/?originTrackingId=eunfc3cBRnSN%2B%2BFz7jAYzw%3D%3D"
  },
  liveUrl: "https://usermanagementsystem26.netlify.app/",
  githubUrl: "https://github.com/AhmedRaza186/UserManagementSystem",
  linkedinUrl: null,
  technologies: [
    "HTML",
    "CSS",
    "JavaScript",
    "Node.js",
    "Express.js",
    "Cloudinary"
  ],
  description: "Full-stack community management application with authentication, OTP verification, profile management, image uploads, search, filtering, and a dynamic member dashboard.",
  caseStudy: {
    intro: "A complete authentication and community management dashboard designed with a focus on security and user profiles.",
    problem: "Managing user access securely while providing a rich, interactive member directory requires robust authentication and flexible profile management.",
    approach: "I implemented a secure, token-based authentication system with OTP verification, alongside a dynamic frontend dashboard for managing user data.",
    solution: "The User Management System provides a secure login flow, OTP email verification, and a comprehensive dashboard where members can update profiles, upload images, and search or filter through the community directory.",
    features: [
      { name: "Secure Authentication", description: "Full login and registration flow with OTP email verification." },
      { name: "Profile Management", description: "Dynamic user profiles with Cloudinary-backed image uploads." },
      { name: "Community Dashboard", description: "Searchable and filterable directory of all registered members." }
    ],
    role: "Full Stack Developer",
    challenges: "Implementing secure token management and ensuring seamless image upload handling between the frontend, backend, and Cloudinary.",
    outcome: "A secure, scalable boilerplate for user authentication and profile management that can be integrated into larger applications."
  }
};

const vipSetup = {
  slug: "vip-setup",
  title: "VIP Setup",
  category: "Frontend / Creative Web",
  year: 2026,
  featured: false,
  logoImg: null,
  thumbnail: "/assets/projects/VipSetup/vipsetup-logo.jpg",
  uiScreenshots: [
    "/assets/projects/VipSetup/Screenshot 2026-08-20 004541.png",
    "/assets/projects/VipSetup/Screenshot 2026-08-20 004716.png",
    "/assets/projects/VipSetup/Screenshot 2026-08-20 004901.png",
    "/assets/projects/VipSetup/Screenshot 2026-08-20 005016.png",
    "/assets/projects/VipSetup/Screenshot 2026-08-20 005043.png",
    "/assets/projects/VipSetup/vip-setup-demo.vercel.app_.png"
  ],
  demo: {
    type: "local",
    url: null
  },
  liveUrl: "https://vip-setup-demo.vercel.app/",
  githubUrl: null,
  linkedinUrl: null,
  technologies: [
    "React",
    "GSAP",
    "Tailwind CSS",
    "Vite"
  ],
  description: "A premium portfolio/demo project showcasing highly interactive frontend architecture and smooth animations.",
  caseStudy: {
    intro: "A premium portfolio/demo project showcasing highly interactive frontend architecture and smooth animations.",
    problem: null,
    approach: null,
    solution: "A premium portfolio/demo project showcasing highly interactive frontend architecture and smooth animations.",
    features: [],
    role: "Frontend Developer",
    challenges: null,
    outcome: null
  }
};

const noirCafe = {
  slug: "noir-cafe",
  title: "Noir Cafe & Pizzeria",
  category: "Frontend / Creative Web",
  year: 2026,
  featured: false,
  logoImg: null,
  thumbnail: "/assets/projects/Noir/Noir-logo.jpg",
  uiScreenshots: [
    "/assets/projects/Noir/noir-demo-self.vercel.app_.png",
    "/assets/projects/Noir/NoirGallery.png",
    "/assets/projects/Noir/NoirHero.png",
    "/assets/projects/Noir/NoirLocation.png",
    "/assets/projects/Noir/NoirSippinBag.png"
  ],
  demo: {
    type: "local",
    url: null
  },
  liveUrl: "https://noir-demo-self.vercel.app/",
  githubUrl: null,
  linkedinUrl: null,
  technologies: [
    "React",
    "Three.js",
    "GSAP",
    "Tailwind CSS",
    "Vite"
  ],
  description: "An immersive, highly animated web experience designed for a premium cafe and pizzeria using 3D elements and advanced scrolling.",
  caseStudy: {
    intro: "An immersive, highly animated web experience designed for a premium cafe and pizzeria using 3D elements and advanced scrolling.",
    problem: null,
    approach: null,
    solution: "An immersive, highly animated web experience designed for a premium cafe and pizzeria using 3D elements and advanced scrolling.",
    features: [],
    role: "Frontend Developer",
    challenges: null,
    outcome: null
  }
};

const quizify = {
  slug: "quizify",
  title: "Quizify",
  category: "Full Stack",
  year: 2025,
  featured: false,
  logoImg: null,
  thumbnail: "/assets/projects/Quizify/quizify-logo.jpg",
  uiScreenshots: [],
  demo: {
    type: "linkedin",
    url: "https://www.linkedin.com/feed/update/urn:li:activity:7457085885537280002/?originTrackingId=G3rBrVuXQkmTXKipB7ES4g%3D%3D"
  },
  liveUrl: "https://ahmedraza186.github.io/Quizify/",
  githubUrl: "https://github.com/AhmedRaza186/Quizify",
  linkedinUrl: null,
  technologies: [
    "HTML",
    "CSS",
    "JavaScript",
    "Firebase"
  ],
  description: "Built a stateful quiz engine featuring robust Firebase authentication, secure real-time score synchronization, and a custom responsive UI architecture.",
  caseStudy: {
    intro: "An interactive quiz application with user authentication, score tracking, and real-time feedback.",
    problem: null,
    approach: null,
    solution: "An interactive quiz application with user authentication, score tracking, and real-time feedback.",
    features: [],
    role: "Frontend Developer",
    challenges: null,
    outcome: null
  }
};

const healthMate = {
  slug: "healthmate",
  title: "HealthMate",
  category: "Full Stack",
  year: 2025,
  featured: false,
  logoImg: null,
  thumbnail: "/assets/projects/Healthmate/healthmate-logo.jpg",
  uiScreenshots: [],
  demo: {
    type: "linkedin",
    url: "https://www.linkedin.com/feed/update/urn:li:activity:7429524809665110016/?originTrackingId=ztXzZ7piQ9u9eFCgKxiaOg%3D%3D"
  },
  liveUrl: "https://health-mate12.netlify.app/",
  githubUrl: "https://github.com/AhmedRaza186/HealthMate",
  linkedinUrl: null,
  technologies: [
    "HTML",
    "CSS",
    "JavaScript",
    "Firebase"
  ],
  description: "A health tracking web app to monitor daily habits, BMI, and wellness goals.",
  caseStudy: {
    intro: "A health tracking web app to monitor daily habits, BMI, and wellness goals.",
    problem: null,
    approach: null,
    solution: "A health tracking web app to monitor daily habits, BMI, and wellness goals.",
    features: [],
    role: "Frontend Developer",
    challenges: null,
    outcome: null
  }
};

const rollClash = {
  slug: "roll-clash",
  title: "Roll Clash",
  category: "Games",
  year: 2025,
  featured: false,
  logoImg: null,
  thumbnail: "/assets/projects/Rollclash/rollclash-logo.jpg",
  uiScreenshots: [],
  demo: {
    type: "linkedin",
    url: "https://www.linkedin.com/feed/update/urn:li:activity:7396530695965208576/?originTrackingId=z5%2BzP%2FtnTXSBGXzTTXSgKw%3D%3D"
  },
  liveUrl: "https://ahmedraza186.github.io/Roll-Clash/",
  githubUrl: "https://github.com/AhmedRaza186/Roll-Clash",
  linkedinUrl: null,
  technologies: [
    "JavaScript",
    "CSS",
    "HTML"
  ],
  description: "A 2-player dice game with score tracking, animations, and a leaderboard using HTML, CSS & JS.",
  caseStudy: {
    intro: "A 2-player dice game with score tracking, animations, and a leaderboard using HTML, CSS & JS.",
    problem: null,
    approach: null,
    solution: "A 2-player dice game with score tracking, animations, and a leaderboard using HTML, CSS & JS.",
    features: [],
    role: "Frontend Developer",
    challenges: null,
    outcome: null
  }
};

const guessMyNumber = {
  slug: "guess-my-number",
  title: "Guess My Number",
  category: "Games",
  year: 2025,
  featured: false,
  logoImg: null,
  thumbnail: "/assets/projects/Guessmynumber/guessmynumber-logo.jpg",
  uiScreenshots: [],
  demo: {
    type: "linkedin",
    url: "https://www.linkedin.com/feed/update/urn:li:activity:7402336069133733888/?originTrackingId=kyr5DSssTCmMeNztfOhj6Q%3D%3D"
  },
  liveUrl: "https://ahmedraza186.github.io/guessTheNumber/",
  githubUrl: "https://github.com/AhmedRaza186/guessTheNumber",
  linkedinUrl: null,
  technologies: [
    "JavaScript",
    "HTML",
    "CSS"
  ],
  description: "\"Guess My Number\" is a fun, interactive number guessing game where you try to guess a randomly generated number and earn points for each round.",
  caseStudy: {
    intro: "\"Guess My Number\" is a fun, interactive number guessing game where you try to guess a randomly generated number and earn points for each round.",
    problem: null,
    approach: null,
    solution: "\"Guess My Number\" is a fun, interactive number guessing game where you try to guess a randomly generated number and earn points for each round.",
    features: [],
    role: "Frontend Developer",
    challenges: null,
    outcome: null
  }
};

const ticTacToe = {
  slug: "tic-tac-toe",
  title: "Tic Tac Toe",
  category: "Games",
  year: 2025,
  featured: false,
  logoImg: null,
  thumbnail: "/assets/projects/Tictactoe/tictactoe.jpg",
  uiScreenshots: [],
  demo: {
    type: "linkedin",
    url: "https://www.linkedin.com/feed/update/urn:li:activity:7374767817335808001/?originTrackingId=V84RUI2STiSQWJOajDQVXw%3D%3D"
  },
  liveUrl: "https://ahmedraza186.github.io/My-Tic-Tac-Toe-game/",
  githubUrl: "https://github.com/AhmedRaza186/My-Tic-Tac-Toe-game",
  linkedinUrl: null,
  technologies: [
    "JavaScript",
    "HTML",
    "CSS"
  ],
  description: "A lightweight Tic Tac Toe game made with HTML, CSS, and JS featuring player vs player, player vs computer, and popup-based results.",
  caseStudy: {
    intro: "A lightweight Tic Tac Toe game made with HTML, CSS, and JS featuring player vs player, player vs computer, and popup-based results.",
    problem: null,
    approach: null,
    solution: "A lightweight Tic Tac Toe game made with HTML, CSS, and JS featuring player vs player, player vs computer, and popup-based results.",
    features: [],
    role: "Frontend Developer",
    challenges: null,
    outcome: null
  }
};

const eatUCrave = {
  slug: "eat-u-crave",
  title: "Eat U Crave",
  category: "Frontend",
  year: 2025,
  featured: false,
  logoImg: null,
  thumbnail: "/assets/projects/Eatyoucrave/eatyoucrave-logo.jpg",
  uiScreenshots: [],
  demo: {
    type: "linkedin",
    url: "https://www.linkedin.com/feed/update/urn:li:activity:7391783898428448768/?originTrackingId=%2Bx%2BCt%2FadQ5u3GJdm5A3V3w%3D%3D"
  },
  liveUrl: "https://ahmedraza186.github.io/Eat-You-Crave/",
  githubUrl: "https://github.com/AhmedRaza186/Eat-You-Crave",
  linkedinUrl: null,
  technologies: [
    "HTML",
    "CSS",
    "JavaScript"
  ],
  description: "A modern ecommerce storefront for food lovers - discover what you prefer and order with ease.",
  caseStudy: {
    intro: "A modern ecommerce storefront for food lovers - discover what you prefer and order with ease.",
    problem: null,
    approach: null,
    solution: "A modern ecommerce storefront for food lovers - discover what you prefer and order with ease.",
    features: [],
    role: "Frontend Developer",
    challenges: null,
    outcome: null
  }
};

const buyYouWant = {
  slug: "buy-you-want",
  title: "Buy You Want",
  category: "Frontend",
  year: 2025,
  featured: false,
  logoImg: null,
  thumbnail: "/assets/projects/Buyyouwant/buyyouwant-logo.jpg",
  uiScreenshots: [],
  demo: {
    type: "linkedin",
    url: "https://www.linkedin.com/feed/update/urn:li:activity:7385610773785636864/?originTrackingId=qI3TLHaOSbWKi32%2F4kcWrw%3D%3D"
  },
  liveUrl: "https://ahmedraza186.github.io/Buy-You-Want/",
  githubUrl: "https://github.com/AhmedRaza186/Buy-You-Want",
  linkedinUrl: null,
  technologies: [
    "HTML",
    "CSS",
    "JavaScript"
  ],
  description: "Buy You Want is a responsive e-commerce website built using HTML, CSS, and JavaScript. It features a dynamic add-to-cart system with real-time updates and automatic price calculations.",
  caseStudy: {
    intro: "Buy You Want is a responsive e-commerce website built using HTML, CSS, and JavaScript. It features a dynamic add-to-cart system with real-time updates and automatic price calculations.",
    problem: null,
    approach: null,
    solution: "Buy You Want is a responsive e-commerce website built using HTML, CSS, and JavaScript. It features a dynamic add-to-cart system with real-time updates and automatic price calculations.",
    features: [],
    role: "Frontend Developer",
    challenges: null,
    outcome: null
  }
};

const linkUp = {
  slug: "linkup",
  title: "LinkUp",
  category: "Frontend",
  year: 2025,
  featured: false,
  logoImg: null,
  thumbnail: "/assets/projects/Linkup/linkup-logo.jpg",
  uiScreenshots: [],
  demo: {
    type: "linkedin",
    url: "https://www.linkedin.com/feed/update/urn:li:activity:7398170873117032448/?originTrackingId=s39Ac2%2F7RZeG5EZOBIn%2F4w%3D%3D"
  },
  liveUrl: "https://ahmedraza186.github.io/LinkUp/",
  githubUrl: "https://github.com/AhmedRaza186/LinkUp",
  linkedinUrl: null,
  technologies: [
    "HTML",
    "CSS",
    "JavaScript"
  ],
  description: "Engineered a comprehensive local-storage state management system with full CRUD operations, mock authentication workflows, and dynamic theme switching.",
  caseStudy: {
    intro: "LinkUp is a social media web app built during the Saylani Mini Hackathon. It includes authentication, post creation, editing, liking, filtering, and theme switching - all powered by localStorage.",
    problem: null,
    approach: null,
    solution: "LinkUp is a social media web app built during the Saylani Mini Hackathon. It includes authentication, post creation, editing, liking, filtering, and theme switching - all powered by localStorage.",
    features: [],
    role: "Frontend Developer",
    challenges: null,
    outcome: null
  }
};

const luxurs = {
  slug: "luxurs",
  title: "Luxurs.",
  category: "Frontend",
  year: 2025,
  featured: false,
  logoImg: null,
  thumbnail: "/assets/projects/Luxurs/luxurs-logo.jpg",
  uiScreenshots: [],
  demo: {
    type: "linkedin",
    url: "https://www.linkedin.com/feed/update/urn:li:activity:7388855999979261954/?originTrackingId=9OKMGzrTRquk%2F0u5CNLfjQ%3D%3D"
  },
  liveUrl: "https://ahmedraza186.github.io/Luxurs./",
  githubUrl: "https://github.com/AhmedRaza186/Luxurs.",
  linkedinUrl: null,
  technologies: [
    "HTML",
    "CSS",
    "JavaScript"
  ],
  description: "Luxurs. represents luxury, power, and motion in one seamless experience. Built to showcase premium car brands with cinematic visuals and immersive effects.",
  caseStudy: {
    intro: "Luxurs. represents luxury, power, and motion in one seamless experience. Built to showcase premium car brands with cinematic visuals and immersive effects.",
    problem: null,
    approach: null,
    solution: "Luxurs. represents luxury, power, and motion in one seamless experience. Built to showcase premium car brands with cinematic visuals and immersive effects.",
    features: [],
    role: "Frontend Developer",
    challenges: null,
    outcome: null
  }
};

const fakeStore = {
  slug: "fakestore",
  title: "FakeStore",
  category: "API Projects",
  year: 2025,
  featured: false,
  logoImg: null,
  thumbnail: "/assets/projects/Fakestore/fakestore-logo.jpg",
  uiScreenshots: [],
  demo: {
    type: "linkedin",
    url: "https://www.linkedin.com/feed/update/urn:li:activity:7420051573294166016/?originTrackingId=UCUm3ETyTb2ZsEWMHRNy7A%3D%3D"
  },
  liveUrl: "https://ahmedraza186.github.io/FakeStore-API-project/",
  githubUrl: "https://github.com/AhmedRaza186/FakeStore-API-project",
  linkedinUrl: null,
  technologies: [
    "JavaScript",
    "API",
    "HTML",
    "CSS"
  ],
  description: "A modern e-commerce web app built using Fake Store API, featuring dynamic product loading, a localStorage-based cart system, and quantity management.",
  caseStudy: {
    intro: "A modern e-commerce web app built using Fake Store API, featuring dynamic product loading, a localStorage-based cart system, and quantity management.",
    problem: null,
    approach: null,
    solution: "A modern e-commerce web app built using Fake Store API, featuring dynamic product loading, a localStorage-based cart system, and quantity management.",
    features: [],
    role: "Frontend Developer",
    challenges: null,
    outcome: null
  }
};

const forkify = {
  slug: "forkify",
  title: "Forkify",
  category: "API Projects",
  year: 2025,
  featured: false,
  logoImg: null,
  thumbnail: "/assets/projects/Forkify/forkify-logo.jpg",
  uiScreenshots: [],
  demo: {
    type: "linkedin",
    url: "https://www.linkedin.com/feed/update/urn:li:activity:7418260292884836352/?originTrackingId=H0YOEYPhSFai%2B%2Fie%2BUP%2FXw%3D%3D"
  },
  liveUrl: "https://ahmedraza186.github.io/forkify/",
  githubUrl: "https://github.com/AhmedRaza186/Forkify",
  linkedinUrl: null,
  technologies: [
    "JavaScript",
    "API",
    "HTML",
    "CSS"
  ],
  description: "Forkify is a responsive recipe finder web app that allows users to search and explore over 1M recipes using an API with detailed recipe views and smooth navigation.",
  caseStudy: {
    intro: "Forkify is a responsive recipe finder web app that allows users to search and explore over 1M recipes using an API with detailed recipe views and smooth navigation.",
    problem: null,
    approach: null,
    solution: "Forkify is a responsive recipe finder web app that allows users to search and explore over 1M recipes using an API with detailed recipe views and smooth navigation.",
    features: [],
    role: "Frontend Developer",
    challenges: null,
    outcome: null
  }
};

const newsWave = {
  slug: "newswave",
  title: "NewsWave",
  category: "API Projects",
  year: 2025,
  featured: false,
  logoImg: null,
  thumbnail: "/assets/projects/Newswave/newswave-logo.jpg",
  uiScreenshots: [],
  demo: {
    type: "linkedin",
    url: "https://www.linkedin.com/feed/update/urn:li:activity:7417123938578755586/?originTrackingId=cUaDO8RqQMG2bDFJsU73gQ%3D%3D"
  },
  liveUrl: "https://ahmedraza186.github.io/NewsWave/",
  githubUrl: "https://github.com/AhmedRaza186/NewsWave",
  linkedinUrl: null,
  technologies: [
    "JavaScript",
    "API",
    "HTML",
    "CSS"
  ],
  description: "A dynamic news web app built with JavaScript and APIs, featuring real-time news fetching, category-based filtering, search functionality, and a fully responsive UI.",
  caseStudy: {
    intro: "A dynamic news web app built with JavaScript and APIs, featuring real-time news fetching, category-based filtering, search functionality, and a fully responsive UI.",
    problem: null,
    approach: null,
    solution: "A dynamic news web app built with JavaScript and APIs, featuring real-time news fetching, category-based filtering, search functionality, and a fully responsive UI.",
    features: [],
    role: "Frontend Developer",
    challenges: null,
    outcome: null
  }
};

const atmos = {
  slug: "atmos",
  title: "Atmos",
  category: "API Projects",
  year: 2025,
  featured: false,
  logoImg: null,
  thumbnail: "/assets/projects/Atmos/atmos-logo.jpg",
  uiScreenshots: [],
  demo: {
    type: "linkedin",
    url: "https://www.linkedin.com/feed/update/urn:li:activity:7415374400100925440/?originTrackingId=yXqB5EowRx%2BcInkMb5Q7Sg%3D%3D"
  },
  liveUrl: "https://ahmedraza186.github.io/Atmos---The-weather-App/",
  githubUrl: "https://github.com/AhmedRaza186/Atmos---The-weather-App",
  linkedinUrl: null,
  technologies: [
    "JavaScript",
    "API",
    "HTML",
    "CSS"
  ],
  description: "A mini weather app built using the OpenWeather API that fetches real-time data, handles API errors, and displays live weather updates.",
  caseStudy: {
    intro: "A mini weather app built using the OpenWeather API that fetches real-time data, handles API errors, and displays live weather updates.",
    problem: null,
    approach: null,
    solution: "A mini weather app built using the OpenWeather API that fetches real-time data, handles API errors, and displays live weather updates.",
    features: [],
    role: "Frontend Developer",
    challenges: null,
    outcome: null
  }
};

export const projects = [
  autoQA,
  tradeSift,
  goldenKeyEstates,
  userManagementSystem,
  vipSetup,
  noirCafe,
  quizify,
  healthMate,
  rollClash,
  guessMyNumber,
  ticTacToe,
  eatUCrave,
  buyYouWant,
  linkUp,
  luxurs,
  fakeStore,
  forkify,
  newsWave,
  atmos
];
