
/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        fontFamily: {
          'serif': ['Playfair Display', 'serif'],
          'sans': ['Inter', 'system-ui', 'sans-serif'],
        },
        colors: {
          // Primary - Clean whites and light grays for main backgrounds
          primary: {
            50: '#ffffff',    // Pure white
            100: '#f9fafb',   // Off white
            200: '#f3f4f6',   // Light gray
            300: '#e5e7eb',   // Medium light gray
            400: '#d1d5db',   // Medium gray
            500: '#6b7280',   // Dark gray text
            600: '#4b5563',   // Darker gray
            700: '#374151',   // Very dark gray
            800: '#1f2937',   // Almost black
            900: '#111827',   // Rich black
          },
          // Secondary - Deep dark colors for contrast and elegance
          secondary: {
            50: '#f8fafc',    // Very light
            100: '#f1f5f9',   // Light
            200: '#e2e8f0',   // Medium light
            300: '#cbd5e1',   // Medium
            400: '#94a3b8',   // Muted
            500: '#64748b',   // Main secondary
            600: '#475569',   // Dark
            700: '#334155',   // Very dark
            800: '#1e293b',   // Almost black
            900: '#0f172a',   // Deepest dark
          },
          // Action - Solid accent color for buttons and highlights
          accent: {
            50: '#eff6ff',    // Very light blue
            100: '#dbeafe',   // Light blue
            200: '#bfdbfe',   // Medium light blue
            300: '#93c5fd',   // Medium blue
            400: '#60a5fa',   // Bright blue
            500: '#235ab2ff',   // Main action blue
            600: '#2563eb',   // Dark blue
            700: '#1d4ed8',   // Very dark blue
            800: '#1e40af',   // Deep blue
            900: '#1e3a8a',   // Darkest blue
          },
          // Success - For positive actions and confirmations
          success: {
            50: '#f0fdf4',    // Very light green
            100: '#dcfce7',   // Light green
            200: '#bbf7d0',   // Medium light green
            300: '#86efac',   // Medium green
            400: '#4ade80',   // Bright green
            500: '#22c55e',   // Main success green
            600: '#16a34a',   // Dark green
            700: '#15803d',   // Very dark green
            800: '#166534',   // Deep green
            900: '#14532d',   // Darkest green
          },
          // Warning - For alerts and important information
          warning: {
            50: '#fffbeb',    // Very light orange
            100: '#fef3c7',   // Light orange
            200: '#fde68a',   // Medium light orange
            300: '#fcd34d',   // Medium orange
            400: '#fbbf24',   // Bright orange
            500: '#f59e0b',   // Main warning orange
            600: '#d97706',   // Dark orange
            700: '#b45309',   // Very dark orange
            800: '#92400e',   // Deep orange
            900: '#78350f',   // Darkest orange
          }
        }
      },
    },
    plugins: [],
  }
