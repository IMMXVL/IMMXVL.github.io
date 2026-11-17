// All content is taken from Maxim_Velichko_Frontend_Engineer.pdf.
// Do not add metrics here unless you can explain how they were measured.

export const profile = {
  name: 'Maxim Velichko',
  title: 'Frontend Engineer (React, TypeScript)',
  location: 'Minsk, Belarus',
  timeZone: 'Europe/Minsk',
  tagline: 'I build fast, accessible interfaces with React and TypeScript.',
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
    items: ['React', 'Redux', 'Tailwind CSS'],
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
    period: 'September 2021 – December 2026',
    stack: ['React', 'TypeScript', 'Redux', 'Shopify', 'Material UI', 'Ant Design', 'Swagger'],
    bullets: [
      'Built and maintained production frontends in React and TypeScript: e-commerce, including Shopify, a social product, and complex single-page applications.',
      'Improved loading and interaction with code splitting, lazy loading, and tighter rendering and state updates. Core Web Vitals on these projects got better.',
      'Built a shared component library on Material UI and Ant Design. It cut development time for new features by 20–30% and kept the UI consistent across projects.',
      'Integrated REST APIs described in Swagger, including errors, authentication, and validation. Took part in architecture discussions, estimation, and code reviews.',
    ],
  },
]

export const projects = [
  {
    period: 'Oct – Dec 2026',
    type: 'Portal',
    title: 'Portal for car sellers',
    about:
      'A continuation of the car sales website, now a portal for the people who sell the cars.',
    did: [
      'Built the seller portal as the next stage of the car sales website.',
    ],
    stack: ['React', 'Material UI', 'Firebase', 'SCSS'],
  },
  {
    period: 'Jul – Sep 2026',
    type: 'Healthcare',
    title: 'Medical platform with admin and patient dashboards',
    about:
      'A medical platform with a separate dashboard for administrators and one for patients.',
    did: [
      'Built the admin and patient dashboards.',
      'Built the UI and connected it to the backend.',
    ],
    stack: [],
  },
  {
    period: 'Feb – Jun 2026',
    type: 'Dashboard',
    title: 'Gaming club management dashboard',
    about:
      'A dashboard for gaming clubs to track and control their gaming machines, with many metrics and analytics.',
    did: [
      'Built the dashboard with many metrics and analysis views for the club owners.',
      'Implemented authorization and role-based access for different user types.',
    ],
    stack: ['React', 'Tailwind CSS', 'JavaScript', 'Git'],
  },
  {
    period: 'Nov 2025 – Dec 2026',
    type: 'Social platform',
    title: 'Social network for employers and job seekers',
    about:
      'A social network that connects employers with people who are looking for work.',
    did: [
      'Built interactive pages and modular React components on Material UI.',
      'Connected the interface to backend APIs described in Swagger, so screens work with live, dynamic data.',
    ],
    stack: ['React', 'Material UI', 'Swagger', 'GitHub'],
  },
  {
    period: 'Mar 2024 – Sep 2025',
    type: 'Automotive',
    title: 'Car sales website',
    about: 'A website for selling cars online.',
    did: [
      'Built reusable, accessible components on Material UI in line with the design system.',
      'Integrated the frontend with backend services and Firebase.',
      'Estimated tasks, took part in sprint planning and researched tools that improved the workflow.',
    ],
    stack: ['React', 'Material UI', 'Firebase', 'SCSS'],
  },
  {
    period: 'Sep 2023 – Feb 2024',
    type: 'Single-page app',
    title: 'Single-page application',
    about:
      'A complex single-page application with state management and a component-based interface.',
    did: [
      'Built reusable, typed components with TypeScript and Material UI.',
      'Integrated backend APIs with authentication and kept application state in Redux.',
    ],
    stack: ['React', 'TypeScript', 'Redux', 'Material UI', 'SCSS'],
  },
  {
    period: 'Feb – Mar 2023',
    type: 'Booking',
    title: 'Reservation platform for premium restaurants',
    about: 'A platform for booking tables at high-end restaurants.',
    did: [
      'Fixed frontend issues so every page stayed responsive and visually consistent.',
    ],
    stack: ['React', 'JavaScript', 'SCSS'],
  },
  {
    period: 'Nov 2022 – Jul 2023',
    type: 'E-commerce',
    title: 'E-commerce website and dashboard',
    about: 'An online store with a dashboard for managing it.',
    did: [
      'Built reusable components and screens in React.',
      'Connected the interface to backend APIs and managed data with Redux.',
    ],
    stack: ['React', 'Redux', 'JavaScript', 'SCSS'],
  },
  {
    period: 'Jul – Aug 2022',
    type: 'CMS',
    title: 'Corporate website on Sitefinity CMS',
    about:
      'A corporate website whose content is managed in the Sitefinity CMS.',
    did: [
      'Fixed rendering issues and improved page templates.',
      'Kept content-managed pages responsive and consistent in design.',
    ],
    stack: ['Sitefinity', '.NET', 'CSS'],
  },
  {
    period: 'Jan – May 2022',
    type: 'Shopify',
    title: 'Product landing pages on Shopify',
    about:
      'Landing pages that present a brand’s products inside its Shopify store.',
    did: [
      'Built conversion-focused landing pages with Liquid, HTML, SCSS and JavaScript.',
    ],
    stack: ['Shopify', 'Liquid', 'SCSS', 'JavaScript'],
  },
  {
    period: 'Dec 2021 – Jun 2022',
    type: 'Fitness',
    title: 'Exercise and workout tracker',
    about: 'An app for tracking exercise and workouts.',
    did: [
      'Built reusable interface components on Ant Design.',
      'Connected screens to backend APIs and managed state with Redux.',
    ],
    stack: ['React', 'Redux', 'Ant Design', 'JavaScript'],
  },
  {
    period: 'Dec 2021 – May 2022',
    type: 'Shopify app',
    title: 'Paid memberships app for Shopify stores',
    about:
      'A Shopify app that lets online stores sell paid memberships to their customers.',
    did: [
      'Built modular, accessible components for membership features that fit the Shopify ecosystem.',
      'Integrated backend and third-party APIs with secure authentication.',
    ],
    stack: ['React', 'Redux', 'Ant Design', 'SCSS'],
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
