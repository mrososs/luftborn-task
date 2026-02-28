import { computed } from '@angular/core';
import { signalStore, withState, withComputed, withMethods, patchState } from '@ngrx/signals';
import { Task, TaskStatus, TaskPriority } from '../../../models/task.model';

/** Kanban column identifiers */
export type KanbanColumn = 'todo' | 'in-progress' | 'done';

/** A task enriched with assignee display info for the board */
export interface KanbanTask extends Task {
  assigneeName?: string;
  assigneeAvatar?: string;
}

/** Store state shape */
interface KanbanBoardState {
  columns: Record<KanbanColumn, KanbanTask[]>;
  activeFilter: KanbanColumn | null;
}

/** Static seed data matching the Figma design */
const INITIAL_TASKS: Record<KanbanColumn, KanbanTask[]> = {
  todo: [
    {
      id: 'task-1',
      title: 'Prepare Q4 budget report',
      description: 'Compile and analyze financial data for quarterly budget presentation',
      status: 'todo',
      priority: 'high',
      dueDate: '2026-02-25',
      tags: ['Finance'],
      assigneeName: 'Sarah',
      assigneeAvatar: 'S',
      createdAt: '2026-02-20T10:00:00Z',
      updatedAt: '2026-02-20T10:00:00Z',
    },
    {
      id: 'task-2',
      title: 'Design new homepage layout',
      description:
        'Create wireframes and mockups for the new homepage redesign with modern UI elements',
      status: 'todo',
      priority: 'high',
      dueDate: '2026-02-29',
      tags: ['Design'],
      assigneeName: 'John',
      assigneeAvatar: 'J',
      createdAt: '2026-02-21T10:00:00Z',
      updatedAt: '2026-02-21T10:00:00Z',
    },
    {
      id: 'task-3',
      title: 'Update documentation',
      description: 'Review and update API documentation for v2.0 release',
      status: 'todo',
      priority: 'medium',
      dueDate: '2026-03-03',
      tags: ['Documentation'],
      assigneeName: 'Sarah',
      assigneeAvatar: 'S',
      createdAt: '2026-02-22T10:00:00Z',
      updatedAt: '2026-02-22T10:00:00Z',
    },
    {
      id: 'task-4',
      title: 'Organize team meeting',
      description: 'Schedule and prepare agenda for quarterly planning session',
      status: 'todo',
      priority: 'low',
      dueDate: '2026-03-06',
      tags: ['Admin'],
      assigneeName: 'Mike',
      assigneeAvatar: 'M',
      createdAt: '2026-02-23T10:00:00Z',
      updatedAt: '2026-02-23T10:00:00Z',
    },
  ],
  'in-progress': [
    {
      id: 'task-5',
      title: 'Update payment gateway integration',
      description: 'Migrate to new payment provider API and update billing logic',
      status: 'in-progress',
      priority: 'high',
      dueDate: '2026-02-26',
      tags: ['Backend'],
      assigneeName: 'John',
      assigneeAvatar: 'J',
      createdAt: '2026-02-19T10:00:00Z',
      updatedAt: '2026-02-24T10:00:00Z',
    },
    {
      id: 'task-6',
      title: 'Implement user authentication',
      description: 'Add JWT-based authentication system with refresh tokens',
      status: 'in-progress',
      priority: 'high',
      dueDate: '2026-03-01',
      tags: ['Backend'],
      assigneeName: 'John',
      assigneeAvatar: 'J',
      createdAt: '2026-02-20T10:00:00Z',
      updatedAt: '2026-02-25T10:00:00Z',
    },
    {
      id: 'task-7',
      title: 'Optimize database queries',
      description: 'Review and optimize slow queries identified in performance audit',
      status: 'in-progress',
      priority: 'medium',
      dueDate: '2026-03-04',
      tags: ['Performance'],
      assigneeName: 'Sarah',
      assigneeAvatar: 'S',
      createdAt: '2026-02-21T10:00:00Z',
      updatedAt: '2026-02-26T10:00:00Z',
    },
  ],
  done: [
    {
      id: 'task-8',
      title: 'Fix critical login bug',
      description: 'Resolved issue preventing users from logging in on mobile devices',
      status: 'done',
      priority: 'high',
      dueDate: '2026-02-24',
      tags: ['Bug Fix'],
      assigneeName: 'Mike',
      assigneeAvatar: 'M',
      createdAt: '2026-02-18T10:00:00Z',
      updatedAt: '2026-02-24T10:00:00Z',
    },
    {
      id: 'task-9',
      title: 'Setup CI/CD pipeline',
      description: 'Configured GitHub Actions for automated testing and deployment',
      status: 'done',
      priority: 'medium',
      dueDate: '2026-02-23',
      tags: ['DevOps'],
      assigneeName: 'John',
      assigneeAvatar: 'J',
      createdAt: '2026-02-17T10:00:00Z',
      updatedAt: '2026-02-23T10:00:00Z',
    },
  ],
};

