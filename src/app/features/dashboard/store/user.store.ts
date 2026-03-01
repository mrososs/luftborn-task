import { signalStore, withState, withMethods } from '@ngrx/signals';
import { User } from '../../../models/user.model';

interface UserState {
  users: User[];
  currentUser: User | null;
}

const MOCK_USERS: User[] = [
  { id: 'u-1', name: 'Sarah Miller', email: 'sarah@example.com', role: 'admin', avatarUrl: 'S' },
  { id: 'u-2', name: 'John Doe', email: 'john@example.com', role: 'member', avatarUrl: 'J' },
  { id: 'u-3', name: 'Mike Ross', email: 'mike@example.com', role: 'member', avatarUrl: 'M' },
  {
    id: 'u-4',
    name: 'Alvaro Sanchez',
    email: 'alvaro@example.com',
    role: 'viewer',
    avatarUrl: 'A',
  },
];

const INITIAL_STATE: UserState = {
  users: MOCK_USERS,
  currentUser: MOCK_USERS[0],
};

/**
 * Store for managing users and assignment options.
 */
export const UserStore = signalStore(
  { providedIn: 'root' },
  withState<UserState>(INITIAL_STATE),
  withMethods(() => ({
    // Placeholder for future management methods
  })),
);
