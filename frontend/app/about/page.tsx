import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function About() {
  return (
    <main className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-6 py-4 border-b">
        <Link href="/" className="text-2xl font-bold text-blue-600 hover:opacity-80">
          ZYM
        </Link>
        <div className="flex gap-6">
          <Link href="/" className="text-gray-600 hover:text-gray-900">
            Home
          </Link>
          <Link href="/pricing" className="text-gray-600 hover:text-gray-900">
            Pricing
          </Link>
          <Link href="/about" className="text-blue-600 font-semibold">
            About
          </Link>
          <Link href="/contact" className="text-gray-600 hover:text-gray-900">
            Contact
          </Link>
        </div>
        <Link href="/login">
          <Button variant="outline">Login</Button>
        </Link>
      </nav>

      {/* About Section */}
      <section className="px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold mb-6">About ZYM Dashboard</h1>
          <p className="text-xl text-gray-600 mb-8">
            We&apos;re on a mission to modernize gym management with technology that&apos;s simple, powerful, and
            affordable.
          </p>

          <div className="bg-blue-50 border-l-4 border-blue-600 p-8 mb-12">
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="text-gray-700 text-lg">
              To empower gym owners worldwide with tools they need to manage their business efficiently, grow their
              member base, and deliver exceptional experiences to their members.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 my-16">
            <div>
              <h3 className="text-2xl font-bold mb-4">Why We Started</h3>
              <p className="text-gray-600 mb-4">
                We noticed that gym owners were spending hours on administrative tasks, managing spreadsheets, and
                dealing with inefficient processes. We decided to build a solution that would free up their time.
              </p>
              <p className="text-gray-600">
                Today, ZYM Dashboard helps hundreds of gyms streamline their operations and focus on what matters most:
                helping their members achieve their fitness goals.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-4">Our Values</h3>
              <ul className="space-y-4">
                {[
                  { title: 'Simplicity', desc: 'Technology should be easy to use' },
                  { title: 'Reliability', desc: 'Your data is safe with us' },
                  { title: 'Innovation', desc: 'We continuously improve' },
                  { title: 'Support', desc: "We're here to help you succeed" },
                ].map((value, idx) => (
                  <li key={idx} className="flex gap-3">
                    <div className="text-blue-600 font-bold">●</div>
                    <div>
                      <h4 className="font-semibold">{value.title}</h4>
                      <p className="text-gray-600 text-sm">{value.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-gray-50 p-12 rounded-lg my-16">
            <h2 className="text-3xl font-bold mb-8 text-center">By The Numbers</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { number: '500+', label: 'Gyms' },
                { number: '50K+', label: 'Members' },
                { number: '$10M+', label: 'Managed' },
                { number: '99.9%', label: 'Uptime' },
              ].map((stat, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">{stat.number}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Join Us?</h2>
            <p className="text-gray-600 text-lg mb-8">
              Start managing your gym more efficiently today.
            </p>
            <Link href="/register">
              <Button size="lg">Get Started Free</Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
