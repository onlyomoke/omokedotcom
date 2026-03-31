import { useState } from 'react';
import { motion } from 'motion/react';
import { Send, Loader2, CheckCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { toast } from 'sonner';

type FormStatus = 'idle' | 'loading' | 'success';

export function ContactSection() {
  const [formStatus, setFormStatus] = useState<FormStatus>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    eventDate: '',
    projectType: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('loading');

    try {
      // EmailJS Configuration (User needs to set up their own EmailJS account)
      // Replace these with actual EmailJS credentials
      await emailjs.send(
        'YOUR_SERVICE_ID', // Replace with your EmailJS Service ID
        'YOUR_TEMPLATE_ID', // Replace with your EmailJS Template ID
        {
          from_name: formData.name,
          from_email: formData.email,
          event_date: formData.eventDate,
          project_type: formData.projectType,
          message: formData.message,
          to_email: 'onlyomoke@gmail.com',
        },
        'YOUR_PUBLIC_KEY' // Replace with your EmailJS Public Key
      );

      setFormStatus('success');
      toast.success('Inquiry sent successfully! I\'ll be in touch soon.');
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          eventDate: '',
          projectType: '',
          message: '',
        });
        setFormStatus('idle');
      }, 3000);
    } catch (error) {
      console.error('EmailJS Error:', error);
      setFormStatus('idle');
      toast.error('Failed to send inquiry. Please email directly at onlyomoke@gmail.com');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="contact" className="min-h-screen py-24 px-6 bg-[#582f0e]">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2
            className="text-5xl md:text-6xl text-[#b6ad90] mb-4"
            style={{ fontFamily: 'New York, Georgia, serif', fontWeight: 700 }}
          >
            Book Omoke
          </h2>
          <p
            className="text-lg text-[#a4ac86] max-w-2xl mx-auto"
            style={{ fontFamily: 'SF Pro Text, -apple-system, sans-serif' }}
          >
            Ready to bring your vision to life? Fill out the form below and I'll get back to you 
            within 24-48 hours to discuss your project.
          </p>
        </motion.div>

        {/* Contact Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-[#414833] p-8 md:p-12 rounded-lg border border-[#656d4a]"
        >
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-[#b6ad90] mb-2"
                style={{ fontFamily: 'SF Pro Text, -apple-system, sans-serif' }}
              >
                Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[#333d29] border border-[#656d4a] rounded text-[#c2c5aa] focus:outline-none focus:border-[#a68a64] transition-colors"
                style={{ fontFamily: 'SF Pro Text, -apple-system, sans-serif' }}
                disabled={formStatus === 'loading' || formStatus === 'success'}
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-[#b6ad90] mb-2"
                style={{ fontFamily: 'SF Pro Text, -apple-system, sans-serif' }}
              >
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[#333d29] border border-[#656d4a] rounded text-[#c2c5aa] focus:outline-none focus:border-[#a68a64] transition-colors"
                style={{ fontFamily: 'SF Pro Text, -apple-system, sans-serif' }}
                disabled={formStatus === 'loading' || formStatus === 'success'}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* Event Date */}
            <div>
              <label
                htmlFor="eventDate"
                className="block text-[#b6ad90] mb-2"
                style={{ fontFamily: 'SF Pro Text, -apple-system, sans-serif' }}
              >
                Event Date
              </label>
              <input
                type="date"
                id="eventDate"
                name="eventDate"
                value={formData.eventDate}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[#333d29] border border-[#656d4a] rounded text-[#c2c5aa] focus:outline-none focus:border-[#a68a64] transition-colors"
                style={{ fontFamily: 'SF Pro Text, -apple-system, sans-serif' }}
                disabled={formStatus === 'loading' || formStatus === 'success'}
              />
            </div>

            {/* Project Type */}
            <div>
              <label
                htmlFor="projectType"
                className="block text-[#b6ad90] mb-2"
                style={{ fontFamily: 'SF Pro Text, -apple-system, sans-serif' }}
              >
                Project Type *
              </label>
              <select
                id="projectType"
                name="projectType"
                required
                value={formData.projectType}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[#333d29] border border-[#656d4a] rounded text-[#c2c5aa] focus:outline-none focus:border-[#a68a64] transition-colors"
                style={{ fontFamily: 'SF Pro Text, -apple-system, sans-serif' }}
                disabled={formStatus === 'loading' || formStatus === 'success'}
              >
                <option value="">Select a project type</option>
                <option value="Wedding">Wedding</option>
                <option value="Commercial">Commercial</option>
                <option value="Music Video">Music Video</option>
                <option value="Narrative">Narrative</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          {/* Message */}
          <div className="mb-8">
            <label
              htmlFor="message"
              className="block text-[#b6ad90] mb-2"
              style={{ fontFamily: 'SF Pro Text, -apple-system, sans-serif' }}
            >
              Tell me about your project *
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={6}
              value={formData.message}
              onChange={handleChange}
              placeholder="Share your vision, timeline, and any specific requirements..."
              className="w-full px-4 py-3 bg-[#333d29] border border-[#656d4a] rounded text-[#c2c5aa] placeholder-[#656d4a] focus:outline-none focus:border-[#a68a64] transition-colors resize-none"
              style={{ fontFamily: 'SF Pro Text, -apple-system, sans-serif' }}
              disabled={formStatus === 'loading' || formStatus === 'success'}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={formStatus === 'loading' || formStatus === 'success'}
            className={`w-full px-8 py-4 rounded font-medium transition-all duration-300 flex items-center justify-center gap-3 ${
              formStatus === 'success'
                ? 'bg-[#656d4a] text-[#b6ad90] cursor-default'
                : 'bg-[#7f4f24] text-[#c2c5aa] hover:bg-[#936639]'
            } disabled:opacity-50`}
            style={{ fontFamily: 'SF Pro Text, -apple-system, sans-serif' }}
          >
            {formStatus === 'idle' && (
              <>
                <Send className="w-5 h-5" />
                Send Inquiry
              </>
            )}
            {formStatus === 'loading' && (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Sending...
              </>
            )}
            {formStatus === 'success' && (
              <>
                <CheckCircle className="w-5 h-5" />
                Sent! I'll be in touch.
              </>
            )}
          </button>

          {/* Note */}
          <p
            className="text-sm text-[#a4ac86] text-center mt-6"
            style={{ fontFamily: 'SF Pro Text, -apple-system, sans-serif' }}
          >
            Your inquiry will be sent directly to{' '}
            <span style={{ fontFamily: 'Menlo, Monaco, monospace' }}>
              onlyomoke@gmail.com
            </span>
          </p>
        </motion.form>
      </div>
    </section>
  );
}