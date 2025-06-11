import React, { useState } from 'react';
import { Heart, MessageCircle, Plus, User, Calendar, X } from 'lucide-react';

const QuotesApp = () => {
  const [quotes, setQuotes] = useState([
    {
      id: 1,
      text: "The only way to do great work is to love what you do.",
      author: "Steve Jobs",
      postedBy: "Alex Johnson",
      postedAt: "2024-06-10",
      likes: 12,
      comments: [
        { id: 1, user: "Sarah", text: "This really resonates with me!", time: "2h ago" },
        { id: 2, user: "Mike", text: "So true! Passion is everything.", time: "4h ago" }
      ],
      liked: false
    },
    {
      id: 2,
      text: "Innovation distinguishes between a leader and a follower.",
      author: "Steve Jobs",
      postedBy: "Maria Garcia",
      postedAt: "2024-06-09",
      likes: 8,
      comments: [
        { id: 3, user: "John", text: "Leadership mindset right here!", time: "1d ago" }
      ],
      liked: true
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newQuote, setNewQuote] = useState({ text: '', author: '', postedBy: '' });
  const [commentInputs, setCommentInputs] = useState({});

  const handleAddQuote = () => {
    if (newQuote.text && newQuote.author && newQuote.postedBy) {
      const quote = {
        id: quotes.length + 1,
        text: newQuote.text,
        author: newQuote.author,
        postedBy: newQuote.postedBy,
        postedAt: new Date().toISOString().split('T')[0],
        likes: 0,
        comments: [],
        liked: false
      };
      setQuotes([quote, ...quotes]);
      setNewQuote({ text: '', author: '', postedBy: '' });
      setShowAddForm(false);
    }
  };

  const toggleLike = (quoteId) => {
    setQuotes(quotes.map(quote => 
      quote.id === quoteId 
        ? { ...quote, liked: !quote.liked, likes: quote.liked ? quote.likes - 1 : quote.likes + 1 }
        : quote
    ));
  };

  const addComment = (quoteId) => {
    const commentText = commentInputs[quoteId];
    if (commentText?.trim()) {
      const newComment = {
        id: Date.now(),
        user: "You",
        text: commentText.trim(),
        time: "now"
      };
      
      setQuotes(quotes.map(quote => 
        quote.id === quoteId 
          ? { ...quote, comments: [...quote.comments, newComment] }
          : quote
      ));
      
      setCommentInputs({ ...commentInputs, [quoteId]: '' });
    }
  };

  const handleCommentInputChange = (quoteId, value) => {
    setCommentInputs({ ...commentInputs, [quoteId]: value });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">QuoteShare</h1>
          <p className="text-gray-600">Share inspiring quotes and connect through comments</p>
        </div>

        {/* Add Quote Button */}
        <div className="mb-6">
          <button
            onClick={() => setShowAddForm(true)}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2"
          >
            <Plus size={20} />
            Share a Quote
          </button>
        </div>

        {/* Add Quote Modal */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl p-6 w-full max-w-md">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800">Add New Quote</h2>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={24} />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Quote</label>
                  <textarea
                    value={newQuote.text}
                    onChange={(e) => setNewQuote({ ...newQuote, text: e.target.value })}
                    placeholder="Enter the quote..."
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                    rows="3"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Author</label>
                  <input
                    type="text"
                    value={newQuote.author}
                    onChange={(e) => setNewQuote({ ...newQuote, author: e.target.value })}
                    placeholder="Quote author"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
                  <input
                    type="text"
                    value={newQuote.postedBy}
                    onChange={(e) => setNewQuote({ ...newQuote, postedBy: e.target.value })}
                    placeholder="Your name"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => setShowAddForm(false)}
                    className="flex-1 py-2 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddQuote}
                    className="flex-1 py-2 px-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:shadow-lg transition-shadow"
                  >
                    Post Quote
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Quotes Feed */}
        <div className="space-y-6">
          {quotes.map((quote) => (
            <div key={quote.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
              {/* Quote Header */}
              <div className="p-6 pb-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-blue-400 rounded-full flex items-center justify-center">
                    <User size={20} className="text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">{quote.postedBy}</p>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Calendar size={14} />
                      {quote.postedAt}
                    </div>
                  </div>
                </div>
                
                {/* Quote Content */}
                <blockquote className="text-lg text-gray-700 mb-2 italic leading-relaxed">
                  "{quote.text}"
                </blockquote>
                <p className="text-right text-gray-600 font-medium">— {quote.author}</p>
              </div>

              {/* Actions */}
              <div className="px-6 pb-4">
                <div className="flex items-center gap-6">
                  <button
                    onClick={() => toggleLike(quote.id)}
                    className={`flex items-center gap-2 transition-colors ${
                      quote.liked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
                    }`}
                  >
                    <Heart size={20} fill={quote.liked ? 'currentColor' : 'none'} />
                    <span className="font-medium">{quote.likes}</span>
                  </button>
                  
                  <div className="flex items-center gap-2 text-gray-500">
                    <MessageCircle size={20} />
                    <span className="font-medium">{quote.comments.length}</span>
                  </div>
                </div>
              </div>

              {/* Comments Section */}
              {quote.comments.length > 0 && (
                <div className="border-t border-gray-100 px-6 py-4">
                  <div className="space-y-3">
                    {quote.comments.map((comment) => (
                      <div key={comment.id} className="flex gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-gray-400 to-gray-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <User size={14} className="text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="bg-gray-50 rounded-lg p-3">
                            <p className="font-semibold text-sm text-gray-800">{comment.user}</p>
                            <p className="text-gray-700">{comment.text}</p>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">{comment.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Comment Input */}
              <div className="border-t border-gray-100 p-4">
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-400 rounded-full flex items-center justify-center flex-shrink-0">
                    <User size={14} className="text-white" />
                  </div>
                  <div className="flex-1 flex gap-2">
                    <input
                      type="text"
                      value={commentInputs[quote.id] || ''}
                      onChange={(e) => handleCommentInputChange(quote.id, e.target.value)}
                      placeholder="Write a comment..."
                      className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      onKeyPress={(e) => e.key === 'Enter' && addComment(quote.id)}
                    />
                    <button
                      onClick={() => addComment(quote.id)}
                      className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:shadow-lg transition-shadow"
                    >
                      Post
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {quotes.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageCircle size={40} className="text-gray-400" />
            </div>
            <p className="text-gray-500 text-lg">No quotes yet. Be the first to share!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuotesApp;
