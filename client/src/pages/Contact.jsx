import { useState } from 'react';
import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '../lib/animations/motionVariants';
import useMessageStore from '../store/useMessageStore';
import Button from '../components/ui/Button';
import { Send, Mail, MapPin, Phone } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [feedback, setFeedback] = useState({ type: '', msg: '' });
  const { sendMessage, loading } = useMessageStore();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFeedback({ type: '', msg: '' });

    try {
      await sendMessage(formData);
      setFeedback({ type: 'success', msg: 'Transmission received. I will respond shortly.' });
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      setFeedback({ type: 'error', msg: err.response?.data?.message || 'Signal lost. Please try again.' });
    }
  };

  return (
    <motion.section 
      variants={staggerContainer(0.1, 0.2)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="max-w-7xl mx-auto px-6 py-24 md:py-32"
    >
      <motion.div variants={fadeUp()} className="mb-16 md:mb-24 text-center">
        <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">
          Initiate <span className="text-gradient-accent">Contact</span>
        </h2>
        <div className="h-1 w-20 bg-accent rounded-full mb-8 mx-auto" />
        <p className="font-light text-secondary max-w-2xl text-lg md:text-xl leading-relaxed mx-auto">
          Ready to turn architectural concepts into high-performance reality? Reach out to discuss complex systems, strategic partnerships, or just to say hello.
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
        
        {/* Info Column */}
        <motion.div variants={fadeUp()} className="lg:col-span-5 space-y-10">
          <div className="glass p-8 rounded-3xl border-white/5 space-y-8">
            <h3 className="text-2xl font-display font-medium text-white">Direct Channels</h3>
            
            <div className="space-y-6">
              {[
                { icon: <Mail className="text-accent" />, label: 'Email', value: 'hello@gyanendra.dev' },
                { icon: <MapPin className="text-accent" />, label: 'Location', value: 'Planet Earth | Remote-First' },
                { icon: <Phone className="text-accent" />, label: 'Status', value: 'Sync via Email Preferred' },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 items-start group">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center transition-colors group-hover:border-accent/30 group-hover:bg-accent/5">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-white/30 text-xs uppercase tracking-widest font-medium mb-1">{item.label}</p>
                    <p className="text-white font-medium">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass p-8 rounded-3xl border-white/5 bg-accent/5">
            <p className="text-sm text-secondary font-light italic leading-relaxed">
              "Every great system begins with a single conversation. Let's make it count."
            </p>
          </div>
        </motion.div>

        {/* Form Column */}
        <motion.div variants={fadeUp()} className="lg:col-span-7">
          <form onSubmit={handleSubmit} className="glass p-8 md:p-10 rounded-3xl border-white/5 space-y-8 relative overflow-hidden">
            {/* Success/Error Message */}
            {feedback.msg && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }} 
                animate={{ opacity: 1, y: 0 }}
                className={`p-4 rounded-2xl text-sm font-medium ${feedback.type === 'success' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}
              >
                {feedback.msg}
              </motion.div>
            )}

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label htmlFor="name" className="text-xs uppercase tracking-widest font-semibold text-white/40 ml-1">Identity</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  required
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/5 rounded-2xl px-5 py-4 focus:outline-none focus:border-accent/50 focus:bg-white/10 transition-all text-white placeholder:text-white/20"
                />
              </div>
              <div className="space-y-3">
                <label htmlFor="email" className="text-xs uppercase tracking-widest font-semibold text-white/40 ml-1">Digital Address</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  required
                  placeholder="email@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/5 rounded-2xl px-5 py-4 focus:outline-none focus:border-accent/50 focus:bg-white/10 transition-all text-white placeholder:text-white/20"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label htmlFor="message" className="text-xs uppercase tracking-widest font-semibold text-white/40 ml-1">The Proposal / Inquiry</label>
              <textarea 
                id="message" 
                name="message" 
                required
                rows={6}
                placeholder="How can we build excellence together?"
                value={formData.message}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/5 rounded-2xl px-5 py-4 focus:outline-none focus:border-accent/50 focus:bg-white/10 transition-all text-white placeholder:text-white/20 resize-none"
              />
            </div>

            <Button 
              type="submit" 
              variant="accent" 
              className="w-full py-4 btn-premium text-white font-display text-lg tracking-wide group"
              disabled={loading}
            >
              <span className="flex items-center justify-center gap-3">
                {loading ? 'Encrypting...' : 'Dispatch Message'}
                <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </span>
            </Button>
          </form>
        </motion.div>

      </div>
    </motion.section>
  );
};

export default Contact;
