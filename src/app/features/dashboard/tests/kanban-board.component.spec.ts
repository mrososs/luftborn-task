import { ComponentFixture, TestBed, getTestBed } from '@angular/core/testing';
import { BrowserTestingModule, platformBrowserTesting } from '@angular/platform-browser/testing';
import { KanbanBoardComponent } from '../components/kanban-board/kanban-board.component';
import { KanbanBoardStore, KanbanColumn, KanbanTask } from '../store/kanban-board.store';
import { TaskDialogService } from '../services/task-dialog.service';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { describe, it, expect, beforeEach, vi, beforeAll } from 'vitest';
import { signal } from '@angular/core';

beforeAll(() => {
  try {
    getTestBed().initTestEnvironment(BrowserTestingModule, platformBrowserTesting());
  } catch {
    // Already initialized
  }
});
describe('KanbanBoardComponent', () => {
  let component: KanbanBoardComponent;
  let fixture: ComponentFixture<KanbanBoardComponent>;
  let mockTaskDialogService: { openAddTaskDialog: ReturnType<typeof vi.fn> };
  let mockStore: {
    todoTasks: ReturnType<typeof signal<KanbanTask[]>>;
    inProgressTasks: ReturnType<typeof signal<KanbanTask[]>>;
    doneTasks: ReturnType<typeof signal<KanbanTask[]>>;
    activeFilter: ReturnType<typeof signal<KanbanColumn | 'all'>>;
    moveTask: ReturnType<typeof vi.fn>;
  };

  beforeEach(async () => {
    mockTaskDialogService = {
      openAddTaskDialog: vi.fn(),
    };

    // Creating a mock store with signals and methods
    mockStore = {
      todoTasks: signal([]),
      inProgressTasks: signal([]),
      doneTasks: signal([]),
      activeFilter: signal('all'),
      moveTask: vi.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [KanbanBoardComponent, NoopAnimationsModule],
      providers: [
        { provide: TaskDialogService, useValue: mockTaskDialogService },
        { provide: KanbanBoardStore, useValue: mockStore },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(KanbanBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should return correct tasks for each column', () => {
    const todoTask = { id: '1', title: 'Todo', status: 'todo' } as KanbanTask;
    const inProgressTask = { id: '2', title: 'In Progress', status: 'in-progress' } as KanbanTask;
    const doneTask = { id: '3', title: 'Done', status: 'done' } as KanbanTask;

    mockStore.todoTasks.set([todoTask]);
    mockStore.inProgressTasks.set([inProgressTask]);
    mockStore.doneTasks.set([doneTask]);

    expect(component['getTasksForColumn']('todo')).toEqual([todoTask]);
    expect(component['getTasksForColumn']('in-progress')).toEqual([inProgressTask]);
    expect(component['getTasksForColumn']('done')).toEqual([doneTask]);
  });

  it('should handle column visibility correctly based on active filter', () => {
    mockStore.activeFilter.set('all');
    expect(component['isColumnVisible']('todo')).toBe(true);
    expect(component['isColumnVisible']('in-progress')).toBe(true);
    expect(component['isColumnVisible']('done')).toBe(true);

    mockStore.activeFilter.set('todo');
    expect(component['isColumnVisible']('todo')).toBe(true);
    expect(component['isColumnVisible']('in-progress')).toBe(false);
    expect(component['isColumnVisible']('done')).toBe(false);
  });

  it('should return connected IDs excluding the current column', () => {
    const connectedToTodo = component['getConnectedIds']('todo');
    expect(connectedToTodo).toContain('in-progress');
    expect(connectedToTodo).toContain('done');
    expect(connectedToTodo).not.toContain('todo');
  });

  it('should call store.moveTask on drop', () => {
    const event = {
      previousContainer: { id: 'todo' },
      previousIndex: 0,
      currentIndex: 1,
    } as unknown as CdkDragDrop<KanbanTask[]>;

    component['onDrop'](event, 'in-progress');

    expect(mockStore.moveTask).toHaveBeenCalledWith('todo', 'in-progress', 0, 1);
  });

  it('should call taskDialogService.openAddTaskDialog', () => {
    component.openAddTaskDialog();
    expect(mockTaskDialogService.openAddTaskDialog).toHaveBeenCalled();
  });
});
