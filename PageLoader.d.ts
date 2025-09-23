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
  animationType?: 'circle' | 'text';
  
  /**
   * Loading duration in milliseconds
   * @default 3000
   */
  duration?: number;
}

/**
 * A React component for page loading animations with CSS-based animations
 */
declare const PageLoader: React.FC<PageLoaderProps>;

export default PageLoader;
