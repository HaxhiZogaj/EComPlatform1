import { useEffect, useState } from 'react';
import { createRole, deleteRole, getRoles } from '../../Services/AuthService/roleApi';
import './rolesPage.css';

export default function RolesPage() {
  const [roles, setRoles] = useState([]);
  const [newRole, setNewRole] = useState('');

  useEffect(() => {
    loadRoles();
  }, []);

  const loadRoles = async () => {
    try {
      const res = await getRoles();
      setRoles(res.data);
    } catch (err) {
      alert('Failed to load roles');
    }
  };

  const handleAddRole = async () => {
    if (!newRole.trim()) return;
    try {
      await createRole(newRole.trim());
      setNewRole('');
      loadRoles();
    } catch (err) {
      alert('Failed to add role');
    }
  };

  const handleDeleteRole = async (roleName) => {
    if (!window.confirm(`Delete role "${roleName}"?`)) return;
    try {
      await deleteRole(roleName);
      loadRoles();
    } catch (err) {
      alert('Failed to delete role');
    }
  };

  return (
    <div className="roles-container">
      <h2>Roles Management</h2>
      <div className="add-role">
        <input
          type="text"
          placeholder="New role name"
          value={newRole}
          onChange={e => setNewRole(e.target.value)}
        />
        <button onClick={handleAddRole}>Add Role</button>
      </div>
      <ul className="roles-list">
        {roles.map(role => (
          <li key={role.id}>
            {role.name}
            <button className="delete-btn" onClick={() => handleDeleteRole(role.name)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
