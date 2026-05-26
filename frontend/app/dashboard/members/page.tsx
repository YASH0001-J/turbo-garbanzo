'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';

interface Member {
  id: number;
  name: string;
  email: string;
  phone?: string;
  is_active?: number;
  created_at?: string;
}

export default function MembersPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMembers = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/members');
      const json = await res.json();
      if (!json.success) throw new Error(json.message || 'Failed');
      setMembers(json.data || []);
    } catch (err) {
      console.error(err);
      toast.error('Failed to load members');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this member?')) return;
    try {
      const res = await fetch(`/api/members/${id}`, { method: 'DELETE' });
      const json = await res.json();
      if (!json.success) throw new Error(json.message || 'Failed');
      toast.success('Member removed');
      fetchMembers();
    } catch (err) {
      console.error(err);
      toast.error('Failed to remove member');
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Members</h2>
        <Link href="/dashboard/members/add" className="btn-primary px-4 py-2 bg-blue-600 text-white rounded">
          Add New Member
        </Link>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : members.length === 0 ? (
        <div className="text-gray-600">No members yet. Add one.</div>
      ) : (
        <div className="space-y-3">
          {members.map((m) => (
            <div key={m.id} className="p-4 bg-white shadow rounded flex justify-between items-center">
              <div>
                <div className="font-medium">{m.name}</div>
                <div className="text-sm text-gray-500">{m.email} {m.phone ? ` • ${m.phone}` : ''}</div>
              </div>
              <div>
                <button onClick={() => handleDelete(m.id)} className="text-red-600 hover:underline">
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
