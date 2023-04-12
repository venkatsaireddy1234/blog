import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h1>Welcome to my website</h1>
      <p>Check out my <Link href="/blog">blog</Link></p>
    </div>
  );
}
