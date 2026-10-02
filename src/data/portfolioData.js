// Source of truth: Yash_Ranpura_Resume.pdf
export const person = {
  name: 'Yash Ranpura', title: 'MERN Stack Developer', focus: 'React.js · Frontend',
  email: 'yashranpura3@gmail.com', phone: '9737126164', location: 'Ahmedabad, Gujarat',
  linkedin: 'https://linkedin.com/in/yashranpura', resume: '/Yash_Ranpura_Resume.pdf',
  years: '1.9+',
  summary: 'MERN Stack Developer with 1.9+ years of professional experience designing, developing and deploying scalable web applications, with strong expertise in React.js, JavaScript, Redux and TanStack Query.',
  seeking: 'Open to MERN Stack Developer, React.js Developer and Full-Stack / Frontend Developer roles.',
  languages: 'English and Hindi (professional working), Gujarati (native)'
}
export const pillars = [
  ['Who', 'A MERN developer whose strongest work is in React.js and JavaScript (ES6+).'],
  ['What I build', 'Responsive, reusable UI components wired to RESTful APIs, with authentication and databases behind them.'],
  ['How I work', 'Across the full lifecycle: design, development, integration and deployment on Vercel, Netlify and cPanel.'],
  ['Focus', 'Clean, maintainable, efficient code and reliable, user-focused solutions.']
]
export const chains = [
  { id: 'ui', label: 'Interface', note: 'React Hooks, reusable components and state, fed by REST APIs through TanStack Query.',
    nodes: ['HTML5 & CSS3', 'Tailwind CSS', 'React.js', 'Redux', 'TanStack Query', 'REST APIs'] },
  { id: 'api', label: 'Server & data', note: 'Secure backend APIs with JWT authentication and authorization on MongoDB and MySQL.',
    nodes: ['Node.js', 'Express.js', 'JWT Auth', 'MongoDB', 'MySQL'] },
  { id: 'ship', label: 'Tooling & delivery', note: 'Version control, API testing, third-party and payment integrations, and hosting.',
    nodes: ['Git', 'GitHub', 'Postman', 'Vercel', 'Netlify', 'cPanel'] }
]
export const experience = [
  { when: '01/2025 – 09/2026', role: 'MERN Stack Developer', org: 'Maxgen Technologies Pvt. Ltd., Ahmedabad',
    points: ['Developed and maintained scalable full-stack web applications using React.js, JavaScript, Node.js, Express.js, MongoDB and MySQL.',
      'Built responsive, reusable UI components, integrated RESTful APIs, and implemented authentication and database solutions.',
      'Worked with Redux, TanStack Query, Tailwind CSS, Git and third-party integrations across multiple projects.'] },
  { when: '04/2023 – 05/2025', role: 'M.Sc. Information Technology', org: 'GLS University, Ahmedabad',
    points: ['Postgraduate studies in software development, programming, database management, web technologies and application development.'] }
]
export const projects = [
  { id: 'kevelion', name: 'Kevelion', kind: 'B2B e-commerce & marketplace', role: 'Primary focus: Vendor and Admin dashboards',
    blurb: 'Responsive dashboards for product, inventory, buyer, order, complaint, subscription and business management.',
    did: 'Built the dashboard interfaces, integrated REST APIs with TanStack Query, and implemented role-based access, reusable components and scalable workflows.',
    tech: ['React.js', 'JavaScript', 'Tailwind CSS', 'REST API', 'TanStack Query', 'RBAC', 'Git'],
    links: [['Website', 'https://kevelion.com'], ['Vendor dashboard', 'https://vendor.kevelion.com'], ['Admin dashboard', 'https://admin.kevelion.com']] },
  { id: 'hireme', name: 'Hire Me Jobs', kind: 'Recruitment management platform', role: 'Contributor: recruiter and super admin dashboards',
    blurb: 'Platforms for managing jobs, candidates, applications and hiring workflows.',
    did: 'Developed responsive React interfaces, integrated REST APIs with TanStack Query, implemented authentication and protected routes, and built search, filtering, pagination and reusable components.',
    tech: ['React.js', 'JavaScript', 'Tailwind CSS', 'TanStack Query', 'React Router', 'Protected routes', 'Git'],
    links: [['Super admin', 'https://manage.hiremejobs.in'], ['Company admin', 'https://recruiter.hiremejobs.in/dashboard']] },
  { id: 'ca', name: 'CA Management System', kind: 'Business & client management', role: 'Developer',
    blurb: 'A role-based panel with dedicated dashboards for Admin, Staff and Clients.',
    did: 'Implemented secure authentication and RBAC, task management, client document management for TDS, GST, KYC and financial records, and REST integration for services, invoices and data sync.',
    tech: ['React.js', 'JavaScript', 'REST API', 'Bootstrap', 'Tailwind CSS', 'Git'],
    links: [['Panel', 'https://ca-management-mu.vercel.app']] },
  { id: 'gram', name: 'Gram Ekta Foundation', kind: 'NGO website & admin panel', role: 'Contributor',
    blurb: 'A responsive site and admin panel showcasing rural community initiatives in education, clean water, farmer empowerment, sustainability and social welfare.',
    did: 'Developed reusable React components, integrated REST APIs for dynamic content management, and built responsive interfaces.',
    tech: ['React.js', 'JavaScript', 'Tailwind CSS', 'HTML5', 'REST API', 'Git'],
    links: [['Website', 'https://gramektafoundation.org'], ['Admin panel', 'https://admin.gramektafoundation.org']] },
  { id: 'meter', name: 'Only Meter India', kind: 'Taxi & ride booking website', role: 'Developer',
    blurb: 'A responsive website promoting the Only Meter India mobile app and its ride-booking services.',
    did: 'Built sections showcasing services, app features, ride booking information and business offerings, optimized for desktop and mobile.',
    tech: ['React.js', 'JavaScript', 'Tailwind CSS', 'REST API', 'Git'],
    links: [['Website', 'https://onlymeterindia.com']] },
  { id: 'more', name: 'House of Resha & Svakaraa', kind: 'E-commerce websites', role: 'Contributor (production and freelance)',
    blurb: 'Production-level and freelance e-commerce and business websites.',
    did: 'Frontend development, reusable components, API integration, authentication, responsive UI, state management, testing, optimization and deployment.',
    tech: ['React.js', 'JavaScript', 'Tailwind CSS', 'REST API', 'Git'],
    links: [['House of Resha', 'https://houseofresha.com'], ['Svakaraa', 'https://svakaraa.com']] }
]
