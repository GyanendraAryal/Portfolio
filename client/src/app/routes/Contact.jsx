import { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { fadeUp, staggerContainer } from '../../lib/animations/motionVariants';
import api from '../../api/api';
import Button from '../../components/ui/Button';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post('/messages', formData);
      toast.success('Intelligence Received. I will reach out shortly.');
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Transmission Failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-24 max-w-4xl mx-auto px-6 lg:px-8 w-full">
      <motion.div 
        variants={staggerContainer()}
        initial="hidden"
        animate="show"
        className="space-y-12"
      >
        <motion.div variants={fadeUp()} className="text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">Let's build something great.</h1>
          <p className="text-secondary text-lg leading-relaxed max-w-2xl">
            Whether you have a full product spec or just an idea on a napkin, I'd love to hear about it. Fill out the form below and I'll get back to you within 24 hours.
          </p>
        </motion.div>

        <motion.form 
          variants={fadeUp(0.1)}
          onSubmit={handleSubmit}
          className="glass-panel p-8 md:p-12 rounded-3xl space-y-8"
        >

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label htmlFor="name" className="text-sm font-semibold text-white tracking-wide">Name</label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                required
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-surface/50 border border-border/50 rounded-xl px-4 py-3.5 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all text-white placeholder-secondary/50"
              />
            </div>
            <div className="space-y-3">
              <label htmlFor="email" className="text-sm font-semibold text-white tracking-wide">Email</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                required
                placeholder="john@company.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-surface/50 border border-border/50 rounded-xl px-4 py-3.5 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all text-white placeholder-secondary/50"
              />
            </div>
          </div>

          <div className="space-y-3">
            <label htmlFor="message" className="text-sm font-semibold text-white tracking-wide">Project Details</label>
            <textarea 
              id="message" 
              name="message" 
              required
              rows={6}
              placeholder="Tell me about your tech stack, goals, and timeline..."
              value={formData.message}
              onChange={handleChange}
              className="w-full bg-surface/50 border border-border/50 rounded-xl px-4 py-3.5 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all text-white resize-none placeholder-secondary/50"
            />
          </div>

          <Button 
            type="submit" 
            variant="accent" 
            size="lg"
            className="w-full md:w-auto mt-4 px-12"
            isLoading={loading}
          >
            {loading ? 'Sending...' : 'Send Message'}
          </Button>
        </motion.form>
      </motion.div>
    </section>
  );
};

export default Contact;
