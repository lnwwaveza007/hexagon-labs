import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, CheckCircle, ArrowLeft } from 'lucide-react';
import Navigation from '../components/layout/Navigation';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Card from '../components/ui/Card';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  userType: string;
  interests: string[];
  customInterest: string;
  reviewPrice: string;
  priceType: 'per-post' | 'per-hour' | 'per-campaign';
}

// interface SocialVerification {
//   facebook: boolean;
//   instagram: boolean;
// }

const RegisterPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: '',
    interests: [],
    customInterest: '',
    reviewPrice: '',
    priceType: 'per-post'
  });
  // const [socialVerification, setSocialVerification] = useState<SocialVerification>({
  //   facebook: false,
  //   instagram: false
  // });
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const handleInputChange = (field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateStep1 = (): boolean => {
    const newErrors: Partial<FormData> = {};
    
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (!formData.userType) newErrors.userType = 'Please select your role';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    if (validateStep1()) {
      setCurrentStep(2);
    }
  };

  // const handleSocialVerification = (platform: 'facebook' | 'instagram') => {
  //   setIsLoading(true);
  //   // Simulate verification process
  //   setTimeout(() => {
  //     setSocialVerification(prev => ({
  //       ...prev,
  //       [platform]: true
  //     }));
  //     setIsLoading(false);
  //   }, 2000);
  // };

  const validateStep2 = (): boolean => {
    const newErrors: Partial<FormData> = {};
    
    if (formData.interests.length === 0 && !formData.customInterest.trim()) {
      newErrors.customInterest = 'Please select at least one interest or add a custom one';
    }
    if (!formData.reviewPrice.trim()) {
      newErrors.reviewPrice = 'Please enter your review price';
    }
    if (isNaN(Number(formData.reviewPrice)) || Number(formData.reviewPrice) <= 0) {
      newErrors.reviewPrice = 'Please enter a valid price';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleStep2Submit = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    if (validateStep2()) {
      setCurrentStep(3);
    }
  };

  // const completeRegistration = () => {
  //   setIsLoading(true);
  //   // Simulate registration completion
  //   setTimeout(() => {
  //     setCurrentStep(3);
  //     setIsLoading(false);
  //   }, 2000);
  // };

  const handleInterestToggle = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const addCustomInterest = () => {
    if (formData.customInterest.trim() && !formData.interests.includes(formData.customInterest.trim())) {
      setFormData(prev => ({
        ...prev,
        interests: [...prev.interests, prev.customInterest.trim()],
        customInterest: ''
      }));
    }
  };

  const getPasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    
    const labels = ['Weak', 'Fair', 'Good', 'Strong'];
    const colors = ['bg-red-500', 'bg-yellow-500', 'bg-blue-500', 'bg-green-500'];
    
    return {
      score: strength,
      label: labels[Math.min(strength - 1, 3)] || 'Weak',
      color: colors[Math.min(strength - 1, 3)] || 'bg-red-500',
      width: `${(strength / 4) * 100}%`
    };
  };

  const passwordStrength = getPasswordStrength(formData.password);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-pink-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-40 h-40 bg-gradient-to-r from-indigo-400/10 to-purple-400/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-gradient-to-r from-pink-400/10 to-rose-400/10 rounded-full blur-3xl animate-float delay-700"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-indigo-300/5 to-pink-300/5 rounded-full blur-3xl animate-pulse"></div>
      </div>
      
      <Navigation minimal />
      
      <div className="pt-20 pb-12 relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-8">
          <div className="flex items-center justify-center min-h-[calc(100vh-8rem)]">
            
            {/* Registration Form - Centered */}
            <div className="w-full max-w-2xl mx-auto">
              <Card className="p-10 shadow-2xl border-0 backdrop-blur-sm bg-white/95 hover:shadow-3xl transition-all duration-300">
                {/* Header */}
                <div className="text-center mb-10">
                  <div className="mb-4">
                    <img 
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSH5QHjUyumB6BOj0dP2SKKi76RudB-xLkGGw&s" 
                      alt="HEXAGON LABS Logo" 
                      className="w-12 h-12 mx-auto mb-4"
                    />
                  </div>
                  <h1 className="text-4xl font-bold mb-3">
                    <span className="bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent">
                      Join HEXAGON LABS
                    </span>
                  </h1>
                  <p className="text-gray-600 text-lg">
                    Create your influencer account and start matching with campaigns
                  </p>
                </div>

                {/* Enhanced Step Indicator */}
                <div className="flex items-center justify-center mb-10">
                  {[1, 2, 3].map((step) => (
                    <div key={step} className="flex items-center">
                      <div className={`
                        w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300
                        ${step <= currentStep 
                          ? 'bg-gradient-to-r from-indigo-600 to-pink-600 text-white shadow-lg' 
                          : 'bg-gray-200 text-gray-600'
                        }
                        ${step === currentStep ? 'ring-4 ring-indigo-200' : ''}
                      `}>
                        {step <= currentStep && step < currentStep ? (
                          <CheckCircle className="w-5 h-5" />
                        ) : (
                          step
                        )}
                      </div>
                                             <div className="text-xs font-medium ml-2 mr-4">
                         <div className={`${step <= currentStep ? 'text-indigo-600' : 'text-gray-500'}`}>
                           {step === 1 && 'Basic Info'}
                           {step === 2 && 'Interests & Price'}
                           {step === 3 && 'Complete'}
                         </div>
                       </div>
                      {step < 3 && (
                        <div className={`
                          w-12 h-1 mr-4 rounded-full transition-all duration-300
                          ${step < currentStep ? 'bg-gradient-to-r from-indigo-600 to-pink-600' : 'bg-gray-200'}
                        `} />
                      )}
                    </div>
                  ))}
                </div>

                {/* Step 1: Basic Information */}
                {currentStep === 1 && (
                  <form onSubmit={handleStep1Submit} className="space-y-6 animate-fade-in-up">
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        label="First Name"
                        value={formData.firstName}
                        onChange={handleInputChange('firstName')}
                        error={errors.firstName}
                        required
                      />
                      <Input
                        label="Last Name"
                        value={formData.lastName}
                        onChange={handleInputChange('lastName')}
                        error={errors.lastName}
                        required
                      />
                    </div>
                    
                    <Input
                      label="Email Address"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange('email')}
                      error={errors.email}
                      required
                    />
                    
                    <Input
                      label="Password"
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={handleInputChange('password')}
                      error={errors.password}
                      rightIcon={
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      }
                      required
                    />
                    
                    {formData.password && (
                      <div className="space-y-2">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full transition-all duration-300 ${passwordStrength.color}`}
                            style={{ width: passwordStrength.width }}
                          />
                        </div>
                        <p className="text-sm text-gray-600">
                          Password strength: <span className="font-medium">{passwordStrength.label}</span>
                        </p>
                      </div>
                    )}
                    
                    <Input
                      label="Confirm Password"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={handleInputChange('confirmPassword')}
                      error={errors.confirmPassword}
                      required
                    />

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        I am a...
                      </label>
                      <select
                        value={formData.userType}
                        onChange={handleInputChange('userType')}
                        className="block w-full px-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        required
                      >
                        <option value="">Select your role</option>
                        <option value="influencer">Influencer</option>
                        <option value="brand">Brand/Company</option>
                      </select>
                      {errors.userType && (
                        <p className="mt-2 text-sm text-red-600">{errors.userType}</p>
                      )}
                    </div>

                    <Button type="submit" fullWidth>
                      Continue to Verification
                    </Button>
                  </form>
                )}

                {/* Step 2: Interests and Price */}
                {currentStep === 2 && (
                  <div className="space-y-6 animate-fade-in-up">
                    <div className="text-center">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        Tell Us About Your Interests & Pricing
                      </h3>
                      <p className="text-gray-600">
                        Help brands find you by sharing what products you love to review and your pricing.
                      </p>
                    </div>

                    {/* Interest Categories */}
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          What products are you interested in reviewing? <span className="text-red-500">*</span>
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                          {[
                            '🍔 Food & Beverages',
                            '👗 Fashion & Clothing',
                            '📱 Tech & Gadgets',
                            '💄 Beauty & Cosmetics',
                            '🏠 Home & Living',
                            '🎮 Gaming',
                            '📚 Books & Education',
                            '🚗 Automotive',
                            '✈️ Travel',
                            '🏃‍♂️ Health & Fitness',
                            '🎵 Music & Entertainment',
                            '🎨 Art & Crafts'
                          ].map((interest) => (
                            <button
                              key={interest}
                              type="button"
                              onClick={() => handleInterestToggle(interest)}
                              className={`p-3 text-left text-sm rounded-lg border-2 transition-all duration-200 hover:scale-105 ${
                                formData.interests.includes(interest)
                                  ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                                  : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                              }`}
                            >
                              {interest}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Custom Interest */}
                      <div className="flex gap-2">
                        <Input
                          placeholder="Add your own interest..."
                          value={formData.customInterest}
                          onChange={(e) => setFormData(prev => ({...prev, customInterest: e.target.value}))}
                          className="flex-1"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={addCustomInterest}
                          disabled={!formData.customInterest.trim()}
                          className="px-4"
                        >
                          Add
                        </Button>
                      </div>

                      {/* Selected Interests Display */}
                      {formData.interests.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {formData.interests.map((interest, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm"
                            >
                              {interest}
                              <button
                                type="button"
                                onClick={() => handleInterestToggle(interest)}
                                className="hover:text-indigo-900"
                              >
                                ×
                              </button>
                            </span>
                          ))}
                        </div>
                      )}

                      {errors.customInterest && (
                        <p className="text-sm text-red-600">{errors.customInterest}</p>
                      )}
                    </div>

                    {/* Pricing Section */}
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          What's your review price? <span className="text-red-500">*</span>
                        </label>
                        <div className="grid grid-cols-2 gap-4">
                          <Input
                            type="number"
                            placeholder="Enter amount"
                            value={formData.reviewPrice}
                            onChange={(e) => setFormData(prev => ({...prev, reviewPrice: e.target.value}))}
                            error={errors.reviewPrice}
                            className="text-lg"
                            rightIcon={<span className="text-gray-600 font-semibold text-lg">฿</span>}
                          />
                          <select
                            value={formData.priceType}
                            onChange={(e) => setFormData(prev => ({...prev, priceType: e.target.value as any}))}
                            className="block w-full px-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-lg"
                          >
                            <option value="per-post">Per Post</option>
                            <option value="per-hour">Per Hour</option>
                            <option value="per-campaign">Per Campaign</option>
                          </select>
                        </div>
                      </div>

                      <div className="bg-gradient-to-r from-indigo-50 to-pink-50 border border-indigo-200 rounded-lg p-4">
                        <div className="flex justify-start text-left items-center gap-3">
                          <div>
                            <p className="text-sm text-indigo-800 font-medium">💡 Pricing Tips:</p>
                            <ul className="text-sm text-indigo-700 mt-3 space-y-1">
                              <li>• Research market rates for your follower count</li>
                              <li>• Consider your engagement rate and niche expertise</li>
                              <li>• You can always adjust your rates later</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <Button
                        variant="outline"
                        onClick={() => setCurrentStep(1)}
                        className="flex items-center gap-2"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        Back
                      </Button>
                      <Button
                        onClick={handleStep2Submit}
                        fullWidth
                        className="bg-gradient-to-r from-indigo-600 to-pink-600 hover:from-indigo-700 hover:to-pink-700"
                      >
                        Complete Registration 🎉
                      </Button>
                    </div>
                  </div>
                )}

                {/* Step 3: Registration Complete - Enhanced Congratulations */}
                {currentStep === 3 && (
                  <div className="text-center space-y-8">
                    {/* Animated Success Icon */}
                    <div className="relative my-20">
                      <div className="w-24 h-24 mx-auto bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center animate-pulse">
                        <CheckCircle className="w-12 h-12 text-white" />
                      </div>
                      {/* Celebration rings */}
                      <div className="absolute inset-0 w-24 h-24 mx-auto rounded-full border-4 border-green-200 animate-ping"></div>
                    </div>
                    
                    {/* Congratulations Message */}
                    <div className="space-y-4">
                      <h3 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent">
                        🎉 Congratulations!
                      </h3>
                      <h4 className="text-xl font-semibold text-gray-900">
                        Welcome to <strong>HEXAGON</strong> LABS!
                      </h4>
                      <p className="text-gray-600 leading-relaxed">
                        Your account has been created successfully! You're now part of our exclusive community of verified influencers ready to collaborate with top brands.
                      </p>
                    </div>

                    {/* Welcome Stats */}
                    <div className="grid grid-cols-3 gap-4 py-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-indigo-600">10K+</div>
                        <div className="text-xs text-gray-500">Influencers</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-pink-600">500+</div>
                        <div className="text-xs text-gray-500">Brands</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-emerald-600">95%</div>
                        <div className="text-xs text-gray-500">Success Rate</div>
                      </div>
                    </div>

                    {/* Next Steps */}
                    <div className="bg-gradient-to-r from-indigo-50 to-pink-50 rounded-xl p-6 text-left">
                      <h4 className="font-semibold text-gray-900 mb-4 text-center">🚀 Your Journey Starts Now!</h4>
                      <ul className="space-y-4">
                        <li className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-white font-bold text-sm">1</span>
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">Complete your profile</div>
                            <div className="text-sm text-gray-600">Add your bio, interests, and showcase your best content</div>
                          </div>
                        </li>
                        <li className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-white font-bold text-sm">2</span>
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">Browse campaigns</div>
                            <div className="text-sm text-gray-600">Discover campaigns that match your audience and style</div>
                          </div>
                        </li>
                        <li className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-white font-bold text-sm">3</span>
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">Start earning</div>
                            <div className="text-sm text-gray-600">Collaborate with brands and get paid securely</div>
                          </div>
                        </li>
                      </ul>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-3">
                      <Button fullWidth size="lg" href="/dashboard" className="bg-gradient-to-r from-indigo-600 to-pink-600 hover:from-indigo-700 hover:to-pink-700">
                        🎯 Go to Dashboard
                      </Button>
                      <p className="text-sm text-gray-500">
                        Ready to start your influencer journey? Let's make it happen!
                      </p>
                    </div>
                  </div>
                )}

                {/* Footer */}
                <div className="text-center mt-8 pt-6 border-t border-gray-200">
                  <p className="text-sm text-gray-600">
                    Already have an account?{' '}
                    <Link to="/auth" className="text-indigo-600 hover:text-indigo-500 font-medium">
                      Sign in here
                    </Link>
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage; 