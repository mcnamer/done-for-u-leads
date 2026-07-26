import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().trim().min(2, 'Enter your name.').max(80, 'That name is too long.'),
  email: z.string().trim().email('Enter an email address we can reply to.'),
  phone: z.string().trim().max(30, 'That phone number is too long.').optional().or(z.literal('')),
  topic: z.enum(['real-estate', 'mortgage', 'coaching', 'leads', 'autism', 'other'], {
    errorMap: () => ({ message: 'Pick the closest topic.' }),
  }),
  message: z
    .string()
    .trim()
    .min(20, 'Give Jody a little more to work with — 20 characters minimum.')
    .max(2000, 'Keep it under 2,000 characters.'),
  /** Honeypot: real people leave this empty. */
  company: z.string().max(0).optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;

export const topicLabels: Record<ContactInput['topic'], string> = {
  'real-estate': 'Buying, selling or investing',
  mortgage: 'Financing or a loan question',
  coaching: 'Coaching for my business',
  leads: 'Lead generation',
  autism: 'AutismWorks',
  other: 'Something else',
};
