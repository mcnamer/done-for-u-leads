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
 * Articles index + single-post template read from here. These are the real
 * Done For You Leads field tips — the topics Jody has published for agents,
 * carried over from the original site and written up in his voice.
 */
export const posts: Post[] = [
  {
    slug: 'expired-raw-land-listings',
    title: 'Easily convert expired raw-land listings into thousands in commissions',
    excerpt:
      'Here is a simple strategy that brings tremendous value to raw-land owners who have already tried to sell — and turns their frustration into a steady stream of buyers and sellers for you.',
    date: '2026-05-28',
    readingMinutes: 4,
    tag: 'Listings',
    image: '/images/businesses/mcnamer-real-estate.webp',
    imageAlt: 'A parcel of open land at dusk',
    author: 'Jody McNamer',
    approved: true,
    content: [
      {
        body: [
          'Most agents skip raw land. It is harder to market than a house, the listings sit, and a lot of them expire without selling. That is exactly why there is money in it — the owners are motivated, and almost nobody is calling them with a real plan.',
        ],
      },
      {
        heading: 'Start with the owner nobody called back',
        body: [
          'Pull the expired raw-land listings in your area. These are owners who wanted to sell, hired someone, and got nothing. When you show up with a specific strategy for marketing land — not the same script they heard for their house — you stand out immediately.',
        ],
      },
      {
        heading: 'Bring a plan, not a pitch',
        body: [
          'Land buyers are found differently than home buyers. Show the owner how you will reach them, and you have earned the listing. Do it a few times and raw land becomes a niche most of your competition will not touch — steady buyers on one side, motivated sellers on the other.',
        ],
      },
    ],
    takeaways: [
      'Expired raw-land listings are motivated sellers almost no one is working.',
      'Win them by marketing land differently than a house.',
      'A land niche feeds you buyers and sellers at once.',
    ],
  },
  {
    slug: 'ten-listing-prospects-from-an-open-house',
    title: 'Add 10 high-quality listing prospects to your database in under an hour',
    excerpt:
      'Open houses are treated as a way to find buyers. Their real value is the list of high-quality seller leads you walk away with — if you run them the right way.',
    date: '2026-05-14',
    readingMinutes: 4,
    tag: 'Prospecting',
    image: '/images/businesses/done-for-you-leads.webp',
    imageAlt: 'An open house sign in front of a home',
    author: 'Jody McNamer',
    approved: true,
    content: [
      {
        body: [
          'Ask most agents why they hold an open house and they will say "to find a buyer." Sometimes that happens. But the people walking through are overwhelmingly neighbors and nearby owners — future sellers standing in your open house, for free.',
        ],
      },
      {
        heading: 'The neighbors are the lead',
        body: [
          'Half the visitors to a typical open house live within a mile. They are curious what the house down the street is worth, which means they are quietly thinking about their own. That is a seller lead wearing a "just looking" badge.',
        ],
      },
      {
        heading: 'Capture, then follow up',
        body: [
          'Get the name, get the conversation, and add them to your database the same day. Ten good prospects from a single afternoon is a normal result — and follow-up over the next months is where those turn into listings.',
        ],
      },
    ],
    takeaways: [
      'Open houses generate seller leads, not just buyer leads.',
      'Most visitors are nearby owners thinking about their own move.',
      'Capture every name and follow up — that is where listings come from.',
    ],
  },
  {
    slug: 'find-investors-worth-your-time',
    title: 'How to find investors who have money and will not waste your time',
    excerpt:
      'Investors can be a complete waste of time — or a source of repeat business. The ones worth working have cash, close quickly, and are highly motivated. Here is how to tell them apart.',
    date: '2026-04-30',
    readingMinutes: 4,
    tag: 'Investors',
    image: '/images/businesses/agent-broker-coach.webp',
    imageAlt: 'An investor reviewing property numbers',
    author: 'Jody McNamer',
    approved: true,
    content: [
      {
        body: [
          'Every agent has burned an afternoon on a "cash investor" who turned out to be a tire-kicker with a spreadsheet and no money. The real ones are different: they have cash, they close quickly, and they are motivated to keep buying. Find those and you have a client who comes back.',
        ],
      },
      {
        heading: 'Qualify before you drive',
        body: [
          'Real investors can tell you their buy box, their proof of funds, and their last three deals without hesitating. If those answers are fuzzy, you have your answer. Ask early — it is not rude, it is professional, and serious investors respect it.',
        ],
      },
      {
        heading: 'Loyalty cuts both ways',
        body: [
          'Once you develop loyalty with a good investor, that relationship also becomes a steady source of high-quality listings — the properties they buy, improve, and sell again. One qualified investor can be years of repeat business.',
        ],
      },
    ],
    takeaways: [
      'Cash, speed, and motivation separate real investors from time-wasters.',
      'Qualify up front — buy box, proof of funds, recent deals.',
      'A loyal investor is repeat business and a listing pipeline.',
    ],
  },
  {
    slug: 'build-relationships-with-fsbos',
    title: "Build a relationship with For-Sale-By-Owners that creates listings",
    excerpt:
      'FSBOs can be a fantastic source of listings. Most do not understand the value an agent brings — and some have been burned before. The move is to add real value early, before you ever ask for anything.',
    date: '2026-04-16',
    readingMinutes: 4,
    tag: 'FSBO',
    image: '/images/businesses/one-real-mortgage.webp',
    imageAlt: 'A homeowner outside their house',
    author: 'Jody McNamer',
    approved: true,
    content: [
      {
        body: [
          'For Sale By Owner sellers are not anti-agent — they are anti-getting-nothing-for-the-commission. Many have never had an agent show them real value, and some had a bad experience they have not forgotten. Lead with value and the wall comes down.',
        ],
      },
      {
        heading: 'Give before you ask',
        body: [
          'Offer something genuinely useful with no strings — a realistic pricing read, a buyer you already know, help with a form. When you solve a problem before asking for the listing, you stop being "another agent calling" and become the person who actually helped.',
        ],
      },
      {
        heading: 'Most FSBOs eventually list',
        body: [
          'A large share of FSBOs end up hiring an agent. If you are the one who added value early and stayed in touch without pressure, you are the obvious choice when they decide selling it alone is harder than it looked.',
        ],
      },
    ],
    takeaways: [
      'FSBOs resist paying for nothing — not agents themselves.',
      'Add real value early, with no strings attached.',
      'Stay in touch: most FSBOs eventually list with someone.',
    ],
  },
  {
    slug: 'warm-calls-not-cold-calls',
    title: 'Make “warm” calls, not cold calls',
    excerpt:
      'Cold calling is miserable because the person on the other end has no reason to trust you yet. Warm calling flips that — you reach out with context, a reason, and something they actually care about.',
    date: '2026-04-02',
    readingMinutes: 4,
    tag: 'Conversion',
    image: '/images/jody/jody-media-1200.webp',
    imageAlt: 'Jody McNamer on a call',
    imagePos: 'top',
    author: 'Jody McNamer',
    approved: true,
    content: [
      {
        body: [
          'The reason cold calling feels awful is that it is a stranger interrupting a stranger. Warm calling is not a personality trait — it is a setup. You do the work that gives the call a reason to exist before you ever dial.',
        ],
      },
      {
        heading: 'Earn the context first',
        body: [
          'Warm calls start from a real connection: they came to your open house, downloaded your market report, engaged with something you posted, or were referred by someone they trust. Now the call is not an interruption — it is a follow-up they half expect.',
        ],
      },
      {
        heading: 'This is what a lead engine is for',
        body: [
          'The whole point of running proper campaigns is that the phone conversations start warm. When the right message reaches the right person first, "calling leads" stops feeling like cold calling — because it no longer is.',
        ],
      },
    ],
    takeaways: [
      'Cold calling fails because there is no context or trust.',
      'Warm calls follow a real interaction the prospect remembers.',
      'Good marketing exists so every call starts warm.',
    ],
  },
  {
    slug: 'hidden-homes-from-canceled-and-expired',
    title: 'Find your buyer a hidden home in canceled and expired listings',
    excerpt:
      'Here is a tip that adds outstanding value for your buyers and generates a consistent flow of seller leads at the same time: go looking where other agents are not.',
    date: '2026-03-19',
    readingMinutes: 4,
    tag: 'Buyers',
    image: '/images/businesses/mcnamer-real-estate.webp',
    imageAlt: 'A home that recently came off the market',
    author: 'Jody McNamer',
    approved: true,
    content: [
      {
        body: [
          'When inventory is tight, everyone fights over the same active listings. Meanwhile there is a shadow inventory hiding in plain sight: homes whose listings were canceled or expired. The owners still want to sell — the last attempt just did not work.',
        ],
      },
      {
        heading: 'Two wins from one search',
        body: [
          'For your buyer, you surface homes no one else is showing them. For your business, every one of those owners is a warm seller lead who just learned that selling is harder than they thought. One search, value on both sides.',
        ],
      },
      {
        heading: 'Approach with a solution',
        body: [
          'Reach out on behalf of a real, qualified buyer and you are not "prospecting" — you are bringing a possible sale. That is the kind of call an expired seller is glad to take.',
        ],
      },
    ],
    takeaways: [
      'Canceled and expired listings are motivated sellers hiding in plain sight.',
      'They double as fresh homes for your buyers.',
      'Lead with a qualified buyer, not a pitch.',
    ],
  },
  {
    slug: 'investor-properties-without-the-mls',
    title: 'An easy way to find great investor properties without the MLS',
    excerpt:
      'A little-known tip for finding investor properties off-market — the kind of deals that keep your investor clients loyal and coming back to you first.',
    date: '2026-03-05',
    readingMinutes: 4,
    tag: 'Investors',
    image: '/images/businesses/agent-broker-coach.webp',
    imageAlt: 'A property with value-add potential',
    author: 'Jody McNamer',
    approved: true,
    content: [
      {
        body: [
          'The best investor deals rarely hit the MLS — by the time they do, the margin is gone. If you want to be the agent an investor calls first, you have to bring them properties their competition never sees.',
        ],
      },
      {
        heading: 'Look where the motivation is',
        body: [
          'Off-market opportunity clusters around specific situations — distressed owners, tired landlords, inherited property, code and tax pressure. Build a simple, repeatable way to reach those owners directly and you create supply that does not exist on the open market.',
        ],
      },
      {
        heading: 'Off-market deals build loyalty',
        body: [
          'Hand an investor a deal they could not have found themselves and you stop being interchangeable. That is how one investor relationship turns into years of transactions — and a steady stream of the listings those properties become later.',
        ],
      },
    ],
    takeaways: [
      'The best investor deals are gone before they reach the MLS.',
      'Reach motivated owners directly to create off-market supply.',
      'Off-market deals make you the agent investors call first.',
    ],
  },
];

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}
