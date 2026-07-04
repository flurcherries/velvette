import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Users, Search, ArrowRight } from 'lucide-react'
import { supabase } from '../lib/supabase'
import type { Character } from '../types/database'

export default function Characters() {
  const [characters, setCharacters] = useState<Character[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [showCreateModal, setShowCreateModal] = useState(false)

  useEffect(() => {
    fetchCharacters()
  }, [])

  async function fetchCharacters() {
    const { data } = await supabase
      .from('characters')
      .select('*')
      .order('created_at', { ascending: false })

    if (data) setCharacters(data)
    setLoading(false)
  }

  const filteredCharacters = characters.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.description?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-pulse-soft">
          <Users className="w-8 h-8 text-cream-400" />
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-serif text-4xl font-semibold text-ink-900 mb-2">Characters</h1>
          <p className="text-ink-500">Bring your characters to life</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="inline-flex items-center gap-2 px-5 py-3 bg-ink-900 text-cream-50 rounded-xl font-medium hover:bg-ink-800 transition-colors shadow-lg hover:shadow-xl"
        >
          <Plus className="w-5 h-5" />
          New Character
        </button>
      </div>

      {/* Search */}
      {characters.length > 0 && (
        <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ink-400" />
          <input
            type="text"
            placeholder="Search characters..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-cream-200 bg-white focus:border-rose-300 focus:ring-2 focus:ring-rose-100 outline-none transition-all"
          />
        </div>
      )}

      {/* Characters Grid */}
      {filteredCharacters.length === 0 && !loading ? (
        <div className="text-center py-16">
          <div className="w-20 h-20 rounded-2xl bg-cream-100 flex items-center justify-center mx-auto mb-6">
            <Users className="w-10 h-10 text-cream-400" />
          </div>
          <h3 className="font-serif text-2xl text-ink-900 mb-2">
            {searchQuery ? 'No characters found' : 'No characters yet'}
          </h3>
          <p className="text-ink-500 mb-6">
            {searchQuery
              ? 'Try a different search term'
              : 'Create your first character to get started'}
          </p>
          {!searchQuery && (
            <button
              onClick={() => setShowCreateModal(true)}
              className="inline-flex items-center gap-2 px-5 py-3 bg-rose-500 text-white rounded-xl font-medium hover:bg-rose-600 transition-colors"
            >
              <Plus className="w-5 h-5" />
              Create Character
            </button>
          )}
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCharacters.map((character, index) => (
            <Link
              key={character.id}
              to={`/characters/${character.id}`}
              className="group relative overflow-hidden rounded-2xl bg-white border border-cream-200 hover:border-rose-200 hover:shadow-xl transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {/* Color accent */}
              <div
                className="h-2"
                style={{ backgroundColor: character.color }}
              />

              <div className="p-6">
                {/* Avatar */}
                <div className="flex items-start gap-4 mb-4">
                  {character.avatar_url ? (
                    <img
                      src={character.avatar_url}
                      alt={character.name}
                      className="w-16 h-16 rounded-xl object-cover"
                    />
                  ) : (
                    <div
                      className="w-16 h-16 rounded-xl flex items-center justify-center text-white font-serif text-2xl font-semibold"
                      style={{ backgroundColor: character.color }}
                    >
                      {character.name.charAt(0)}
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-serif text-xl font-semibold text-ink-900 truncate group-hover:text-rose-600 transition-colors">
                      {character.name}
                    </h3>
                    {character.personality && (
                      <p className="text-sm text-ink-400 truncate mt-1">
                        {character.personality.split(',')[0]}
                      </p>
                    )}
                  </div>
                </div>

                {/* Description */}
                {character.description && (
                  <p className="text-ink-600 text-sm line-clamp-3 mb-4">
                    {character.description}
                  </p>
                )}

                {/* View link */}
                <div className="flex items-center gap-2 text-rose-500 text-sm font-medium">
                  <span>View details</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Create Modal */}
      {showCreateModal && (
        <CreateCharacterModal
          onClose={() => setShowCreateModal(false)}
          onCreated={() => {
            setShowCreateModal(false)
            fetchCharacters()
          }}
        />
      )}
    </div>
  )
}

interface CreateCharacterModalProps {
  onClose: () => void
  onCreated: () => void
}

function CreateCharacterModal({ onClose, onCreated }: CreateCharacterModalProps) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [personality, setPersonality] = useState('')
  const [appearance, setAppearance] = useState('')
  const [background, setBackground] = useState('')
  const [color, setColor] = useState('#D08B5A')
  const [saving, setSaving] = useState(false)

  const colors = [
    '#D08B5A', '#E84F7C', '#5B8961', '#4A90A4', '#9B6FBF', '#D47D47', '#6B8E8E', '#A67C52'
  ]

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim()) return

    setSaving(true)
    const { error } = await supabase.from('characters').insert({
      name: name.trim(),
      description: description.trim() || null,
      personality: personality.trim() || null,
      appearance: appearance.trim() || null,
      background: background.trim() || null,
      color,
    })

    if (!error) {
      onCreated()
    }
    setSaving(false)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink-900/50 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-lg bg-cream-50 rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
        <form onSubmit={handleSubmit}>
          {/* Header */}
          <div className="sticky top-0 bg-cream-50 border-b border-cream-200 px-6 py-4 flex items-center justify-between">
            <h2 className="font-serif text-2xl font-semibold text-ink-900">New Character</h2>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-lg text-ink-400 hover:text-ink-900 hover:bg-cream-100 transition-colors"
            >
              <span className="sr-only">Close</span>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Body */}
          <div className="p-6 space-y-5">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-ink-700 mb-2">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Character name..."
                className="w-full px-4 py-3 rounded-xl border border-cream-200 bg-white focus:border-rose-300 focus:ring-2 focus:ring-rose-100 outline-none transition-all"
                required
              />
            </div>

            {/* Color */}
            <div>
              <label className="block text-sm font-medium text-ink-700 mb-2">Theme Color</label>
              <div className="flex gap-2 flex-wrap">
                {colors.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setColor(c)}
                    className={`w-10 h-10 rounded-xl transition-all ${
                      color === c ? 'ring-2 ring-offset-2 ring-ink-900' : ''
                    }`}
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-ink-700 mb-2">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Brief description or bio..."
                rows={2}
                className="w-full px-4 py-3 rounded-xl border border-cream-200 bg-white focus:border-rose-300 focus:ring-2 focus:ring-rose-100 outline-none transition-all resize-none"
              />
            </div>

            {/* Personality */}
            <div>
              <label className="block text-sm font-medium text-ink-700 mb-2">Personality</label>
              <textarea
                value={personality}
                onChange={(e) => setPersonality(e.target.value)}
                placeholder="Traits, quirks, mannerisms..."
                rows={2}
                className="w-full px-4 py-3 rounded-xl border border-cream-200 bg-white focus:border-rose-300 focus:ring-2 focus:ring-rose-100 outline-none transition-all resize-none"
              />
            </div>

            {/* Appearance */}
            <div>
              <label className="block text-sm font-medium text-ink-700 mb-2">Appearance</label>
              <textarea
                value={appearance}
                onChange={(e) => setAppearance(e.target.value)}
                placeholder="Physical characteristics..."
                rows={2}
                className="w-full px-4 py-3 rounded-xl border border-cream-200 bg-white focus:border-rose-300 focus:ring-2 focus:ring-rose-100 outline-none transition-all resize-none"
              />
            </div>

            {/* Background */}
            <div>
              <label className="block text-sm font-medium text-ink-700 mb-2">Background</label>
              <textarea
                value={background}
                onChange={(e) => setBackground(e.target.value)}
                placeholder="Backstory, origin..."
                rows={3}
                className="w-full px-4 py-3 rounded-xl border border-cream-200 bg-white focus:border-rose-300 focus:ring-2 focus:ring-rose-100 outline-none transition-all resize-none"
              />
            </div>
          </div>

          {/* Footer */}
          <div className="sticky bottom-0 bg-cream-50 border-t border-cream-200 px-6 py-4 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-cream-300 text-ink-600 font-medium hover:bg-cream-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving || !name.trim()}
              className="px-5 py-2.5 rounded-xl bg-ink-900 text-cream-50 font-medium hover:bg-ink-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {saving ? 'Creating...' : 'Create Character'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
