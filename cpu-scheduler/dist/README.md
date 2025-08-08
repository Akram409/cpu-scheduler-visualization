# CPU Scheduling Simulator - Production Build

A comprehensive web-based CPU Scheduling Simulator implementing all major scheduling algorithms with interactive visualizations.

## 🚀 Live Demo

Deploy this project to Netlify by uploading the `dist` folder or connecting your repository.

## 📋 Features

### ✅ Implemented Algorithms
- **First Come First Serve (FCFS)** - Non-preemptive scheduling based on arrival time
- **Shortest Job First (SJF)** - Non-preemptive scheduling based on burst time  
- **Priority Scheduling** - Non-preemptive scheduling based on process priority
- **Round Robin (RR)** - Preemptive scheduling with configurable time quantum

### ✅ Interactive Features
- **Process Management**: Add, remove, and manage processes dynamically
- **Real-time Gantt Chart**: Color-coded timeline visualization
- **Comprehensive Results**: Detailed metrics table with all calculations
- **Performance Analysis**: 5 key performance metrics with visual cards
- **Algorithm Comparison**: Easy switching between different algorithms
- **Example Data**: Pre-loaded test cases for quick demonstration

### ✅ Modern UI/UX
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Tailwind CSS + DaisyUI**: Modern, clean, and professional interface
- **Interactive Animations**: Smooth transitions and hover effects
- **Accessibility**: ARIA labels, keyboard navigation, and screen reader support
- **Dark/Light Mode**: Automatic theme detection

## 🛠️ Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Tailwind CSS, DaisyUI
- **Icons**: Font Awesome 6
- **Deployment**: Netlify-ready static site

## 📊 Performance Metrics

The simulator calculates and displays:
- **Average Waiting Time**: Mean time processes wait in ready queue
- **Average Turnaround Time**: Mean total time from arrival to completion
- **Total Execution Time**: Complete timeline duration
- **CPU Utilization**: Percentage of time CPU is actively processing
- **Throughput**: Number of processes completed per time unit

## 🎯 Educational Value

Perfect for:
- **Operating Systems Courses**: Hands-on learning of CPU scheduling
- **Algorithm Visualization**: Understanding different scheduling approaches
- **Performance Analysis**: Comparing algorithm efficiency
- **University Projects**: Complete implementation with documentation

## 🚀 Deployment Instructions

### Option 1: Netlify Drag & Drop
1. Zip the entire `dist` folder
2. Go to [Netlify](https://netlify.com)
3. Drag and drop the zip file
4. Your site will be live instantly!

### Option 2: Git Integration
1. Push this repository to GitHub
2. Connect your GitHub repo to Netlify
3. Set build directory to `dist`
4. Deploy automatically on every push

### Option 3: Netlify CLI
```bash
npm install -g netlify-cli
cd dist
netlify deploy --prod
```

## 📱 Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🔧 Configuration

The application includes:
- **Security Headers**: CSP, XSS protection, frame options
- **Caching Strategy**: Optimized for static assets
- **SEO Optimization**: Meta tags, structured data
- **Performance**: Minified assets, efficient loading

## 📖 Usage Guide

1. **Select Algorithm**: Choose from FCFS, SJF, Priority, or Round Robin
2. **Add Processes**: Enter arrival time, burst time, and priority (if needed)
3. **Run Simulation**: Click to execute the selected algorithm
4. **View Results**: Analyze Gantt chart, results table, and performance metrics
5. **Compare Algorithms**: Switch algorithms to compare performance

## 🎨 Customization

The application uses CSS custom properties for easy theming:
- Colors defined in Tailwind config
- DaisyUI themes can be easily switched
- Responsive breakpoints are configurable

## 📄 File Structure

```
dist/
├── index.html          # Main application page
├── styles.css          # Optimized CSS with Tailwind utilities
├── scheduler.js        # Core scheduling algorithms
├── app.js             # Application logic and UI interactions
├── netlify.toml       # Netlify configuration
└── README.md          # This documentation
```

## 🐛 Troubleshooting

**Common Issues:**
- **Blank page**: Check browser console for JavaScript errors
- **Styling issues**: Ensure Tailwind CSS and DaisyUI are loading
- **Mobile layout**: Test responsive design on different screen sizes

## 📞 Support

For issues or questions:
1. Check browser developer console for errors
2. Verify all files are properly uploaded
3. Test with different browsers
4. Check network connectivity for CDN resources

## 📜 License

This project is created for educational purposes. Feel free to use and modify for your university projects and learning.

---

**Built with ❤️ for Computer Science Education**
