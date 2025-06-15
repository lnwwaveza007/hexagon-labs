import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Button from '../ui/Button';
import { cn } from '../../utils/cn';
import LanguageSwitcher from '../ui/LanguageSwitcher';
import { useTranslation } from 'react-i18next';

interface NavigationProps {
  minimal?: boolean;
}

const Navigation: React.FC<NavigationProps> = ({ minimal = false }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useTranslation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className={cn(
      'fixed top-0 w-full z-50 border-b border-gray-200 transition-all duration-300',
      minimal 
        ? 'bg-white/98 backdrop-blur-md' 
        : 'bg-white/95 backdrop-blur-sm'
    )}>
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        <div className="flex justify-between items-center h-16 sm:h-18">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img 
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSH5QHjUyumB6BOj0dP2SKKi76RudB-xLkGGw&s" 
              alt="HEXAGON LABS Logo" 
              className="w-8 h-8 object-contain"
            />
            <span className="text-xl font-bold text-gray-900">
              <strong>HEXAGON</strong> LABS
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <nav className="flex items-center gap-6">
              <a 
                href="/#features" 
                className="text-gray-600 hover:text-indigo-600 font-medium transition-colors"
              >
                {t('Navigation.features')}
              </a>
              <a 
                href="/#how-it-works" 
                className="text-gray-600 hover:text-indigo-600 font-medium transition-colors"
              >
                {t('Navigation.howItWorks')}
              </a>
              <a 
                href="/#pricing" 
                className="text-gray-600 hover:text-indigo-600 font-medium transition-colors"
              >
                {t('Navigation.pricing')}
              </a>
            </nav>
            <LanguageSwitcher />
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" href="/auth">
                {t('Navigation.login')}
              </Button>
              <Button size="sm" href="/register">
                {t('Navigation.signUp')}
              </Button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={toggleMenu}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-gray-600" />
            ) : (
              <Menu className="w-6 h-6 text-gray-600" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-4">
              <a 
                href="#features" 
                className="text-gray-600 hover:text-indigo-600 font-medium py-2 transition-colors"
                onClick={toggleMenu}
              >
                {t('Navigation.features')}
              </a>
              <a 
                href="#how-it-works" 
                className="text-gray-600 hover:text-indigo-600 font-medium py-2 transition-colors"
                onClick={toggleMenu}
              >
                {t('Navigation.howItWorks')}
              </a>
              <a 
                href="#pricing" 
                className="text-gray-600 hover:text-indigo-600 font-medium py-2 transition-colors"
                onClick={toggleMenu}
              >
                {t('Navigation.pricing')}
              </a>
              <div className="pt-4 border-t border-gray-200 space-y-2">
                <Button variant="outline" size="sm" fullWidth href="/auth">
                  {t('Navigation.login')}
                </Button>
                <Button size="sm" fullWidth href="/register">
                  {t('Navigation.signUp')}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation; 