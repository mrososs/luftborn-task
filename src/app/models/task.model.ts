export type TaskStatus = 'todo' | 'in-progress' | 'done' | 'cancelled';
export type TaskPriority = 'low' | 'medium' | 'high' | 'critical';

/** Represents a single task entity */
export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  assigneeId?: string;
  dueDate?: string; // ISO 8601
  createdAt: string;
  updatedAt: string;
  tags?: string[];
}

/** Payload for creating a new task */
export interface CreateTaskPayload {
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  assigneeId?: string;
  dueDate?: string;
  tags?: string[];
}

/** Payload for updating an existing task */
export type UpdateTaskPayload = Partial<CreateTaskPayload>;

/** Filters applied on the task list */
export interface TaskFilters {
  search?: string;
  status?: TaskStatus | '';
  priority?: TaskPriority | '';
  assigneeId?: string;
  dueDateFrom?: string;
  dueDateTo?: string;
}
