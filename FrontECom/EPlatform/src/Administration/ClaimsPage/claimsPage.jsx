import { useState } from 'react';
import { addClaim, deleteClaim, getUserClaims } from '../../Services/AuthService/claimApi';
import './claimsPage.css';

export default function ClaimsPage() {
  const [userId, setUserId] = useState('');
  const [claims, setClaims] = useState([]);
  const [newClaimType, setNewClaimType] = useState('');
  const [newClaimValue, setNewClaimValue] = useState('');

  const loadClaims = async () => {
    if (!userId.trim()) return;
    try {
      const res = await getUserClaims(userId.trim());
      setClaims(res.data);
    } catch {
      alert('Failed to load claims');
      setClaims([]);
    }
  };

  const handleAddClaim = async () => {
    if (!newClaimType.trim() || !newClaimValue.trim() || !userId.trim()) return;
    try {
     await addClaim(userId.trim(), {
  type: newClaimType.trim(),
  value: newClaimValue.trim()
});

      setNewClaimType('');
      setNewClaimValue('');
      loadClaims();
    } catch {
      alert('Failed to add claim');
    }
  };

  const handleDeleteClaim = async (claimType) => {
    if (!window.confirm(`Delete claim "${claimType}"?`)) return;
    try {
      await deleteClaim(userId.trim(), claimType);
      loadClaims();
    } catch {
      alert('Failed to delete claim');
    }
  };

  return (
    <div className="claims-container">
      <h2>User Claims Management</h2>
      <div className="user-id-input">
        <input
          type="text"
          placeholder="User ID"
          value={userId}
          onChange={e => setUserId(e.target.value)}
        />
        <button onClick={loadClaims}>Load Claims</button>
      </div>

<ul className="claims-list">
  {claims.map((claim, index) => {
    const type = claim.claimType || `type-${index}`;
    const value = claim.claimValue || `value-${index}`;
    return (
      <li key={`${type}-${value}-${index}`}>
        <b>{claim.claimType}:</b> {claim.claimValue}
        <button onClick={() => handleDeleteClaim(claim.claimType)}>Delete</button>
      </li>
    );
  })}
</ul>




      <div className="add-claim">
        <input
          type="text"
          placeholder="Claim Type"
          value={newClaimType}
          onChange={e => setNewClaimType(e.target.value)}
        />
        <input
          type="text"
          placeholder="Claim Value"
          value={newClaimValue}
          onChange={e => setNewClaimValue(e.target.value)}
        />
        <button onClick={handleAddClaim}>Add Claim</button>
      </div>
    </div>
  );
}
