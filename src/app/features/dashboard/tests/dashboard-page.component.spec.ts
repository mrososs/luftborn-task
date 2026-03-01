import { ComponentFixture, TestBed, getTestBed } from '@angular/core/testing';
import { BrowserTestingModule, platformBrowserTesting } from '@angular/platform-browser/testing';
import {
  DashboardPageComponent,
  BoardFilter,
} from '../components/dashboard-page/dashboard-page.component';
import { KanbanBoardStore } from '../store/kanban-board.store';
import { TaskPriority } from '../../../models/task.model';
import { KanbanBoardComponent } from '../components/kanban-board/kanban-board.component';
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

@Component({
  selector: 'app-kanban-board',
  template: '',
  standalone: true,
})
class MockKanbanBoardComponent {
  openAddTaskDialog = vi.fn();
}

describe('DashboardPageComponent', () => {
  let component: DashboardPageComponent;
  let fixture: ComponentFixture<DashboardPageComponent>;
  let mockStore: {
    activeFilter: ReturnType<typeof signal<BoardFilter>>;
    priorityFilter: ReturnType<typeof signal<TaskPriority | null>>;
    setFilter: ReturnType<typeof vi.fn>;
    setPriorityFilter: ReturnType<typeof vi.fn>;
  };

  beforeEach(async () => {
    // 1. تعديل الـ MockStore ليدعم الـ Signals اللي الـ Template محتاجها
    mockStore = {
      activeFilter: signal('all'), // ده اللي كان مسبب الـ TypeError
      priorityFilter: signal(null), // لو الكومبوننت بيستخدمه
      setFilter: vi.fn(),
      setPriorityFilter: vi.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [DashboardPageComponent, NoopAnimationsModule],
      providers: [{ provide: KanbanBoardStore, useValue: mockStore }],
    })
      .overrideComponent(DashboardPageComponent, {
        remove: { imports: [KanbanBoardComponent] },
        add: { imports: [MockKanbanBoardComponent] },
      })
      .compileComponents();

    fixture = TestBed.createComponent(DashboardPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display static stat cards', () => {
    expect(component['stats'].length).toBe(4);
    expect(component['stats'][0].label).toBe('Total Tasks');
  });

  it('should update active filter when onFilterChange is called', () => {
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
    // 2. بدل ما تعمل new instance يدوي، استخدم الـ mock اللي الأنجيولار عمله فعلاً
    const mockKanbanBoard = {
      openAddTaskDialog: vi.fn(),
    };

    // بنحقن الـ mock جوه الكومبوننت (الـ ViewChild)
    component['kanbanBoard'] = mockKanbanBoard as unknown as KanbanBoardComponent;

    component['openAddTaskDialog']();
    expect(mockKanbanBoard.openAddTaskDialog).toHaveBeenCalled();
  });
});
