# CTR (Crew Time Report) PWA - Firefighting Operations Management

## Description 
A comprehensive Progressive Web App (PWA) designed specifically for firefighting operations in adverse conditions. This application provides a complete suite of tools for managing crew time reports, personnel information, and documentation in the field with full offline capabilities.

The app enables firefighting crews to:
- Input and manage firefighter information in real-time
- Generate and print professional CTR forms
- View and annotate PDF documents
- Capture digital signatures
- Export data to Excel spreadsheets
- Work completely offline with data persistence

## Key Features

### Core Functionality
- **Crew Time Report (CTR) Management**: Complete CTR form generation with auto-fill capabilities
- **Progressive Web App (PWA)**: Full offline functionality with service worker caching
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Data Persistence**: IndexedDB storage for offline data management

### Document Management
- **PDF Generation**: Auto-filled CTR forms with professional formatting
- **PDF Viewer**: Built-in PDF viewing and annotation capabilities
- **Digital Signatures**: Capture and embed signatures in documents
- **Excel Export**: Export crew data to Excel spreadsheets
- **Print Support**: Direct printing with optimized layouts

### User Experience
- **Auto-Save**: Automatic data saving with status indicators
- **Undo/Redo**: Full undo/redo functionality for data changes
- **Drag & Drop**: Intuitive drag-and-drop interface for data management
- **Calendar Integration**: Date selection and navigation
- **Real-time Validation**: Form validation and error handling

### Field Operations
- **Offline-First**: Works without internet connection
- **Quick Printing**: Optimized print layouts for field conditions
- **Data Import**: Support for CSV and Excel file imports
- **Backup & Restore**: Data backup and recovery capabilities

## Installation & Setup

### Prerequisites
- Node.js (LTS version recommended)
- npm or yarn package manager

### Local Development Setup
1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd carouseltest
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Build for production**
   ```bash
   npm run build
   ```

### PWA Installation
- **Desktop**: Click the install prompt in the browser address bar
- **Mobile**: Add to home screen via browser menu
- **Offline**: App works offline once installed

## Usage Guide

### Getting Started
1. **Launch the Application**
   - Open the app in your browser
   - Install as PWA for offline access

2. **Create a New CTR**
   - Select dates using the calendar interface
   - Enter crew information and fire details
   - Add personnel with classifications and time entries

3. **Manage Data**
   - Use the main table interface for data entry
   - Auto-save ensures no data loss
   - Navigate between different dates using Previous/Next buttons

### Document Operations
1. **Generate CTR Forms**
   - Click "Send to Printer" to generate formatted CTR
   - Preview and print directly from the browser
   - Use the back and print buttons in the preview window

2. **PDF Operations**
   - View PDFs with built-in viewer
   - Add annotations and drawings
   - Capture and embed digital signatures
   - Download or print PDFs

3. **Data Export**
   - Export to Excel with proper formatting
   - Import data from CSV/Excel files
   - Backup and restore data

### Advanced Features
- **Undo/Redo**: Use the undo button to revert changes
- **Auto-Save**: Data is automatically saved with status indicators
- **Offline Mode**: Continue working without internet connection
- **Print Optimization**: Optimized layouts for field printing

## Technical Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for build tooling
- **Dexie.js** for IndexedDB management
- **React Beautiful DnD** for drag-and-drop
- **React PDF** for PDF viewing

### PDF & Document Processing
- **PDF.js** for PDF rendering
- **PDF-lib** for PDF manipulation
- **jsPDF** for PDF generation
- **ExcelJS** for Excel file handling

### PWA Features
- **Service Worker** for offline caching
- **Web App Manifest** for app installation
- **IndexedDB** for offline data storage
- **Push Notifications** (planned)

### Development Tools
- **TypeScript** for type safety
- **ESLint** for code quality
- **GitHub Actions** for CI/CD
- **GitHub Pages** for deployment

## Project Structure
```
src/
├── components/          # React components
│   ├── MainTable.tsx   # Main CTR interface
│   ├── PDFViewer.tsx   # PDF viewing component
│   ├── PrintableTable.tsx # Print generation
│   └── ...
├── db/                 # Database management
├── hooks/              # Custom React hooks
├── styles/             # CSS and styling
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
└── ...
```

## Deployment

### GitHub Pages Deployment
The app is automatically deployed to GitHub Pages via GitHub Actions:

1. **Push to main branch** triggers automatic deployment
2. **Build process** creates optimized production build
3. **Deployment** to `https://joonk4ng.github.io`

### Manual Deployment
```bash
npm run build
npm run deploy
```

## Development

### Code Style
- Follow TypeScript best practices
- Use functional components with hooks
- Maintain PWA compatibility
- Ensure responsive design

### Adding Features
1. Fork the repository
2. Create a feature branch
3. Implement changes with proper testing
4. Submit a pull request

### Testing
- Test offline functionality
- Verify PWA installation
- Check responsive design
- Validate print layouts

## Support & Contributing

### Getting Help
- **Email**: joonhyungkang1@gmail.com
- **Issues**: Use GitHub Issues for bug reports
- **Documentation**: Check the docs folder for detailed guides

### Contributing
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Roadmap

### Planned Features
- [ ] Push notifications for updates
- [ ] Enhanced PDF annotation tools
- [ ] Multi-language support
- [ ] Advanced reporting features
- [ ] Integration with external systems
- [ ] Mobile app versions (iOS/Android)

### Current Limitations
- Excel import requires specific formatting
- PDF annotations are basic (enhancement planned)
- Limited to single-user operations

## License
This project is developed for firefighting operations and emergency management use.

---

**Note**: This application is designed for field use in emergency situations. Always ensure you have backup documentation methods available.
