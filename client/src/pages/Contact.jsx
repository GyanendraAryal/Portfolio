import { useState } from 'react';
import { motion } from 'framer-motion';
import { fadeIn, staggerContainer } from '../animations/motionVariants';
import api from '../api/api';
import Button from '../components/ui/Button';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState({ type: '', msg: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', msg: '' });

    try {
      await api.post('/messages', formData);
      setStatus({ type: 'success', msg: 'Message sent successfully! I will get back to you soon.' });
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      setStatus({ type: 'error', msg: err.response?.data?.message || 'Something went wrong. Please try again later.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.section 
      variants={staggerContainer()}
      initial="hidden"
      animate="show"
      exit={{ opacity: 0 }}
      className="max-w-2xl mx-auto px-4 py-20"
    >
      <motion.div variants={fadeIn('up')} className="text-center mb-12">
        <h2 className="text-accent font-mono text-lg mb-2">05. What's Next?</h2>
        <h3 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">Get In Touch</h3>
        <p className="text-text/80 leading-relaxed">
          Although I'm not currently looking for any new opportunities, my inbox is always open. 
          Whether you have a question or just want to say hi, I'll try my best to get back to you!
        </p>
      </motion.div>

      <motion.form 
        variants={fadeIn('up', 0.2)}
        onSubmit={handleSubmit}
        className="glass p-8 rounded-2xl space-y-6"
      >
        {status.msg && (
          <div className={`p-4 rounded-lg text-sm ${status.type === 'success' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
            {status.msg}
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium text-text/90">Name</label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-surface/50 border border-border rounded-lg px-4 py-3 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all text-white"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-text/90">Email</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-surface/50 border border-border rounded-lg px-4 py-3 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all text-white"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="message" className="text-sm font-medium text-text/90">Message</label>
          <textarea 
            id="message" 
            name="message" 
            required
            rows={5}
            value={formData.message}
            onChange={handleChange}
            className="w-full bg-surface/50 border border-border rounded-lg px-4 py-3 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all text-white resize-none"
          />
        </div>

        <Button 
          type="submit" 
          variant="primary" 
          className="w-full py-3.5 text-base mt-4"
          disabled={loading}
        >
          {loading ? 'Sending...' : 'Send Message'}
        </Button>
      </motion.form>
    </motion.section>
  );
};

export default Contact;
