import { useEffect, useState, useCallback } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import {
  ArrowLeft, Save, Trash2, Settings, Users,
  Bold, Italic, List, ListOrdered, Quote, Minus
} from 'lucide-react'
import { supabase } from '../lib/supabase'
import type { Story, Character, StoryCharacter } from '../types/database'

interface StoryEditorProps {
  readonly?: boolean
}

export default function StoryEditor({ readonly = false }: StoryEditorProps) {
  const { id } = useParams()
  const navigate = useNavigate()
  const isNew = id === 'new' || !id

  const [story, setStory] = useState<Story | null>(null)
  const [characters, setCharacters] = useState<Character[]>([])
  const [storyCharacters, setStoryCharacters] = useState<StoryCharacter[]>([])
  const [loading, setLoading] = useState(!isNew)
  const [saving, setSaving] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [showCharacterPanel, setShowCharacterPanel] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  // Form state
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [synopsis, setSynopsis] = useState('')
  const [status, setStatus] = useState<Story['status']>('draft')

  // Load story and characters
  useEffect(() => {
    if (!isNew && id) {
      loadStory()
    }
    loadCharacters()
  }, [id, isNew])

  async function loadStory() {
    const [storyRes, charsRes] = await Promise.all([
      supabase.from('stories').select('*').eq('id', id).maybeSingle(),
      supabase.from('story_characters').select('*, character:characters(*)').eq('story_id', id),
    ])

    if (storyRes.data) {
      setStory(storyRes.data)
      setTitle(storyRes.data.title)
      setContent(storyRes.data.content || '')
      setSynopsis(storyRes.data.synopsis || '')
      setStatus(storyRes.data.status)
    }
    if (charsRes.data) {
      setStoryCharacters(charsRes.data as StoryCharacter[])
    }
    setLoading(false)
  }

  async function loadCharacters() {
    const { data } = await supabase.from('characters').select('*').order('name')
    if (data) setCharacters(data)
  }

  // Auto-save
  const saveStory = useCallback(async () => {
    if (readonly || !title.trim()) return

    setSaving(true)
    const storyData = {
      title: title.trim(),
      content,
      synopsis: synopsis.trim() || null,
      status,
      updated_at: new Date().toISOString(),
    }

    if (isNew) {
      const { data, error } = await supabase
        .from('stories')
        .insert(storyData)
        .select()
        .maybeSingle()

      if (data && !error) {
        setStory(data)
        navigate(`/stories/${data.id}/edit`, { replace: true })
      }
    } else if (story) {
      await supabase.from('stories').update(storyData).eq('id', story.id)
    }
    setSaving(false)
  }, [title, content, synopsis, status, isNew, story, navigate, readonly])

  // Auto-save on changes
  useEffect(() => {
    if (!isNew && title.trim()) {
      const timer = setTimeout(saveStory, 1500)
      return () => clearTimeout(timer)
    }
  }, [title, content, synopsis, status, saveStory, isNew])

  async function handleAddCharacter(characterId: string) {
    if (!story) return

    const { data } = await supabase
      .from('story_characters')
      .insert({ story_id: story.id, character_id: characterId, role: 'supporting' })
      .select('*, character:characters(*)')
      .maybeSingle()

    if (data) {
      setStoryCharacters([...storyCharacters, data as StoryCharacter])
    }
  }

  async function handleRemoveCharacter(scId: string) {
    await supabase.from('story_characters').delete().eq('id', scId)
    setStoryCharacters(storyCharacters.filter(sc => sc.id !== scId))
  }

  async function handleDeleteStory() {
    if (!story) return
    await supabase.from('stories').delete().eq('id', story.id)
    navigate('/stories')
  }

  async function handleManualSave() {
    await saveStory()
    if (isNew) return // Will navigate
    alert('Story saved!')
  }

  function insertFormatting(type: string) {
    const textarea = document.querySelector('textarea[name="content"]') as HTMLTextAreaElement
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selected = content.substring(start, end)

    let insertion = selected
    let cursorOffset = 0

    switch (type) {
      case 'bold':
        insertion = `**${selected || 'bold text'}**`
        cursorOffset = selected ? 0 : -2
        break
      case 'italic':
        insertion = `*${selected || 'italic text'}*`
        cursorOffset = selected ? 0 : -1
        break
      case 'list':
        insertion = `\n- ${selected || 'list item'}`
        break
      case 'numbered':
        insertion = `\n1. ${selected || 'list item'}`
        break
      case 'quote':
        insertion = `\n> ${selected || 'quote'}`
        break
      case 'divider':
        insertion = '\n---\n'
        break
    }

    const newContent = content.substring(0, start) + insertion + content.substring(end)
    setContent(newContent)

    // Set cursor position
    setTimeout(() => {
      textarea.focus()
      const newPos = start + insertion.length + cursorOffset
      textarea.setSelectionRange(newPos, newPos)
    }, 0)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-pulse-soft text-ink-400">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cream-50 flex flex-col">
      {/* Header */}
      <header className="sticky top-16 z-40 bg-cream-50/95 backdrop-blur-sm border-b border-cream-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-14">
            {/* Left */}
            <div className="flex items-center gap-3">
              <Link
                to="/stories"
                className="p-2 rounded-lg text-ink-400 hover:text-ink-900 hover:bg-cream-100 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Untitled Story"
                disabled={readonly}
                className="font-serif text-xl font-semibold text-ink-900 bg-transparent border-none outline-none placeholder-ink-300 disabled:opacity-70"
              />
              {saving && <span className="text-xs text-ink-400">Saving...</span>}
            </div>

            {/* Right */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowCharacterPanel(!showCharacterPanel)}
                className={`p-2 rounded-lg transition-colors ${
                  showCharacterPanel ? 'bg-ink-900 text-cream-50' : 'text-ink-400 hover:text-ink-900 hover:bg-cream-100'
                }`}
                title="Characters"
              >
                <Users className="w-5 h-5" />
              </button>
              <button
                onClick={() => setShowSettings(!showSettings)}
                className={`p-2 rounded-lg transition-colors ${
                  showSettings ? 'bg-ink-900 text-cream-50' : 'text-ink-400 hover:text-ink-900 hover:bg-cream-100'
                }`}
                title="Settings"
              >
                <Settings className="w-5 h-5" />
              </button>
              {!readonly && (
                <button
                  onClick={handleManualSave}
                  className="flex items-center gap-2 px-4 py-2 bg-sage-600 text-white rounded-lg font-medium hover:bg-sage-700 transition-colors"
                >
                  <Save className="w-4 h-4" />
                  Save
                </button>
              )}
            </div>
          </div>

          {/* Settings dropdown */}
          {showSettings && (
            <div className="py-4 border-t border-cream-200 animate-fade-in">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium text-ink-600">Status:</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as Story['status'])}
                    disabled={readonly}
                    className="px-3 py-1.5 rounded-lg border border-cream-200 bg-white text-sm disabled:opacity-70"
                  >
                    <option value="draft">Draft</option>
                    <option value="wip">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
                <div className="flex-1">
                  <input
                    type="text"
                    value={synopsis}
                    onChange={(e) => setSynopsis(e.target.value)}
                    placeholder="Add a synopsis..."
                    disabled={readonly}
                    className="w-full px-3 py-1.5 rounded-lg border border-cream-200 bg-white text-sm disabled:opacity-70"
                  />
                </div>
                {story && !readonly && (
                  <button
                    onClick={() => setShowDeleteConfirm(true)}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-rose-600 hover:bg-rose-50 rounded-lg text-sm"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main content area */}
      <div className="flex-1 flex">
        {/* Editor */}
        <div className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 py-8">
          {/* Toolbar */}
          {!readonly && (
            <div className="flex items-center gap-1 mb-4 p-2 rounded-xl bg-white border border-cream-200">
              <button onClick={() => insertFormatting('bold')} className="p-2 rounded-lg hover:bg-cream-100 transition-colors" title="Bold">
                <Bold className="w-4 h-4 text-ink-600" />
              </button>
              <button onClick={() => insertFormatting('italic')} className="p-2 rounded-lg hover:bg-cream-100 transition-colors" title="Italic">
                <Italic className="w-4 h-4 text-ink-600" />
              </button>
              <div className="w-px h-6 bg-cream-200 mx-1" />
              <button onClick={() => insertFormatting('list')} className="p-2 rounded-lg hover:bg-cream-100 transition-colors" title="Bullet list">
                <List className="w-4 h-4 text-ink-600" />
              </button>
              <button onClick={() => insertFormatting('numbered')} className="p-2 rounded-lg hover:bg-cream-100 transition-colors" title="Numbered list">
                <ListOrdered className="w-4 h-4 text-ink-600" />
              </button>
              <button onClick={() => insertFormatting('quote')} className="p-2 rounded-lg hover:bg-cream-100 transition-colors" title="Quote">
                <Quote className="w-4 h-4 text-ink-600" />
              </button>
              <button onClick={() => insertFormatting('divider')} className="p-2 rounded-lg hover:bg-cream-100 transition-colors" title="Divider">
                <Minus className="w-4 h-4 text-ink-600" />
              </button>
            </div>
          )}

          {/* Text area */}
          <textarea
            name="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Begin your story..."

            disabled={readonly}
            className="w-full min-h-[60vh] p-4 rounded-xl border border-cream-200 bg-white text-ink-800 text-lg leading-relaxed font-serif resize-none focus:ring-2 focus:ring-sage-100 focus:border-sage-300 outline-none transition-all disabled:opacity-70 placeholder-ink-300"
          />

          {/* Word count */}
          <div className="text-right text-sm text-ink-400 mt-2">
            {content.split(/\s+/).filter(Boolean).length} words
          </div>
        </div>

        {/* Character panel */}
        {showCharacterPanel && (
          <aside className="w-80 border-l border-cream-200 bg-white p-6 animate-slide-in overflow-y-auto">
            <h3 className="font-serif text-lg font-semibold text-ink-900 mb-4">Characters</h3>

            {/* Assigned characters */}
            {storyCharacters.length > 0 && (
              <div className="space-y-3 mb-6">
                {storyCharacters.map((sc) => (
                  <div key={sc.id} className="flex items-center gap-3 p-3 rounded-xl bg-cream-50 border border-cream-200">
                    {sc.character && (
                      <>
                        <div
                          className="w-10 h-10 rounded-full flex items-center justify-center text-white font-serif font-semibold"
                          style={{ backgroundColor: sc.character.color }}
                        >
                          {sc.character.name.charAt(0)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-ink-900 truncate">{sc.character.name}</p>
                          <p className="text-xs text-ink-400 capitalize">{sc.role}</p>
                        </div>
                        {!readonly && (
                          <button
                            onClick={() => handleRemoveCharacter(sc.id)}
                            className="p-1.5 rounded-lg text-ink-400 hover:text-rose-600 hover:bg-rose-50"
                          >
                            <span className="sr-only">Remove</span>
                            ×
                          </button>
                        )}
                      </>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Add characters */}
            {!readonly && story && (
              <div>
                <h4 className="text-sm font-medium text-ink-600 mb-3">Add Character</h4>
                <div className="space-y-2">
                  {characters
                    .filter(c => !storyCharacters.some(sc => sc.character_id === c.id))
                    .map((char) => (
                      <button
                        key={char.id}
                        onClick={() => handleAddCharacter(char.id)}
                        className="w-full flex items-center gap-3 p-3 rounded-xl border border-cream-200 hover:border-sage-300 hover:bg-sage-50 transition-all text-left"
                      >
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center text-white font-serif text-sm font-semibold"
                          style={{ backgroundColor: char.color }}
                        >
                          {char.name.charAt(0)}
                        </div>
                        <span className="text-ink-700">{char.name}</span>
                      </button>
                    ))}
                </div>
              </div>
            )}

            {!story && (
              <p className="text-sm text-ink-400 text-center">
                Save your story first to add characters.
              </p>
            )}
          </aside>
        )}
      </div>

      {/* Delete confirmation */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink-900/50 backdrop-blur-sm">
          <div className="bg-cream-50 rounded-2xl p-6 max-w-sm w-full shadow-2xl">
            <h3 className="font-serif text-xl font-semibold text-ink-900 mb-2">Delete Story?</h3>
            <p className="text-ink-500 mb-6">
              Are you sure you want to delete "{title}"? This cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 rounded-xl border border-cream-300 text-ink-600 font-medium hover:bg-cream-100 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteStory}
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
