import React, { useState } from 'react';
import { Mail, Copy, Check, Send, Sparkles, MessageSquare, Linkedin, Globe, Instagram, Twitter, ArrowUpRight } from 'lucide-react';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'Branding & Identity',
    budget: '$3k - $5k',
    message: ''
  });

  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const emailAddress = 'aravindshaw5@gmail.com';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const projectTypes = [
    'Branding & Identity',
    '2D Animation Video',
    '3D Design & Commercial',
    'Social Media Reels',
    'Product Video',
    'Character Design',
    'Editorial / Graphic'
  ];

  const budgetRanges = [
    '<$2,500',
    '$2,500 - $5,000',
    '$5,000 - $10,000',
    '$10,000+'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate instant form submission & save
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      try {
        const saved = JSON.parse(localStorage.getItem('portfolio_inquiries') || '[]');
        saved.push({ ...formData, timestamp: new Date().toISOString() });
        localStorage.setItem('portfolio_inquiries', JSON.stringify(saved));
      } catch (err) {
        console.error(err);
      }
    }, 800);
  };

  return (
    <section id="contact" className="scroll-mt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Heading */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 tracking-wider uppercase mb-2">
            <span className="px-2 py-0.5 rounded bg-emerald-50 border border-emerald-200">14</span>
            <span>Initiate a Collaboration</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            GET IN TOUCH
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-1.5 max-w-2xl">
            Have a project in mind, need creative direction, or want to discuss a new brand identity? Send a message and let's craft something remarkable.
          </p>
        </div>
        <div className="mt-4 md:mt-0 text-xs font-semibold text-emerald-800 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
          <span>Typically replies within 24 hours</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
        
        {/* LEFT COLUMN: Contact Methods, Direct Email & Socials */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Email Quick Copy Card */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-7 shadow-2xs">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Direct Email</h4>
                <div className="text-sm sm:text-base font-bold text-slate-900 break-all">
                  {emailAddress}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <a
                id="contact-mailto-link"
                href={`mailto:${emailAddress}?subject=Project%20Inquiry%20from%20Portfolio`}
                className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white text-xs sm:text-sm font-semibold shadow-xs transition-colors"
              >
                <span>Compose Email</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>

              <button
                id="contact-copy-email-btn"
                type="button"
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-slate-800 text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>
          </div>

          {/* Social Profiles */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-7 shadow-2xs space-y-4">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Connect Across Channels
            </h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-3 rounded-xl border border-slate-200/80 hover:border-emerald-300 hover:bg-emerald-50/40 text-slate-700 hover:text-slate-900 text-xs font-semibold transition-all group"
              >
                <div className="flex items-center gap-2.5">
                  <Linkedin className="w-4 h-4 text-blue-600" />
                  <span>LinkedIn</span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-700 transition-colors" />
              </a>

              <a
                href="https://behance.net"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-3 rounded-xl border border-slate-200/80 hover:border-emerald-300 hover:bg-emerald-50/40 text-slate-700 hover:text-slate-900 text-xs font-semibold transition-all group"
              >
                <div className="flex items-center gap-2.5">
                  <Globe className="w-4 h-4 text-indigo-600" />
                  <span>Behance</span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-700 transition-colors" />
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-3 rounded-xl border border-slate-200/80 hover:border-emerald-300 hover:bg-emerald-50/40 text-slate-700 hover:text-slate-900 text-xs font-semibold transition-all group"
              >
                <div className="flex items-center gap-2.5">
                  <Instagram className="w-4 h-4 text-pink-600" />
                  <span>Instagram</span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-700 transition-colors" />
              </a>

              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-3 rounded-xl border border-slate-200/80 hover:border-emerald-300 hover:bg-emerald-50/40 text-slate-700 hover:text-slate-900 text-xs font-semibold transition-all group"
              >
                <div className="flex items-center gap-2.5">
                  <Twitter className="w-4 h-4 text-slate-800" />
                  <span>Twitter / X</span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-700 transition-colors" />
              </a>
            </div>
          </div>

          {/* Quick FAQ / Note */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs text-slate-600 space-y-1.5">
            <div className="font-bold text-slate-800">Project Timeline & Rates</div>
            <p className="leading-relaxed">
              Standard brand identity systems take 2–4 weeks; motion & 3D commercials take 1–3 weeks depending on asset complexity.
            </p>
          </div>

        </div>

        {/* RIGHT COLUMN: Interactive Inquiry Form */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 md:p-10 shadow-2xs">
            
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 mx-auto">
                  <Check className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Message Received!</h3>
                <p className="text-slate-600 text-sm max-w-md mx-auto leading-relaxed">
                  Thank you for reaching out, <strong>{formData.name || 'Friend'}</strong>. I will review your project requirements and get back to you via email shortly.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      name: '',
                      email: '',
                      projectType: 'Branding & Identity',
                      budget: '$3k - $5k',
                      message: ''
                    });
                  }}
                  className="mt-4 px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Form Header */}
                <div>
                  <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                    Project Inquiry Form
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    Fill in your details and I’ll get back to you with availability and initial thoughts.
                  </p>
                </div>

                {/* Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-name" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Your Name <span className="text-emerald-600">*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      placeholder="e.g. Elena Vance"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 text-sm text-slate-900 placeholder:text-slate-400 bg-slate-50/50"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Your Email <span className="text-emerald-600">*</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      placeholder="e.g. elena@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 text-sm text-slate-900 placeholder:text-slate-400 bg-slate-50/50"
                    />
                  </div>
                </div>

                {/* Project Category Picker */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Project Type / Category
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {projectTypes.map((type) => (
                      <button
                        type="button"
                        key={type}
                        onClick={() => setFormData({ ...formData, projectType: type })}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                          formData.projectType === type
                            ? 'bg-emerald-600 text-white shadow-2xs'
                            : 'bg-slate-50 text-slate-700 border border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Budget Range Selector */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Estimated Budget Range
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {budgetRanges.map((budget) => (
                      <button
                        type="button"
                        key={budget}
                        onClick={() => setFormData({ ...formData, budget })}
                        className={`px-3 py-2 rounded-xl text-xs font-semibold text-center transition-all cursor-pointer ${
                          formData.budget === budget
                            ? 'bg-emerald-50 text-emerald-800 border-2 border-emerald-600'
                            : 'bg-slate-50 text-slate-700 border border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {budget}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="contact-message" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Project Overview / Goals <span className="text-emerald-600">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={4}
                    placeholder="Tell me a bit about your brand, deliverables needed, timeline, or links to references..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 text-sm text-slate-900 placeholder:text-slate-400 bg-slate-50/50 resize-none"
                  />
                </div>

                {/* Submit button */}
                <button
                  id="contact-submit-btn"
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 disabled:opacity-70 text-white font-bold text-sm shadow-sm hover:shadow transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    <span className="inline-block animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Project Inquiry</span>
                    </>
                  )}
                </button>

              </form>
            )}

          </div>
        </div>

      </div>
    </section>
  );
};
