import { useTranslation } from "react-i18next";

const FlagEN = () => (
    <svg width="24" height="24" viewBox="0 0 24 24">
        <clipPath id="enFlagClip"><circle cx="12" cy="12" r="12" /></clipPath>
        <g clipPath="url(#enFlagClip)">
            <rect width="24" height="24" fill="#fff" />
            <rect width="24" height="24" fill="#00247d" />
            <path d="M0 0l24 24M24 0L0 24" stroke="#fff" strokeWidth="4" />
            <path d="M0 0l24 24M24 0L0 24" stroke="#cf142b" strokeWidth="2" />
            <rect x="10" width="4" height="24" fill="#fff" />
            <rect y="10" width="24" height="4" fill="#fff" />
            <rect x="11" width="2" height="24" fill="#cf142b" />
            <rect y="11" width="24" height="2" fill="#cf142b" />
        </g>
    </svg>
);

const FlagTH = () => (
    <svg width="24" height="24" viewBox="0 0 24 24">
        <clipPath id="thFlagClip"><circle cx="12" cy="12" r="12" /></clipPath>
        <g clipPath="url(#thFlagClip)">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                <rect fill="#A51931" width="24" height="4" />
                <rect fill="#F4F5F8" y="4" width="30" height="5" />
                <rect fill="#2D2A4A" y="8" width="24" height="10" />
                <rect fill="#F4F5F8" y="16" width="30" height="5" />
                <rect fill="#A51931" y="20" width="24" height="4" />
            </svg>
        </g>
    </svg>
);

const LanguageSwitcher = () => {
    const { i18n } = useTranslation();
    const isEN = i18n.language === 'en';

    const handleLanguageChange = (language: string) => {
        i18n.changeLanguage(language);
    };

    return (
        <button
            onClick={() => handleLanguageChange(isEN ? 'th' : 'en')}
            className="relative flex items-center w-28 h-12 p-1 bg-[#f0f0f3] rounded-full shadow-inner focus:outline-none"
            style={{ boxShadow: 'inset 4px 4px 12px #d1d9e6, inset -4px -4px 12px #ffffff' }}
        >
            <span className="flex-1 text-lg font-semibold text-gray-500 text-center select-none">
                TH
            </span>
            <span className="flex-1 text-lg font-semibold text-gray-500 text-center select-none">
                EN
            </span>
            <span
                className="absolute top-1 left-1 transition-transform duration-300"
                style={{
                    transform: isEN ? 'translateX(0)' : 'translateX(56px)',
                }}
            >
                <span className="w-10 h-10 rounded-full shadow flex items-center justify-center bg-white">
                    {isEN ? <FlagEN /> : <FlagTH />}
                </span>
            </span>
        </button>
    );
};

export default LanguageSwitcher;