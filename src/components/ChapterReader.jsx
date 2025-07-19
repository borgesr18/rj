import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Progress } from '@/components/ui/progress.jsx'
import { 
  ArrowLeft, 
  ArrowRight, 
  BookOpen, 
  Clock, 
  Eye,
  Bookmark,
  BookmarkPlus,
  Search,
  Settings,
  Menu,
  X,
  ChevronUp,
  ChevronDown,
  Home
} from 'lucide-react'
import bookContent from '../assets/book_content.json'

const ChapterReader = ({ chapterId, onBack, onChapterChange }) => {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [showTOC, setShowTOC] = useState(false)
  const [fontSize, setFontSize] = useState(18)
  const [lineHeight, setLineHeight] = useState(1.6)
  const [readingTime, setReadingTime] = useState(0)

  const chapter = bookContent.chapters.find(ch => ch.id === chapterId)
  
  if (!chapter) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Capítulo não encontrado</h2>
          <Button onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
        </div>
      </div>
    )
  }

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = (scrollTop / docHeight) * 100
      setScrollProgress(Math.min(progress, 100))
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    // Calcular tempo de leitura baseado no conteúdo
    const wordCount = chapter.content.split(' ').length
    const avgWordsPerMinute = 200
    setReadingTime(Math.ceil(wordCount / avgWordsPerMinute))
  }, [chapter])

  const TableOfContents = () => {
    const sections = chapter.content.split('\n\n').filter(section => 
      section.startsWith('#') || section.startsWith('##') || section.startsWith('###')
    ).slice(0, 10) // Limitar a 10 seções

    return (
      <AnimatePresence>
        {showTOC && (
          <motion.div
            initial={{ opacity: 0, x: -300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            className="fixed left-0 top-0 h-full w-80 bg-background/95 backdrop-blur-xl border-r border-border z-50 overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">Sumário</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowTOC(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="space-y-2">
                {sections.map((section, index) => {
                  const level = section.match(/^#+/)[0].length
                  const title = section.replace(/^#+\s*/, '').substring(0, 60)
                  
                  return (
                    <button
                      key={index}
                      className={`w-full text-left p-2 rounded-lg hover:bg-muted/50 transition-colors text-sm ${
                        level === 1 ? 'font-semibold' : 
                        level === 2 ? 'font-medium pl-4' : 'pl-8'
                      }`}
                      onClick={() => {
                        // Scroll to section (simplified)
                        setShowTOC(false)
                      }}
                    >
                      {title}
                    </button>
                  )
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    )
  }

  const ReaderHeader = () => (
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl"
    >
      <div className="container-custom flex h-16 items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="hover-lift"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowTOC(!showTOC)}
            className="hover-lift"
          >
            <Menu className="h-4 w-4 mr-2" />
            Sumário
          </Button>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="hidden md:flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{readingTime} min</span>
            </div>
            <div className="flex items-center gap-1">
              <Eye className="h-4 w-4" />
              <span>{chapter.content.split(' ').length} palavras</span>
            </div>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            className="hover-lift"
          >
            <BookmarkPlus className="h-4 w-4" />
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            className="hover-lift"
          >
            <Search className="h-4 w-4" />
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            className="hover-lift"
          >
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {/* Progress Bar */}
      <div className="h-1 bg-muted">
        <motion.div
          className="h-full bg-primary"
          style={{ width: `${scrollProgress}%` }}
          initial={{ width: 0 }}
          animate={{ width: `${scrollProgress}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>
    </motion.header>
  )

  const ChapterHeader = () => (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center mb-12"
    >
      <Badge variant="secondary" className="mb-4">
        {chapter.category || 'Capítulo'}
      </Badge>
      
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-balance">
        <span className="gradient-text">{chapter.title}</span>
      </h1>
      
      {chapter.subtitle && (
        <p className="text-xl md:text-2xl text-muted-foreground mb-6 text-pretty">
          {chapter.subtitle}
        </p>
      )}
      
      <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
        <div className="flex items-center gap-1">
          <Clock className="h-4 w-4" />
          <span>{readingTime} min de leitura</span>
        </div>
        <div className="flex items-center gap-1">
          <Eye className="h-4 w-4" />
          <span>{chapter.content.split(' ').length} palavras</span>
        </div>
        <div className="flex items-center gap-1">
          <BookOpen className="h-4 w-4" />
          <span>Nível: {chapter.difficulty || 'Intermediário'}</span>
        </div>
      </div>
    </motion.div>
  )

  const ChapterContent = () => {
    const formatContent = (content) => {
      return content.split('\n\n').map((paragraph, index) => {
        if (paragraph.startsWith('# ')) {
          return (
            <h1 key={index} className="text-3xl md:text-4xl font-bold mb-6 mt-12 gradient-text">
              {paragraph.replace('# ', '')}
            </h1>
          )
        }
        
        if (paragraph.startsWith('## ')) {
          return (
            <h2 key={index} className="text-2xl md:text-3xl font-bold mb-4 mt-8">
              {paragraph.replace('## ', '')}
            </h2>
          )
        }
        
        if (paragraph.startsWith('### ')) {
          return (
            <h3 key={index} className="text-xl md:text-2xl font-semibold mb-3 mt-6">
              {paragraph.replace('### ', '')}
            </h3>
          )
        }
        
        if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
          return (
            <div key={index} className="bg-muted/50 p-4 rounded-lg mb-4 border-l-4 border-primary">
              <p className="font-semibold">
                {paragraph.replace(/\*\*/g, '')}
              </p>
            </div>
          )
        }
        
        return (
          <p 
            key={index} 
            className="mb-4 leading-relaxed text-pretty"
            style={{ 
              fontSize: `${fontSize}px`, 
              lineHeight: lineHeight 
            }}
          >
            {paragraph}
          </p>
        )
      })
    }

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="prose prose-lg max-w-none"
      >
        {formatContent(chapter.content)}
      </motion.div>
    )
  }

  const NavigationFooter = () => {
    const currentIndex = bookContent.chapters.findIndex(ch => ch.id === chapterId)
    const prevChapter = currentIndex > 0 ? bookContent.chapters[currentIndex - 1] : null
    const nextChapter = currentIndex < bookContent.chapters.length - 1 ? bookContent.chapters[currentIndex + 1] : null

    return (
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-16 pt-8 border-t border-border"
      >
        <div className="flex flex-col md:flex-row justify-between gap-4">
          {prevChapter ? (
            <Button
              variant="outline"
              className="flex-1 h-auto p-4 justify-start hover-lift"
              onClick={() => onChapterChange(prevChapter.id)}
            >
              <div className="flex items-center">
                <ArrowLeft className="h-5 w-5 mr-3 flex-shrink-0" />
                <div className="text-left">
                  <div className="text-xs text-muted-foreground mb-1">Anterior</div>
                  <div className="font-semibold">{prevChapter.title}</div>
                </div>
              </div>
            </Button>
          ) : (
            <div className="flex-1" />
          )}
          
          {nextChapter ? (
            <Button
              variant="outline"
              className="flex-1 h-auto p-4 justify-end hover-lift"
              onClick={() => onChapterChange(nextChapter.id)}
            >
              <div className="flex items-center">
                <div className="text-right">
                  <div className="text-xs text-muted-foreground mb-1">Próximo</div>
                  <div className="font-semibold">{nextChapter.title}</div>
                </div>
                <ArrowRight className="h-5 w-5 ml-3 flex-shrink-0" />
              </div>
            </Button>
          ) : (
            <div className="flex-1" />
          )}
        </div>
      </motion.div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <ReaderHeader />
      <TableOfContents />
      
      <main className="container-custom section-padding">
        <div className="max-w-4xl mx-auto">
          <ChapterHeader />
          <ChapterContent />
          <NavigationFooter />
        </div>
      </main>
      
      {/* Floating Action Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 w-12 h-12 bg-primary text-primary-foreground rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center z-40"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <ChevronUp className="h-5 w-5" />
      </motion.button>
    </div>
  )
}

export default ChapterReader

