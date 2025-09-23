# React CSS Page Loader

A beautiful and customizable React component for page loading animations with CSS-based animations instead of Lottie.

## Features

- **CSS-based animations** - No external animation libraries required
- **Multiple animation types** - Circle spinner or text loading
- **Lightweight** - Minimal dependencies
- **Customizable** - Configurable duration, text, and styling
- **Responsive** - Works on all screen sizes
- **Smooth transitions** - Built with Framer Motion for smooth page transitions

## Installation

```bash
npm install react-css-page-loader
```

## Dependencies

This package requires the following peer dependencies:

```bash
npm install react react-dom framer-motion
```

## Usage

### Basic Usage

```jsx
import React from 'react';
import PageLoader from 'react-css-page-loader';

function App() {
  return (
    <PageLoader>
      <div>
        <h1>Your App Content</h1>
        <p>This content will be shown after the loading animation completes.</p>
      </div>
    </PageLoader>
  );
}

export default App;
```

### With Router (React Router)

```jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import PageLoader from 'react-css-page-loader';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';

function AnimatedRoutes() {
  return (
    <AnimatePresence mode='wait'>
      <Routes>
        <Route path="/" element={<PageLoader><HomePage /></PageLoader>} />
        <Route path="/about" element={<PageLoader><AboutPage /></PageLoader>} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <AnimatedRoutes />
    </Router>
  );
}

export default App;
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | The content to display after loading |
| `backgroundColor` | `string` | `"#ffffff"` | Background color of the loading screen |
| `loadingText` | `string` | `"Loading..."` | Text to display when using text animation |
| `animationType` | `"circle" \| "text"` | `"circle"` | Type of loading animation |
| `duration` | `number` | `3000` | Loading duration in milliseconds |

## Examples

### Circle Animation (Default)

```jsx
<PageLoader animationType="circle" duration={2000}>
  <YourContent />
</PageLoader>
```

### Text Animation

```jsx
<PageLoader 
  animationType="text" 
  loadingText="Please wait..." 
  duration={4000}
>
  <YourContent />
</PageLoader>
```

### Custom Styling

```jsx
<PageLoader 
  backgroundColor="#f0f0f0"
  animationType="circle"
  duration={2500}
>
  <YourContent />
</PageLoader>
```

## Animation Types

### Circle Animation
- A spinning circle with smooth rotation
- Perfect for modern, minimal designs
- Lightweight and performant

### Text Animation
- Pulsing text with animated dots
- Customizable loading message
- Great for branded experiences

## Styling

The component comes with built-in styles, but you can customize the appearance by overriding CSS classes:

```css
/* Customize the loading container */
.loading-container {
  background-color: rgba(255, 255, 255, 0.95);
  border-radius: 15px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

/* Customize the spinner */
.spinner {
  border-top-color: #007bff;
  width: 60px;
  height: 60px;
}

/* Customize the loading text */
.loading-text {
  color: #333;
  font-size: 18px;
  font-family: 'Your Custom Font', sans-serif;
}
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Repository

- **GitHub**: [https://github.com/divindvm/React-CSS-Page-Loader](https://github.com/divindvm/React-CSS-Page-Loader)
- **NPM**: [https://www.npmjs.com/package/react-css-page-loader](https://www.npmjs.com/package/react-css-page-loader)

## Changelog

### 1.0.0
- Initial release
- CSS-based loading animations
- Circle and text animation types
- Customizable props
- Framer Motion integration
