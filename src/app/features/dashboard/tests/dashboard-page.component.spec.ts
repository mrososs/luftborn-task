import { ComponentFixture, TestBed, getTestBed } from '@angular/core/testing';
import { BrowserTestingModule, platformBrowserTesting } from '@angular/platform-browser/testing';
import {
  DashboardPageComponent,
  BoardFilter,
} from '../components/dashboard-page/dashboard-page.component';
import { KanbanBoardStore, KanbanTask } from '../store/kanban-board.store';
import { TaskPriority } from '../../../models/task.model';
import { KanbanBoardComponent } from '../components/kanban-board/kanban-board.component';
import { StatsOverviewComponent } from '../components/stats-overview/stats-overview.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { describe, it, expect, beforeEach, vi, beforeAll } from 'vitest';
import { Component, signal } from '@angular/core';

beforeAll(() => {
  try {
    getTestBed().initTestEnvironment(BrowserTestingModule, platformBrowserTesting());
  } catch {
    // Already initialized
  }
});

// 1. Mock للـ Kanban Board
@Component({
  selector: 'app-kanban-board',
  template: '',
  standalone: true,
})
class MockKanbanBoardComponent {
  openAddTaskDialog = vi.fn();
}

@Component({
  selector: 'app-stats-overview',
  template: '',
  standalone: true,
})
class MockStatsOverviewComponent {}

describe('DashboardPageComponent', () => {
  let component: DashboardPageComponent;
  let fixture: ComponentFixture<DashboardPageComponent>;
  let mockStore: {
    activeFilter: ReturnType<typeof signal<BoardFilter>>;
    priorityFilter: ReturnType<typeof signal<TaskPriority | null>>;
    totalTasks: ReturnType<typeof signal<number>>;
    todoTasks: ReturnType<typeof signal<KanbanTask[]>>;
    inProgressTasks: ReturnType<typeof signal<KanbanTask[]>>;
    doneTasks: ReturnType<typeof signal<KanbanTask[]>>;
    setFilter: ReturnType<typeof vi.fn>;
    setPriorityFilter: ReturnType<typeof vi.fn>;
  };

  beforeEach(async () => {
    // 3. تعريف الـ MockStore بكل الـ Signals اللي الـ Template والـ Children بيحتاجوها
    mockStore = {
      activeFilter: signal('all'),
      priorityFilter: signal(null),
      // الـ Signals دي مهمة جداً عشان StatsOverviewComponent
      totalTasks: signal(0),
      todoTasks: signal([]),
      inProgressTasks: signal([]),
      doneTasks: signal([]),
      // الـ Methods
      setFilter: vi.fn(),
      setPriorityFilter: vi.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [DashboardPageComponent, NoopAnimationsModule],
      providers: [{ provide: KanbanBoardStore, useValue: mockStore }],
    })
      .overrideComponent(DashboardPageComponent, {
        remove: {
          imports: [KanbanBoardComponent, StatsOverviewComponent],
        },
        add: {
          imports: [MockKanbanBoardComponent, MockStatsOverviewComponent],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(DashboardPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should update active filter when onFilterChange is called', () => {
    // استخدام ['methodName'] للوصول للـ private/protected methods في التست
    component['onFilterChange']('todo');
    expect(mockStore.setFilter).toHaveBeenCalledWith('todo');
  });

  it('should update priority filter when onPriorityChange is called', () => {
    component['onPriorityChange']('high');
    expect(mockStore.setPriorityFilter).toHaveBeenCalledWith('high');

    component['onPriorityChange']('');
    expect(mockStore.setPriorityFilter).toHaveBeenCalledWith(null);
  });

  it('should delegate openAddTaskDialog to the kanbanBoard child', () => {
    // تجهيز mock للـ ViewChild
    const mockKanbanBoard = {
      openAddTaskDialog: vi.fn(),
    };

    // حقن الـ mock يدوياً داخل الكومبوننت
    (component as unknown as { kanbanBoard: Partial<KanbanBoardComponent> }).kanbanBoard =
      mockKanbanBoard as unknown as KanbanBoardComponent;

    component['openAddTaskDialog']();
    expect(mockKanbanBoard.openAddTaskDialog).toHaveBeenCalled();
  });
});
