import React from 'react';
import { 
  Shield, 
  Target, 
  BarChart3, 
  Handshake, 
  Instagram, 
  Facebook, 
  TrendingUp 
} from 'lucide-react';
import Navigation from '../components/layout/Navigation';
import Footer from '../components/layout/Footer';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Enhanced Hero Section */}
      <section className="relative pt-20 pb-16 lg:pt-28 lg:pb-24 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-pink-50">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-transparent to-pink-500/5"></div>
          {/* Floating shapes */}
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-indigo-400/10 to-pink-400/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-10 w-48 h-48 bg-gradient-to-r from-pink-400/10 to-purple-400/10 rounded-full blur-3xl animate-float delay-500"></div>
        </div>
        
        <div className="relative max-w-6xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Enhanced Hero Content */}
            <div className="space-y-8">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight animate-fade-in-up">
                Connect Influencers with{' '}
                <span className="bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent relative">
                  Perfect Campaigns
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-pink-600/20 blur-xl -z-10 animate-pulse"></div>
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed animate-fade-in-up delay-200">
                Join thousands of influencers and brands creating authentic partnerships. 
                Match with campaigns that align with your audience and values.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up delay-400">
                <Button size="lg" href="/register" className="transform hover:scale-105 transition-all duration-300 hover:shadow-xl">
                  ✨ Get Started as Influencer
                </Button>
                <Button variant="secondary" size="lg" href="#how-it-works" className="transform hover:scale-105 transition-all duration-300">
                  Learn More
                </Button>
              </div>
              
              {/* Enhanced Hero Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8 animate-fade-in-up delay-600">
                {[
                  { number: "10K+", label: "Active Influencers", gradient: "from-indigo-500 to-purple-500" },
                  { number: "500+", label: "Brand Partners", gradient: "from-pink-500 to-rose-500" },
                  { number: "95%", label: "Success Rate", gradient: "from-emerald-500 to-teal-500" }
                ].map((stat, index) => (
                  <div key={index} className="text-center group cursor-pointer">
                    <div className={`text-3xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent group-hover:scale-110 transition-all duration-300 drop-shadow-sm`}>
                      {stat.number}
                    </div>
                    <div className="text-sm text-gray-600 group-hover:text-gray-800 transition-colors">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Enhanced Hero Image/Cards */}
            <div className="relative animate-fade-in-right delay-300">
              <div className="relative z-10 space-y-6">
                {/* Enhanced Floating Cards */}
                <div className="animate-float hover:scale-105 transition-transform duration-300">
                  <Card className="p-5 bg-gradient-to-r from-pink-500 to-rose-500 text-white border-0 shadow-2xl hover:shadow-3xl transition-all duration-300 backdrop-blur-sm">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                        <Instagram className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="font-semibold text-lg">Instagram Match</span>
                        <div className="text-pink-100 text-sm">✨ Perfect audience sync</div>
                      </div>
                    </div>
                  </Card>
                </div>
                
                <div className="animate-float delay-300 ml-8 hover:scale-105 transition-transform duration-300">
                  <Card className="p-5 bg-gradient-to-r from-blue-500 to-indigo-500 text-white border-0 shadow-2xl hover:shadow-3xl transition-all duration-300 backdrop-blur-sm">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                        <Facebook className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="font-semibold text-lg">Facebook Verified</span>
                        <div className="text-blue-100 text-sm">🛡️ Trusted identity</div>
                      </div>
                    </div>
                  </Card>
                </div>
                
                <div className="animate-float delay-500 ml-4 hover:scale-105 transition-transform duration-300">
                  <Card className="p-5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white border-0 shadow-2xl hover:shadow-3xl transition-all duration-300 backdrop-blur-sm">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                        <TrendingUp className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="font-semibold text-lg">Campaign Analytics</span>
                        <div className="text-emerald-100 text-sm">📊 Real-time insights</div>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
              
              {/* Background decoration */}
              <div className="absolute inset-0 -z-10">
                <div className="absolute top-4 right-4 w-24 h-24 bg-gradient-to-r from-indigo-300/20 to-pink-300/20 rounded-full blur-2xl animate-pulse"></div>
                <div className="absolute bottom-8 left-8 w-32 h-32 bg-gradient-to-r from-emerald-300/20 to-teal-300/20 rounded-full blur-2xl animate-pulse delay-700"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section id="features" className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-50/50 via-transparent to-pink-50/50"></div>
        
        <div className="max-w-6xl mx-auto px-4 sm:px-8 relative">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Why Choose{' '}
              <span className="bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent">
                Hexagon Lab?
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-pink-500 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                icon: Shield, 
                title: "Verified Profiles", 
                description: "All influencers are verified through Facebook and Instagram authentication to ensure authenticity.",
                gradient: "from-indigo-500 to-purple-500",
                delay: "delay-100"
              },
              { 
                icon: Target, 
                title: "Smart Matching", 
                description: "AI-powered algorithm matches influencers with campaigns based on audience demographics and engagement.",
                gradient: "from-pink-500 to-rose-500",
                delay: "delay-200"
              },
              { 
                icon: BarChart3, 
                title: "Real-time Analytics", 
                description: "Track campaign performance with detailed analytics and reporting tools for better ROI insights.",
                gradient: "from-emerald-500 to-teal-500",
                delay: "delay-300"
              },
              { 
                icon: Handshake, 
                title: "Secure Payments", 
                description: "Protected payment system ensures timely and secure transactions for all campaign collaborations.",
                gradient: "from-amber-500 to-orange-500",
                delay: "delay-400"
              }
            ].map((feature, index) => (
              <Card key={index} hover className={`text-center group animate-fade-in-up ${feature.delay} hover:shadow-2xl transition-all duration-500`}>
                <div className={`w-20 h-20 mx-auto mb-6 bg-gradient-to-r ${feature.gradient} rounded-full flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-lg`}>
                  <feature.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-indigo-600 transition-colors">{feature.title}</h3>
                <p className="text-gray-600 group-hover:text-gray-700 transition-colors leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced How It Works Section */}
      <section id="how-it-works" className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-indigo-50/30 to-pink-50/30"></div>
        
        <div className="max-w-6xl mx-auto px-4 sm:px-8 relative">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              How It{' '}
              <span className="bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent">
                Works
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-pink-500 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                number: "1",
                title: "Create Your Profile",
                description: "Sign up and verify your social media accounts through Facebook or Instagram authentication.",
                gradient: "from-indigo-500 to-pink-500",
                delay: "delay-100"
              },
              {
                number: "2", 
                title: "Get Matched",
                description: "Our AI algorithm finds campaigns that perfectly match your audience and content style.",
                gradient: "from-pink-500 to-rose-500",
                delay: "delay-200"
              },
              {
                number: "3",
                title: "Collaborate & Earn", 
                description: "Work with brands, create amazing content, and get paid securely through our platform.",
                gradient: "from-emerald-500 to-teal-500",
                delay: "delay-300"
              }
            ].map((step, index) => (
              <div key={index} className={`text-center group animate-fade-in-up ${step.delay}`}>
                <div className={`w-20 h-20 mx-auto mb-6 bg-gradient-to-r ${step.gradient} text-white rounded-full flex items-center justify-center text-2xl font-bold group-hover:scale-110 transition-all duration-300 shadow-lg`}>
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-indigo-600 transition-colors">{step.title}</h3>
                <p className="text-gray-600 group-hover:text-gray-700 transition-colors leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-pink-600 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl animate-float delay-300"></div>
        </div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-8 text-center relative">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4 animate-fade-in-up">
            Ready to Start Your Influencer Journey?
          </h2>
          <p className="text-xl text-indigo-100 mb-8 animate-fade-in-up delay-200">
            Join thousands of successful influencers who trust <strong>HEXAGON</strong> LABS for their campaign partnerships.
          </p>
          <div className="animate-fade-in-up delay-400">
            <Button 
              variant="secondary" 
              size="lg" 
              href="/register"
              className="bg-white text-indigo-600 hover:bg-gray-50 transform hover:scale-105 transition-all duration-300 hover:shadow-2xl"
            >
              🚀 Join Now - It's Free
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage; 