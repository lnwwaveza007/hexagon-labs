import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, CheckCircle, ArrowLeft, Trash2, Plus, ChevronDown } from 'lucide-react';
import Navigation from '../components/layout/Navigation';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Card from '../components/ui/Card';
import { useTranslation } from 'react-i18next';
import type { TFunction } from 'i18next';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  userType: string;
  interests: string[];
  customInterest: string;
  rateCards: RateCard[];
}

interface RateCard {
  platform: string;
  contentType: string;
  basePrice: number;
  duration: number;
  note: string;
  showAdvanced: boolean;
  scriptRevisions?: number;
  draftRevisions?: number;
  reshootPenalty?: string;
  hashtagLimit?: number;
  otherWorkConditions?: string;
  quotationNeeded?: boolean;
  depositRequired?: boolean;
  depositPercentage?: number;
  paymentAfterPost?: boolean;
  paymentAfterPostPercentage?: number;
  creditTerm?: number;
  vatIncluded?: boolean;
  whtIncluded?: boolean;
  latePaymentPenalty?: string;
  otherPaymentTerms?: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  userType?: string;
  customInterest?: string;
  rateCards?: string[];
}

interface TranslationReturn {
  t: TFunction;
}

// Update platform theme mapping with more vibrant colors
const PLATFORM_THEMES = {
  tiktok: 'from-[#000000] to-[#25F4EE]',
  instagram: 'from-[#833AB4] via-[#FD1D1D] to-[#F77737]',
  facebook: 'from-[#1877F2] to-[#0A84FF]',
  youtube: 'from-[#FF0000] to-[#FF0000]',
  blog: 'from-[#2D3748] to-[#4A5568]',
  other: 'from-[#4F46E5] to-[#7C3AED]'
} as const;

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation() as TranslationReturn;
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
    rateCards: [{
      platform: '',
      contentType: '',
      basePrice: 0,
      duration: 0,
      note: '',
      showAdvanced: false
    }],
  });
  // const [socialVerification, setSocialVerification] = useState<SocialVerification>({
  //   facebook: false,
  //   instagram: false
  // });
  const [errors, setErrors] = useState<FormErrors>({});

  const handleInputChange = (field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const value = e.target.type === 'checkbox'
      ? (e.target as HTMLInputElement).checked
      : e.target.value;

    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };

  const updateRateCard = (index: number, field: keyof typeof formData.rateCards[0], value: any) => {
    setFormData(prev => ({
      ...prev,
      rateCards: prev.rateCards.map((card, i) =>
        i === index ? { ...card, [field]: value } : card
      )
    }));
  };

  const validateStep = (step: number): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    switch (step) {
      case 1:
        if (!formData.firstName.trim()) {
          newErrors.firstName = `${t('RegisterPage.accountInfo.firstName')} ${t('RegisterPage.validation.required')}`;
          isValid = false;
        }
        if (!formData.lastName.trim()) {
          newErrors.lastName = `${t('RegisterPage.accountInfo.lastName')} ${t('RegisterPage.validation.required')}`;
          isValid = false;
        }
        if (!formData.email.trim()) {
          newErrors.email = `${t('RegisterPage.accountInfo.email')} ${t('RegisterPage.validation.required')}`;
          isValid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          newErrors.email = t('RegisterPage.validation.validEmail');
          isValid = false;
        }
        if (!formData.password) {
          newErrors.password = `${t('RegisterPage.accountInfo.password')} ${t('RegisterPage.validation.required')}`;
          isValid = false;
        } else if (formData.password.length < 8) {
          newErrors.password = t('RegisterPage.validation.passwordLength');
          isValid = false;
        }
        if (!formData.userType) {
          newErrors.userType = t('RegisterPage.validation.selectRole');
          isValid = false;
        }
        break;
      case 2:
        if (formData.interests.length === 0 && !formData.customInterest.trim()) {
          newErrors.customInterest = t('RegisterPage.validation.selectInterest');
          isValid = false;
        }
        break;
      case 3:
        if (!formData.rateCards[0]?.contentType) {
          newErrors.rateCards = [t('RegisterPage.validation.selectContentType')];
          isValid = false;
        }
        if (!formData.rateCards[0]?.platform) {
          newErrors.rateCards = [t('RegisterPage.validation.selectPlatform')];
          isValid = false;
        }
        if (!formData.rateCards[0]?.basePrice || formData.rateCards[0]?.basePrice <= 0) {
          newErrors.rateCards = [t('RegisterPage.validation.validBasePrice')];
          isValid = false;
        }
        break;
    }

    setErrors(newErrors);

    if (!isValid) {
      alert('Please fill in all required fields correctly before proceeding.');
    }

    return isValid;
  };

  const handleStepSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep(currentStep)) {
      if (currentStep < 5) {
        setCurrentStep(prev => prev + 1);
      } else {
        // Handle final submission
        console.log('Form submitted:', formData);
      }
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

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900">{t('RegisterPage.accountInfo.title')}</h2>
            <div className="grid grid-cols-1 gap-6">
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label={t('RegisterPage.accountInfo.firstName')}
                  type="text"
                  value={formData.firstName}
                  onChange={handleInputChange('firstName')}
                  error={errors.firstName}
                  required
                />
                <Input
                  label={t('RegisterPage.accountInfo.lastName')}
                  type="text"
                  value={formData.lastName}
                  onChange={handleInputChange('lastName')}
                  error={errors.lastName}
                  required
                />
              </div>
              <Input
                label={t('RegisterPage.accountInfo.email')}
                type="email"
                value={formData.email}
                onChange={handleInputChange('email')}
                error={errors.email}
                required
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t('RegisterPage.accountInfo.role')}</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="relative">
                    <input
                      type="radio"
                      id="influencer"
                      name="userType"
                      value="influencer"
                      checked={formData.userType === 'influencer'}
                      onChange={handleInputChange('userType')}
                      className="peer sr-only"
                    />
                    <label
                      htmlFor="influencer"
                      className="flex flex-col items-center justify-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer peer-checked:border-indigo-500 peer-checked:bg-indigo-50 hover:bg-gray-50"
                    >
                      <span className="text-sm font-medium text-gray-900">{t('RegisterPage.accountInfo.influencer')}</span>
                      <span className="text-xs text-gray-500">{t('RegisterPage.accountInfo.influencerSubtitle')}</span>
                    </label>
                  </div>
                  <div className="relative bg-gray-100 cursor-not-allowed p-4 border-2 border-gray-200 rounded-lg">
                    <span className="text-xs font-medium text-gray-500">{t('RegisterPage.accountInfo.comingSoon')}</span>
                  </div>
                </div>
                {errors.userType && (
                  <p className="mt-2 text-sm text-red-600">{errors.userType}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t('RegisterPage.accountInfo.password')}</label>
                <div className="relative">
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleInputChange('password')}
                    error={errors.password}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-500"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {formData.password && (
                  <div className="mt-2">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-gray-500">{t('RegisterPage.accountInfo.passwordStrength')}</span>
                      <span className="text-xs font-medium text-gray-700">{passwordStrength.label}</span>
                    </div>
                    <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${passwordStrength.color} transition-all duration-300`}
                        style={{ width: passwordStrength.width }}
                      />
                    </div>
                  </div>
                )}
              </div>
              <Input
                label={t('RegisterPage.accountInfo.confirmPassword')}
                type="password"
                value={formData.confirmPassword}
                onChange={handleInputChange('confirmPassword')}
                error={errors.confirmPassword}
                required
              />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {t('RegisterPage.interests.title')}
              </h3>
              <p className="text-gray-600">
                {t('RegisterPage.interests.subtitle')}
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  {t('RegisterPage.interests.label')} <span className="text-red-500">*</span>
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

              <div className="flex gap-2">
                <Input
                  placeholder={t('RegisterPage.interests.addCustom')}
                  value={formData.customInterest}
                  onChange={(e) => setFormData(prev => ({ ...prev, customInterest: e.target.value }))}
                  className="flex-1"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={addCustomInterest}
                  disabled={!formData.customInterest.trim()}
                  className="px-4"
                >
                  {t('RegisterPage.interests.addButton')}
                </Button>
              </div>

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
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {t('RegisterPage.rateCard.title')}
              </h3>
              <p className="text-gray-600">
                {t('RegisterPage.rateCard.subtitle')}
              </p>
            </div>

            <div className="space-y-6">
              <div className="bg-gradient-to-r from-indigo-50 to-pink-50 rounded-lg p-6">
                <h4 className="font-medium text-gray-900 mb-4">{t('RegisterPage.rateCard.quickGuide.title')}</h4>
                <div className="space-y-3 text-sm text-gray-600">
                  {(t('RegisterPage.rateCard.quickGuide.tips', { returnObjects: true }) as string[]).map((tip: string, index: number) => (
                    <p key={index}>• {tip}</p>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                {formData.rateCards.map((card, index) => (
                  <Card
                    key={index}
                    className={`p-6 transition-all duration-300 ${
                      card.platform
                        ? `bg-gradient-to-r ${PLATFORM_THEMES[card.platform as keyof typeof PLATFORM_THEMES]} bg-opacity-10 hover:bg-opacity-20`
                        : 'bg-white'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-6">
                      <div className="flex items-center gap-2">
                        <h4 className="text-lg font-medium">Rate Card #{index + 1}</h4>
                        {card.platform && (
                          <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize shadow-sm ${
                            card.platform === 'tiktok' ? 'bg-black text-white' :
                            card.platform === 'instagram' ? 'bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] text-white' :
                            card.platform === 'facebook' ? 'bg-[#1877F2] text-white' :
                            card.platform === 'youtube' ? 'bg-[#FF0000] text-white' :
                            card.platform === 'blog' ? 'bg-[#2D3748] text-white' :
                            'bg-indigo-600 text-white'
                          }`}>
                            {card.platform}
                          </span>
                        )}
                      </div>
                      {index > 0 && (
                        <Button
                          type="button"
                          onClick={() => {
                            setFormData(prev => ({
                              ...prev,
                              rateCards: prev.rateCards.filter((_, i) => i !== index)
                            }));
                          }}
                          className="flex items-center gap-2"
                        >
                          <Trash2 className="w-4 h-4" />
                          Remove
                        </Button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {t('RegisterPage.rateCard.platform')} <span className="text-red-500">*</span>
                        </label>
                        <select
                          value={card.platform || ''}
                          onChange={(e) => {
                            const platform = e.target.value;
                            updateRateCard(index, 'platform', platform);
                            const cardElement = document.getElementById(`rate-card-${index}`);
                            if (cardElement) {
                              cardElement.classList.add('animate-pulse');
                              setTimeout(() => {
                                cardElement.classList.remove('animate-pulse');
                              }, 500);
                            }
                          }}
                          className={`block w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 bg-white/90 backdrop-blur-sm ${
                            card.platform
                              ? `border-${card.platform === 'tiktok' ? 'black' :
                                card.platform === 'instagram' ? 'pink-500' :
                                card.platform === 'facebook' ? 'blue-500' :
                                card.platform === 'youtube' ? 'red-500' :
                                card.platform === 'blog' ? 'gray-500' :
                                'indigo-500'}`
                              : 'border-gray-300'
                          }`}
                        >
                          <option value="">Select Platform</option>
                          <option value="tiktok">TikTok</option>
                          <option value="instagram">Instagram</option>
                          <option value="facebook">Facebook</option>
                          <option value="youtube">YouTube</option>
                          <option value="blog">Blog</option>
                          <option value="other">Other</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {t('RegisterPage.rateCard.contentType')} <span className="text-red-500">*</span>
                        </label>
                        <select
                          value={card.contentType || ''}
                          onChange={(e) => updateRateCard(index, 'contentType', e.target.value)}
                          className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 bg-white/90 backdrop-blur-sm"
                        >
                          <option value="">Select Content Type</option>
                          <option value="video">Video</option>
                          <option value="reel">Reel/Short Video</option>
                          <option value="post">Post</option>
                          <option value="story">Story</option>
                          <option value="review">Product Review</option>
                          <option value="tutorial">Tutorial</option>
                          <option value="other">Other</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {t('RegisterPage.rateCard.basePrice')} <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <Input
                            type="number"
                            placeholder="Enter amount"
                            value={card.basePrice || ''}
                            onChange={(e) => updateRateCard(index, 'basePrice', parseInt(e.target.value))}
                            className="text-lg pl-4 pr-12 py-3 bg-white/90 backdrop-blur-sm shadow-sm"
                          />
                          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 font-semibold text-lg">฿</span>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {t('RegisterPage.rateCard.duration')}
                        </label>
                        <div className="relative">
                          <Input
                            type="number"
                            placeholder="Enter duration"
                            value={card.duration || ''}
                            onChange={(e) => updateRateCard(index, 'duration', parseInt(e.target.value))}
                            className="text-lg pl-4 pr-12 py-3 bg-white/90 backdrop-blur-sm shadow-sm"
                          />
                          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 font-semibold text-lg">min</span>
                        </div>
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {t('RegisterPage.rateCard.additionalNotes')}
                        </label>
                        <textarea
                          className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 bg-white/90 backdrop-blur-sm"
                          rows={3}
                          placeholder="Add any specific requirements, conditions, or additional services..."
                          value={card.note || ''}
                          onChange={(e) => updateRateCard(index, 'note', e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="mt-6 border-t pt-6">
                      <button
                        type="button"
                        onClick={() => {
                          const newCards = [...formData.rateCards];
                          newCards[index] = {
                            ...newCards[index],
                            showAdvanced: !newCards[index].showAdvanced
                          };
                          setFormData(prev => ({
                            ...prev,
                            rateCards: newCards
                          }));
                        }}
                        className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 transition-colors duration-300"
                      >
                        <ChevronDown className={`w-4 h-4 transform transition-transform duration-300 ${card.showAdvanced ? 'rotate-180' : ''}`} />
                        {t('RegisterPage.rateCard.advancedSettings')}
                      </button>

                      {card.showAdvanced && (
                        <div className="mt-6 space-y-6 bg-white/50 backdrop-blur-sm rounded-lg p-6 shadow-sm">
                          <div>
                            <h5 className="text-sm font-medium text-gray-900 mb-4">{t('RegisterPage.rateCard.workConditions.title')}</h5>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <Input
                                label={t('RegisterPage.rateCard.workConditions.scriptRevisions')}
                                type="number"
                                value={card.scriptRevisions || ''}
                                onChange={(e) => updateRateCard(index, 'scriptRevisions', parseInt(e.target.value))}
                              />
                              <Input
                                label={t('RegisterPage.rateCard.workConditions.draftRevisions')}
                                type="number"
                                value={card.draftRevisions || ''}
                                onChange={(e) => updateRateCard(index, 'draftRevisions', parseInt(e.target.value))}
                              />
                              <Input
                                label={t('RegisterPage.rateCard.workConditions.reshootPenalty')}
                                type="text"
                                value={card.reshootPenalty || ''}
                                onChange={(e) => updateRateCard(index, 'reshootPenalty', e.target.value)}
                              />
                              <Input
                                label={t('RegisterPage.rateCard.workConditions.hashtagLimit')}
                                type="number"
                                value={card.hashtagLimit || ''}
                                onChange={(e) => updateRateCard(index, 'hashtagLimit', parseInt(e.target.value))}
                              />
                              <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700">{t('RegisterPage.rateCard.workConditions.otherWorkConditions')}</label>
                                <textarea
                                  className="p-3 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                  rows={2}
                                  value={card.otherWorkConditions || ''}
                                  onChange={(e) => updateRateCard(index, 'otherWorkConditions', e.target.value)}
                                />
                              </div>
                            </div>
                          </div>

                          <div className='border-t pt-6 mt-6 border-gray-200'>
                            <h5 className="text-sm font-medium text-gray-900 mb-4">{t('RegisterPage.rateCard.paymentTerms.title')}</h5>
                            <div className="flex flex-col gap-4">
                              <div className="flex items-center">
                                <input
                                  type="checkbox"
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                  checked={card.quotationNeeded || false}
                                  onChange={(e) => updateRateCard(index, 'quotationNeeded', e.target.checked)}
                                />
                                <label className="ml-2 block text-sm text-gray-900">{t('RegisterPage.rateCard.paymentTerms.quotationNeeded')}</label>
                              </div>
                              <div className="flex items-center">
                                <input
                                  type="checkbox"
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                  checked={card.depositRequired || false}
                                  onChange={(e) => updateRateCard(index, 'depositRequired', e.target.checked)}
                                />
                                <label className="ml-2 block text-sm text-gray-900">{t('RegisterPage.rateCard.paymentTerms.depositRequired')}</label>
                              </div>
                              {card.depositRequired && (
                                <Input
                                  label={t('RegisterPage.rateCard.paymentTerms.depositPercentage')}
                                  type="number"
                                  value={card.depositPercentage || ''}
                                  onChange={(e) => updateRateCard(index, 'depositPercentage', parseInt(e.target.value))}
                                />
                              )}
                              <div className="flex items-center">
                                <input
                                  type="checkbox"
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                  checked={card.paymentAfterPost || false}
                                  onChange={(e) => updateRateCard(index, 'paymentAfterPost', e.target.checked)}
                                />
                                <label className="ml-2 block text-sm text-gray-900">{t('RegisterPage.rateCard.paymentTerms.paymentAfterPost')}</label>
                              </div>
                              {card.paymentAfterPost && (
                                <Input
                                  label={t('RegisterPage.rateCard.paymentTerms.paymentAfterPostPercentage')}
                                  type="number"
                                  value={card.paymentAfterPostPercentage || ''}
                                  onChange={(e) => updateRateCard(index, 'paymentAfterPostPercentage', parseInt(e.target.value))}
                                />
                              )}
                              <Input
                                label={t('RegisterPage.rateCard.paymentTerms.creditTerm')}
                                type="number"
                                value={card.creditTerm || ''}
                                onChange={(e) => updateRateCard(index, 'creditTerm', parseInt(e.target.value))}
                              />
                              <div className="flex items-center">
                                <input
                                  type="checkbox"
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                  checked={card.vatIncluded || false}
                                  onChange={(e) => updateRateCard(index, 'vatIncluded', e.target.checked)}
                                />
                                <label className="ml-2 block text-sm text-gray-900">{t('RegisterPage.rateCard.paymentTerms.vatIncluded')}</label>
                              </div>
                              <div className="flex items-center">
                                <input
                                  type="checkbox"
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                  checked={card.whtIncluded || false}
                                  onChange={(e) => updateRateCard(index, 'whtIncluded', e.target.checked)}
                                />
                                <label className="ml-2 block text-sm text-gray-900">{t('RegisterPage.rateCard.paymentTerms.whtIncluded')}</label>
                              </div>
                              <Input
                                label={t('RegisterPage.rateCard.paymentTerms.latePaymentPenalty')}
                                type="text"
                                value={card.latePaymentPenalty || ''}
                                onChange={(e) => updateRateCard(index, 'latePaymentPenalty', e.target.value)}
                              />
                              <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700">{t('RegisterPage.rateCard.paymentTerms.otherPaymentTerms')}</label>
                                <textarea
                                  className="p-3 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                  rows={2}
                                  value={card.otherPaymentTerms || ''}
                                  onChange={(e) => updateRateCard(index, 'otherPaymentTerms', e.target.value)}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </Card>
                ))}

                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setFormData(prev => ({
                      ...prev,
                      rateCards: [
                        ...prev.rateCards,
                        {
                          platform: '',
                          contentType: '',
                          basePrice: 0,
                          duration: 0,
                          note: '',
                          showAdvanced: false
                        }
                      ]
                    }));
                  }}
                  className="w-full flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  {t('RegisterPage.rateCard.addAnother')}
                </Button>
              </div>

              <div className="bg-gradient-to-r from-indigo-50 to-pink-50 rounded-lg p-6">
                <h4 className="font-medium text-gray-900 mb-4">{t('RegisterPage.rateCard.pricingTips.title')}</h4>
                <div className="space-y-3 text-sm text-gray-600">
                  {(t('RegisterPage.rateCard.pricingTips.tips', { returnObjects: true }) as string[]).map((tip: string, index: number) => (
                    <p key={index}>• {tip}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {t('RegisterPage.review.title')}
              </h3>
              <p className="text-gray-600">
                {t('RegisterPage.review.subtitle')}
              </p>
            </div>

            <Card className="p-6">
              <h4 className="text-lg font-medium text-gray-900 mb-4">{t('RegisterPage.review.accountInfo.title')}</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">{t('RegisterPage.review.accountInfo.fullName')}</p>
                  <p className="font-medium">{formData.firstName} {formData.lastName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">{t('RegisterPage.review.accountInfo.email')}</p>
                  <p className="font-medium">{formData.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">{t('RegisterPage.review.accountInfo.userType')}</p>
                  <p className="font-medium capitalize">{formData.userType}</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h4 className="text-lg font-medium text-gray-900 mb-4">{t('RegisterPage.review.interests.title')}</h4>
              <div className="flex flex-wrap gap-2">
                {formData.interests.map((interest, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800"
                  >
                    {interest}
                  </span>
                ))}
                {formData.customInterest && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                    {formData.customInterest}
                  </span>
                )}
              </div>
            </Card>

            <Card className="p-6">
              <h4 className="text-lg font-medium text-gray-900 mb-4">{t('RegisterPage.review.rateCards.title')}</h4>
              <div className="space-y-6">
                {formData.rateCards.map((card, index) => (
                  <div key={index} className="border-b pb-6 last:border-b-0 bg-gray-100 p-4 rounded-lg shadow-sm">
                    <h5 className="font-medium text-gray-900 mb-4">Rate Card #{index + 1}</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">{t('RegisterPage.review.rateCards.platform')}</p>
                        <p className="font-medium capitalize">{card.platform}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">{t('RegisterPage.review.rateCards.contentType')}</p>
                        <p className="font-medium capitalize">{card.contentType}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">{t('RegisterPage.review.rateCards.basePrice')}</p>
                        <p className="font-medium">{card.basePrice} THB</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">{t('RegisterPage.review.rateCards.duration')}</p>
                        <p className="font-medium">{card.duration} minutes</p>
                      </div>
                      {card.note && (
                        <div className="md:col-span-2">
                          <p className="text-sm text-gray-500">{t('RegisterPage.review.rateCards.additionalNotes')}</p>
                          <p className="font-medium">{card.note}</p>
                        </div>
                      )}
                      {(card.scriptRevisions || card.draftRevisions || card.reshootPenalty || card.hashtagLimit || card.otherWorkConditions) && (
                        <div className="md:col-span-2 mt-4 border-t pt-6 mt-6 border-gray-300">
                          <h6 className="text-sm font-medium text-gray-900 mb-2">{t('RegisterPage.review.rateCards.workConditions.title')}</h6>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {card.scriptRevisions && (
                              <div>
                                <p className="text-sm text-gray-500">{t('RegisterPage.review.rateCards.workConditions.scriptRevisions')}</p>
                                <p className="font-medium">{card.scriptRevisions}</p>
                              </div>
                            )}
                            {card.draftRevisions && (
                              <div>
                                <p className="text-sm text-gray-500">{t('RegisterPage.review.rateCards.workConditions.draftRevisions')}</p>
                                <p className="font-medium">{card.draftRevisions}</p>
                              </div>
                            )}
                            {card.reshootPenalty && (
                              <div>
                                <p className="text-sm text-gray-500">{t('RegisterPage.review.rateCards.workConditions.reshootPenalty')}</p>
                                <p className="font-medium">{card.reshootPenalty}</p>
                              </div>
                            )}
                            {card.hashtagLimit && (
                              <div>
                                <p className="text-sm text-gray-500">{t('RegisterPage.review.rateCards.workConditions.hashtagLimit')}</p>
                                <p className="font-medium">{card.hashtagLimit}</p>
                              </div>
                            )}
                            {card.otherWorkConditions && (
                              <div className="md:col-span-2">
                                <p className="text-sm text-gray-500">{t('RegisterPage.review.rateCards.workConditions.otherWorkConditions')}</p>
                                <p className="font-medium">{card.otherWorkConditions}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {(card.quotationNeeded || card.depositRequired || card.paymentAfterPost || card.creditTerm || card.vatIncluded || card.whtIncluded || card.latePaymentPenalty || card.otherPaymentTerms) && (
                        <div className="md:col-span-2 mt-4 border-t pt-6 mt-6 border-gray-300">
                          <h6 className="text-sm font-medium text-gray-900 mb-2">{t('RegisterPage.review.rateCards.paymentTerms.title')}</h6>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {card.quotationNeeded && (
                              <div>
                                <p className="text-sm text-gray-500">{t('RegisterPage.review.rateCards.paymentTerms.quotationNeeded')}</p>
                                <p className="font-medium">Yes</p>
                              </div>
                            )}
                            {card.depositRequired && (
                              <div>
                                <p className="text-sm text-gray-500">{t('RegisterPage.review.rateCards.paymentTerms.depositRequired')}</p>
                                <p className="font-medium">{card.depositPercentage}%</p>
                              </div>
                            )}
                            {card.paymentAfterPost && (
                              <div>
                                <p className="text-sm text-gray-500">{t('RegisterPage.review.rateCards.paymentTerms.paymentAfterPost')}</p>
                                <p className="font-medium">{card.paymentAfterPostPercentage}%</p>
                              </div>
                            )}
                            {card.creditTerm && (
                              <div>
                                <p className="text-sm text-gray-500">{t('RegisterPage.review.rateCards.paymentTerms.creditTerm')}</p>
                                <p className="font-medium">{card.creditTerm} days</p>
                              </div>
                            )}
                            {card.vatIncluded && (
                              <div>
                                <p className="text-sm text-gray-500">{t('RegisterPage.review.rateCards.paymentTerms.vatIncluded')}</p>
                                <p className="font-medium">Yes</p>
                              </div>
                            )}
                            {card.whtIncluded && (
                              <div>
                                <p className="text-sm text-gray-500">{t('RegisterPage.review.rateCards.paymentTerms.whtIncluded')}</p>
                                <p className="font-medium">Yes</p>
                              </div>
                            )}
                            {card.latePaymentPenalty && (
                              <div>
                                <p className="text-sm text-gray-500">{t('RegisterPage.review.rateCards.paymentTerms.latePaymentPenalty')}</p>
                                <p className="font-medium">{card.latePaymentPenalty}</p>
                              </div>
                            )}
                            {card.otherPaymentTerms && (
                              <div className="md:col-span-2">
                                <p className="text-sm text-gray-500">{t('RegisterPage.review.rateCards.paymentTerms.otherPaymentTerms')}</p>
                                <p className="font-medium">{card.otherPaymentTerms}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        );
      case 5:
        return (
          <div className="text-center space-y-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900">{t('RegisterPage.complete.title')}</h2>
            <p className="text-gray-600">
              {t('RegisterPage.complete.subtitle')}
            </p>
            <Button
              type="button"
              onClick={() => navigate('/login')}
              className="mt-4"
            >
              {t('RegisterPage.complete.goToLogin')}
            </Button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-pink-50 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-40 h-40 bg-gradient-to-r from-indigo-400/10 to-purple-400/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-gradient-to-r from-pink-400/10 to-rose-400/10 rounded-full blur-3xl animate-float delay-700"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-indigo-300/5 to-pink-300/5 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <Navigation minimal />

      <div className="pt-20 pb-12 relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-8">
          <div className="flex items-center justify-center min-h-[calc(100vh-8rem)]">
            <div className="w-full max-w-2xl mx-auto">
              <Card className="p-10 shadow-2xl border-0 backdrop-blur-sm bg-white/95 hover:shadow-3xl transition-all duration-300">
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
                      {t('RegisterPage.title')}
                    </span>
                  </h1>
                  <p className="text-gray-600 text-lg">
                    {t('RegisterPage.subtitle')}
                  </p>
                </div>

                <div className="relative mb-16">
                  <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200 -z-10"></div>

                  <div className="flex items-center justify-between relative">
                    {[1, 2, 3, 4, 5].map((step) => (
                      <div key={step} className="flex flex-col items-center">
                        <div className={`
                          relative z-10
                          w-10 h-10 rounded-full flex items-center justify-center
                          transition-all duration-300 ease-in-out
                          ${step < currentStep
                            ? 'bg-indigo-600 text-white scale-110 shadow-lg shadow-indigo-200'
                            : step === currentStep
                              ? 'bg-white border-2 border-indigo-600 text-indigo-600 scale-110 shadow-lg shadow-indigo-200'
                              : 'bg-white border-2 border-gray-300 text-gray-400'
                          }
                        `}>
                          {step < currentStep ? (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                          ) : (
                            <span className="font-medium">{step}</span>
                          )}
                        </div>

                        <div className={`
                          absolute -bottom-8 text-sm font-medium transition-all duration-300
                          ${step === currentStep
                            ? 'text-indigo-600 opacity-100 transform translate-y-0'
                            : 'text-gray-400 opacity-0 transform translate-y-2'
                          }
                        `}>
                          {step === 1 && t('RegisterPage.steps.account')}
                          {step === 2 && t('RegisterPage.steps.interests')}
                          {step === 3 && t('RegisterPage.steps.rateCard')}
                          {step === 4 && t('RegisterPage.steps.review')}
                          {step === 5 && t('RegisterPage.steps.complete')}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div
                    className="absolute top-5 left-0 h-0.5 bg-indigo-600 transition-all duration-500 ease-in-out"
                    style={{ width: `${((currentStep - 1) / 4) * 100}%` }}
                  ></div>
                </div>

                <form onSubmit={handleStepSubmit}>
                  {renderStep()}

                  {currentStep < 5 && (
                    <div className="mt-8 flex justify-between items-center border-t pt-6">
                      {currentStep > 1 && (
                        <Button
                          type="button"
                          variant="secondary"
                          onClick={() => setCurrentStep(prev => prev - 1)}
                          className="flex items-center gap-2"
                        >
                          <ArrowLeft className="w-4 h-4" />
                          {t('RegisterPage.navigation.back')}
                        </Button>
                      )}
                      <Button
                        type="submit"
                        className={`ml-auto min-w-[120px] ${currentStep === 4
                          ? 'bg-gradient-to-r from-indigo-600 to-pink-600 hover:from-indigo-700 hover:to-pink-700'
                          : ''
                          }`}
                      >
                        {currentStep === 4 ? t('RegisterPage.navigation.review') : t('RegisterPage.navigation.next')}
                      </Button>
                    </div>
                  )}
                </form>

                <div className="text-center mt-8 pt-6 border-t border-gray-200">
                  <p className="text-sm text-gray-600">
                    {t('RegisterPage.navigation.alreadyHaveAccount')}{' '}
                    <Link to="/auth" className="text-indigo-600 hover:text-indigo-500 font-medium">
                      {t('RegisterPage.navigation.signIn')}
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