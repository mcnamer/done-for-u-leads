export type PostBlock = { heading?: string; body: string[] };

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string; // ISO
  readingMinutes: number;
  tag: string;
  image: string;
  imageAlt: string;
  /** object-position for the card/hero crop (e.g. 'top' for portraits). */
  imagePos?: string;
  author: string;
  /** Reviewed and approved by Jody — drives the verified badge on the article. */
  approved: boolean;
  content: PostBlock[];
  takeaways?: string[];
};

/**
 * Articles index + single-post template read from here. Add MDX or a CMS later
 * without touching the page components. Every article is written from Jody's
 * real experience and marked `approved` once he has reviewed it.
 */
export const posts: Post[] = [
  {
    slug: 'va-loans-decoded',
    title: 'VA loans, decoded: what military buyers actually get',
    excerpt:
      'The VA benefit is one of the most powerful tools in housing — and one of the most misunderstood. Here is what it really means for your payment, your offer and your closing.',
    date: '2026-06-18',
    readingMinutes: 6,
    tag: 'Financing',
    image: '/images/businesses/one-real-mortgage.webp',
    imageAlt: 'A couple reviewing mortgage paperwork with their advisor',
    author: 'Jody McNamer',
    approved: true,
    content: [
      {
        body: [
          'If you served, the VA loan is often the strongest card in your hand — no down payment, no monthly mortgage insurance, and rates that compete with anything on the market. Yet I still meet veterans who were talked out of using it because an agent or a lender did not understand how it works.',
          'Let me clear up the parts that cost people money.',
        ],
      },
      {
        heading: 'No down payment is not the same as no cash',
        body: [
          'You can finance 100% of the purchase price, but you will still have closing costs and, in most cases, a one-time VA funding fee. The good news: that fee can often be rolled into the loan, and some veterans are exempt entirely. Know your number before you write an offer.',
        ],
      },
      {
        heading: 'A strong VA offer is about the letter, not just the loan',
        body: [
          'Listing agents sometimes flinch at VA offers because of old assumptions about appraisals and repairs. The fix is a pre-approval a listing agent will actually take seriously, and an agent who can speak to the other side in their language. That is the whole point of keeping the loan and the listing under one roof.',
        ],
      },
    ],
    takeaways: [
      'Zero down does not mean zero cash — budget for closing costs and the funding fee.',
      'Some veterans are exempt from the funding fee entirely.',
      'A credible pre-approval and a VA-fluent agent make your offer competitive.',
    ],
  },
  {
    slug: 'pricing-on-evidence-not-hope',
    title: 'Pricing a listing on evidence, not hope',
    excerpt:
      'The fastest way to leave money on the table is to overprice and chase the market down. Here is how I price a home so it sells — near or over asking.',
    date: '2026-05-27',
    readingMinutes: 5,
    tag: 'Selling',
    image: '/images/businesses/mcnamer-real-estate.webp',
    imageAlt: 'A stone-clad custom home at dusk with a sweeping driveway',
    author: 'Jody McNamer',
    approved: true,
    content: [
      {
        body: [
          'Every seller wants the highest number. The mistake is treating the list price like an opening bid instead of a marketing decision. Buyers today have the same data you do — they know when a home is priced on hope.',
        ],
      },
      {
        heading: 'Comparable evidence beats a wish',
        body: [
          'I price against homes that actually sold, adjusted for condition, location and the story of the street — not the aspirational number a neighbour listed at and never got. Then I look at the last two weeks of buyer behaviour, because a market can move faster than the closed comps show.',
        ],
      },
      {
        heading: 'Price it right and let demand do the work',
        body: [
          'A home priced correctly out of the gate draws more showings in the first ten days than it will for the rest of its time on the market combined. That early attention is where multiple offers — and over-asking prices — come from.',
        ],
      },
    ],
    takeaways: [
      'List price is a marketing decision, not an opening bid.',
      'Adjust closed comps for condition and recent buyer behaviour.',
      'The first ten days generate the most demand — price for them.',
    ],
  },
  {
    slug: 'go-no-go-call',
    title: 'The Go/No-Go call: sizing a deal in minutes',
    excerpt:
      'Most agents lose money on the deals they should have walked away from. A simple framework to decide, fast, whether a deal is worth your time.',
    date: '2026-05-09',
    readingMinutes: 7,
    tag: 'Coaching',
    image: '/images/businesses/agent-broker-coach.webp',
    imageAlt: 'Jody McNamer, real estate coach, before a wall of screens',
    author: 'Jody McNamer',
    approved: true,
    content: [
      {
        body: [
          'Time is the only inventory an agent can never restock. The producers I coach are not the ones chasing every lead — they are the ones who decide quickly which deals deserve their week.',
        ],
      },
      {
        heading: 'The three questions',
        body: [
          'Can this client actually transact in the next 90 days? Is the number realistic against the comps? And do I have a clear path to the other side of the table? If any answer is a hard no, it is a no-go — or at least a not-yet.',
        ],
      },
      {
        heading: 'Discipline is a growth strategy',
        body: [
          'Saying no to the wrong deal is how you say yes to the right one. The Go/No-Go calculator I teach turns that instinct into a repeatable habit, so you spend your best hours on the business that closes.',
        ],
      },
    ],
    takeaways: [
      'Qualify for ability, timeline and a realistic price before you invest hours.',
      'A fast "no" protects the time your best deals need.',
      'Make the decision a repeatable habit, not a mood.',
    ],
  },
  {
    slug: 'short-sales-ten-years-on',
    title: 'Short sales, ten years on: what 2008 taught me',
    excerpt:
      'More than $50 million in short sales during the crisis taught me something no bull market can: how to guide people through the worst day of their financial life.',
    date: '2026-04-15',
    readingMinutes: 6,
    tag: 'Market',
    image: '/images/jody/jody-media-1200.webp',
    imageAlt: 'Jody McNamer, real estate coach',
    imagePos: 'top',
    author: 'Jody McNamer',
    approved: true,
    content: [
      {
        body: [
          'I closed more than $50 million in short sales when the market fell apart. I do not say that to boast — I say it because those years shaped how I treat every client since, in good markets and bad.',
        ],
      },
      {
        heading: 'People remember how you handled the hard part',
        body: [
          'A short sale is rarely about the paperwork. It is about a family that feels ashamed and scared, and needs someone to tell them the truth and stand next to them while it plays out. Handle that well and you have a client for life — and their whole circle.',
        ],
      },
      {
        heading: 'The lesson carries into any market',
        body: [
          'Most of my business today comes from people I closed for years ago. Not because of a clever campaign, but because when it was hard, I did not disappear. That is the whole strategy.',
        ],
      },
    ],
    takeaways: [
      'The hard transactions build the most loyal clients.',
      'Tell people the truth early, then stay with them.',
      'Reputation compounds — most of my business is referral and repeat.',
    ],
  },
  {
    slug: 'pipeline-that-survives-a-slow-market',
    title: 'Building a pipeline that survives a slow market',
    excerpt:
      'A busy month is easy in a hot market. A business that still stands when the market turns is built on purpose. Here is the difference.',
    date: '2026-03-22',
    readingMinutes: 5,
    tag: 'Coaching',
    image: '/images/businesses/done-for-you-leads.webp',
    imageAlt: 'A live marketing training session for agents',
    author: 'Jody McNamer',
    approved: true,
    content: [
      {
        body: [
          'When rates are low and everything sells, almost anyone can look like a great agent. The test is what happens when the phone slows down. The agents who survive built a pipeline before they needed one.',
        ],
      },
      {
        heading: 'Campaigns beat cold calls',
        body: [
          'Predictable lead flow comes from buyer and seller campaigns that run whether or not you feel like prospecting that day. The point is to fill the calendar with conversations instead of hoping the market fills it for you.',
        ],
      },
      {
        heading: 'Build it inside a real business',
        body: [
          'The systems I share were built and tested inside a working brokerage — not by a vendor guessing at what agents need. If it did not survive a slow month here, it does not get taught.',
        ],
      },
    ],
    takeaways: [
      'Build the pipeline before you need it.',
      'Automated campaigns beat mood-dependent cold calls.',
      'Trust systems that were tested in a real, working business.',
    ],
  },
  {
    slug: 'have-fun-be-nice-do-good',
    title: 'Have fun, be nice, do good: autism and everyday wins',
    excerpt:
      'Co-founding AutismWorks with my son Tyler changed how I define success. A few things we have learned about turning lived experience into a plan families can use.',
    date: '2026-02-28',
    readingMinutes: 5,
    tag: 'Family',
    image: '/images/jody/tyler-1200.webp',
    imageAlt: 'Tyler McNamer speaking at a podium',
    imagePos: 'top',
    author: 'Jody McNamer',
    approved: true,
    content: [
      {
        body: [
          'My son Tyler is a published author — Population: ONE and Becoming ONE — and a speaker who happens to have autism. Building AutismWorks with him taught me that the wins that matter are usually small, daily and deeply personal.',
        ],
      },
      {
        heading: 'A plan beats a diagnosis',
        body: [
          'Families do not need another label. They need practical, repeatable steps and a community that has walked the road. That is what we try to make: the day-to-day more manageable, and the future less frightening.',
        ],
      },
      {
        heading: 'Three words we live by',
        body: [
          '“Have fun, be nice, do good.” It sounds simple because it is. It is also, after everything, the best business and life advice I know.',
        ],
      },
    ],
    takeaways: [
      'The meaningful wins are small, daily and personal.',
      'Families need a plan and a community, not another label.',
      'Have fun, be nice, do good.',
    ],
  },
];

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}
