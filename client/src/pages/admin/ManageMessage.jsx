import useFetch from '../../hooks/useFetch';
import api from '../../api/api';
import Loader from '../../components/common/Loader';
import { Trash2, CheckCircle } from 'lucide-react';

const ManageMessage = () => {
  const { data: messages, loading, refetch } = useFetch('/messages');

  if (loading) return <Loader />;

  const handleMarkRead = async (id) => {
    try {
      await api.put(`/messages/${id}`);
      refetch();
    } catch (err) {
      alert('Error marking as read');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      try {
        await api.delete(`/messages/${id}`);
        refetch();
      } catch (err) {
        alert('Error deleting message');
      }
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">Messages Inbox</h1>
      
      <div className="space-y-4">
        {messages?.map((msg) => (
          <div key={msg._id} className={`glass p-6 rounded-xl border ${msg.isRead ? 'border-border' : 'border-accent/50'}`}>
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  {msg.name} 
                  {!msg.isRead && <span className="bg-accent text-white text-[10px] uppercase font-bold px-2 py-0.5 rounded-full">New</span>}
                </h3>
                <a href={`mailto:${msg.email}`} className="text-sm text-accent hover:underline">{msg.email}</a>
              </div>
              <div className="text-xs text-text/60">
                {new Date(msg.createdAt).toLocaleDateString()}
              </div>
            </div>
            
            <p className="text-text/90 bg-surface/50 p-4 rounded-lg border border-border mb-4">
              {msg.message}
            </p>

            <div className="flex justify-end gap-3">
              {!msg.isRead && (
                <button onClick={() => handleMarkRead(msg._id)} className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm bg-green-500/10 text-green-400 hover:bg-green-500/20 transition-colors">
                  <CheckCircle size={16} /> Mark as Read
                </button>
              )}
              <button onClick={() => handleDelete(msg._id)} className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors">
                <Trash2 size={16} /> Delete
              </button>
            </div>
          </div>
        ))}
        
        {messages?.length === 0 && (
          <div className="glass p-12 text-center rounded-xl">
            <h3 className="text-xl font-bold text-white mb-2">Inbox Empty</h3>
            <p className="text-text/70">You don't have any messages yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageMessage;
