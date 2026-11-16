// All content is taken from Maxim_Velichko_Frontend_Engineer.pdf.
// Do not add metrics here unless you can explain how they were measured.

export const profile = {
  name: 'Maxim Velichko',
  title: 'Frontend Engineer (React, TypeScript)',
  location: 'Minsk, Belarus',
  email: 'immaxvel@gmail.com',
  linkedin: 'https://linkedin.com/in/immaxvel',
  github: 'https://github.com/ImmaxvelSolbeg',
  cvPath: '/cv.pdf',
  summary:
    'Frontend Engineer with 5+ years of commercial experience specializing in React, TypeScript, and the modern JavaScript ecosystem. ' +
    'Delivered scalable web applications, including e-commerce platforms and complex single-page applications. ' +
    'Focused on frontend architecture, performance (Core Web Vitals), reusable component libraries, and accessible UI. ' +
    'Works closely with designers and product teams and mentors junior developers.',
  note: 'Commercial projects are private and covered by NDA. Details are shared on request.',
  // Visible to anyone, including the current employer. Set to null to hide the badge.
  availability: 'Open to new frontend roles' as string | null,
}

export const highlights = [
  { value: '5+', label: 'years of commercial experience' },
  { value: 'React + TS', label: 'core stack in production' },
  { value: 'Since 2021', label: 'shipping e-commerce, social and SPA products' },
]

export const skillGroups: { label: string; items: string[] }[] = [
  {
    label: 'Languages',
    items: ['JavaScript (ES6+)', 'TypeScript', 'HTML5', 'CSS3 / SCSS'],
  },
  {
    label: 'Frameworks and libraries',
    items: ['React', 'Redux', 'Next.js (basic)', 'Vue.js (basic)'],
  },
  {
    label: 'UI',
    items: ['Material UI', 'Ant Design', 'Responsive design', 'Figma to code', 'Accessible UI'],
  },
  {
    label: 'Data and APIs',
    items: ['REST APIs', 'Swagger / OpenAPI', 'JSON', 'Authentication flows'],
  },
  {
    label: 'Performance',
    items: ['Core Web Vitals', 'Code splitting', 'Lazy loading', 'Bundle optimization', 'Chrome DevTools'],
  },
  {
    label: 'Tools',
    items: ['Git', 'GitHub', 'Docker', 'Firebase', 'WebStorm', 'Jira', 'Agile / Scrum'],
  },
]

export const experience = [
  {
    role: 'Frontend Developer',
    company: 'Gexateq',
    place: 'Minsk / Remote',
    period: 'September 2021 – Present',
    bullets: [
      'Developed and maintained scalable frontend applications with React and TypeScript across several production projects, including e-commerce platforms, social networks, and complex SPAs.',
      'Improved application performance and Core Web Vitals through code splitting, lazy loading, rendering optimization, and state management.',
      'Built and maintained reusable component libraries to keep UI consistent across projects.',
      'Integrated REST APIs and Swagger-based backend services, including error handling, authentication flows, and data validation.',
      'Worked with designers and product teams on accessible interfaces using Material UI and Ant Design.',
      'Took part in architecture discussions, sprint planning, effort estimation, code reviews, and technical decisions.',
      'Developed modular web components and integrated third-party services within the Shopify ecosystem, including paid membership solutions.',
    ],
  },
  {
    role: 'Trainee Frontend Developer',
    company: 'Solbeg',
    place: 'Remote',
    period: 'June 2021 – August 2021',
    bullets: [
      'First commercial experience in frontend development with JavaScript, HTML, CSS, and React.',
      'Worked with senior developers, completed assigned tasks independently, and followed development best practices.',
    ],
  },
  {
    role: 'Frontend Development Trainee',
    company: 'IT Academy',
    place: 'Minsk',
    period: 'February 2020 – March 2021',
    bullets: [
      'Intensive frontend program focused on JavaScript, React, HTML, CSS, and modern web development practices.',
      'Built practical training projects.',
    ],
  },
]

// Case studies are written without client names and without code.
// Each one describes the problem, my role, the decisions, and the outcome as stated in the CV.
export const cases = [
  {
    title: 'Performance on production SPAs',
    context: 'E-commerce platforms, social networks, and complex single-page applications.',
    problem: 'Large React applications needed faster loading and smoother interaction.',
    role: 'Frontend developer on several production projects.',
    decisions: [
      'Applied code splitting and lazy loading.',
      'Optimized rendering and state management.',
    ],
    outcome: 'Improved Core Web Vitals on production projects.',
  },
  {
    title: 'Reusable component library',
    context: 'Several frontend projects built on Material UI and Ant Design.',
    problem: 'Similar UI was rebuilt for each feature, and the interface drifted between projects.',
    role: 'Built and maintained reusable components and worked with designers on accessible interfaces.',
    decisions: [
      'Moved repeated UI into shared components.',
      'Used Material UI and Ant Design as the base and kept the visual style consistent.',
    ],
    outcome: 'Reduced development time for new features and kept the UI consistent across projects.',
  },
  {
    title: 'API integration with authentication and validation',
    context: 'Products that depend on REST APIs described with Swagger.',
    problem: 'Frontend screens break when API errors, authentication, or unexpected data are not handled.',
    role: 'Integrated backend services into the frontend.',
    decisions: [
      'Added error handling to API integration.',
      'Implemented authentication flows and data validation.',
    ],
    outcome: 'Reliable data flow between the frontend and backend services.',
  },
]

export const education = {
  degree: "Bachelor's Degree in Biology",
  school: 'Belarusian State University',
  year: '2016',
}

export const languages = [
  { name: 'English', level: 'B2 — upper-intermediate, professional working proficiency' },
  { name: 'Russian', level: 'Native' },
]
