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
    projectType: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('loading');

    try {
      // Your EmailJS credentials
      await emailjs.send(
        'service_lwnmt7q',      // Your Service ID
        'template_pci354f',     // Your Template ID
        {
          from_name: formData.name,
          from_email: formData.email,
          project_type: formData.projectType,
          message: formData.message,
          to_email: 'onlyomoke@gmail.com',
          reply_to: formData.email,  // This allows you to reply directly to the person
        },
        'nvbvYDZ8SD2Irsb5p'     // Your Public Key
      );

      setFormStatus('success');
      toast.success('Inquiry sent successfully! I\'ll be in touch soon.');
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
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
    <section id="contact" className="min-h-screen py-24 px-6 bg-dark-walnut">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-5xl md:text-6xl text-khaki-beige mb-4 font-bold">
            Book Omoke
          </h2>
          <p className="font-sans text-lg text-dry-sage-light max-w-2xl mx-auto font-normal">
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
          className="bg-ebony p-8 md:p-12 rounded-lg border border-dusty-olive"
        >
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="font-sans block text-khaki-beige mb-2 font-medium"
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
                className="font-sans w-full px-4 py-3 bg-charcoal-brown border border-dusty-olive rounded text-dry-sage focus:outline-none focus:border-camel transition-colors"
                disabled={formStatus === 'loading' || formStatus === 'success'}
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="font-sans block text-khaki-beige mb-2 font-medium"
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
                className="font-sans w-full px-4 py-3 bg-charcoal-brown border border-dusty-olive rounded text-dry-sage focus:outline-none focus:border-camel transition-colors"
                disabled={formStatus === 'loading' || formStatus === 'success'}
              />
            </div>
          </div>

          {/* Project Type - Full width */}
          <div className="mb-6">
            <label
              htmlFor="projectType"
              className="font-sans block text-khaki-beige mb-2 font-medium"
            >
              Project Type *
            </label>
            <div className="relative">
              <select
                id="projectType"
                name="projectType"
                required
                value={formData.projectType}
                onChange={handleChange}
                className="font-sans w-full px-4 py-3 bg-charcoal-brown border border-dusty-olive rounded text-dry-sage focus:outline-none focus:border-camel transition-colors appearance-none cursor-pointer hover:border-camel/50"
                disabled={formStatus === 'loading' || formStatus === 'success'}
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23C4A47A' stroke-width='2'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 1rem center',
                  backgroundSize: '1.25rem',
                }}
              >
                <option value="" className="text-dry-sage">Select a project type</option>
                <option value="Commercial">Commercial</option>
                <option value="Music Video">Music Video</option>
                <option value="Narrative">Narrative</option>
                <option value="Documentary">Documentary</option>
                <option value="Fashion">Fashion</option>
                <option value="Brand Content">Brand Content</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          {/* Message */}
          <div className="mb-8">
            <label
              htmlFor="message"
              className="font-sans block text-khaki-beige mb-2 font-medium"
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
              className="font-sans w-full px-4 py-3 bg-charcoal-brown border border-dusty-olive rounded text-dry-sage placeholder-dusty-olive focus:outline-none focus:border-camel transition-colors resize-none"
              disabled={formStatus === 'loading' || formStatus === 'success'}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={formStatus === 'loading' || formStatus === 'success'}
            className={`font-sans w-full px-8 py-4 rounded font-medium transition-all duration-300 flex items-center justify-center gap-3 ${
              formStatus === 'success'
                ? 'bg-dusty-olive text-khaki-beige cursor-default'
                : 'bg-saddle-brown text-dry-sage hover:bg-toffee-brown'
            } disabled:opacity-50`}
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
          <p className="font-sans text-sm text-dry-sage-light text-center mt-6 font-normal">
            Your inquiry will be sent directly to{' '}
            <span className="font-mono text-khaki-beige">
              onlyomoke@gmail.com
            </span>
          </p>
        </motion.form>
      </div>
    </section>
  );
}