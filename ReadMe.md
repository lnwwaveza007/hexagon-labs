# Hexagon Lab - Influencer Campaign Platform

A modern, responsive React TypeScript application built with Tailwind CSS for connecting influencers with brand campaigns.

## 🚀 Features

- **Landing Page**: Beautiful, animated homepage with hero section, features, and call-to-actions
- **Registration Flow**: Multi-step registration with social media verification
- **Login System**: Secure authentication with social login options
- **Responsive Design**: Mobile-first approach with beautiful animations
- **Reusable Components**: Well-structured component library for scalability

## 🛠️ Tech Stack

- **React 19** with TypeScript
- **Tailwind CSS 4** for styling
- **Lucide React** for icons
- **Vite** for development and building
- **Custom Animations** with CSS keyframes

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/                    # Reusable UI components
│   │   ├── Button.tsx         # Customizable button component
│   │   ├── Input.tsx          # Form input with validation
│   │   ├── Card.tsx           # Content container component
│   │   └── index.ts           # Component exports
│   └── layout/                # Layout components
│       ├── Navigation.tsx     # Header navigation
│       ├── Footer.tsx         # Footer component
│       └── index.ts           # Layout exports
├── pages/                     # Page components
│   ├── LandingPage.tsx        # Homepage with hero & features
│   ├── RegisterPage.tsx       # Multi-step registration
│   └── LoginPage.tsx          # Authentication page
├── utils/                     # Utility functions
│   └── cn.ts                  # Class name utility
├── App.tsx                    # Main app with routing
├── index.css                  # Global styles & animations
└── main.tsx                   # App entry point
```

## 🎨 Component Design System

### UI Components

#### Button
Versatile button component with multiple variants:
- **Variants**: `primary`, `secondary`, `outline`
- **Sizes**: `sm`, `md`, `lg`
- **Features**: Full width option, hover animations, loading states

```tsx
<Button variant="primary" size="lg" href="/register">
  Get Started
</Button>
```

#### Input
Form input component with validation and icons:
- **Features**: Label support, error handling, left/right icons
- **Types**: Support for all HTML input types
- **Styling**: Focus states, validation styling

```tsx
<Input
  label="Email Address"
  type="email"
  error={errors.email}
  rightIcon={<Eye />}
/>
```

#### Card
Container component with hover effects:
- **Features**: Hover animations, customizable padding
- **Variants**: Default, hover-enabled
- **Usage**: Feature cards, form containers

```tsx
<Card hover className="text-center">
  <CardContent>...</CardContent>
</Card>
```

### Layout Components

#### Navigation
Responsive navigation with mobile menu:
- **Features**: Fixed positioning, backdrop blur, mobile toggle
- **Variants**: Normal, minimal (for auth pages)
- **Responsive**: Collapsible on mobile

#### Footer
Multi-column footer with social links:
- **Sections**: Logo, platform links, support, social media
- **Features**: Hover animations, gradient text effects

## 🎭 Animations

Custom animation system using CSS keyframes:

- `animate-float` - Gentle floating effect
- `animate-fade-in-up` - Fade in from bottom
- `animate-fade-in-left` - Fade in from left
- `animate-fade-in-right` - Fade in from right
- `animate-slide-in-scale` - Scale and slide in
- `animate-pulse-glow` - Glowing pulse effect

## 📱 Pages

### Landing Page
- **Hero Section**: Animated background, gradient text, floating cards
- **Features Section**: Grid layout with icon cards and hover effects
- **How It Works**: Step-by-step process with animations
- **CTA Section**: Call-to-action with background effects

### Register Page
- **Multi-step Form**: 3-step registration process
- **Social Verification**: Facebook & Instagram integration
- **Enhanced Congratulations**: Animated success page
- **Responsive Design**: Centered layout with background effects

### Login Page
- **Social Login**: Facebook & Instagram options
- **Form Validation**: Real-time error handling
- **Loading States**: Animated loading overlays
- **Side Content**: Informational panel with stats

## 🚀 Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```

3. **Build for production**:
   ```bash
   npm run build
   ```

## 🎨 Design Principles

- **Mobile-First**: Responsive design starting from mobile
- **Accessibility**: Proper ARIA labels and keyboard navigation
- **Performance**: Optimized animations and lazy loading
- **Consistency**: Unified color scheme and spacing
- **User Experience**: Smooth transitions and micro-interactions

## 🎯 Key Features

### Enhanced User Experience
- Smooth page transitions
- Micro-interactions on hover/focus
- Loading states for all async operations
- Form validation with real-time feedback

### Modern Styling
- Gradient backgrounds and text effects
- Glassmorphism elements
- Custom shadows and blur effects
- Consistent spacing and typography

### Responsive Design
- Mobile-first approach
- Flexible grid layouts
- Adaptive navigation
- Touch-friendly interactions

## 🔮 Future Enhancements

- **Dashboard**: User dashboard for campaign management
- **Routing**: React Router for better navigation
- **State Management**: Context API or Redux for global state
- **API Integration**: Backend integration for authentication
- **Testing**: Unit and integration tests
- **Accessibility**: Enhanced ARIA support and keyboard navigation

## 📄 License

This project is created for demonstration purposes and follows modern React development practices.
