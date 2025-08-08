// CPU Scheduling Algorithms Implementation - Production Build
// Based on the original Python code from schedulling.ipynb

class CPUScheduler {
    constructor() {
        this.processes = [];
        this.results = [];
        this.ganttChart = [];
    }

    // Deep copy processes to avoid modifying original data
    copyProcesses(processes) {
        return processes.map(p => ({ ...p }));
    }

    // First Come First Serve (FCFS) Algorithm
    fcfs(processes) {
        const processesCopy = this.copyProcesses(processes);
        processesCopy.sort((a, b) => a.arrival - b.arrival);
        
        let currentTime = 0;
        const gantt = [];
        
        for (let p of processesCopy) {
            currentTime = Math.max(currentTime, p.arrival);
            p.start = currentTime;
            p.completion = currentTime + p.burst;
            
            // Add to Gantt chart
            gantt.push({
                pid: p.pid,
                start: currentTime,
                end: p.completion,
                duration: p.burst
            });
            
            currentTime += p.burst;
            p.turnaround = p.completion - p.arrival;
            p.waiting = p.turnaround - p.burst;
        }
        
        this.results = processesCopy;
        this.ganttChart = gantt;
        return { processes: processesCopy, gantt };
    }

    // Shortest Job First (SJF) Algorithm
    sjf(processes) {
        const processesCopy = this.copyProcesses(processes);
        const completed = [];
        const gantt = [];
        let currentTime = 0;
        
        while (processesCopy.length > 0) {
            // Find available processes
            const available = processesCopy.filter(p => p.arrival <= currentTime);
            
            if (available.length === 0) {
                currentTime = Math.min(...processesCopy.map(p => p.arrival));
                continue;
            }
            
            // Find shortest job among available processes
            const shortest = available.reduce((min, p) => 
                p.burst < min.burst ? p : min
            );
            
            // Remove from processes array
            const index = processesCopy.indexOf(shortest);
            processesCopy.splice(index, 1);
            
            shortest.start = currentTime;
            shortest.completion = currentTime + shortest.burst;
            
            // Add to Gantt chart
            gantt.push({
                pid: shortest.pid,
                start: currentTime,
                end: shortest.completion,
                duration: shortest.burst
            });
            
            currentTime += shortest.burst;
            shortest.turnaround = shortest.completion - shortest.arrival;
            shortest.waiting = shortest.turnaround - shortest.burst;
            
            completed.push(shortest);
        }
        
        // Sort by process ID for display
        completed.sort((a, b) => a.pid.localeCompare(b.pid));
        
        this.results = completed;
        this.ganttChart = gantt;
        return { processes: completed, gantt };
    }

    // Priority Scheduling Algorithm
    priorityScheduling(processes) {
        const processesCopy = this.copyProcesses(processes);
        const completed = [];
        const gantt = [];
        let currentTime = 0;
        
        while (processesCopy.length > 0) {
            // Find available processes
            const available = processesCopy.filter(p => p.arrival <= currentTime);
            
            if (available.length === 0) {
                currentTime = Math.min(...processesCopy.map(p => p.arrival));
                continue;
            }
            
            // Find highest priority (lowest number) among available processes
            const highest = available.reduce((min, p) => 
                p.priority < min.priority ? p : min
            );
            
            // Remove from processes array
            const index = processesCopy.indexOf(highest);
            processesCopy.splice(index, 1);
            
            highest.start = currentTime;
            highest.completion = currentTime + highest.burst;
            
            // Add to Gantt chart
            gantt.push({
                pid: highest.pid,
                start: currentTime,
                end: highest.completion,
                duration: highest.burst
            });
            
            currentTime += highest.burst;
            highest.turnaround = highest.completion - highest.arrival;
            highest.waiting = highest.turnaround - highest.burst;
            
            completed.push(highest);
        }
        
        // Sort by process ID for display
        completed.sort((a, b) => a.pid.localeCompare(b.pid));
        
        this.results = completed;
        this.ganttChart = gantt;
        return { processes: completed, gantt };
    }

    // Round Robin Algorithm
    roundRobin(processes, timeQuantum) {
        const processesCopy = this.copyProcesses(processes);
        const queue = [];
        const completed = [];
        const gantt = [];
        let currentTime = 0;
        
        // Create remaining time map
        const remaining = {};
        const pidMap = {};
        
        processesCopy.forEach(p => {
            remaining[p.pid] = p.burst;
            pidMap[p.pid] = p;
        });
        
        // Sort by arrival time
        processesCopy.sort((a, b) => a.arrival - b.arrival);
        
        const arrived = new Set();
        let i = 0;
        
        // Add initial processes to queue
        while (i < processesCopy.length && processesCopy[i].arrival <= currentTime) {
            queue.push(processesCopy[i].pid);
            arrived.add(processesCopy[i].pid);
            i++;
        }
        
        while (queue.length > 0 || i < processesCopy.length) {
            if (queue.length === 0) {
                currentTime = processesCopy[i].arrival;
                while (i < processesCopy.length && processesCopy[i].arrival <= currentTime) {
                    if (!arrived.has(processesCopy[i].pid)) {
                        queue.push(processesCopy[i].pid);
                        arrived.add(processesCopy[i].pid);
                    }
                    i++;
                }
            }
            
            const pid = queue.shift();
            const execTime = Math.min(timeQuantum, remaining[pid]);
            
            // Add to Gantt chart
            gantt.push({
                pid: pid,
                start: currentTime,
                end: currentTime + execTime,
                duration: execTime
            });
            
            remaining[pid] -= execTime;
            currentTime += execTime;
            
            // Add newly arrived processes to queue
            while (i < processesCopy.length && processesCopy[i].arrival <= currentTime) {
                if (!arrived.has(processesCopy[i].pid)) {
                    queue.push(processesCopy[i].pid);
                    arrived.add(processesCopy[i].pid);
                }
                i++;
            }
            
            if (remaining[pid] === 0) {
                // Process completed
                const p = pidMap[pid];
                p.completion = currentTime;
                p.turnaround = p.completion - p.arrival;
                p.waiting = p.turnaround - p.burst;
                completed.push(p);
            } else {
                // Add back to queue
                queue.push(pid);
            }
        }
        
        // Sort by process ID for display
        completed.sort((a, b) => a.pid.localeCompare(b.pid));
        
        this.results = completed;
        this.ganttChart = gantt;
        return { processes: completed, gantt };
    }

