export interface Task {
    _id?: string;
    title: string;
    description: string;
    dueDate: Date;
    priority: 'low' | 'medium' | 'high';
    status: 'to-do' | 'in-progress' | 'completed';
    history: { date: Date, change: string }[];
  }
  