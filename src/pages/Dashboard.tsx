import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { PenTool, Users, BookOpen, ArrowRight, Sparkles } from 'lucide-react'
import { supabase } from '../lib/supabase'
import type { Character, Story } from '../types/database'

export default function Dashboard() {
  const [characters, setCharacters] = useState<Character[]>([])
  const [stories, setStories] = useState<Story[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      const [charactersRes, storiesRes] = await Promise.all([
        supabase.from('characters').select('*').order('created_at', { ascending: false }).limit(4),
        supabase.from('stories').select('*').order('updated_at', { ascending: false }).limit(4),
      ])

      if (charactersRes.data) setCharacters(charactersRes.data)
      if (storiesRes.data) setStories(storiesRes.data)
      setLoading(false)
    }
    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-pulse-soft">
          <Sparkles className="w-8 h-8 text-cream-400" />
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <section className="text-center mb-16 animate-fade-in">
        <h1 className="font-serif text-5xl md:text-6xl font-semibold text-ink-900 mb-4">
          Welcome to <span className="text-rose-600">Velvette</span>
        </h1>
        <p className="text-ink-500 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          A personal writing haven where your characters come to life and stories unfold.
          Create, connect, and let your imagination flow.
        </p>
      </section>

      {/* Quick Actions */}
      <section className="grid md:grid-cols-2 gap-6 mb-16">
        <Link
          to="/characters"
          className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-rose-50 to-cream-100 p-8 border border-rose-100 hover:shadow-xl transition-all duration-300"
        >
          <div className="relative z-10">
            <div className="w-14 h-14 rounded-xl bg-rose-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Users className="w-7 h-7 text-white" />
            </div>
            <h2 className="font-serif text-2xl font-semibold text-ink-900 mb-2">
              Characters
            </h2>
            <p className="text-ink-500 mb-4">
              Create and manage your characters. Define their personalities, appearances, and relationships.
            </p>
            <div className="flex items-center gap-2 text-rose-600 font-medium">
              <span>Manage Characters</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </Link>

        <Link
          to="/stories"
          className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-sage-50 to-cream-100 p-8 border border-sage-100 hover:shadow-xl transition-all duration-300"
        >
          <div className="relative z-10">
            <div className="w-14 h-14 rounded-xl bg-sage-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <PenTool className="w-7 h-7 text-white" />
            </div>
            <h2 className="font-serif text-2xl font-semibold text-ink-900 mb-2">
              Stories
            </h2>
            <p className="text-ink-500 mb-4">
              Write and organize your stories. Connect characters, track progress, and bring narratives to life.
            </p>
            <div className="flex items-center gap-2 text-sage-600 font-medium">
              <span>View Stories</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </Link>
      </section>

      {/* Recent Activity */}
      <section className="grid md:grid-cols-2 gap-8">
        {/* Recent Characters */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-serif text-xl font-semibold text-ink-900">Recent Characters</h3>
            <Link to="/characters" className="text-sm text-rose-600 hover:text-rose-700 font-medium">
              View all
            </Link>
          </div>
          {characters.length === 0 ? (
            <div className="rounded-xl bg-cream-100 border border-cream-200 p-6 text-center">
              <Users className="w-10 h-10 text-cream-400 mx-auto mb-3" />
              <p className="text-ink-400 mb-4">No characters yet</p>
              <Link
                to="/characters"
                className="inline-flex items-center gap-2 px-4 py-2 bg-ink-900 text-cream-50 rounded-lg text-sm font-medium hover:bg-ink-800 transition-colors"
              >
                Create your first character
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {characters.map((character) => (
                <Link
                  key={character.id}
                  to={`/characters/${character.id}`}
                  className="flex items-center gap-4 p-4 rounded-xl bg-white border border-cream-200 hover:border-rose-200 hover:shadow-md transition-all group"
                >
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white font-serif text-lg font-semibold"
                    style={{ backgroundColor: character.color }}
                  >
                    {character.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-ink-900 truncate">{character.name}</p>
                    <p className="text-sm text-ink-400 truncate">
                      {character.description || 'No description'}
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-ink-300 group-hover:text-rose-500 transition-colors" />
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Recent Stories */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-serif text-xl font-semibold text-ink-900">Recent Stories</h3>
            <Link to="/stories" className="text-sm text-sage-600 hover:text-sage-700 font-medium">
              View all
            </Link>
          </div>
          {stories.length === 0 ? (
            <div className="rounded-xl bg-cream-100 border border-cream-200 p-6 text-center">
              <BookOpen className="w-10 h-10 text-cream-400 mx-auto mb-3" />
              <p className="text-ink-400 mb-4">No stories yet</p>
              <Link
                to="/stories/new"
                className="inline-flex items-center gap-2 px-4 py-2 bg-sage-600 text-white rounded-lg text-sm font-medium hover:bg-sage-700 transition-colors"
              >
                Start your first story
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {stories.map((story) => (
                <Link
                  key={story.id}
                  to={`/stories/${story.id}/edit`}
                  className="flex items-center gap-4 p-4 rounded-xl bg-white border border-cream-200 hover:border-sage-200 hover:shadow-md transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl bg-sage-100 flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-sage-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-ink-900 truncate">{story.title}</p>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        story.status === 'completed' ? 'bg-sage-100 text-sage-700' :
                        story.status === 'wip' ? 'bg-rose-100 text-rose-700' :
                        'bg-ink-100 text-ink-600'
                      }`}>
                        {story.status}
                      </span>
                      <p className="text-sm text-ink-400 truncate">{story.synopsis || 'No synopsis'}</p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-ink-300 group-hover:text-sage-500 transition-colors" />
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
