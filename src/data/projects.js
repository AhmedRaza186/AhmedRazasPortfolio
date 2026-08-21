export const projects = [
  {
    slug: 'auto-qa',
    title: 'Auto-QA',
    category: 'AI / Developer Tools',
    description: 'AI-powered testing platform that analyzes GitHub repositories, generates intelligent test cases, creates Playwright automation scripts, executes them, and turns execution logs into human-readable reports.',
    year: '2026',
    image: '/assets/projects/AutoQA/thumbnail.png',
    technologies: ['Next.js', 'React', 'TypeScript', 'Drizzle', 'PostgreSQL/Neon', 'Gemini AI', 'GitHub OAuth', 'Stripe', 'Clerk', 'Playwright'],
    github: 'https://github.com/AhmedRaza186/Auto-QA',
    live: 'https://auto-qa-rouge.vercel.app/',
    featured: true,
    caseStudy: {
      intro: 'An intelligent testing platform designed to eliminate manual QA overhead by analyzing repositories and generating executable tests.',
      problem: 'Quality assurance processes often bottleneck development cycles, requiring significant manual effort to write, maintain, and execute regression tests across rapidly changing codebases.',
      approach: 'I integrated Gemini AI to parse and understand codebase logic, bridging it with Playwright to generate structured, repeatable end-to-end testing scripts automatically.',
      solution: 'Auto-QA is an autonomous testing tool that connects to GitHub, analyzes the codebase structure, and generates full Playwright test suites. The platform executes these tests in the cloud and compiles the results into readable, actionable reports.',
      features: [
        { name: 'Repository Analysis', description: 'Automatically fetches and parses GitHub repositories to map out core architecture.' },
        { name: 'AI Test Generation', description: 'Leverages Gemini AI to generate intelligent, context-aware Playwright test scripts.' },
        { name: 'Cloud Execution', description: 'Executes generated tests securely and reliably in the cloud.' },
        { name: 'Human-Readable Reports', description: 'Translates raw execution logs into clear, actionable QA reports.' }
      ],
      role: 'Full Stack Developer',
      challenges: 'Handling the unpredictability of AI-generated code while ensuring the resulting Playwright scripts were syntactically correct and reliably executable.',
      outcome: 'A fully functional MVP that successfully connects to GitHub and generates valid test cases, reducing initial test-writing time significantly.'
    }
  },
  {
    slug: 'tradesift',
    title: 'TradeSift',
    category: 'AI / Automation / Commerce',
    description: 'AI-powered trade compliance platform focused on verifying and cross-checking information across trade documents before data entry.',
    year: '2026',
    image: '/assets/projects/TradeSift/landing page.png',
    team: 'Affan Siddique, Ahmed Raza, Rana Hasan',
    featured: true,
    caseStudy: {
      intro: 'A specialized automation tool designed to streamline trade compliance processes by cross-checking complex documents.',
      problem: 'Trade compliance involves verifying vast amounts of information across disjointed documents, a process that is traditionally highly manual, error-prone, and time-consuming.',
      approach: 'We focused on leveraging AI to handle data extraction and reconciliation before human operators needed to perform manual data entry.',
      solution: 'TradeSift provides a unified dashboard where trade documents are ingested, scanned, and cross-referenced by AI to flag discrepancies and ensure compliance before the data is committed to the main system.',
      features: [
        { name: 'Document Ingestion', description: 'Accepts various formats of trade documents for processing.' },
        { name: 'AI Cross-Referencing', description: 'Automatically compares data points across different documents to ensure consistency.' },
        { name: 'Discrepancy Flagging', description: 'Highlights potential errors and compliance risks for human review.' }
      ],
      role: 'Full Stack Developer',
      challenges: null,
      outcome: 'A robust automation pipeline that significantly reduces the time required for document verification and data entry.'
    }
  },
  {
    slug: 'goldenkey-estates',
    title: 'GoldenKey Estates',
    category: 'Real Estate / Full Stack',
    description: 'Full-stack real estate platform focused on property discovery, communication, and real-time interaction.',
    year: '2026',
    image: '/assets/projects/GoldenKey/thumbnail.png',
    technologies: ['React', 'Node.js', 'Express.js', 'MongoDB', 'Socket.io', 'Cloudinary'],
    github: 'https://github.com/AhmedRaza186/GoldenKey-Estates',
    backend: 'https://github.com/AhmedRaza186/Golden-Key-Backend',
    live: 'https://golden-key-estates.vercel.app/',
    featured: true,
    caseStudy: {
      intro: 'A comprehensive full-stack real estate platform that connects buyers with properties while offering real-time communication tools.',
      problem: 'Many real estate platforms lack integrated, real-time communication, forcing users to rely on external tools to negotiate or ask questions about properties.',
      approach: 'I built a unified platform where property discovery and client-agent communication happen seamlessly in the same environment, leveraging WebSockets for real-time chat.',
      solution: 'GoldenKey Estates is a responsive web application featuring advanced property search, filtering, detailed listings, and an integrated real-time chat system powered by Socket.io to facilitate immediate communication.',
      features: [
        { name: 'Property Discovery', description: 'Advanced search and filtering capabilities to find specific real estate listings.' },
        { name: 'Real-Time Chat', description: 'Integrated messaging system using Socket.io for instant communication.' },
        { name: 'Media Management', description: 'Cloudinary integration for handling high-quality property images.' }
      ],
      role: 'Full Stack Developer',
      challenges: 'Ensuring reliable real-time messaging performance while handling simultaneous image uploads and complex search queries.',
      outcome: 'A fully functional real estate platform demonstrating complex full-stack capabilities including real-time features and third-party API integrations.'
    }
  },
  {
    slug: 'user-management-system',
    title: 'User Management System',
    category: 'Authentication / Full Stack',
    description: 'Full-stack community management application with authentication, OTP verification, profile management, image uploads, search, filtering, and a dynamic member dashboard.',
    year: '2025',
    image: null,
    technologies: ['HTML', 'CSS', 'JavaScript', 'Node.js', 'Express.js', 'Cloudinary'],
    github: 'https://github.com/AhmedRaza186/UserManagementSystem',
    backend: 'https://github.com/AhmedRaza186/UserManagementSystem-Backend',
    live: 'https://usermanagementsystem26.netlify.app/',
    featured: true,
    caseStudy: {
      intro: 'A complete authentication and community management dashboard designed with a focus on security and user profiles.',
      problem: 'Managing user access securely while providing a rich, interactive member directory requires robust authentication and flexible profile management.',
      approach: 'I implemented a secure, token-based authentication system with OTP verification, alongside a dynamic frontend dashboard for managing user data.',
      solution: 'The User Management System provides a secure login flow, OTP email verification, and a comprehensive dashboard where members can update profiles, upload images, and search or filter through the community directory.',
      features: [
        { name: 'Secure Authentication', description: 'Full login and registration flow with OTP email verification.' },
        { name: 'Profile Management', description: 'Dynamic user profiles with Cloudinary-backed image uploads.' },
        { name: 'Community Dashboard', description: 'Searchable and filterable directory of all registered members.' }
      ],
      role: 'Full Stack Developer',
      challenges: 'Implementing secure token management and ensuring seamless image upload handling between the frontend, backend, and Cloudinary.',
      outcome: 'A secure, scalable boilerplate for user authentication and profile management that can be integrated into larger applications.'
    }
  },
  {
    slug: 'vip-setup',
    title: 'VIP Setup',
    category: 'Frontend / Creative Web',
    description: 'A premium portfolio/demo project showcasing highly interactive frontend architecture and smooth animations.',
    year: '2026',
    image: '/assets/projects/VipSetup/thumbnail.png',
    technologies: ['React', 'GSAP', 'Tailwind CSS', 'Vite'],
    live: 'https://vip-setup-demo.vercel.app/',
    featured: false,
    caseStudy: {
      intro: 'A premium portfolio/demo project showcasing highly interactive frontend architecture and smooth animations.',
      solution: 'A premium portfolio/demo project showcasing highly interactive frontend architecture and smooth animations.'
    }
  },
  {
    slug: 'noir-cafe',
    title: 'Noir Cafe & Pizzeria',
    category: 'Frontend / Creative Web',
    description: 'An immersive, highly animated web experience designed for a premium cafe and pizzeria using 3D elements and advanced scrolling.',
    year: '2026',
    image: '/assets/projects/Noir/thumbnail.png',
    technologies: ['React', 'Three.js', 'GSAP', 'Tailwind CSS', 'Vite'],
    live: 'https://noir-demo-self.vercel.app/',
    featured: false,
    caseStudy: {
      intro: 'An immersive, highly animated web experience designed for a premium cafe and pizzeria using 3D elements and advanced scrolling.',
      solution: 'An immersive, highly animated web experience designed for a premium cafe and pizzeria using 3D elements and advanced scrolling.'
    }
  },
  {
    slug: 'quizify',
    title: 'Quizify',
    category: 'Full Stack',
    description: 'An interactive quiz application with user authentication, score tracking, and real-time feedback.',
    year: '2025',
    image: '/assets/projects/Quizify/quizify.jpg',
    technologies: ['HTML', 'CSS', 'JavaScript', 'Firebase'],
    github: 'https://github.com/AhmedRaza186/Quizify',
    live: 'https://ahmedraza186.github.io/Quizify/',
    featured: false,
    caseStudy: {
      intro: 'An interactive quiz application with user authentication, score tracking, and real-time feedback.',
      solution: 'An interactive quiz application with user authentication, score tracking, and real-time feedback.'
    }
  },
  {
    slug: 'healthmate',
    title: 'HealthMate',
    category: 'Full Stack',
    description: 'A health tracking web app to monitor daily habits, BMI, and wellness goals.',
    year: '2025',
    image: '/assets/projects/Healthmate/healthmate.jpg',
    technologies: ['HTML', 'CSS', 'JavaScript', 'Firebase'],
    github: 'https://github.com/AhmedRaza186/HealthMate',
    live: 'https://health-mate12.netlify.app/',
    featured: false,
    caseStudy: {
      intro: 'A health tracking web app to monitor daily habits, BMI, and wellness goals.',
      solution: 'A health tracking web app to monitor daily habits, BMI, and wellness goals.'
    }
  },
  {
    slug: 'roll-clash',
    title: 'Roll Clash',
    category: 'Games',
    description: 'A 2-player dice game with score tracking, animations, and a leaderboard using HTML, CSS & JS.',
    year: '2025',
    image: '/assets/projects/Rollclash/rollclash.jpg',
    technologies: ['JavaScript', 'CSS', 'HTML'],
    github: 'https://github.com/AhmedRaza186/Roll-Clash',
    live: 'https://ahmedraza186.github.io/Roll-Clash/',
    featured: false,
    caseStudy: {
      intro: 'A 2-player dice game with score tracking, animations, and a leaderboard using HTML, CSS & JS.',
      solution: 'A 2-player dice game with score tracking, animations, and a leaderboard using HTML, CSS & JS.'
    }
  },
  {
    slug: 'guess-my-number',
    title: 'Guess My Number',
    category: 'Games',
    description: '"Guess My Number" is a fun, interactive number guessing game where you try to guess a randomly generated number and earn points for each round.',
    year: '2025',
    image: '/assets/projects/Guessmynumber/guessmynumber.jpg',
    technologies: ['JavaScript', 'HTML', 'CSS'],
    github: 'https://github.com/AhmedRaza186/guessTheNumber',
    live: 'https://ahmedraza186.github.io/guessTheNumber/',
    featured: false,
    caseStudy: {
      intro: '"Guess My Number" is a fun, interactive number guessing game where you try to guess a randomly generated number and earn points for each round.',
      solution: '"Guess My Number" is a fun, interactive number guessing game where you try to guess a randomly generated number and earn points for each round.'
    }
  },
  {
    slug: 'tic-tac-toe',
    title: 'Tic Tac Toe',
    category: 'Games',
    description: 'A lightweight Tic Tac Toe game made with HTML, CSS, and JS featuring player vs player, player vs computer, and popup-based results.',
    year: '2025',
    image: '/assets/projects/Tictactoe/tictactoe.jpg',
    technologies: ['JavaScript', 'HTML', 'CSS'],
    github: 'https://github.com/AhmedRaza186/My-Tic-Tac-Toe-game',
    live: 'https://ahmedraza186.github.io/My-Tic-Tac-Toe-game/',
    featured: false,
    caseStudy: {
      intro: 'A lightweight Tic Tac Toe game made with HTML, CSS, and JS featuring player vs player, player vs computer, and popup-based results.',
      solution: 'A lightweight Tic Tac Toe game made with HTML, CSS, and JS featuring player vs player, player vs computer, and popup-based results.'
    }
  },
  {
    slug: 'eat-u-crave',
    title: 'Eat U Crave',
    category: 'Frontend',
    description: 'A modern ecommerce storefront for food lovers - discover what you prefer and order with ease.',
    year: '2025',
    image: '/assets/projects/Eatyoucrave/eatyoucrave.jpg',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    github: 'https://github.com/AhmedRaza186/Eat-You-Crave',
    live: 'https://ahmedraza186.github.io/Eat-You-Crave/',
    featured: false,
    caseStudy: {
      intro: 'A modern ecommerce storefront for food lovers - discover what you prefer and order with ease.',
      solution: 'A modern ecommerce storefront for food lovers - discover what you prefer and order with ease.'
    }
  },
  {
    slug: 'buy-you-want',
    title: 'Buy You Want',
    category: 'Frontend',
    description: 'Buy You Want is a responsive e-commerce website built using HTML, CSS, and JavaScript. It features a dynamic add-to-cart system with real-time updates and automatic price calculations.',
    year: '2025',
    image: '/assets/projects/Buyyouwant/buyyouwant.jpg',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    github: 'https://github.com/AhmedRaza186/Buy-You-Want',
    live: 'https://ahmedraza186.github.io/Buy-You-Want/',
    featured: false,
    caseStudy: {
      intro: 'Buy You Want is a responsive e-commerce website built using HTML, CSS, and JavaScript. It features a dynamic add-to-cart system with real-time updates and automatic price calculations.',
      solution: 'Buy You Want is a responsive e-commerce website built using HTML, CSS, and JavaScript. It features a dynamic add-to-cart system with real-time updates and automatic price calculations.'
    }
  },
  {
    slug: 'linkup',
    title: 'LinkUp',
    category: 'Frontend',
    description: 'LinkUp is a social media web app built during the Saylani Mini Hackathon. It includes authentication, post creation, editing, liking, filtering, and theme switching - all powered by localStorage.',
    year: '2025',
    image: '/assets/projects/Linkup/linkup.jpg',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    github: 'https://github.com/AhmedRaza186/LinkUp',
    live: 'https://ahmedraza186.github.io/LinkUp/',
    featured: false,
    caseStudy: {
      intro: 'LinkUp is a social media web app built during the Saylani Mini Hackathon. It includes authentication, post creation, editing, liking, filtering, and theme switching - all powered by localStorage.',
      solution: 'LinkUp is a social media web app built during the Saylani Mini Hackathon. It includes authentication, post creation, editing, liking, filtering, and theme switching - all powered by localStorage.'
    }
  },
  {
    slug: 'luxurs',
    title: 'Luxurs.',
    category: 'Frontend',
    description: 'Luxurs. represents luxury, power, and motion in one seamless experience. Built to showcase premium car brands with cinematic visuals and immersive effects.',
    year: '2025',
    image: '/assets/projects/Luxurs/luxurs.jpg',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    github: 'https://github.com/AhmedRaza186/Luxurs.',
    live: 'https://ahmedraza186.github.io/Luxurs./',
    featured: false,
    caseStudy: {
      intro: 'Luxurs. represents luxury, power, and motion in one seamless experience. Built to showcase premium car brands with cinematic visuals and immersive effects.',
      solution: 'Luxurs. represents luxury, power, and motion in one seamless experience. Built to showcase premium car brands with cinematic visuals and immersive effects.'
    }
  },
  {
    slug: 'fakestore',
    title: 'FakeStore',
    category: 'API Projects',
    description: 'A modern e-commerce web app built using Fake Store API, featuring dynamic product loading, a localStorage-based cart system, and quantity management.',
    year: '2025',
    image: '/assets/projects/Fakestore/fakestore.jpg',
    technologies: ['JavaScript', 'API', 'HTML', 'CSS'],
    github: 'https://github.com/AhmedRaza186/FakeStore-API-project',
    live: 'https://ahmedraza186.github.io/FakeStore-API-project/',
    featured: false,
    caseStudy: {
      intro: 'A modern e-commerce web app built using Fake Store API, featuring dynamic product loading, a localStorage-based cart system, and quantity management.',
      solution: 'A modern e-commerce web app built using Fake Store API, featuring dynamic product loading, a localStorage-based cart system, and quantity management.'
    }
  },
  {
    slug: 'forkify',
    title: 'Forkify',
    category: 'API Projects',
    description: 'Forkify is a responsive recipe finder web app that allows users to search and explore over 1M recipes using an API with detailed recipe views and smooth navigation.',
    year: '2025',
    image: '/assets/projects/Forkify/forkify.jpg',
    technologies: ['JavaScript', 'API', 'HTML', 'CSS'],
    github: 'https://github.com/AhmedRaza186/Forkify',
    live: 'https://ahmedraza186.github.io/forkify/',
    featured: false,
    caseStudy: {
      intro: 'Forkify is a responsive recipe finder web app that allows users to search and explore over 1M recipes using an API with detailed recipe views and smooth navigation.',
      solution: 'Forkify is a responsive recipe finder web app that allows users to search and explore over 1M recipes using an API with detailed recipe views and smooth navigation.'
    }
  },
  {
    slug: 'newswave',
    title: 'NewsWave',
    category: 'API Projects',
    description: 'A dynamic news web app built with JavaScript and APIs, featuring real-time news fetching, category-based filtering, search functionality, and a fully responsive UI.',
    year: '2025',
    image: '/assets/projects/Newswave/newswave.jpg',
    technologies: ['JavaScript', 'API', 'HTML', 'CSS'],
    github: 'https://github.com/AhmedRaza186/NewsWave',
    live: 'https://ahmedraza186.github.io/NewsWave/',
    featured: false,
    caseStudy: {
      intro: 'A dynamic news web app built with JavaScript and APIs, featuring real-time news fetching, category-based filtering, search functionality, and a fully responsive UI.',
      solution: 'A dynamic news web app built with JavaScript and APIs, featuring real-time news fetching, category-based filtering, search functionality, and a fully responsive UI.'
    }
  },
  {
    slug: 'atmos',
    title: 'Atmos',
    category: 'API Projects',
    description: 'A mini weather app built using the OpenWeather API that fetches real-time data, handles API errors, and displays live weather updates.',
    year: '2025',
    image: '/assets/projects/Atmos/atmos.jpg',
    technologies: ['JavaScript', 'API', 'HTML', 'CSS'],
    github: 'https://github.com/AhmedRaza186/Atmos---The-weather-App',
    live: 'https://ahmedraza186.github.io/Atmos---The-weather-App/',
    featured: false,
    caseStudy: {
      intro: 'A mini weather app built using the OpenWeather API that fetches real-time data, handles API errors, and displays live weather updates.',
      solution: 'A mini weather app built using the OpenWeather API that fetches real-time data, handles API errors, and displays live weather updates.'
    }
  }
];
