import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';
import { Activity } from '../../../models/activity.model';

interface ActivityState {
  activities: Activity[];
}

const INITIAL_STATE: ActivityState = {
  activities: [
    {
      id: 'act-1',
      type: 'task_created',
      taskId: 'task-1',
      taskTitle: 'Prepare Q4 budget report',
      userId: 'Sarah',
      userName: 'Sarah',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
      details: 'Created new task in To Do',
    },
    {
      id: 'act-2',
      type: 'task_moved',
      taskId: 'task-5',
      taskTitle: 'Update payment gateway integration',
      userId: 'John',
      userName: 'John',
      timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 mins ago
      details: 'Moved to In Progress',
    },
  ],
};

/**
 * Store for managing the Recent Activity Feed.
 */
export const ActivityStore = signalStore(
  { providedIn: 'root' },
  withState<ActivityState>(INITIAL_STATE),
  withMethods((store) => ({
    /** Adds a new activity to the start of the feed */
    addActivity(activity: Omit<Activity, 'id' | 'timestamp'>): void {
      const newActivity: Activity = {
        ...activity,
        id: `act-${Date.now()}`,
        timestamp: new Date().toISOString(),
      };

      patchState(store, (state) => ({
        activities: [newActivity, ...state.activities].slice(0, 50), // Keep last 50
      }));
    },
  })),
);