const INITIAL_STATE: KanbanBoardState = {
  columns: {
    todo: [...INITIAL_TASKS.todo],
    'in-progress': [...INITIAL_TASKS['in-progress']],
    done: [...INITIAL_TASKS.done],
  },
  activeFilter: null,
};

/**
 * NgRx Signal Store for the Kanban board on the Dashboard page.
 * Uses signalStore with withState, withComputed, and withMethods.
 * patchState is used to update state immutably.
 */
export const KanbanBoardStore = signalStore(
  { providedIn: 'root' },
  withState<KanbanBoardState>(INITIAL_STATE),

  withComputed((store) => ({
    /** Tasks per column (read from state signal) */
    todoTasks: computed(() => store.columns()['todo']),
    inProgressTasks: computed(() => store.columns()['in-progress']),
    doneTasks: computed(() => store.columns()['done']),

    /** Column counts */
    todoCnt: computed(() => store.columns()['todo'].length),
    inProgressCnt: computed(() => store.columns()['in-progress'].length),
    doneCnt: computed(() => store.columns()['done'].length),

    /** Overall stats */
    totalTasks: computed(
      () =>
        store.columns()['todo'].length +
        store.columns()['in-progress'].length +
        store.columns()['done'].length,
    ),
    completedCount: computed(() => store.columns()['done'].length),
    inProgressCount: computed(() => store.columns()['in-progress'].length),
    overdueCount: computed<number>(() => {
      const now = new Date().toISOString().split('T')[0];
      const allTasks = [...store.columns()['todo'], ...store.columns()['in-progress']];
      return allTasks.filter((t) => t.dueDate && t.dueDate < now).length;
    }),
  })),

  withMethods((store) => ({
    /**
     * Moves a task between columns (or reorders within the same column).
     * Called by the CDK drop list handler.
     */
    moveTask(
      previousColumn: KanbanColumn,
      currentColumn: KanbanColumn,
      previousIndex: number,
      currentIndex: number,
    ): void {
      const cols = store.columns();
      const source = [...cols[previousColumn]];
      const target = previousColumn === currentColumn ? source : [...cols[currentColumn]];

      const [moved] = source.splice(previousIndex, 1);
      moved.status = currentColumn as TaskStatus;
      target.splice(currentIndex, 0, moved);

      patchState(store, {
        columns: {
          ...cols,
          [previousColumn]: source,
          [currentColumn]: target,
        },
      });
    },

    /**
     * Adds a new task to the TODO column.
     */
    addTask(payload: {
      title: string;
      description: string;
      priority: TaskPriority;
      assigneeName: string;
    }): void {
      const now = new Date().toISOString();
      const newTask: KanbanTask = {
        id: `task-${Date.now()}`,
        title: payload.title,
        description: payload.description,
        status: 'todo',
        priority: payload.priority,
        tags: [],
        assigneeName: payload.assigneeName || 'You',
        assigneeAvatar: (payload.assigneeName || 'Y').charAt(0).toUpperCase(),
        createdAt: now,
        updatedAt: now,
      };

      const cols = store.columns();
      patchState(store, {
        columns: {
          ...cols,
          todo: [newTask, ...cols.todo],
        },
      });
    },

    /** Sets the active column filter */
    setFilter(filter: KanbanColumn | null): void {
      patchState(store, { activeFilter: filter });
    },
  })),
);

/** Type alias for the store instance */
export type KanbanBoardStoreType = InstanceType<typeof KanbanBoardStore>;
