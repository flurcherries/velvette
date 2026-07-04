import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus, PenTool, BookOpen, Search, CreditCard as Edit3 } from 'lucide-react'
import { supabase } from '../lib/supabase'
import type { Story } from '../types/database'

export default function Stories() {
  const [stories, setStories] = useState<Story[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')

  useEffect(() => {
    fetchStories()
  }, [])

  async function fetchStories() {
    const { data } = await supabase
      .from('stories')
      .select('*')
      .order('updated_at', { ascending: false })

    if (data) setStories(data)
    setLoading(false)
  }

  const filteredStories = stories.filter(s => {
    const matchesSearch = s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.synopsis?.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'all' || s.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const statusCounts = {
    all: stories.length,
    draft: stories.filter(s => s.status === 'draft').length,
    wip: stories.filter(s => s.status === 'wip').length,
    completed: stories.filter(s => s.status === 'completed').length,
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-pulse-soft">
          <BookOpen className="w-8 h-8 text-cream-400" />
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-serif text-4xl font-semibold text-ink-900 mb-2">Stories</h1>
          <p className="text-ink-500">Your literary works in progress</p>
        </div>
        <Link
          to="/stories/new"
          className="inline-flex items-center gap-2 px-5 py-3 bg-sage-600 text-white rounded-xl font-medium hover:bg-sage-700 transition-colors shadow-lg hover:shadow-xl"
        >
          <Plus className="w-5 h-5" />
          New Story
        </Link>
      </div>

      {/* Filters */}
      {stories.length > 0 && (
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ink-400" />
            <input
              type="text"
              placeholder="Search stories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-cream-200 bg-white focus:border-sage-300 focus:ring-2 focus:ring-sage-100 outline-none transition-all"
            />
          </div>
          <div className="flex gap-2">
            {(['all', 'draft', 'wip', 'completed'] as const).map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  statusFilter === status
                    ? 'bg-ink-900 text-cream-50'
                    : 'border border-cream-200 text-ink-600 hover:bg-cream-100'
                }`}
              >
                {status === 'all' ? 'All' : status.charAt(0).toUpperCase() + status.slice(1)}
                <span className="ml-1.5 text-xs opacity-60">({statusCounts[status]})</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Stories Grid */}
      {filteredStories.length === 0 && !loading ? (
        <div className="text-center py-16">
          <div className="w-20 h-20 rounded-2xl bg-cream-100 flex items-center justify-center mx-auto mb-6">
            <PenTool className="w-10 h-10 text-cream-400" />
          </div>
          <h3 className="font-serif text-2xl text-ink-900 mb-2">
            {searchQuery || statusFilter !== 'all' ? 'No stories found' : 'No stories yet'}
          </h3>
          <p className="text-ink-500 mb-6">
            {searchQuery || statusFilter !== 'all'
              ? 'Try adjusting your search or filters'
              : 'Start writing your first story'}
          </p>
          {!searchQuery && statusFilter === 'all' && (
            <Link
              to="/stories/new"
              className="inline-flex items-center gap-2 px-5 py-3 bg-sage-600 text-white rounded-xl font-medium hover:bg-sage-700 transition-colors"
            >
              <Plus className="w-5 h-5" />
              Create Story
            </Link>
          )}
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStories.map((story, index) => (
            <StoryCard key={story.id} story={story} index={index} />
          ))}
        </div>
      )}
    </div>
  )
}

function StoryCard({ story, index }: { story: Story; index: number }) {
  const statusColors = {
    draft: 'bg-ink-100 text-ink-600',
    wip: 'bg-rose-100 text-rose-700',
    completed: 'bg-sage-100 text-sage-700',
  }

  const statusLabels = {
    draft: 'Draft',
    wip: 'In Progress',
    completed: 'Completed',
  }

  return (
    <Link
      to={`/stories/${story.id}/edit`}
      className="group relative overflow-hidden rounded-2xl bg-white border border-cream-200 hover:border-sage-200 hover:shadow-xl transition-all duration-300 animate-fade-in"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {/* Cover or gradient */}
      <div className="h-40 bg-gradient-to-br from-sage-100 to-cream-100 relative overflow-hidden">
        {story.cover_url ? (
          <img
            src={story.cover_url}
            alt={story.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <BookOpen className="w-16 h-16 text-sage-200" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-white/50 to-transparent" />
      </div>

      <div className="p-6">
        {/* Status badge */}
        <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium mb-3 ${statusColors[story.status]}`}>
          {statusLabels[story.status]}
        </span>

        <h3 className="font-serif text-xl font-semibold text-ink-900 mb-2 group-hover:text-sage-700 transition-colors line-clamp-2">
          {story.title}
        </h3>

        {story.synopsis && (
          <p className="text-ink-500 text-sm line-clamp-2 mb-4">
            {story.synopsis}
          </p>
        )}

        {/* Meta */}
        <div className="flex items-center justify-between text-xs text-ink-400">
          <span>Updated {new Date(story.updated_at).toLocaleDateString()}</span>
          <span className="flex items-center gap-1 text-sage-600 font-medium group-hover:gap-2 transition-all">
            <Edit3 className="w-3.5 h-3.5" />
            <span>Edit</span>
          </span>
        </div>
      </div>
    </Link>
  )
}
