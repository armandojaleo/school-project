import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <h2 className="text-4xl font-bold mb-4">Not Found</h2>
      <p className="mb-4">Could not find the requested resource</p>
      <Link href="/dashboard" className="text-blue-500 hover:underline">
        Return to Dashboard
      </Link>
    </div>
  )
}