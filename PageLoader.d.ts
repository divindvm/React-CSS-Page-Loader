import { ReactNode } from 'react';

export interface PageLoaderProps {
  /**
   * The content to display after loading completes
   */
  children: ReactNode;
  
  /**
   * Background color of the loading screen
   * @default "#ffffff"
   */
  backgroundColor?: string;
  
  /**
   * Text to display when using text animation type
   * @default "Loading..."
   */
  loadingText?: string;
  
  /**
   * Type of loading animation to display
   * @default "circle"
   */
  animationType?: 'circle' | 'text' | 'custom';
  
  /**
   * Loading duration in milliseconds
   * @default 3000
   */
  duration?: number;
  
  /**
   * External loading state control. If provided, overrides internal loading state
   */
  isLoading?: boolean;
  
  /**
   * Callback function called when loading completes (only when using external loading state)
   */
  onLoadingComplete?: () => void;
  
  /**
   * Custom HTML content to display when animationType is 'custom'
   */
  customLoader?: ReactNode;
  
  /**
   * Custom styles to apply to the loading container
   */
  customStyles?: React.CSSProperties;
  
  /**
   * Whether to automatically trigger loading on route changes (requires react-router-dom)
   * @default true
   */
  autoRouteLoading?: boolean;
  
  /**
   * Custom route change detection function
   */
  onRouteChange?: () => void;
}

/**
 * A React component for page loading animations with CSS-based animations
 */
declare const PageLoader: React.FC<PageLoaderProps>;

export default PageLoader;
