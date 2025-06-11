import React, { useState, useEffect } from 'react';
import { Heart, MessageCircle, Plus, User, Calendar, X } from 'lucide-react';
import { supabase } from '../supabaseClient';

const QuotesApp = () => {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newQuote, setNewQuote] = useState({ text: '', author: '', postedBy: '' });
  const [commentInputs, setCommentInputs] = useState({});
  const [user, setUser] = useState(null);

  // Check for user session on load
  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
    };
    getSession();

    // Set up auth listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => subscription?.unsubscribe();
  }, []);

  // Fetch quotes from Supabase
  useEffect(() => {
    const fetchQuotes = async () => {
      setLoading(true);
      try {
        // Get quotes
        const { data: quotesData, error: quotesError } = await supabase
          .from('quotes')
          .select('*')
          .order('created_at', { ascending: false });

        if (quotesError) throw quotesError;

        // For each quote, get its comments
        const quotesWithComments = await Promise.all(
          quotesData.map(async (quote) => {
            const { data: comments, error: commentsError } = await supabase
              .from('comments')
              .select('*')
              .eq('quote_id', quote.id)
              .order('created_at', { ascending: true });

            if (commentsError) throw commentsError;

            return {
              ...quote,
              comments: comments || [],
              // Format for UI compatibility
              postedBy: quote.posted_by,
              postedAt: new Date(quote.created_at).toISOString().split('T')[0],
              likes: quote.likes_count,
              liked: false // We'll manage this state locally
            };
          })
        );

        setQuotes(quotesWithComments);
      } catch (error) {
        console.error('Error fetching data:', error);
        alert('Error loading quotes. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchQuotes();
  }, []);

  // Add a new quote
  const handleAddQuote = async () => {
    if (!user) {
      alert('You must be logged in to add quotes');
      return;
    }

    if (newQuote.text && newQuote.author && newQuote.postedBy) {
      try {
        const { data, error } = await supabase
          .from('quotes')
          .insert([
            {
              text: newQuote.text,
              author: newQuote.author,
              posted_by: newQuote.postedBy,
              user_id: user.id,
              likes_count: 0
            }
          ])
          .select();

        if (error) throw error;

        // Add to local state
        const newQuoteWithFormatting = {
          ...data[0],
          comments: [],
          postedBy: data[0].posted_by,
          postedAt: new Date(data[0].created_at).toISOString().split('T')[0],
          likes: data[0].likes_count,
          liked: false
        };

        setQuotes([newQuoteWithFormatting, ...quotes]);
        setNewQuote({ text: '', author: '', postedBy: '' });
        setShowAddForm(false);
      } catch (error) {
        console.error('Error adding quote:', error);
        alert('Error adding quote. Please try again.');
      }
    }
  };

  // Toggle like on a quote
  const toggleLike = async (quoteId) => {
    // Find the quote
    const quote = quotes.find(q => q.id === quoteId);
    if (!quote) return;

    // Update local state first (optimistic update)
    const newLikeStatus = !quote.liked;
    const newLikesCount = newLikeStatus ? quote.likes + 1 : quote.likes - 1;

    setQuotes(quotes.map(q => 
      q.id === quoteId 
        ? { ...q, liked: newLikeStatus, likes: newLikesCount }
        : q
    ));

    // Update in database
    try {
      const { error } = await supabase
        .from('quotes')
        .update({ likes_count: newLikesCount })
        .eq('id', quoteId);

      if (error) throw error;
    } catch (error) {
      console.error('Error updating likes:', error);
      // Revert the optimistic update if there's an error
      setQuotes(quotes.map(q => 
        q.id === quoteId 
          ? { ...q, liked: !newLikeStatus, likes: quote.likes }
          : q
      ));
    }
  };

  // Add a comment to a quote
  const addComment = async (quoteId) => {
    const commentText = commentInputs[quoteId];
    if (!commentText) return;

    try {
      // Default username for anonymous users
      const username = user ? user.email.split('@')[0] : 'Anonymous';

      const { data, error } = await supabase
        .from('comments')
        .insert([
          {
            quote_id: quoteId,
            content: commentText,
            user_name: username,
            user_id: user?.id || null
          }
        ])
        .select();

      if (error) throw error;

      // Format the new comment for UI
      const newComment = {
        id: data[0].id,
        text: data[0].content,
        user: data[0].user_name,
        time: 'Just now',
        quote_id: data[0].quote_id
      };

      // Update the quotes state
      setQuotes(quotes.map(quote => 
        quote.id === quoteId
          ? { ...quote, comments: [...quote.comments, newComment] }
          : quote
      ));

      // Clear the comment input
      setCommentInputs({...commentInputs, [quoteId]: ''});
    } catch (error) {
      console.error('Error adding comment:', error);
      alert('Error adding comment. Please try again.');
    }
  };

  // Handle login/logout (simplified - you'll want a proper login page)
  const handleLogin = async () => {
    // This would typically be in a login form component
    const { data, error } = await supabase.auth.signInWithPassword({
      email: 'your-admin-email@example.com',
      password: 'your-password'
    });
    
    if (error) alert(error.message);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Admin controls */}
      <div className="mb-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">QuoteShare</h1>
        <div>
          {user ? (
            <div className="flex items-center gap-2">
              <span>Logged in as {user.email}</span>
              <button 
                onClick={handleLogout}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Logout
              </button>
              <button 
                onClick={() => setShowAddForm(!showAddForm)}
                className="bg-blue-500 text-white p-2 rounded-full"
              >
                <Plus size={16} />
              </button>
            </div>
          ) : (
            <button 
              onClick={handleLogin}
              className="bg-green-500 text-white px-3 py-1 rounded"
            >
              Admin Login
            </button>
          )}
        </div>
      </div>

      {/* Loading state */}
      {loading && <p className="text-center py-8">Loading quotes...</p>}

      {/* Add quote form */}
      {showAddForm && user && (
        <div className="mb-8 p-4 bg-white shadow rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">Add New Quote</h2>
            <button onClick={() => setShowAddForm(false)} className="text-gray-500">
              <X size={20} />
            </button>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Quote</label>
              <textarea
                value={newQuote.text}
                onChange={(e) => setNewQuote({...newQuote, text: e.target.value})}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                rows="3"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Author</label>
              <input
                type="text"
                value={newQuote.author}
                onChange={(e) => setNewQuote({...newQuote, author: e.target.value})}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Posted By</label>
              <input
                type="text"
                value={newQuote.postedBy}
                onChange={(e) => setNewQuote({...newQuote, postedBy: e.target.value})}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
            <button
              onClick={handleAddQuote}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            >
              Add Quote
            </button>
          </div>
        </div>
      )}

      {/* Quotes list */}
      <div className="space-y-6">
        {quotes.map(quote => (
          <div key={quote.id} className="bg-white shadow rounded-lg p-6">
            <div className="mb-4">
              <p className="text-lg font-medium mb-2">"{quote.text}"</p>
              <p className="text-gray-600">- {quote.author}</p>
            </div>
            <div className="flex items-center text-sm text-gray-500 mb-4">
              <User size={16} className="mr-1" />
              <span className="mr-4">{quote.postedBy}</span>
              <Calendar size={16} className="mr-1" />
              <span>{quote.postedAt}</span>
            </div>
            <div className="flex items-center mb-6">
              <button 
                onClick={() => toggleLike(quote.id)} 
                className={`flex items-center mr-4 ${quote.liked ? 'text-red-500' : 'text-gray-500'}`}
              >
                <Heart size={16} className="mr-1" fill={quote.liked ? "currentColor" : "none"} />
                <span>{quote.likes}</span>
              </button>
              <div className="flex items-center text-gray-500">
                <MessageCircle size={16} className="mr-1" />
                <span>{quote.comments.length}</span>
              </div>
            </div>
            {quote.comments.length > 0 && (
              <div className="mb-4">
                <h3 className="font-medium text-sm mb-2">Comments</h3>
                <div className="space-y-2">
                  {quote.comments.map(comment => (
                    <div key={comment.id} className="bg-gray-50 p-2 rounded">
                      <div className="flex justify-between">
                        <span className="font-medium text-sm">{comment.user}</span>
                        <span className="text-xs text-gray-500">{comment.time}</span>
                      </div>
                      <p className="text-sm">{comment.text || comment.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className="flex">
              <input
                type="text"
                value={commentInputs[quote.id] || ''}
                onChange={(e) => setCommentInputs({...commentInputs, [quote.id]: e.target.value})}
                placeholder="Add a comment..."
                className="flex-1 border border-gray-300 rounded-l-md p-2 text-sm"
              />
              <button
                onClick={() => addComment(quote.id)}
                className="bg-blue-500 text-white px-4 rounded-r-md hover:bg-blue-600"
              >
                Post
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuotesApp;
