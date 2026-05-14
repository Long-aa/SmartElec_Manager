import Link from 'next/link';

export default function Home() { 
  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-6">
      <h1 className="text-4xl font-bold text-white">SmartElec Manager</h1>
      <Link href="/login" className="btn-gradient max-w-xs text-center">
        Go to Admin Login
      </Link>
    </div>
  ); 
}