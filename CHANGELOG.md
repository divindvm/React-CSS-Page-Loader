# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2024-01-XX

### Added
- External loading state control with `isLoading` prop
- Loading completion callback with `onLoadingComplete` prop
- Custom loader support with `customLoader` prop and `animationType="custom"`
- Custom styling support with `customStyles` prop
- Automatic route detection with `autoRouteLoading` prop
- Scroll prevention during loading
- Auto CSS import functionality
- TypeScript definitions (PageLoader.d.ts)
- Improved animation timing and synchronization

### Changed
- Updated animation timing to ensure proper synchronization
- Removed delays in page content display
- Improved z-index management for better layering
- Enhanced component architecture for better performance

### Fixed
- Fixed loader not showing on route changes
- Fixed timing issues between circle and swipe animations
- Fixed page content display delays
- Fixed horizontal overflow issues in navigation
- Fixed layout and styling inconsistencies

### Technical Improvements
- Better state management for loading states
- Improved useEffect dependencies and cleanup
- Enhanced error handling and edge cases
- Better TypeScript support and type safety

## [1.0.1] - 2024-01-XX

### Added
- Basic page loader functionality
- Circle and text animation types
- Custom duration support
- Custom loading text support
- Framer Motion integration

### Fixed
- Initial implementation bugs
- Animation timing issues

## [1.0.0] - 2024-01-XX

### Added
- Initial release
- Basic page loader component
- CSS-based animations
- React integration
