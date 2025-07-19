import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { 
  Search, 
  X, 
  BookOpen, 
  Clock,
  ArrowRight,
  Filter,
  Zap
} from 'lucide-react'
import bookContent from '../assets/book_content.json'

const SearchModal = ({ isOpen, onClose, onChapterSelect }) => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [isSearching, setIsSearching] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef(null)

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return

      if (e.key === 'Escape') {
        onClose()
      } else if (e.key === 'ArrowDown') {
        e.preventDefault()
        setSelectedIndex(prev => Math.min(prev + 1, results.length - 1))
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSelectedIndex(prev => Math.max(prev - 1, 0))
      } else if (e.key === 'Enter' && results[selectedIndex]) {
        handleResultClick(results[selectedIndex])
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, results, selectedIndex])

  useEffect(() => {
    if (query.length < 2) {
      setResults([])
      return
    }

    setIsSearching(true)
    
    // Simular delay de busca
    const searchTimeout = setTimeout(() => {
      const searchResults = []
      
      bookContent.chapters.forEach(chapter => {
        const content = chapter.content.toLowerCase()
        const queryLower = query.toLowerCase()
        
        if (content.includes(queryLower) || 
            chapter.title.toLowerCase().includes(queryLower) ||
            (chapter.subtitle && chapter.subtitle.toLowerCase().includes(queryLower))) {
          
          // Encontrar contexto ao redor da palavra
          const sentences = chapter.content.split(/[.!?]+/)
          const matchingSentences = sentences.filter(sentence => 
            sentence.toLowerCase().includes(queryLower)
          ).slice(0, 3)
          
          searchResults.push({
            chapterId: chapter.id,
            chapterTitle: chapter.title,
            chapterSubtitle: chapter.subtitle,
            category: chapter.category || 'Capítulo',
            matches: matchingSentences.map(sentence => {
              const cleanSentence = sentence.trim()
              const index = cleanSentence.toLowerCase().indexOf(queryLower)
              if (index === -1) return cleanSentence.substring(0, 150) + '...'
              
              const start = Math.max(0, index - 50)
              const end = Math.min(cleanSentence.length, index + query.length + 50)
              let excerpt = cleanSentence.substring(start, end)
              
              if (start > 0) excerpt = '...' + excerpt
              if (end < cleanSentence.length) excerpt = excerpt + '...'
              
              return excerpt
            }),
            readTime: Math.ceil(chapter.content.split(' ').length / 200)
          })
        }
      })
      
      setResults(searchResults.slice(0, 8)) // Limitar a 8 resultados
      setSelectedIndex(0)
      setIsSearching(false)
    }, 300)

    return () => clearTimeout(searchTimeout)
  }, [query])

  const handleResultClick = (result) => {
    onChapterSelect(result.chapterId)
    onClose()
    setQuery('')
  }

  const highlightText = (text, query) => {
    if (!query) return text
    
    const regex = new RegExp(`(${query})`, 'gi')
    const parts = text.split(regex)
    
    return parts.map((part, index) => 
      regex.test(part) ? (
        <mark key={index} className="bg-primary/20 text-primary font-medium rounded px-1">
          {part}
        </mark>
      ) : part
    )
  }

  const suggestions = [
    'recuperação judicial',
    'SUS',
    'ANVISA',
    'aspectos tributários',
    'questões trabalhistas',
    'governança corporativa',
    'compliance',
    'prevenção de crises'
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="fixed top-[10%] left-1/2 -translate-x-1/2 w-full max-w-2xl mx-4 z-50"
          >
            <div className="glass-card-strong rounded-2xl shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="flex items-center gap-3 p-6 border-b border-border/50">
                <div className="flex items-center gap-3 flex-1">
                  <Search className="h-5 w-5 text-muted-foreground" />
                  <Input
                    ref={inputRef}
                    placeholder="Buscar no conteúdo da obra..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="border-0 bg-transparent text-lg placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                  {isSearching && (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full"
                    />
                  )}
                </div>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="hover-lift"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              {/* Content */}
              <div className="max-h-96 overflow-y-auto">
                {query.length < 2 ? (
                  <div className="p-6">
                    <div className="text-center mb-6">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Search className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">Buscar na Obra</h3>
                      <p className="text-muted-foreground text-sm">
                        Digite pelo menos 2 caracteres para buscar no conteúdo completo
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium mb-3 text-muted-foreground">Sugestões populares:</h4>
                      <div className="flex flex-wrap gap-2">
                        {suggestions.map((suggestion, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            size="sm"
                            className="text-xs hover-lift"
                            onClick={() => setQuery(suggestion)}
                          >
                            <Zap className="h-3 w-3 mr-1" />
                            {suggestion}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : results.length === 0 && !isSearching ? (
                  <div className="p-6 text-center">
                    <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Search className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Nenhum resultado encontrado</h3>
                    <p className="text-muted-foreground text-sm">
                      Tente usar termos diferentes ou mais específicos
                    </p>
                  </div>
                ) : (
                  <div className="p-2">
                    {results.map((result, index) => (
                      <motion.button
                        key={`${result.chapterId}-${index}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className={`w-full text-left p-4 rounded-lg hover:bg-muted/50 transition-all duration-200 ${
                          index === selectedIndex ? 'bg-muted/50 ring-2 ring-primary/20' : ''
                        }`}
                        onClick={() => handleResultClick(result)}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <Badge variant="secondary" className="text-xs">
                                {result.category}
                              </Badge>
                              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <Clock className="h-3 w-3" />
                                <span>{result.readTime} min</span>
                              </div>
                            </div>
                            <h4 className="font-semibold text-sm mb-1">
                              {highlightText(result.chapterTitle, query)}
                            </h4>
                            {result.chapterSubtitle && (
                              <p className="text-xs text-muted-foreground mb-2">
                                {highlightText(result.chapterSubtitle, query)}
                              </p>
                            )}
                          </div>
                          <ArrowRight className="h-4 w-4 text-muted-foreground ml-2 flex-shrink-0" />
                        </div>
                        
                        {result.matches.length > 0 && (
                          <div className="space-y-1">
                            {result.matches.slice(0, 2).map((match, matchIndex) => (
                              <p key={matchIndex} className="text-xs text-muted-foreground leading-relaxed">
                                {highlightText(match, query)}
                              </p>
                            ))}
                          </div>
                        )}
                      </motion.button>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Footer */}
              {query.length >= 2 && (
                <div className="px-6 py-3 border-t border-border/50 bg-muted/20">
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>
                      {results.length} resultado{results.length !== 1 ? 's' : ''} encontrado{results.length !== 1 ? 's' : ''}
                    </span>
                    <div className="flex items-center gap-4">
                      <span>↑↓ Navegar</span>
                      <span>↵ Selecionar</span>
                      <span>Esc Fechar</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default SearchModal

