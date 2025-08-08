// Main Application Logic for CPU Scheduling Simulator - Production Build

class SchedulerApp {
    constructor() {
        this.scheduler = new CPUScheduler();
        this.processes = [];
        this.processCounter = 1;
        this.initializeEventListeners();
        this.updateUI();
    }

    initializeEventListeners() {
        // Algorithm selection change
        document.getElementById('algorithm').addEventListener('change', (e) => {
            this.handleAlgorithmChange(e.target.value);
        });

        // Add process button
        document.getElementById('addProcess').addEventListener('click', () => {
            this.addProcess();
        });

        // Simulate button
        document.getElementById('simulate').addEventListener('click', () => {
            this.runSimulation();
        });

        // Clear all button
        document.getElementById('clearAll').addEventListener('click', () => {
            this.clearAll();
        });

        // Load example button
        document.getElementById('loadExample').addEventListener('click', () => {
            this.loadExample();
        });

        // Enter key support for input fields
        ['arrivalTime', 'burstTime', 'priority'].forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') {
                        this.addProcess();
                    }
                });
            }
        });
    }

    handleAlgorithmChange(algorithm) {
        const timeQuantumDiv = document.getElementById('timeQuantumDiv');
        const priorityInput = document.getElementById('priority');
        
        // Show/hide time quantum input for Round Robin
        if (algorithm === 'rr') {
            timeQuantumDiv.classList.remove('hidden');
        } else {
            timeQuantumDiv.classList.add('hidden');
        }
        
        // Show/hide priority input for Priority Scheduling
        if (algorithm === 'priority') {
            priorityInput.classList.remove('hidden');
            priorityInput.required = true;
        } else {
            priorityInput.classList.add('hidden');
            priorityInput.required = false;
        }
        
        this.updateUI();
    }

    addProcess() {
        const arrivalTime = parseInt(document.getElementById('arrivalTime').value);
        const burstTime = parseInt(document.getElementById('burstTime').value);
        const priority = parseInt(document.getElementById('priority').value);
        const algorithm = document.getElementById('algorithm').value;

        // Validation
        if (isNaN(arrivalTime) || arrivalTime < 0) {
            this.showAlert('Please enter a valid arrival time (≥ 0)', 'warning');
            return;
        }

        if (isNaN(burstTime) || burstTime <= 0) {
            this.showAlert('Please enter a valid burst time (> 0)', 'warning');
            return;
        }

        if (algorithm === 'priority' && (isNaN(priority) || priority <= 0)) {
            this.showAlert('Please enter a valid priority (> 0)', 'warning');
            return;
        }

        // Create process object
        const process = {
            pid: `P${this.processCounter}`,
            arrival: arrivalTime,
            burst: burstTime
        };

        if (algorithm === 'priority') {
            process.priority = priority;
        }

        this.processes.push(process);
        this.processCounter++;

        // Clear input fields
        document.getElementById('arrivalTime').value = '';
        document.getElementById('burstTime').value = '';
        document.getElementById('priority').value = '';

        this.updateUI();
        this.showAlert(`${process.pid} added`, 'success');
    }

    removeProcess(index) {
        this.processes.splice(index, 1);
        this.updateUI();
        this.showAlert('Process removed', 'info');
    }

    runSimulation() {
        if (this.processes.length === 0) {
            this.showAlert('Please add at least one process before running simulation', 'warning');
            return;
        }

        const algorithm = document.getElementById('algorithm').value;
        const timeQuantum = parseInt(document.getElementById('timeQuantum').value) || 2;

        let result;
        let algorithmName;

        try {
            // Add loading state
            const simulateBtn = document.getElementById('simulate');
            simulateBtn.classList.add('loading');
            simulateBtn.disabled = true;

            // Use setTimeout to allow UI to update
            setTimeout(() => {
                try {
                    switch (algorithm) {
                        case 'fcfs':
                            result = this.scheduler.fcfs(this.processes);
                            algorithmName = 'First Come First Serve (FCFS)';
                            break;
                        case 'sjf':
                            result = this.scheduler.sjf(this.processes);
                            algorithmName = 'Shortest Job First (SJF)';
                            break;
                        case 'priority':
                            result = this.scheduler.priorityScheduling(this.processes);
                            algorithmName = 'Priority Scheduling';
                            break;
                        case 'rr':
                            result = this.scheduler.roundRobin(this.processes, timeQuantum);
                            algorithmName = `Round Robin (Time Quantum: ${timeQuantum})`;
                            break;
                        default:
                            throw new Error('Invalid algorithm selected');
                    }

                    this.displayResults(result, algorithmName);
                    this.showAlert(`${algorithmName} completed`, 'success');

                } catch (error) {
                    console.error('Simulation error:', error);
                    this.showAlert('An error occurred during simulation. Please check your inputs.', 'error');
                } finally {
                    // Remove loading state
                    simulateBtn.classList.remove('loading');
                    simulateBtn.disabled = false;
                }
            }, 100);

        } catch (error) {
            console.error('Simulation error:', error);
            this.showAlert('An error occurred during simulation. Please check your inputs.', 'error');
        }
    }

    displayResults(result, algorithmName) {
        const { processes, gantt } = result;
        const metrics = this.scheduler.calculateMetrics(processes);
        const totalTime = Math.max(...gantt.map(g => g.end));

        // Update Gantt Chart
        const ganttContainer = document.getElementById('ganttChart');
        ganttContainer.innerHTML = `
            <h6 class="mb-3 text-lg font-semibold">${algorithmName}</h6>
            ${this.scheduler.generateGanttChart(gantt, totalTime)}
        `;

        // Update Results Table
        const resultsContainer = document.getElementById('resultsTable');
        resultsContainer.innerHTML = `
            <h6 class="mb-3 text-lg font-semibold">Process Execution Results</h6>
            ${this.scheduler.generateResultsTable(processes)}
        `;

        // Update Performance Metrics
        const metricsContainer = document.getElementById('performanceMetrics');
        metricsContainer.innerHTML = `
            <h6 class="mb-3 text-lg font-semibold">Performance Analysis</h6>
            ${this.scheduler.generateMetricsHTML(metrics)}
        `;

        // Add animation to results
        this.animateResults();
    }

    animateResults() {
        // Add fade-in animation to results
        const elements = [
            document.getElementById('ganttChart'),
            document.getElementById('resultsTable'),
            document.getElementById('performanceMetrics')
        ];

        elements.forEach((element, index) => {
            if (element) {
                element.style.opacity = '0';
                element.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    element.style.transition = 'all 0.5s ease';
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }, index * 200);
            }
        });
    }

    updateUI() {
        this.updateProcessList();
        this.updateSimulateButton();
    }

    updateProcessList() {
        const processList = document.getElementById('processList');
        
        if (this.processes.length === 0) {
            processList.innerHTML = '<p class="text-base-content/60 text-center">No processes added yet</p>';
            return;
        }

        let html = '';
        this.processes.forEach((process, index) => {
            const priorityText = process.priority ? `, Priority: ${process.priority}` : '';
            html += `
                <div class="process-item">
                    <div class="process-info">
                        <strong>${process.pid}</strong>: Arrival: ${process.arrival}, Burst: ${process.burst}${priorityText}
                    </div>
                    <button class="remove-process" onclick="app.removeProcess(${index})" title="Remove Process" aria-label="Remove ${process.pid}">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            `;
        });

        processList.innerHTML = html;
    }

    updateSimulateButton() {
        const simulateBtn = document.getElementById('simulate');
        if (this.processes.length === 0) {
            simulateBtn.disabled = true;
            simulateBtn.innerHTML = '<i class="fas fa-play mr-1"></i>Add Processes First';
        } else {
            simulateBtn.disabled = false;
            simulateBtn.innerHTML = '<i class="fas fa-play mr-1"></i>Run Simulation';
        }
    }

    clearAll() {
        if (this.processes.length === 0) {
            this.showAlert('No processes to clear', 'info');
            return;
        }

        if (confirm('Are you sure you want to clear all processes and results?')) {
            this.processes = [];
            this.processCounter = 1;
            
            // Clear input fields
            document.getElementById('arrivalTime').value = '';
            document.getElementById('burstTime').value = '';
            document.getElementById('priority').value = '';
            
            // Clear results
            document.getElementById('ganttChart').innerHTML = 
                '<i class="fas fa-info-circle mr-2"></i>Run simulation to see Gantt chart';
            document.getElementById('resultsTable').innerHTML = 
                '<i class="fas fa-info-circle mr-2"></i>Run simulation to see results';
            document.getElementById('performanceMetrics').innerHTML = 
                '<i class="fas fa-info-circle mr-2"></i>Run simulation to see performance metrics';
            
            this.updateUI();
            this.showAlert('All cleared', 'success');
        }
    }

    loadExample() {
        // Clear existing processes
        this.processes = [];
        this.processCounter = 1;

        // Add example processes
        const exampleProcesses = [
            { pid: 'P1', arrival: 0, burst: 5, priority: 2 },
            { pid: 'P2', arrival: 1, burst: 3, priority: 1 },
            { pid: 'P3', arrival: 2, burst: 8, priority: 3 },
            { pid: 'P4', arrival: 3, burst: 6, priority: 2 },
            { pid: 'P5', arrival: 4, burst: 4, priority: 1 }
        ];

        this.processes = [...exampleProcesses];
        this.processCounter = 6;

        this.updateUI();
        this.showAlert('Example data loaded', 'success');
    }

    showAlert(message, type = 'info') {
        // Create alert element using DaisyUI classes
        const alertDiv = document.createElement('div');
        let alertClass = 'alert';
        let icon = '';
        
        switch(type) {
            case 'success':
                alertClass += ' alert-success';
                icon = '<i class="fas fa-check-circle mr-2"></i>';
                break;
            case 'warning':
                alertClass += ' alert-warning';
                icon = '<i class="fas fa-exclamation-triangle mr-2"></i>';
                break;
            case 'error':
            case 'danger':
                alertClass += ' alert-error';
                icon = '<i class="fas fa-times-circle mr-2"></i>';
                break;
            default:
                alertClass += ' alert-info';
                icon = '<i class="fas fa-info-circle mr-2"></i>';
        }
        
        alertDiv.className = `${alertClass} fixed top-5 right-5 z-50 max-w-sm shadow-lg text-sm`;
        alertDiv.setAttribute('role', 'alert');
        alertDiv.setAttribute('aria-live', 'polite');
        
        alertDiv.innerHTML = `
            <div class="flex items-center justify-between w-full">
                <div class="flex items-center">
                    ${icon}
                    <span class="text-sm">${message}</span>
                </div>
                <button type="button" class="btn btn-ghost btn-xs ml-2" onclick="this.parentElement.parentElement.remove()" aria-label="Close alert">
                    <i class="fas fa-times text-xs"></i>
                </button>
            </div>
        `;

        document.body.appendChild(alertDiv);

        // Auto remove after 4 seconds
        setTimeout(() => {
            if (alertDiv.parentNode) {
                alertDiv.remove();
            }
        }, 4000);
    }

    // Utility method to export results as JSON
    exportResults() {
        if (this.scheduler.results.length === 0) {
            this.showAlert('No results to export. Run a simulation first.', 'warning');
            return;
        }

        const data = {
            algorithm: document.getElementById('algorithm').value,
            processes: this.processes,
            results: this.scheduler.results,
            ganttChart: this.scheduler.ganttChart,
            metrics: this.scheduler.calculateMetrics(this.scheduler.results),
            timestamp: new Date().toISOString()
        };

        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `cpu_scheduling_results_${Date.now()}.json`;
        a.click();
        URL.revokeObjectURL(url);

        this.showAlert('Results exported', 'success');
    }

    // Error handling
    handleError(error, context = 'Unknown') {
        console.error(`Error in ${context}:`, error);
        this.showAlert(`An error occurred in ${context}. Please try again.`, 'error');
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    try {
        window.app = new SchedulerApp();
        
        // Add keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey || e.metaKey) {
                switch (e.key) {
                    case 'Enter':
                        e.preventDefault();
                        if (!document.getElementById('simulate').disabled) {
                            app.runSimulation();
                        }
                        break;
                    case 'n':
                        e.preventDefault();
                        document.getElementById('arrivalTime').focus();
                        break;
                    case 'r':
                        e.preventDefault();
                        app.clearAll();
                        break;
                    case 'e':
                        e.preventDefault();
                        app.loadExample();
                        break;
                }
            }
        });

        // Add tooltips for keyboard shortcuts
        const tooltips = [
            { id: 'simulate', text: 'Ctrl+Enter to run simulation' },
            { id: 'addProcess', text: 'Ctrl+N to focus on input' },
            { id: 'clearAll', text: 'Ctrl+R to clear all' },
            { id: 'loadExample', text: 'Ctrl+E to load example' }
        ];

        tooltips.forEach(({ id, text }) => {
            const element = document.getElementById(id);
            if (element) {
                element.title = text;
            }
        });

    } catch (error) {
        console.error('Failed to initialize application:', error);
        document.body.innerHTML = `
            <div class="min-h-screen flex items-center justify-center bg-red-50">
                <div class="text-center p-8">
                    <h1 class="text-2xl font-bold text-red-600 mb-4">Application Failed to Load</h1>
                    <p class="text-red-500">Please refresh the page and try again.</p>
                </div>
            </div>
        `;
    }
});

// Add some utility functions for enhanced functionality
window.addEventListener('beforeunload', (e) => {
    if (window.app && window.app.processes.length > 0) {
        e.preventDefault();
        e.returnValue = 'You have unsaved processes. Are you sure you want to leave?';
    }
});

// Performance monitoring
if (typeof performance !== 'undefined') {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const loadTime = performance.now();
            console.log(`CPU Scheduler App loaded in ${loadTime.toFixed(2)}ms`);
        }, 0);
    });
}

// Error handling for unhandled errors
window.addEventListener('error', (e) => {
    console.error('Unhandled error:', e.error);
    if (window.app) {
        window.app.showAlert('An unexpected error occurred. Please refresh the page.', 'error');
    }
});

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
    if (window.app) {
        window.app.showAlert('An unexpected error occurred. Please refresh the page.', 'error');
    }
});
