'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BlogPost, getAllBlogPosts, saveBlogPosts } from '@/data/blogData';
import { 
  BookOpen, Plus, Search, Edit3, Trash2, ExternalLink, 
  Calendar, Clock, User, Tag, HelpCircle, X, CheckCircle2, 
  Sparkles, FileText, ArrowRight 
} from 'lucide-react';

export default function BlogsTab() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSlug, setEditingSlug] = useState<string | null>(null);

  // Form State
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [publishedDate, setPublishedDate] = useState(new Date().toISOString().split('T')[0]);
  const [author, setAuthor] = useState('Shri Shyam Editorial Team');
  const [readTime, setReadTime] = useState('5 min read');
  const [excerpt, setExcerpt] = useState('');
  const [category, setCategory] = useState('Buying Guide');
  const [image, setImage] = useState('/images/luxury_builder_floor_dwarka_1786010981126.png');
  const [contentHtml, setContentHtml] = useState('');
  const [tagsInput, setTagsInput] = useState('Dwarka Real Estate, Builder Floors, Property Guide');
  const [faqs, setFaqs] = useState<{ question: string; answer: string }[]>([
    { question: '', answer: '' }
  ]);

  const [notification, setNotification] = useState<string | null>(null);

  const loadBlogs = () => {
    setBlogs(getAllBlogPosts());
  };

  useEffect(() => {
    loadBlogs();
    const handleStorage = () => loadBlogs();
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 4000);
  };

  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
    if (!editingSlug) {
      const generatedSlug = newTitle
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      setSlug(generatedSlug);
      setMetaTitle(`${newTitle} | Shri Shyam Associate`);
    }
  };

  const openCreateModal = () => {
    setEditingSlug(null);
    setTitle('');
    setSlug('');
    setMetaTitle('');
    setMetaDescription('');
    setPublishedDate(new Date().toISOString().split('T')[0]);
    setAuthor('Shri Shyam Editorial Team');
    setReadTime('5 min read');
    setExcerpt('');
    setCategory('Buying Guide');
    setImage('/images/luxury_builder_floor_dwarka_1786010981126.png');
    setContentHtml(`<h2>Key Real Estate Insights in Dwarka</h2>
<p>Write your detailed guide here. Include specific advice on builder floors, pricing, connectivity, and legal checks.</p>
<h2>Important Considerations for Homebuyers</h2>
<ul>
  <li>Freehold registry and DDA conveyance deed check</li>
  <li>Dedicated stilt parking and automatic lift access</li>
  <li>Proximity to metro stations and local markets</li>
</ul>`);
    setTagsInput('Dwarka Real Estate, Builder Floors, Buying Guide');
    setFaqs([
      { question: 'What is the average price of builder floors in Dwarka?', answer: 'In prime sectors like 6, 7, and 23, 3 BHK builder floors start from ₹1.25 Crore.' }
    ]);
    setIsModalOpen(true);
  };

  const openEditModal = (post: BlogPost) => {
    setEditingSlug(post.slug);
    setTitle(post.title);
    setSlug(post.slug);
    setMetaTitle(post.metaTitle || post.title);
    setMetaDescription(post.metaDescription || post.excerpt);
    setPublishedDate(post.publishedDate || new Date().toISOString().split('T')[0]);
    setAuthor(post.author || 'Shri Shyam Editorial Team');
    setReadTime(post.readTime || '5 min read');
    setExcerpt(post.excerpt || '');
    setCategory(post.category || 'Buying Guide');
    setImage(post.image || '/images/luxury_builder_floor_dwarka_1786010981126.png');
    setContentHtml(post.contentHtml || '');
    setTagsInput(post.tags ? post.tags.join(', ') : 'Dwarka Real Estate');
    setFaqs(post.faqs && post.faqs.length > 0 ? post.faqs : [{ question: '', answer: '' }]);
    setIsModalOpen(true);
  };

  const handleSaveBlog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !slug.trim()) {
      alert('Please provide Title and URL Slug');
      return;
    }

    const currentBlogs = getAllBlogPosts();
    const cleanTags = tagsInput.split(',').map(t => t.trim()).filter(Boolean);
    const cleanFaqs = faqs.filter(f => f.question.trim() && f.answer.trim());

    const newBlogObj: BlogPost = {
      title: title.trim(),
      slug: slug.trim().toLowerCase(),
      metaTitle: metaTitle.trim() || `${title.trim()} | Shri Shyam Associate`,
      metaDescription: metaDescription.trim() || excerpt.trim(),
      publishedDate,
      author: author.trim(),
      readTime: readTime.trim(),
      excerpt: excerpt.trim(),
      category: category.trim(),
      image: image.trim() || '/images/luxury_builder_floor_dwarka_1786010981126.png',
      contentHtml: contentHtml.trim(),
      tags: cleanTags,
      faqs: cleanFaqs
    };

    let updatedList: BlogPost[];
    if (editingSlug) {
      updatedList = currentBlogs.map(b => (b.slug === editingSlug ? newBlogObj : b));
      showNotification(`Article "${title}" updated successfully!`);
    } else {
      // Check for duplicate slug
      if (currentBlogs.some(b => b.slug === newBlogObj.slug)) {
        alert('A blog with this URL slug already exists. Please choose a unique slug.');
        return;
      }
      updatedList = [newBlogObj, ...currentBlogs];
      showNotification(`Article "${title}" created and published!`);
    }

    saveBlogPosts(updatedList);
    setBlogs(updatedList);
    setIsModalOpen(false);
  };

  const handleDeleteBlog = (blogSlug: string, blogTitle: string) => {
    if (confirm(`Are you sure you want to delete "${blogTitle}"?`)) {
      const currentBlogs = getAllBlogPosts();
      const updated = currentBlogs.filter(b => b.slug !== blogSlug);
      saveBlogPosts(updated);
      setBlogs(updated);
      showNotification(`Article deleted successfully.`);
    }
  };

  const addFaqField = () => {
    setFaqs([...faqs, { question: '', answer: '' }]);
  };

  const updateFaqField = (index: number, field: 'question' | 'answer', value: string) => {
    const updated = [...faqs];
    updated[index][field] = value;
    setFaqs(updated);
  };

  const removeFaqField = (index: number) => {
    setFaqs(faqs.filter((_, i) => i !== index));
  };

  // Filtered List
  const filteredBlogs = blogs.filter(b => {
    const matchesSearch = 
      b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.excerpt.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = selectedCategory === 'All' || b.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const categories = ['All', ...Array.from(new Set(blogs.map(b => b.category)))];

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-emerald-600 text-white font-bold text-xs shadow-2xl flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* Top Banner & Stats */}
      <div className="bg-white p-5 sm:p-7 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-teal-700 text-xs font-bold uppercase tracking-wider mb-2 border border-teal-200">
            <BookOpen className="w-3.5 h-3.5" />
            <span>SEO & Content Management</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
            Real Estate Blog & Buying Guides Manager
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Create, edit and manage SEO buying guides, price trend articles, and legal checklists.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="btn-teal px-5 py-3 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 shadow-lg hover:scale-105 transition-all shrink-0 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Write New Article</span>
        </button>
      </div>

      {/* Stats Counter Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Articles</span>
          <span className="text-xl sm:text-2xl font-black text-slate-800">{blogs.length}</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-[10px] uppercase font-bold text-teal-600 block">Published Active</span>
          <span className="text-xl sm:text-2xl font-black text-teal-700">{blogs.length}</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Categories</span>
          <span className="text-xl sm:text-2xl font-black text-slate-800">{categories.length - 1}</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-[10px] uppercase font-bold text-emerald-600 block">Schema Verified</span>
          <span className="text-xl sm:text-2xl font-black text-emerald-600">100%</span>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search blogs by title, keywords or category..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full bg-slate-50 text-slate-800 text-xs pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-teal-500 focus:outline-none transition-colors"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          <span className="text-xs font-bold text-slate-500 uppercase whitespace-nowrap">Category:</span>
          <select
            value={selectedCategory}
            onChange={e => setSelectedCategory(e.target.value)}
            className="bg-slate-50 text-slate-800 text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 focus:border-teal-500 focus:outline-none cursor-pointer"
          >
            {categories.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Blog Cards & Table Grid */}
      {filteredBlogs.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm">
          <BookOpen className="w-12 h-12 text-teal-400/40 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800">No blog articles match your search</h3>
          <p className="text-xs text-slate-500 mt-1 mb-4">Try clearing your filters or create a new article.</p>
          <button
            onClick={openCreateModal}
            className="btn-teal text-xs px-4 py-2 rounded-xl font-bold inline-flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Write New Article</span>
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredBlogs.map((blog) => (
            <div
              key={blog.slug}
              className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-sm hover:border-teal-300 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              {/* Left: Thumbnail & Info */}
              <div className="flex items-start gap-4 flex-1 min-w-0">
                <div className="relative w-20 h-16 sm:w-24 sm:h-20 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                  <Image
                    src={blog.image || '/images/luxury_builder_floor_dwarka_1786010981126.png'}
                    alt={blog.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-teal-50 text-teal-700 border border-teal-200">
                      {blog.category}
                    </span>
                    <span className="text-[11px] text-slate-400 flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-teal-500" />
                      {blog.publishedDate}
                    </span>
                    <span className="text-[11px] text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-teal-500" />
                      {blog.readTime}
                    </span>
                  </div>

                  <h3 className="text-sm sm:text-base font-bold text-slate-900 truncate leading-snug">
                    {blog.title}
                  </h3>

                  <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                    {blog.excerpt}
                  </p>

                  <div className="text-[11px] text-slate-400 font-mono mt-1">
                    URL: <span className="text-teal-600">/blog/{blog.slug}</span>
                  </div>
                </div>
              </div>

              {/* Right: Actions */}
              <div className="flex items-center gap-2 self-end md:self-center shrink-0">
                <Link
                  href={`/blog/${blog.slug}`}
                  target="_blank"
                  className="p-2.5 rounded-xl bg-slate-50 hover:bg-teal-50 text-slate-600 hover:text-teal-700 border border-slate-200 transition-colors text-xs font-semibold flex items-center gap-1.5"
                  title="Preview Live Article"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-teal-600" />
                  <span className="hidden sm:inline">Preview</span>
                </Link>

                <button
                  onClick={() => openEditModal(blog)}
                  className="p-2.5 rounded-xl bg-slate-50 hover:bg-amber-50 text-slate-600 hover:text-amber-700 border border-slate-200 transition-colors text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                  title="Edit Article"
                >
                  <Edit3 className="w-3.5 h-3.5 text-amber-600" />
                  <span className="hidden sm:inline">Edit</span>
                </button>

                <button
                  onClick={() => handleDeleteBlog(blog.slug, blog.title)}
                  className="p-2.5 rounded-xl bg-slate-50 hover:bg-rose-50 text-slate-600 hover:text-rose-600 border border-slate-200 transition-colors text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                  title="Delete Article"
                >
                  <Trash2 className="w-3.5 h-3.5 text-rose-500" />
                  <span className="hidden sm:inline">Delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* CREATE / EDIT ARTICLE MODAL (Mobile Responsive Full-Screen Dialog) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-6 max-h-[92vh] flex flex-col">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-teal-600 via-teal-500 to-cyan-600 text-white p-4 sm:p-6 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-white/20">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold">
                    {editingSlug ? 'Edit Blog Article' : 'Write & Publish New Article'}
                  </h3>
                  <p className="text-xs text-teal-100">Rich SEO guide with structured FAQs and JSON-LD schema</p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form Body */}
            <form onSubmit={handleSaveBlog} className="p-4 sm:p-6 space-y-5 overflow-y-auto flex-1">
              {/* Title & Slug */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Article Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Best Sectors to Buy Luxury Builder Floors in Dwarka"
                    value={title}
                    onChange={e => handleTitleChange(e.target.value)}
                    className="w-full bg-slate-50 text-slate-800 text-xs sm:text-sm font-semibold p-3 rounded-xl border border-slate-200 focus:border-teal-500 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      URL Slug *
                    </label>
                    <div className="flex items-center bg-slate-50 rounded-xl border border-slate-200 overflow-hidden">
                      <span className="text-xs text-slate-400 pl-3 pr-1 font-mono">/blog/</span>
                      <input
                        type="text"
                        required
                        placeholder="best-sectors-dwarka"
                        value={slug}
                        onChange={e => setSlug(e.target.value)}
                        className="w-full bg-transparent text-slate-800 text-xs p-3 focus:outline-none font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Category
                    </label>
                    <select
                      value={category}
                      onChange={e => setCategory(e.target.value)}
                      className="w-full bg-slate-50 text-slate-800 text-xs p-3 rounded-xl border border-slate-200 focus:border-teal-500 focus:outline-none cursor-pointer"
                    >
                      <option value="Buying Guide">Buying Guide</option>
                      <option value="Legal & Advice">Legal & Advice</option>
                      <option value="Property Comparison">Property Comparison</option>
                      <option value="Market Trends">Market Trends</option>
                      <option value="Dwarka News">Dwarka News</option>
                      <option value="Home Construction">Home Construction</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Meta & Excerpt */}
              <div className="space-y-4 pt-4 border-t border-slate-100">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Author
                    </label>
                    <input
                      type="text"
                      value={author}
                      onChange={e => setAuthor(e.target.value)}
                      className="w-full bg-slate-50 text-slate-800 text-xs p-3 rounded-xl border border-slate-200 focus:border-teal-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Read Time
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., 6 min read"
                      value={readTime}
                      onChange={e => setReadTime(e.target.value)}
                      className="w-full bg-slate-50 text-slate-800 text-xs p-3 rounded-xl border border-slate-200 focus:border-teal-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Published Date
                    </label>
                    <input
                      type="date"
                      value={publishedDate}
                      onChange={e => setPublishedDate(e.target.value)}
                      className="w-full bg-slate-50 text-slate-800 text-xs p-3 rounded-xl border border-slate-200 focus:border-teal-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Featured Image URL
                  </label>
                  <input
                    type="text"
                    placeholder="/images/luxury_builder_floor_dwarka_1786010981126.png"
                    value={image}
                    onChange={e => setImage(e.target.value)}
                    className="w-full bg-slate-50 text-slate-800 text-xs p-3 rounded-xl border border-slate-200 focus:border-teal-500 focus:outline-none font-mono"
                  />
                  <div className="flex flex-wrap gap-2 mt-2">
                    {[
                      { name: 'Luxury Floor', url: '/images/luxury_builder_floor_dwarka_1786010981126.png' },
                      { name: 'Society Flat', url: '/images/dwarka_society_flat_1786010993235.png' },
                      { name: 'Penthouse', url: '/images/luxury_penthouse_interior_1786011006488.png' },
                      { name: '3D Villa', url: '/images/hero_luxury_villa_3d.png' },
                    ].map(preset => (
                      <button
                        key={preset.name}
                        type="button"
                        onClick={() => setImage(preset.url)}
                        className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-teal-50 text-slate-600 hover:text-teal-700 text-[11px] font-semibold transition-colors cursor-pointer border border-slate-200/60"
                      >
                        {preset.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Article Summary / Excerpt *
                  </label>
                  <textarea
                    required
                    rows={2}
                    placeholder="Short engaging summary displayed on blog cards and search snippets..."
                    value={excerpt}
                    onChange={e => setExcerpt(e.target.value)}
                    className="w-full bg-slate-50 text-slate-800 text-xs p-3 rounded-xl border border-slate-200 focus:border-teal-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Article Body Content (HTML / Markdown) */}
              <div className="space-y-2 pt-4 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Article Content (HTML / Text) *
                  </label>
                  <span className="text-[11px] text-teal-600 font-semibold">Supports &lt;h2&gt;, &lt;p&gt;, &lt;ul&gt;, &lt;li&gt;, &lt;strong&gt;</span>
                </div>
                <textarea
                  required
                  rows={10}
                  value={contentHtml}
                  onChange={e => setContentHtml(e.target.value)}
                  className="w-full bg-slate-50 text-slate-800 text-xs sm:text-sm font-mono p-3.5 rounded-xl border border-slate-200 focus:border-teal-500 focus:outline-none leading-relaxed"
                />
              </div>

              {/* Dynamic FAQs Section */}
              <div className="space-y-3 pt-4 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Article FAQs (Generates Google FAQ Schema)
                    </label>
                    <p className="text-[11px] text-slate-400">Add common questions asked by property buyers</p>
                  </div>
                  <button
                    type="button"
                    onClick={addFaqField}
                    className="px-3 py-1.5 rounded-xl bg-teal-50 text-teal-700 hover:bg-teal-100 text-xs font-bold transition-colors cursor-pointer"
                  >
                    + Add Question
                  </button>
                </div>

                <div className="space-y-3">
                  {faqs.map((faq, index) => (
                    <div key={index} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2 relative">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[11px] font-bold text-teal-600">Question #{index + 1}</span>
                        {faqs.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeFaqField(index)}
                            className="text-[11px] text-rose-500 hover:underline cursor-pointer"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                      <input
                        type="text"
                        placeholder="e.g., Which sector has the best schools in Dwarka?"
                        value={faq.question}
                        onChange={e => updateFaqField(index, 'question', e.target.value)}
                        className="w-full bg-white text-slate-800 text-xs p-2.5 rounded-lg border border-slate-200 focus:border-teal-500 focus:outline-none"
                      />
                      <textarea
                        rows={2}
                        placeholder="e.g., Dwarka Sector 6 and 7 have premier schools like Mount Carmel and DAV."
                        value={faq.answer}
                        onChange={e => updateFaqField(index, 'answer', e.target.value)}
                        className="w-full bg-white text-slate-800 text-xs p-2.5 rounded-lg border border-slate-200 focus:border-teal-500 focus:outline-none"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Tags Input */}
              <div className="space-y-1 pt-4 border-t border-slate-100">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Tags (Comma separated)
                </label>
                <input
                  type="text"
                  placeholder="Dwarka Real Estate, Sector 7, Builder Floor, Freehold"
                  value={tagsInput}
                  onChange={e => setTagsInput(e.target.value)}
                  className="w-full bg-slate-50 text-slate-800 text-xs p-3 rounded-xl border border-slate-200 focus:border-teal-500 focus:outline-none"
                />
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3 sticky bottom-0 bg-white py-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-teal px-6 py-2.5 rounded-xl font-extrabold text-xs shadow-md hover:scale-105 transition-all cursor-pointer"
                >
                  {editingSlug ? 'Save Changes' : 'Publish Article'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
