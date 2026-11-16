// All content is taken from Maxim_Velichko_Frontend_Engineer.pdf.
// Do not add metrics here unless you can explain how they were measured.

export const profile = {
  name: 'Maxim Velichko',
  title: 'Frontend Engineer (React, TypeScript)',
  location: 'Minsk, Belarus',
  email: 'immaxvel@gmail.com',
  linkedin: 'https://linkedin.com/in/immaxvel',
  github: 'https://github.com/IMMXVL',
  cvPath: `${import.meta.env.BASE_URL}cv.pdf`,
  summary:
    'Frontend Engineer with 5+ years of commercial experience specializing in React, TypeScript, and the modern JavaScript ecosystem. ' +
    'Delivered scalable web applications, including e-commerce platforms and complex single-page applications. ' +
    'Focused on frontend architecture, performance (Core Web Vitals), reusable component libraries, and accessible UI. ' +
    'Works closely with designers and product teams.',
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
    items: ['React', 'Redux'],
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
      'Built and maintained production frontends in React and TypeScript: e-commerce, including Shopify, a social product, and complex single-page applications.',
      'Improved loading and interaction with code splitting, lazy loading, and tighter rendering and state updates. Core Web Vitals on these projects got better.',
      'Built a shared component library on Material UI and Ant Design so the interface stayed consistent and new screens reused the same components.',
      'Integrated REST APIs described in Swagger, including errors, authentication, and validation. Took part in architecture discussions, estimation, and code reviews.',
    ],
  },
]

// Cases are written from the CV. No client name, no code, no metrics that are not already stated.
export const cases = [
  {
    title: 'Faster loading on a large React app',
    context: 'A production single-page application. The product name stays under NDA.',
    problem:
      'The first load pulled in too much of the app, and heavy screens re-rendered more than the interaction needed.',
    role: 'Frontend developer responsible for the performance work.',
    decisions: [
      'Split the app by route and feature and lazy-loaded those parts instead of shipping them in the first bundle.',
      'Found the screens that re-rendered too often and narrowed how state updates reached them.',
    ],
    outcome: 'Core Web Vitals on the production app improved.',
  },
  {
    title: 'Reusable component library',
    context: 'Several frontend projects built on Material UI and Ant Design.',
    problem: 'Similar UI was rebuilt for each feature, and the interface drifted between projects.',
    role: 'Built and maintained the shared components and worked with designers on accessible interfaces.',
    decisions: [
      'Moved repeated UI into shared components.',
      'Used Material UI and Ant Design as the base and kept the visual style consistent.',
    ],
    outcome: 'New features reused the same components, and the UI stayed consistent across projects.',
  },
  {
    title: 'API integration with authentication and validation',
    context: 'Products that depend on REST APIs described with Swagger.',
    problem: 'Screens break when API errors, authentication, or unexpected data are not handled.',
    role: 'Integrated backend services into the frontend.',
    decisions: [
      'Added error handling to every API call.',
      'Implemented authentication flows and data validation before data reaches the UI.',
    ],
    outcome: 'A reliable data flow between the frontend and backend services.',
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
