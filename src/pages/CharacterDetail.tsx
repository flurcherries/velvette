import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, Edit2, Trash2, User, Heart, Users } from 'lucide-react'
import { supabase } from '../lib/supabase'
import type { Character, Relationship } from '../types/database'

export default function CharacterDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [character, setCharacter] = useState<Character | null>(null)
  const [relationships, setRelationships] = useState<Relationship[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  useEffect(() => {
    if (id) fetchCharacter()
  }, [id])

  async function fetchCharacter() {
    const [charRes, relRes] = await Promise.all([
      supabase.from('characters').select('*').eq('id', id).maybeSingle(),
      supabase.from('relationships').select(`
        *,
        character_a:characters!relationships_character_a_id_fkey (*),
        character_b:characters!relationships_character_b_id_fkey (*)
      `).or(`character_a_id.eq.${id},character_b_id.eq.${id}`),
    ])

    if (charRes.data) setCharacter(charRes.data)
    if (relRes.data) setRelationships(relRes.data)
    setLoading(false)
  }

  async function handleDelete() {
    const { error } = await supabase.from('characters').delete().eq('id', id)
    if (!error) {
      navigate('/characters')
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-pulse-soft">
          <User className="w-8 h-8 text-cream-400" />
        </div>
      </div>
    )
  }

  if (!character) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h1 className="font-serif text-3xl text-ink-900 mb-4">Character not found</h1>
        <Link to="/characters" className="text-rose-600 hover:text-rose-700">
          Return to characters
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Back link */}
      <Link
        to="/characters"
        className="inline-flex items-center gap-2 text-ink-500 hover:text-ink-900 mb-8 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to characters
      </Link>

      {/* Header */}
      <div className="rounded-2xl bg-white border border-cream-200 overflow-hidden mb-8">
        <div className="h-3" style={{ backgroundColor: character.color }} />
        <div className="p-8">
          <div className="flex flex-col sm:flex-row gap-6">
            {/* Avatar */}
            {character.avatar_url ? (
              <img
                src={character.avatar_url}
                alt={character.name}
                className="w-32 h-32 rounded-2xl object-cover"
              />
            ) : (
              <div
                className="w-32 h-32 rounded-2xl flex items-center justify-center text-white font-serif text-5xl font-semibold"
                style={{ backgroundColor: character.color }}
              >
                {character.name.charAt(0)}
              </div>
            )}

            {/* Info */}
            <div className="flex-1">
              <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                <h1 className="font-serif text-4xl font-semibold text-ink-900">
                  {character.name}
                </h1>
                <div className="flex gap-2">
                  <button
                    onClick={() => setEditing(true)}
                    className="p-2.5 rounded-xl border border-cream-200 text-ink-500 hover:text-ink-900 hover:bg-cream-100 transition-all"
                  >
                    <Edit2 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setShowDeleteConfirm(true)}
                    className="p-2.5 rounded-xl border border-cream-200 text-ink-500 hover:text-rose-600 hover:bg-rose-50 transition-all"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {character.description && (
                <p className="text-lg text-ink-600 leading-relaxed mb-6">
                  {character.description}
                </p>
              )}

              <div className="flex flex-wrap gap-4 text-sm text-ink-400">
                <span>Created {new Date(character.created_at).toLocaleDateString()}</span>
                <span>Last updated {new Date(character.updated_at).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Details Grid */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* Personality */}
        {character.personality && (
          <div className="rounded-xl bg-white border border-cream-200 p-6">
            <h3 className="font-serif text-lg font-semibold text-ink-900 mb-3 flex items-center gap-2">
              <span className="w-6 h-6 rounded bg-rose-100 flex items-center justify-center">
                <Heart className="w-3.5 h-3.5 text-rose-600" />
              </span>
              Personality
            </h3>
            <p className="text-ink-600 whitespace-pre-wrap">{character.personality}</p>
          </div>
        )}

        {/* Appearance */}
        {character.appearance && (
          <div className="rounded-xl bg-white border border-cream-200 p-6">
            <h3 className="font-serif text-lg font-semibold text-ink-900 mb-3 flex items-center gap-2">
              <span className="w-6 h-6 rounded bg-sage-100 flex items-center justify-center">
                <User className="w-3.5 h-3.5 text-sage-600" />
              </span>
              Appearance
            </h3>
            <p className="text-ink-600 whitespace-pre-wrap">{character.appearance}</p>
          </div>
        )}
      </div>

      {/* Background */}
      {character.background && (
        <div className="rounded-xl bg-white border border-cream-200 p-6 mb-8">
          <h3 className="font-serif text-lg font-semibold text-ink-900 mb-3">Background</h3>
          <p className="text-ink-600 whitespace-pre-wrap leading-relaxed">{character.background}</p>
        </div>
      )}

      {/* Relationships */}
      {relationships.length > 0 && (
        <div className="rounded-xl bg-white border border-cream-200 p-6">
          <h3 className="font-serif text-lg font-semibold text-ink-900 mb-4 flex items-center gap-2">
            <span className="w-6 h-6 rounded bg-cream-100 flex items-center justify-center">
              <Users className="w-3.5 h-3.5 text-ink-600" />
            </span>
            Relationships
          </h3>
          <div className="space-y-3">
            {relationships.map((rel) => {
              const other = rel.character_a_id === id ? rel.character_b : rel.character_a
              if (!other) return null
              return (
                <Link
                  key={rel.id}
                  to={`/characters/${other.id}`}
                  className="flex items-center gap-4 p-3 rounded-lg hover:bg-cream-50 transition-colors"
                >
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-serif font-semibold"
                    style={{ backgroundColor: other.color }}
                  >
                    {other.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="font-medium text-ink-900">{other.name}</span>
                    <span className="text-ink-400 mx-2">-</span>
                    <span className="text-ink-500">{rel.relationship_type}</span>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editing && (
        <EditCharacterModal
          character={character}
          onClose={() => setEditing(false)}
          onSaved={() => {
            setEditing(false)
            fetchCharacter()
          }}
        />
      )}

      {/* Delete Confirmation */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink-900/50 backdrop-blur-sm">
          <div className="bg-cream-50 rounded-2xl p-6 max-w-sm w-full shadow-2xl">
            <h3 className="font-serif text-xl font-semibold text-ink-900 mb-2">Delete Character?</h3>
            <p className="text-ink-500 mb-6">
              Are you sure you want to delete {character.name}? This cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 rounded-xl border border-cream-300 text-ink-600 font-medium hover:bg-cream-100 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 rounded-xl bg-rose-600 text-white font-medium hover:bg-rose-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

interface EditCharacterModalProps {
  character: Character
  onClose: () => void
  onSaved: () => void
}

function EditCharacterModal({ character, onClose, onSaved }: EditCharacterModalProps) {
  const [name, setName] = useState(character.name)
  const [description, setDescription] = useState(character.description || '')
  const [personality, setPersonality] = useState(character.personality || '')
  const [appearance, setAppearance] = useState(character.appearance || '')
  const [background, setBackground] = useState(character.background || '')
  const [color, setColor] = useState(character.color)
  const [saving, setSaving] = useState(false)

  const colors = [
    '#D08B5A', '#E84F7C', '#5B8961', '#4A90A4', '#9B6FBF', '#D47D47', '#6B8E8E', '#A67C52'
  ]

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim()) return

    setSaving(true)
    const { error } = await supabase
      .from('characters')
      .update({
        name: name.trim(),
        description: description.trim() || null,
        personality: personality.trim() || null,
        appearance: appearance.trim() || null,
        background: background.trim() || null,
        color,
        updated_at: new Date().toISOString(),
      })
      .eq('id', character.id)

    if (!error) {
      onSaved()
    }
    setSaving(false)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink-900/50 backdrop-blur-sm">
      <div className="w-full max-w-lg bg-cream-50 rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
        <form onSubmit={handleSubmit}>
          <div className="sticky top-0 bg-cream-50 border-b border-cream-200 px-6 py-4 flex items-center justify-between">
            <h2 className="font-serif text-2xl font-semibold text-ink-900">Edit Character</h2>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-lg text-ink-400 hover:text-ink-900 hover:bg-cream-100 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="p-6 space-y-5">
            <div>
              <label className="block text-sm font-medium text-ink-700 mb-2">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-cream-200 bg-white focus:border-rose-300 focus:ring-2 focus:ring-rose-100 outline-none transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-ink-700 mb-2">Theme Color</label>
              <div className="flex gap-2 flex-wrap">
                {colors.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setColor(c)}
                    className={`w-10 h-10 rounded-xl transition-all ${color === c ? 'ring-2 ring-offset-2 ring-ink-900' : ''}`}
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-ink-700 mb-2">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={2}
                className="w-full px-4 py-3 rounded-xl border border-cream-200 bg-white focus:border-rose-300 focus:ring-2 focus:ring-rose-100 outline-none transition-all resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-ink-700 mb-2">Personality</label>
              <textarea
                value={personality}
                onChange={(e) => setPersonality(e.target.value)}
                rows={2}
                className="w-full px-4 py-3 rounded-xl border border-cream-200 bg-white focus:border-rose-300 focus:ring-2 focus:ring-rose-100 outline-none transition-all resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-ink-700 mb-2">Appearance</label>
              <textarea
                value={appearance}
                onChange={(e) => setAppearance(e.target.value)}
                rows={2}
                className="w-full px-4 py-3 rounded-xl border border-cream-200 bg-white focus:border-rose-300 focus:ring-2 focus:ring-rose-100 outline-none transition-all resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-ink-700 mb-2">Background</label>
              <textarea
                value={background}
                onChange={(e) => setBackground(e.target.value)}
                rows={3}
                className="w-full px-4 py-3 rounded-xl border border-cream-200 bg-white focus:border-rose-300 focus:ring-2 focus:ring-rose-100 outline-none transition-all resize-none"
              />
            </div>
          </div>

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
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
