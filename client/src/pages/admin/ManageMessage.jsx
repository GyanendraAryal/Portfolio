import { useEffect } from 'react';
import useMessageStore from '../../store/useMessageStore';
import { Trash2, CheckCircle2, Mail, Calendar, User, MessageSquare, Target } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { fadeUp, staggerContainer } from '../../lib/animations/motionVariants';

const ManageMessage = () => {
  const { messages, fetchMessages, markMessageAsRead, deleteMessage, loading } = useMessageStore();

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  if (loading && messages.length === 0) return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <div className="w-10 h-10 border-4 border-accent/20 border-t-accent rounded-full animate-spin" />
    </div>
  );

  const handleMarkAsRead = async (id) => {
    try {
      await markMessageAsRead(id);
      toast.success('Signal Synchronized');
    } catch (err) {
      toast.error('Sync Protocol Failure');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to purge this intelligence?')) {
      try {
        await deleteMessage(id);
        toast.success('Intelligence Purged');
      } catch (err) {
        toast.error('Purge Sequence Failed');
      }
    }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="show"
      variants={staggerContainer(0.2, 0.1)}
      className="space-y-12"
    >
      <motion.div variants={fadeUp()} className="space-y-4">
        <h1 className="text-4xl md:text-5xl font-display font-black text-white tracking-tight">
          Signal <span className="text-gradient-accent">Collector</span>
        </h1>
        <p className="text-secondary/60 font-light text-lg">Process incoming intelligence and inquiries.</p>
      </motion.div>
      
      <div className="space-y-6">
        {messages?.map((msg) => (
          <motion.div 
            key={msg._id} 
            variants={fadeUp()}
            className={`glass-card p-8 md:p-10 rounded-[40px] border border-white/5 transition-all duration-500 group relative overflow-hidden ${!msg.isRead ? 'bg-accent/5 border-accent/20 shadow-[0_0_40px_-15px_rgba(var(--accent-rgb),0.2)]' : 'bg-white/2'}`}
          >
            <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8">
              <div className="flex items-center gap-5">
                <div className="h-14 w-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-500">
                  <User size={24} className={!msg.isRead ? 'text-accent' : 'text-white/20'} />
                </div>
                <div>
                  <h3 className="text-xl font-display font-bold text-white flex items-center gap-3">
                    {msg.name} 
                    {!msg.isRead && (
                      <span className="text-[10px] font-mono font-black uppercase tracking-widest px-3 py-1 bg-accent/20 text-accent rounded-full border border-accent/20 animate-pulse">
                        Intelligence Detected
                      </span>
                    )}
                  </h3>
                  <div className="flex items-center gap-4 mt-1">
                    <a href={`mailto:${msg.email}`} className="text-sm font-mono text-secondary/60 hover:text-accent transition-colors flex items-center gap-2">
                      <Mail size={12} /> {msg.email}
                    </a>
                    <span className="text-xs font-mono text-white/20 flex items-center gap-2">
                      <Calendar size={12} /> {new Date(msg.createdAt).toLocaleDateString(undefined, { dateStyle: 'long' })}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -left-6 top-0 bottom-0 w-1 bg-accent/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
              <p className="text-lg font-light text-secondary/90 leading-relaxed italic">
                "{msg.message}"
              </p>
            </div>

            <div className="mt-10 pt-8 border-t border-white/5 flex flex-wrap gap-4 items-center justify-between">
              <div className="flex items-center gap-2 text-[10px] font-mono tracking-widest text-white/20 uppercase">
                <MessageSquare size={12} /> Decrypted Payload
              </div>
              <div className="flex gap-4">
                {!msg.isRead && (
                  <button 
                    onClick={() => handleMarkAsRead(msg._id)} 
                    className="flex items-center gap-3 px-6 py-3 rounded-2xl text-[10px] font-mono font-bold tracking-widest uppercase bg-green-500/10 text-green-400 border border-green-500/20 hover:bg-green-500/20 transition-all"
                  >
                    <CheckCircle2 size={14} /> Synchronize Status
                  </button>
                )}
                <button 
                  onClick={() => handleDelete(msg._id)} 
                  className="flex items-center gap-3 px-6 py-3 rounded-2xl text-[10px] font-mono font-bold tracking-widest uppercase bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500/20 transition-all"
                >
                  <Trash2 size={14} /> Purge Intelligence
                </button>
              </div>
            </div>
          </motion.div>
        ))}
        
        {messages?.length === 0 && (
          <motion.div variants={fadeUp()} className="glass-card p-24 text-center rounded-[40px] border border-white/5 bg-white/2">
            <div className="flex flex-col items-center gap-6 text-secondary/20">
              <Target size={64} strokeWidth={1} />
              <div>
                <h3 className="text-2xl font-display font-medium text-white mb-2 uppercase tracking-wide">Silent Spectrum</h3>
                <p className="font-light">No signals detected in the current sector.</p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default ManageMessage;
