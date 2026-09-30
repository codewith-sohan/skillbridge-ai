import type {Metadata} from 'next';
import './globals.css'; // Global styles

export const metadata: Metadata = {
  title: 'SkillBridge AI - Real-Time Skill-to-Job Alignment Platform',
  description: 'Smart India Hackathon 2026 - Real-Time Skill-to-Job Alignment & Employment Outcome Tracking Platform for Government, Institutes, Employers, and Students.',
  openGraph: {
    title: 'SkillBridge AI - Real-Time Skill-to-Job Alignment Platform',
    description: 'Smart India Hackathon 2026 - Real-Time Skill-to-Job Alignment & Employment Outcome Tracking Platform for Government, Institutes, Employers, and Students.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SkillBridge AI - Real-Time Skill-to-Job Alignment Platform',
    description: 'Smart India Hackathon 2026 - Real-Time Skill-to-Job Alignment & Employment Outcome Tracking Platform for Government, Institutes, Employers, and Students.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
