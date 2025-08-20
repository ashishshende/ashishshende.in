import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ashish Shende - Full Stack Developer | MERN Stack Expert",
  description: "Experienced Full Stack Developer specializing in MERN stack, React, Node.js, and modern web technologies. Available for freelance projects and collaborations.",
  keywords: "Full Stack Developer, MERN Stack, React, Node.js, JavaScript, TypeScript, Web Development, Freelancer, Ashish Shende",
  authors: [{ name: "Ashish Shende" }],
  creator: "Ashish Shende",
  publisher: "Ashish Shende",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ashishshende.dev",
    title: "Ashish Shende - Full Stack Developer | MERN Stack Expert",
    description: "Experienced Full Stack Developer specializing in MERN stack, React, Node.js, and modern web technologies.",
    siteName: "Ashish Shende Portfolio",
    images: [
      {
        url: "/avatar.jpg",
        width: 1200,
        height: 630,
        alt: "Ashish Shende - Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ashish Shende - Full Stack Developer",
    description: "Experienced Full Stack Developer specializing in MERN stack and modern web technologies.",
    images: ["/avatar.jpg"],
  },
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#1f2937",
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-icon',
  },
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://ashishshende.dev" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Ashish Shende",
              jobTitle: "Full Stack Developer",
              description: "Experienced Full Stack Developer specializing in MERN stack, React, Node.js, and modern web technologies.",
              url: "https://ashishshende.dev",
              email: "ashish.shende034@gmail.com",
              image: "/avatar.jpg",
              sameAs: [
                "https://github.com/ashishshende",
                "https://linkedin.com/in/ashishshende"
              ],
              knowsAbout: [
                "JavaScript",
                "TypeScript",
                "React",
                "Node.js",
                "MongoDB",
                "Express.js",
                "Next.js",
                "Full Stack Development"
              ]
            })
          }}
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}