export type TeamMember = {
  name: string;
  role: string;
  initials: string;
  image?: string;
};

/** The real Done For You Leads team, carried over from the original site. */
export const team: TeamMember[] = [
  {
    name: 'Jody McNamer',
    role: 'Director of Digital Strategy',
    initials: 'JM',
    image: '/images/jody/jody-standing-1200.webp',
  },
  { name: 'Jeana Poole', role: 'Senior Operations Specialist', initials: 'JP' },
  {
    name: 'Awais Mahmood',
    role: 'Managing Director of Technology & Digital Services',
    initials: 'AM',
  },
  { name: 'Maria Pamorada', role: 'Manager, Social Media & PR', initials: 'MP' },
];
