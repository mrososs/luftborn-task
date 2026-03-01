export type ActivityType = 'task_created' | 'task_updated' | 'task_deleted' | 'task_moved';

/** Represents a single activity entry in the feed */
export interface Activity {
  id: string;
  type: ActivityType;
  taskId: string;
  taskTitle: string;
  userId: string;
  userName: string;
  timestamp: string;
  details?: string;
}
