/**
 * Landing Page - Public facing homepage
 */
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Zap, Globe, Brain, Shield, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <header className="container mx-auto px-4 pt-20 pb-16">
        <div className="text-center max-w-4xl mx-auto">
          <Badge className="mb-4" variant="secondary">
            First SEO Platform with Arabic Language Support
          </Badge>

          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            SEO Analysis Made Simple
          </h1>

          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Stop struggling with complex SEO reports. DevSEO speaks plain English and supports Arabic,
            helping businesses worldwide improve their search rankings.
          </p>

          <div className="flex gap-4 justify-center flex-wrap">
            <Link to="/sign-up">
              <Button size="lg" className="text-lg px-8">
                Start Free Trial
              </Button>
            </Link>
            <Link to="/sign-in">
              <Button size="lg" variant="outline" className="text-lg px-8">
                Sign In
              </Button>
            </Link>
          </div>

          <p className="text-sm text-gray-500 mt-4">
            No credit card required • 14-day free trial • Cancel anytime
          </p>
        </div>
      </header>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">
          Why DevSEO Stands Out
        </h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <Card>
            <CardHeader>
              <Brain className="w-12 h-12 text-blue-600 mb-4" />
              <CardTitle>Plain English Explanations</CardTitle>
              <CardDescription>
                No jargon. No technical mumbo-jumbo. Just clear, actionable advice anyone can understand.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Globe className="w-12 h-12 text-purple-600 mb-4" />
              <CardTitle>Arabic Language Leader</CardTitle>
              <CardDescription>
                First platform with Arabic dialect detection and RTL layout validation. Perfect for MENA markets.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Zap className="w-12 h-12 text-green-600 mb-4" />
              <CardTitle>AI-Powered Insights</CardTitle>
              <CardDescription>
                Get intelligent content suggestions, keyword analysis, and SEO recommendations powered by AI.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Shield className="w-12 h-12 text-red-600 mb-4" />
              <CardTitle>Domain Verification</CardTitle>
              <CardDescription>
                Prove ownership with DNS, meta tag, or file upload. Three flexible verification methods.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <TrendingUp className="w-12 h-12 text-orange-600 mb-4" />
              <CardTitle>Real-Time Monitoring</CardTitle>
              <CardDescription>
                Track your SEO score in real-time. See improvements as they happen with automated scans.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Check className="w-12 h-12 text-teal-600 mb-4" />
              <CardTitle>Agency-Ready</CardTitle>
              <CardDescription>
                White-label reports, client management, unlimited sites. Everything agencies need.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="container mx-auto px-4 py-16 bg-gray-50">
        <h2 className="text-3xl font-bold text-center mb-12">
          Simple, Transparent Pricing
        </h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Free Plan */}
          <Card>
            <CardHeader>
              <CardTitle>Starter</CardTitle>
              <div className="text-3xl font-bold mt-4">$19<span className="text-lg font-normal text-gray-500">/month</span></div>
              <CardDescription className="mt-2">Perfect for small websites</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-600" />
                  <span>5 websites</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-600" />
                  <span>50 scans/month</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-600" />
                  <span>100 AI optimizations</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-600" />
                  <span>Email support</span>
                </li>
              </ul>
              <Link to="/sign-up">
                <Button className="w-full mt-6">Get Started</Button>
              </Link>
            </CardContent>
          </Card>

          {/* Pro Plan */}
          <Card className="border-blue-600 border-2 relative">
            <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              Most Popular
            </Badge>
            <CardHeader>
              <CardTitle>Pro</CardTitle>
              <div className="text-3xl font-bold mt-4">$49<span className="text-lg font-normal text-gray-500">/month</span></div>
              <CardDescription className="mt-2">For growing businesses</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-600" />
                  <span>25 websites</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-600" />
                  <span>500 scans/month</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-600" />
                  <span>Unlimited AI optimizations</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-600" />
                  <span>Priority support</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-600" />
                  <span>White-label PDFs</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-600" />
                  <span>API access</span>
                </li>
              </ul>
              <Link to="/sign-up">
                <Button className="w-full mt-6" variant="default">Get Started</Button>
              </Link>
            </CardContent>
          </Card>

          {/* Agency Plan */}
          <Card>
            <CardHeader>
              <CardTitle>Agency</CardTitle>
              <div className="text-3xl font-bold mt-4">$149<span className="text-lg font-normal text-gray-500">/month</span></div>
              <CardDescription className="mt-2">For agencies & enterprises</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-600" />
                  <span>Unlimited websites</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-600" />
                  <span>Unlimited scans</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-600" />
                  <span>Unlimited everything</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-600" />
                  <span>Dedicated support</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-600" />
                  <span>Client management</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-600" />
                  <span>Custom branding</span>
                </li>
              </ul>
              <Link to="/sign-up">
                <Button className="w-full mt-6">Get Started</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-4xl font-bold mb-6">
          Ready to Improve Your SEO?
        </h2>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Join thousands of businesses using DevSEO to rank higher in search results.
        </p>
        <Link to="/sign-up">
          <Button size="lg" className="text-lg px-12">
            Start Your Free Trial
          </Button>
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>&copy; 2026 DevSEO. All rights reserved.</p>
          <div className="flex gap-6 justify-center mt-4">
            <a href="#" className="hover:text-blue-600">Privacy Policy</a>
            <a href="#" className="hover:text-blue-600">Terms of Service</a>
            <a href="#" className="hover:text-blue-600">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
