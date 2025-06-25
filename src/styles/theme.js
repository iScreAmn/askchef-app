export const theme = {
  colors: {
    primary: '#FF6B35',
    primaryHover: '#E55A2B',
    secondary: '#4ECDC4',
    secondaryHover: '#3BB5AD',
    accent: '#45B7D1',
    accentHover: '#3A9BC1',
    
    background: '#FFFFFF',
    surface: '#F8F9FA',
    surfaceHover: '#F1F3F4',
    
    text: '#2D3436',
    textSecondary: '#636E72',
    textLight: '#FFFFFF',
    
    success: '#00B894',
    successHover: '#00A085',
    warning: '#FDCB6E',
    warningHover: '#FCC02E',
    error: '#E17055',
    errorHover: '#D63031',
    
    border: '#DDD',
    borderLight: '#EEEEEE',
    borderDark: '#B2BEC3',
    
    // Градиенты
    gradientPrimary: 'linear-gradient(135deg, #FF6B35 0%, #F39C12 100%)',
    gradientSecondary: 'linear-gradient(135deg, #4ECDC4 0%, #45B7D1 100%)',
    
    // Полупрозрачные цвета
    overlay: 'rgba(0, 0, 0, 0.5)',
    shadow: 'rgba(0, 0, 0, 0.1)',
  },
  
  breakpoints: {
    xs: '480px',
    sm: '768px',
    md: '1024px',
    lg: '1200px',
    xl: '1400px'
  },
  
  spacing: {
    xs: '0.4rem',
    sm: '0.8rem',
    md: '1.6rem',
    lg: '2.4rem',
    xl: '3.2rem',
    xxl: '4.8rem',
    xxxl: '6.4rem'
  },
  
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    round: '50%'
  },
  
  shadows: {
    sm: '0 1px 3px rgba(0, 0, 0, 0.1)',
    md: '0 4px 8px rgba(0, 0, 0, 0.1)',
    lg: '0 8px 16px rgba(0, 0, 0, 0.1)',
    xl: '0 16px 32px rgba(0, 0, 0, 0.1)',
    inset: 'inset 0 2px 4px rgba(0, 0, 0, 0.1)'
  },
  
  transitions: {
    fast: '0.15s ease',
    normal: '0.3s ease',
    slow: '0.5s ease'
  },
  
  zIndex: {
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modal: 1040,
    popover: 1050,
    tooltip: 1060
  },
  
  typography: {
    h1: {
      fontSize: '3.2rem',
      fontWeight: '700',
      lineHeight: '1.2'
    },
    h2: {
      fontSize: '2.4rem',
      fontWeight: '600',
      lineHeight: '1.3'
    },
    h3: {
      fontSize: '2rem',
      fontWeight: '600',
      lineHeight: '1.4'
    },
    h4: {
      fontSize: '1.8rem',
      fontWeight: '500',
      lineHeight: '1.4'
    },
    body: {
      fontSize: '1.6rem',
      fontWeight: '400',
      lineHeight: '1.6'
    },
    small: {
      fontSize: '1.4rem',
      fontWeight: '400',
      lineHeight: '1.5'
    }
  }
} 