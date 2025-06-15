import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, Facebook, Instagram, Loader2 } from 'lucide-react';
import Navigation from '../components/layout/Navigation';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Card from '../components/ui/Card';
import { useTranslation } from 'react-i18next';

const LoginPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{email?: string; password?: string}>({});
  const { t } = useTranslation();

  const handleInputChange = (field: 'email' | 'password') => (
    e: React.ChangeEvent<HTMLInputElement>
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

  const handleRememberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      remember: e.target.checked
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: {email?: string; password?: string} = {};
    
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      // Simulate login
      setTimeout(() => {
        setIsLoading(false);
        // Redirect to dashboard
        window.location.href = '/dashboard';
      }, 2000);
    }
  };

  const handleSocialLogin = () => {
    setIsLoading(true);
    // Simulate social login
    setTimeout(() => {
      setIsLoading(false);
      // Redirect to dashboard
      window.location.href = '/dashboard';
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-pink-50">
      <Navigation minimal />
      
      <div className="pt-20 pb-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-8rem)]">
            
            {/* Login Form */}
            <div className="w-full max-w-md mx-auto lg:mx-0">
              <Card className="p-8 shadow-2xl border-0 backdrop-blur-sm bg-white/95 hover:shadow-3xl transition-all duration-300 animate-slide-in-scale">
                {/* Header */}
                <div className="text-center mb-8">
                  <div className="mb-4">
                    <img 
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSH5QHjUyumB6BOj0dP2SKKi76RudB-xLkGGw&s" 
                      alt="HEXAGON LABS Logo" 
                      className="w-12 h-12 mx-auto mb-4 animate-fade-in-up"
                    />
                  </div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2 animate-fade-in-up delay-100">
                    {t('LoginPage.title')}
                  </h1>
                  <p className="text-gray-600 animate-fade-in-up delay-200">
                    {t('LoginPage.subtitle')} <strong>{t('LoginPage.brandName')}</strong> {t('LoginPage.account')}
                  </p>
                </div>

                {/* Social Login Options */}
                <div className="space-y-3 mb-6 animate-fade-in-up delay-300">
                  <Button
                    variant="outline"
                    fullWidth
                    onClick={() => handleSocialLogin()}
                    disabled={isLoading}
                    className="flex items-center justify-center gap-3 py-3 border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300"
                  >
                    <Facebook className="w-5 h-5" />
                    <span>{t('LoginPage.continueWithFacebook')}</span>
                  </Button>
                  
                  <Button
                    variant="outline"
                    fullWidth
                    onClick={() => handleSocialLogin()}
                    disabled={isLoading}
                    className="flex items-center justify-center gap-3 py-3 border-pink-200 text-pink-600 hover:bg-pink-50 hover:border-pink-300"
                  >
                    <Instagram className="w-5 h-5" />
                    <span>{t('LoginPage.continueWithInstagram')}</span>
                  </Button>
                </div>

                {/* Divider */}
                <div className="relative my-6 animate-fade-in-up delay-400">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-gray-500 font-medium">{t('LoginPage.or')}</span>
                  </div>
                </div>

                {/* Email Login Form */}
                <form onSubmit={handleLogin} className="space-y-6 animate-fade-in-up delay-500">
                  <Input
                    label={t('LoginPage.emailLabel')}
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange('email')}
                    error={errors.email}
                    placeholder={t('LoginPage.emailPlaceholder')}
                    required
                  />
                  
                  <Input
                    label={t('LoginPage.passwordLabel')}
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleInputChange('password')}
                    error={errors.password}
                    placeholder={t('LoginPage.passwordPlaceholder')}
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

                  {/* Form Options */}
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.remember}
                        onChange={handleRememberChange}
                        className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 focus:ring-2"
                      />
                      <span className="text-sm text-gray-600">{t('LoginPage.rememberMe')}</span>
                    </label>
                    <Link to="#" className="text-sm text-indigo-600 hover:text-indigo-500 font-medium">
                      {t('LoginPage.forgotPassword')}
                    </Link>
                  </div>

                  <Button 
                    type="submit" 
                    fullWidth 
                    disabled={isLoading}
                    className="relative overflow-hidden"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin mr-2" />
                        {t('LoginPage.signingIn')}
                      </>
                    ) : (
                      `🚀 ${t('LoginPage.signIn')}`
                    )}
                  </Button>
                </form>

                {/* Footer */}
                <div className="text-center mt-8 pt-6 border-t border-gray-200 animate-fade-in-up delay-600">
                  <p className="text-sm text-gray-600">
                    {t('LoginPage.noAccount')}{' '}
                    <Link to="/register" className="text-indigo-600 hover:text-indigo-500 font-medium">
                      {t('LoginPage.signUpHere')}
                    </Link>
                  </p>
                </div>
              </Card>
            </div>

            {/* Side Content */}
            <div className="hidden lg:block animate-fade-in-right delay-300">
              <div className="bg-gradient-to-br from-indigo-600 to-pink-600 rounded-2xl p-8 text-white relative overflow-hidden">
                {/* Background decoration */}
                <div className="absolute inset-0">
                  <div className="absolute top-6 right-6 w-32 h-32 bg-white/10 rounded-full blur-3xl animate-float"></div>
                  <div className="absolute bottom-6 left-6 w-24 h-24 bg-white/10 rounded-full blur-2xl animate-float delay-500"></div>
                </div>
                
                <div className="relative z-10">
                  <h2 className="text-3xl font-bold mb-4">
                    {t('LoginPage.sideContent.title')}
                  </h2>
                  <p className="text-indigo-100 mb-8 leading-relaxed">
                    {t('LoginPage.sideContent.description')}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                      <div className="text-2xl font-bold text-white">10K+</div>
                      <div className="text-sm text-indigo-100">{t('LoginPage.sideContent.stats.influencers')}</div>
                    </div>
                    <div className="text-center p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                      <div className="text-2xl font-bold text-white">$2M+</div>
                      <div className="text-sm text-indigo-100">{t('LoginPage.sideContent.stats.paidToCreators')}</div>
                    </div>
                  </div>
                  
                  <div className="mt-8 space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                        <span className="text-xs">✓</span>
                      </div>
                      <span className="text-indigo-100">{t('LoginPage.sideContent.features.verifiedPartnerships')}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                        <span className="text-xs">✓</span>
                      </div>
                      <span className="text-indigo-100">{t('LoginPage.sideContent.features.securePayments')}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                        <span className="text-xs">✓</span>
                      </div>
                      <span className="text-indigo-100">{t('LoginPage.sideContent.features.realTimeAnalytics')}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 shadow-2xl animate-slide-in-scale">
            <div className="text-center">
              <Loader2 className="w-12 h-12 animate-spin text-indigo-600 mx-auto mb-4" />
              <p className="text-gray-600 font-medium">{t('LoginPage.loading')}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginPage; 