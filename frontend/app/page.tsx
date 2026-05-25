import Link from "next/link";
import { Button } from "@/components/ui/button";

interface Feature {
  title: string;
  description: string;
}

interface Plan {
  name: string;
  price: string;
  features: string[];
}

const features: Feature[] = [
  {
    title: "Member Management",
    description: "Easily manage all your gym members with detailed profiles",
  },
  {
    title: "Payment Tracking",
    description: "Automated billing and payment management system",
  },
  {
    title: "Attendance System",
    description: "QR code based attendance tracking",
  },
  {
    title: "Workout Plans",
    description: "Create and assign personalized workout routines",
  },
  {
    title: "Diet Management",
    description: "Manage nutrition plans for your members",
  },
  {
    title: "Analytics",
    description: "Comprehensive insights and reports",
  },
];

const plans: Plan[] = [
  {
    name: "Basic",
    price: "$99",
    features: ["Up to 100 members", "Basic analytics", "Email support"],
  },
  {
    name: "Pro",
    price: "$299",
    features: ["Up to 500 members", "Advanced analytics", "Phone support"],
  },
  {
    name: "Enterprise",
    price: "Custom",
    features: ["Unlimited members", "Custom features", "24/7 support"],
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-6 py-4 border-b">
        <Link
          href="/"
          className="text-2xl font-bold text-blue-600 hover:opacity-80"
        >
          ZYM
        </Link>
        <div className="hidden md:flex gap-6">
          <Link
            href="/"
            className="text-gray-600 hover:text-gray-900 transition"
          >
            Home
          </Link>
          <Link
            href="/pricing"
            className="text-gray-600 hover:text-gray-900 transition"
          >
            Pricing
          </Link>
          <Link
            href="/about"
            className="text-gray-600 hover:text-gray-900 transition"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="text-gray-600 hover:text-gray-900 transition"
          >
            Contact
          </Link>
        </div>
        <div className="flex gap-3">
          <Link href="/login">
            <Button variant="outline">Login</Button>
          </Link>
          <Link href="/register">
            <Button>Sign Up</Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-6 py-20 text-center bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <h1 className="text-5xl font-bold mb-4">Welcome to ZYM Dashboard</h1>
        <p className="text-xl mb-8 text-blue-100">
          The complete gym management solution for modern gyms
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
            Start Free Trial
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="text-white border-white hover:bg-blue-700"
          >
            Watch Demo
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-20">
        <h2 className="text-4xl font-bold text-center mb-12">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="p-6 border rounded-lg hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section className="px-6 py-20 bg-gray-50">
        <h2 className="text-4xl font-bold text-center mb-12">Pricing Plans</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`p-8 rounded-lg border-2 ${
                idx === 1 ? "border-blue-600 bg-blue-50" : "border-gray-200"
              }`}
            >
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <p className="text-3xl font-bold text-blue-600 mb-4">
                {plan.price}
                <span className="text-lg">/mo</span>
              </p>
              <ul className="space-y-2 mb-6">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="text-green-600">✓</span> {feature}
                  </li>
                ))}
              </ul>
              <Button className="w-full">Choose Plan</Button>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20 text-center bg-blue-600 text-white">
        <h2 className="text-4xl font-bold mb-4">Ready to Transform Your Gym?</h2>
        <p className="text-xl mb-8 text-blue-100">
          Join hundreds of gyms already using ZYM Dashboard
        </p>
        <Link href="/register">
          <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
            Start Free Trial Today
          </Button>
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white px-6 py-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h4 className="font-bold text-lg mb-4">ZYM</h4>
            <p className="text-gray-400">
              Your complete gym management solution
            </p>
          </div>
          <div>
            <h5 className="font-semibold mb-4">Product</h5>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/" className="hover:text-white transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-white transition">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold mb-4">Company</h5>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/about" className="hover:text-white transition">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold mb-4">Follow</h5>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="/contact" className="hover:text-white transition">
                  Twitter
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-white transition">
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>&copy; 2024 ZYM Dashboard. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
