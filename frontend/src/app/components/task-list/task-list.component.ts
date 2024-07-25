import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  sortedBy: string = 'dueDate';

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.fetchTasks();
  }

  fetchTasks(): void {
    this.taskService.getTasks().subscribe(tasks => {
      this.tasks = tasks;
      this.sortTasks();
    });
  }

  sortTasks(): void {
    this.tasks.sort((a, b) => {
      if (this.sortedBy === 'dueDate') {
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      } else if (this.sortedBy === 'priority') {
        const priorityMap = { low: 1, medium: 2, high: 3 };
        return priorityMap[a.priority] - priorityMap[b.priority];
      } else if (this.sortedBy === 'status') {
        const statusMap = { 'to-do': 1, 'in-progress': 2, 'completed': 3 };
        return statusMap[a.status] - statusMap[b.status];
      }
      return 0;
    });
  }

  onSortChange(sortBy: string): void {
    this.sortedBy = sortBy;
    this.sortTasks();
  }

  deleteTask(id: string): void {
    if (!id) return; // Additional safeguard
    this.taskService.deleteTask(id).subscribe(() => {
      this.fetchTasks();
    });
  }

  exportTasks(): void {
    this.taskService.exportToCSV(this.tasks);
  }
}
