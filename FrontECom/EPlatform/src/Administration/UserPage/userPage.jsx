import { useEffect, useState } from 'react';
import { assignRole, getUserRoles, getUsers, removeRole } from '../../Services/AuthService/userApi';
/* import './userPage.css';
 */ 
export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [selectedUserEmail, setSelectedUserEmail] = useState('');
  const [userRoles, setUserRoles] = useState([]);
  const [newRole, setNewRole] = useState('');

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const res = await getUsers();
      setUsers(res.data);
    } catch {
      alert('Failed to load users');
    }
  };

  const loadUserRoles = async (email) => {
    setSelectedUserEmail(email);
    try {
      const res = await getUserRoles(email);
      setUserRoles(res.data);
    } catch {
      alert('Failed to load user roles');
      setUserRoles([]);
    }
  };

  const handleAssignRole = async () => {
    if (!newRole.trim() || !selectedUserEmail) return;
    try {
      await assignRole(selectedUserEmail, newRole.trim());
      setNewRole('');
      loadUserRoles(selectedUserEmail);
    } catch {
      alert('Failed to assign role');
    }
  };

  const handleRemoveRole = async (role) => {
    if (!window.confirm(`Remove role "${role}" from ${selectedUserEmail}?`)) return;
    try {
      await removeRole(selectedUserEmail, role);
      loadUserRoles(selectedUserEmail);
    } catch {
      alert('Failed to remove role');
    }
  };

  return (
    <div className="users-container">
      <h2>Users Management</h2>
      <div className="users-list">
        <h3>Users</h3>
        <ul>
          {users.map(user => (
            <li
              key={user.id}
              className={selectedUserEmail === user.email ? 'selected' : ''}
              onClick={() => loadUserRoles(user.email)}
            >
              {user.email} ({user.fullName || 'No name'})
            </li>
          ))}
        </ul>
      </div>

      {selectedUserEmail && (
        <div className="user-roles">
          <h3>Roles for {selectedUserEmail}</h3>
          <ul>
            {userRoles.map(role => (
              <li key={role}>
                {role}
                <button onClick={() => handleRemoveRole(role)}>Remove</button>
              </li>
            ))}
          </ul>

          <div className="assign-role">
            <input
              type="text"
              placeholder="New role"
              value={newRole}
              onChange={e => setNewRole(e.target.value)}
            />
            <button onClick={handleAssignRole}>Assign Role</button>
          </div>
        </div>
      )}
    </div>
  );
}
