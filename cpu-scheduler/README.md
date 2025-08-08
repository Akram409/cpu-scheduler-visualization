# CPU Scheduling Simulator

A comprehensive web-based interactive simulator for CPU scheduling algorithms, developed as a university project. This application implements and visualizes four fundamental CPU scheduling algorithms with detailed performance analysis.

## 🚀 Features

### Implemented Algorithms
1. **First Come First Serve (FCFS)** - Non-preemptive scheduling based on arrival time
2. **Shortest Job First (SJF)** - Non-preemptive scheduling based on burst time
3. **Priority Scheduling** - Non-preemptive scheduling based on process priority
4. **Round Robin (RR)** - Preemptive scheduling with configurable time quantum

### Interactive Features
- ✅ Dynamic process addition and removal
- ✅ Real-time Gantt chart visualization
- ✅ Comprehensive results table with all metrics
- ✅ Performance analysis dashboard
- ✅ Algorithm comparison capabilities
- ✅ Responsive design for all devices
- ✅ Example data loading for quick testing
- ✅ Keyboard shortcuts for enhanced productivity

### Performance Metrics
- Average Waiting Time
- Average Turnaround Time
- Total Execution Time
- CPU Utilization
- System Throughput

## 🛠️ Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Bootstrap 5, Custom CSS with animations
- **Icons**: Font Awesome 6
- **Architecture**: Modular JavaScript with OOP principles
- **Compatibility**: Modern browsers (Chrome, Firefox, Safari, Edge)

## 📁 Project Structure

```
cpu-scheduler/
├── index.html          # Main HTML file with UI structure
├── styles.css          # Custom CSS with animations and responsive design
├── scheduler.js        # Core scheduling algorithms implementation
├── app.js             # Application logic and UI interactions
└── README.md          # Project documentation
```

## 🚀 Getting Started

### Prerequisites
- Modern web browser
- No additional software installation required

### Installation & Usage
1. Clone or download the project files
2. Open `index.html` in your web browser
3. Start adding processes and exploring different algorithms!

### Quick Start Guide
1. **Select Algorithm**: Choose from FCFS, SJF, Priority, or Round Robin
2. **Add Processes**: Enter arrival time, burst time, and priority (if needed)
3. **Configure Settings**: Set time quantum for Round Robin algorithm
4. **Run Simulation**: Click "Run Simulation" to see results
5. **Analyze Results**: View Gantt chart, results table, and performance metrics

## 📊 Algorithm Details

### First Come First Serve (FCFS)
- **Type**: Non-preemptive
- **Criteria**: Arrival time
- **Advantages**: Simple implementation, no starvation
- **Disadvantages**: Poor average waiting time, convoy effect

### Shortest Job First (SJF)
- **Type**: Non-preemptive
- **Criteria**: Burst time
- **Advantages**: Optimal average waiting time
- **Disadvantages**: Starvation of long processes, requires burst time prediction

### Priority Scheduling
- **Type**: Non-preemptive
- **Criteria**: Process priority (lower number = higher priority)
- **Advantages**: Important processes get preference
- **Disadvantages**: Starvation of low-priority processes

### Round Robin (RR)
- **Type**: Preemptive
- **Criteria**: Time quantum rotation
- **Advantages**: Fair allocation, good response time
- **Disadvantages**: Higher context switching overhead

## 🎯 Usage Examples

### Example 1: Basic FCFS Simulation
```
Process | Arrival | Burst
P1      | 0       | 5
P2      | 1       | 3
P3      | 2       | 8
```

### Example 2: Priority Scheduling
```
Process | Arrival | Burst | Priority
P1      | 0       | 5     | 2
P2      | 1       | 3     | 1
P3      | 2       | 8     | 3
```

### Example 3: Round Robin (Time Quantum = 2)
```
Process | Arrival | Burst
P1      | 0       | 5
P2      | 1       | 3
P3      | 2       | 8
```

## ⌨️ Keyboard Shortcuts

- `Ctrl + Enter`: Run simulation
- `Ctrl + N`: Focus on arrival time input
- `Ctrl + R`: Clear all processes
- `Ctrl + E`: Load example data
- `Enter`: Add process (when in input fields)

## 🎨 Visual Features

### Gantt Chart
- Color-coded process visualization
- Interactive hover tooltips
- Responsive scaling based on timeline
- Time labels for precise analysis

### Results Table
- Sortable columns
- Hover effects for better readability
- Conditional priority column display
- Mobile-responsive design

### Performance Dashboard
- Real-time metric calculations
- Visual metric cards with gradients
- Comparative analysis support
- Professional styling

## 🔧 Customization

### Adding New Algorithms
1. Implement algorithm in `scheduler.js`
2. Add UI option in `index.html`
3. Update event handlers in `app.js`
4. Add styling in `styles.css`

### Modifying Visual Themes
- Edit CSS variables in `styles.css`
- Customize color schemes in process color array
- Adjust animations and transitions

## 📱 Responsive Design

The application is fully responsive and works seamlessly on:
- Desktop computers (1200px+)
- Tablets (768px - 1199px)
- Mobile phones (< 768px)

## 🧪 Testing

### Manual Testing Scenarios
1. **Empty Process List**: Verify error handling
2. **Single Process**: Test basic functionality
3. **Multiple Processes**: Test complex scenarios
4. **Edge Cases**: Zero arrival times, large burst times
5. **Algorithm Switching**: Verify UI updates correctly

### Performance Testing
- Tested with up to 20 processes
- Smooth animations on modern browsers
- Responsive design verified on multiple devices

## 🎓 Educational Value

This project demonstrates:
- **Operating Systems Concepts**: CPU scheduling, process management
- **Algorithm Implementation**: Translation from theory to code
- **Data Structures**: Queues, arrays, object manipulation
- **Web Development**: Modern HTML/CSS/JavaScript practices
- **UI/UX Design**: User-friendly interface design
- **Software Engineering**: Modular code organization

## 🤝 Contributing

This is a university project, but suggestions for improvements are welcome:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is created for educational purposes. Feel free to use and modify for learning.

## 👨‍💻 Author

Created as a university project for Operating Systems course.

## 🙏 Acknowledgments

- Original Python implementation from `schedulling.ipynb`
- Bootstrap team for the CSS framework
- Font Awesome for icons
- Operating Systems course materials and textbooks

## 📞 Support

For questions or issues:
1. Check the browser console for error messages
2. Verify input data format
3. Try the example data to test functionality
4. Ensure JavaScript is enabled in your browser

---

**Note**: This simulator is designed for educational purposes to understand CPU scheduling algorithms. The implementations follow standard textbook algorithms and may not reflect all optimizations found in real operating systems.