    // Calculate performance metrics
    calculateMetrics(processes) {
        if (processes.length === 0) return null;
        
        const totalWaiting = processes.reduce((sum, p) => sum + p.waiting, 0);
        const totalTurnaround = processes.reduce((sum, p) => sum + p.turnaround, 0);
        const totalCompletion = Math.max(...processes.map(p => p.completion));
        const totalBurst = processes.reduce((sum, p) => sum + p.burst, 0);
        
        return {
            avgWaitingTime: (totalWaiting / processes.length).toFixed(2),
            avgTurnaroundTime: (totalTurnaround / processes.length).toFixed(2),
            totalTime: totalCompletion,
            cpuUtilization: ((totalBurst / totalCompletion) * 100).toFixed(2),
            throughput: (processes.length / totalCompletion).toFixed(2)
        };
    }

    // Get process color for visualization
    getProcessColor(pid) {
        const colors = [
            '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', 
            '#98D8C8', '#BB8FCE', '#F8C471', '#82E0AA'
        ];
        const index = parseInt(pid.replace('P', '')) - 1;
        return colors[index % colors.length];
    }

    // Generate Gantt chart HTML
    generateGanttChart(gantt, totalTime) {
        if (gantt.length === 0) return '<p class="text-base-content/60">No processes to display</p>';
        
        const scale = Math.max(600 / totalTime, 20); // Minimum 20px per time unit
        let html = '<div class="gantt-container">';
        html += '<div class="gantt-chart">';
        
        gantt.forEach(item => {
            const width = item.duration * scale;
            const color = this.getProcessColor(item.pid);
            html += `<div class="gantt-process" style="width: ${width}px; background: ${color};" 
                     title="${item.pid}: ${item.start}-${item.end} (${item.duration} units)">
                     ${item.pid}
                     </div>`;
        });
        
        html += '</div>';
        
        // Add time labels
        html += '<div class="gantt-time-labels">';
        for (let i = 0; i <= totalTime; i++) {
            const position = i * scale;
            html += `<div class="gantt-time-label" style="width: ${scale}px;">${i}</div>`;
        }
        html += '</div>';
        html += '</div>';
        
        return html;
    }

    // Generate results table HTML
    generateResultsTable(processes) {
        if (processes.length === 0) return '<p class="text-base-content/60">No results to display</p>';
        
        let html = '<table class="results-table">';
        html += '<thead><tr>';
        html += '<th>Process</th><th>Arrival</th><th>Burst</th>';
        
        // Add priority column if any process has priority
        if (processes.some(p => p.priority !== undefined)) {
            html += '<th>Priority</th>';
        }
        
        html += '<th>Completion</th><th>Turnaround</th><th>Waiting</th>';
        html += '</tr></thead><tbody>';
        
        processes.forEach(p => {
            html += '<tr>';
            html += `<td><strong>${p.pid}</strong></td>`;
            html += `<td>${p.arrival}</td>`;
            html += `<td>${p.burst}</td>`;
            
            if (processes.some(proc => proc.priority !== undefined)) {
                html += `<td>${p.priority || '-'}</td>`;
            }
            
            html += `<td>${p.completion}</td>`;
            html += `<td>${p.turnaround}</td>`;
            html += `<td>${p.waiting}</td>`;
            html += '</tr>';
        });
        
        html += '</tbody></table>';
        return html;
    }

    // Generate performance metrics HTML
    generateMetricsHTML(metrics) {
        if (!metrics) return '<p class="text-base-content/60">No metrics to display</p>';
        
        return `
            <div class="metrics-container">
                <div class="metric-card">
                    <div class="metric-value">${metrics.avgWaitingTime}</div>
                    <div class="metric-label">Avg Waiting Time</div>
                </div>
                <div class="metric-card">
                    <div class="metric-value">${metrics.avgTurnaroundTime}</div>
                    <div class="metric-label">Avg Turnaround Time</div>
                </div>
                <div class="metric-card">
                    <div class="metric-value">${metrics.totalTime}</div>
                    <div class="metric-label">Total Time</div>
                </div>

            </div>
        `;
    }
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CPUScheduler;
}
