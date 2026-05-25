import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Pricing() {
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
          <Link href="/pricing" className="text-blue-600 font-semibold">
            Pricing
          </Link>
          <Link href="/about" className="text-gray-600 hover:text-gray-900">
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

      {/* Pricing Section */}
      <section className="px-6 py-20">
        <h1 className="text-5xl font-bold text-center mb-4">Simple, Transparent Pricing</h1>
        <p className="text-xl text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Choose the perfect plan for your gym. Scale up anytime.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              name: 'Basic',
              price: '$99',
              period: '/month',
              description: 'Perfect for small gyms',
              features: [
                'Up to 100 members',
                'Basic attendance tracking',
                'Payment management',
                'Basic analytics',
                'Email support',
              ],
              cta: 'Get Started',
              highlighted: false,
            },
            {
              name: 'Pro',
              price: '$299',
              period: '/month',
              description: 'Best for growing gyms',
              features: [
                'Up to 500 members',
                'QR code attendance',
                'Advanced payment tools',
                'Workout & diet plans',
                'Advanced analytics',
                'Trainer management',
                'Priority support',
              ],
              cta: 'Start Free Trial',
              highlighted: true,
            },
            {
              name: 'Enterprise',
              price: 'Custom',
              period: 'pricing',
              description: 'For large organizations',
              features: [
                'Unlimited members',
                'Custom features',
                'API access',
                'Multi-location support',
                'White-label options',
                'Dedicated account manager',
                '24/7 phone support',
              ],
              cta: 'Contact Sales',
              highlighted: false,
            },
          ].map((plan, idx) => (
            <div
              key={idx}
              className={`rounded-lg p-8 ${
                plan.highlighted
                  ? 'border-2 border-blue-600 bg-blue-50 shadow-lg transform scale-105'
                  : 'border-2 border-gray-200'
              }`}
            >
              {plan.highlighted && (
                <div className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold inline-block mb-4">
                  Most Popular
                </div>
              )}
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <p className="text-gray-600 text-sm mb-4">{plan.description}</p>
              <div className="mb-6">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className="text-gray-600">/{plan.period}</span>
              </div>
              <Button className="w-full mb-6">{plan.cta}</Button>
              <ul className="space-y-3">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm">
                    <span className="text-green-600 font-bold">✓</span> {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div className="mt-20 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {[
              {
                q: 'Can I upgrade or downgrade my plan?',
                a: 'Yes, you can change your plan anytime. Changes take effect at your next billing cycle.',
              },
              {
                q: 'Is there a free trial?',
                a: 'Yes! Pro and Enterprise plans include a 14-day free trial. No credit card required.',
              },
              {
                q: 'What payment methods do you accept?',
                a: 'We accept all major credit cards, UPI, and bank transfers.',
              },
              {
                q: 'Can I cancel anytime?',
                a: 'Of course! You can cancel your subscription anytime with no hidden fees.',
              },
            ].map((faq, idx) => (
              <div key={idx} className="border-b pb-6">
                <h4 className="font-semibold text-lg mb-2">{faq.q}</h4>
                <p className="text-gray-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
