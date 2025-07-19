import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Separator } from '@/components/ui/separator.jsx'
import { 
  BookOpen, 
  Menu, 
  X, 
  ChevronRight, 
  Sun, 
  Moon,
  Search,
  Download,
  Bookmark,
  Settings,
  Star,
  Clock,
  Eye,
  Sparkles,
  Scale,
  FileText,
  Users,
  Shield,
  TrendingUp,
  Award,
  ArrowRight,
  Play,
  Zap,
  Target,
  CheckCircle,
  BookmarkPlus,
  Filter,
  Grid3X3,
  List,
  BarChart3
} from 'lucide-react'
import bookContent from './assets/book_content.json'
import ChapterReader from './components/ChapterReader.jsx'
import SearchModal from './components/SearchModal.jsx'
import './App.css'

function App() {
  const [darkMode, setDarkMode] = useState(false)
  const [currentView, setCurrentView] = useState('home')
  const [currentChapter, setCurrentChapter] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [viewMode, setViewMode] = useState('grid') // grid or list
  const [showSearch, setShowSearch] = useState(false)

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  useEffect(() => {
    // Simular carregamento inicial
    const timer = setTimeout(() => setIsLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    // Atalho de teclado para busca
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setShowSearch(true)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  const handleChapterSelect = (chapterId) => {
    setCurrentChapter(chapterId)
    setCurrentView('reader')
  }

  const handleBackToHome = () => {
    setCurrentView('home')
    setCurrentChapter(null)
  }

  const chapters = [
    {
      id: 'cap1',
      title: 'Estratégias de Reestruturação',
      subtitle: 'Entidades de Saúde Conveniadas ao SUS',
      icon: Scale,
      description: 'Fundamentos e especificidades da recuperação judicial aplicada ao setor de saúde',
      color: 'from-blue-500 to-cyan-500',
      readTime: '25 min',
      words: '15.2k',
      difficulty: 'Essencial',
      category: 'Fundamentos'
    },
    {
      id: 'cap2',
      title: 'Aspectos Tributários',
      subtitle: 'Específicos do Setor de Saúde',
      icon: FileText,
      description: 'Complexidade tributária e benefícios fiscais no setor de saúde',
      color: 'from-emerald-500 to-teal-500',
      readTime: '22 min',
      words: '14.8k',
      difficulty: 'Avançado',
      category: 'Tributário'
    },
    {
      id: 'cap3',
      title: 'Questões Trabalhistas',
      subtitle: 'na Recuperação de Empresas de Saúde',
      icon: Users,
      description: 'Direitos trabalhistas e responsabilidades na recuperação judicial',
      color: 'from-purple-500 to-violet-500',
      readTime: '28 min',
      words: '16.5k',
      difficulty: 'Intermediário',
      category: 'Trabalhista'
    },
    {
      id: 'cap4',
      title: 'Órgãos Reguladores',
      subtitle: 'Durante a Crise',
      icon: Shield,
      description: 'ANVISA, ANS, conselhos profissionais e compliance regulatório',
      color: 'from-orange-500 to-red-500',
      readTime: '30 min',
      words: '17.2k',
      difficulty: 'Avançado',
      category: 'Regulatório'
    },
    {
      id: 'cap5',
      title: 'Prevenção de Crises',
      subtitle: 'no Setor de Saúde',
      icon: TrendingUp,
      description: 'Gestão de riscos e planejamento estratégico preventivo',
      color: 'from-green-500 to-emerald-500',
      readTime: '26 min',
      words: '15.8k',
      difficulty: 'Intermediário',
      category: 'Prevenção'
    },
    {
      id: 'cap6',
      title: 'Alternativas à RJ',
      subtitle: 'Soluções Extrajudiciais',
      icon: Settings,
      description: 'Acordos extrajudiciais, M&A e instrumentos financeiros',
      color: 'from-indigo-500 to-purple-500',
      readTime: '24 min',
      words: '14.9k',
      difficulty: 'Avançado',
      category: 'Alternativas'
    },
    {
      id: 'cap7',
      title: 'Governança & Compliance',
      subtitle: 'no Setor de Saúde',
      icon: Award,
      description: 'Estruturas de governança e programas de integridade',
      color: 'from-pink-500 to-rose-500',
      readTime: '32 min',
      words: '18.1k',
      difficulty: 'Especializado',
      category: 'Governança'
    }
  ]

  const stats = [
    { label: 'Capítulos', value: '7', icon: BookOpen },
    { label: 'Palavras', value: '150k+', icon: FileText },
    { label: 'Páginas', value: '900+', icon: Eye },
    { label: 'Tempo de Leitura', value: '12h', icon: Clock }
  ]

  const features = [
    { 
      title: 'Busca Inteligente', 
      description: 'Sistema de busca avançado com filtros e sugestões',
      icon: Search,
      color: 'from-blue-500 to-cyan-500'
    },
    { 
      title: 'Marcadores Inteligentes', 
      description: 'Salve e organize suas posições de leitura favoritas',
      icon: BookmarkPlus,
      color: 'from-purple-500 to-violet-500'
    },
    { 
      title: 'Leitura Personalizada', 
      description: 'Configure fonte, tamanho, espaçamento e tema',
      icon: Settings,
      color: 'from-emerald-500 to-teal-500'
    },
    { 
      title: 'Análise de Progresso', 
      description: 'Acompanhe seu progresso de leitura e estatísticas',
      icon: BarChart3,
      color: 'from-orange-500 to-red-500'
    }
  ]

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full mx-auto mb-4"
          />
          <h2 className="text-xl font-semibold mb-2">Carregando obra...</h2>
          <p className="text-muted-foreground">Preparando sua experiência de leitura</p>
        </motion.div>
      </div>
    )
  }

  const Header = () => (
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl"
    >
      <div className="container-custom flex h-16 items-center justify-between">
        <div className="flex items-center space-x-4">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => setCurrentView('home')}
          >
            <div className="p-2 bg-primary/10 rounded-lg">
              <BookOpen className="h-6 w-6 text-primary" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold">Direito Empresarial</h1>
              <p className="text-xs text-muted-foreground">Setor da Saúde</p>
            </div>
          </motion.div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowSearch(true)}
            className="hover-lift hidden md:flex"
          >
            <Search className="h-4 w-4 mr-2" />
            <span className="text-sm">Buscar...</span>
            <kbd className="ml-2 pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
              <span className="text-xs">⌘</span>K
            </kbd>
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowSearch(true)}
            className="hover-lift md:hidden"
          >
            <Search className="h-4 w-4" />
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setDarkMode(!darkMode)}
            className="hover-lift"
          >
            {darkMode ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
            className="hover-lift hidden md:flex"
          >
            {viewMode === 'grid' ? (
              <List className="h-4 w-4" />
            ) : (
              <Grid3X3 className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
    </motion.header>
  )

  const HeroSection = () => (
    <section className="section-padding relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl floating-element" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/5 rounded-full blur-3xl floating-element" style={{ animationDelay: '-2s' }} />
      </div>
      
      <div className="container-custom text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-8 border border-primary/20"
          >
            <Sparkles className="h-4 w-4" />
            Obra de Referência Obrigatória
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-balance"
          >
            <span className="gradient-text">Direito Empresarial</span>
            <br />
            <span className="text-foreground">de Crise no</span>
            <br />
            <span className="gradient-text-secondary">Setor da Saúde</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12 text-pretty"
          >
            Manual completo e definitivo de reestruturação para prestadores do Sistema Único de Saúde
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row justify-center gap-4 mb-16"
          >
            <Button 
              size="lg"
              className="btn-primary hover-lift group px-8 py-4 text-lg"
              onClick={() => setCurrentView('chapters')}
            >
              <Play className="h-5 w-5 mr-2 group-hover:translate-x-1 transition-transform" />
              Começar Leitura
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="btn-secondary hover-lift px-8 py-4 text-lg"
            >
              <Download className="h-5 w-5 mr-2" />
              Download PDF
            </Button>
          </motion.div>
          
          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-xl mb-3">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="text-2xl md:text-3xl font-bold gradient-text mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )

  const ChaptersSection = () => (
    <section className="section-padding bg-muted/30">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Explore os <span className="gradient-text">Capítulos</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Navegue pelos 7 capítulos especializados desta obra de referência
          </p>
        </motion.div>

        <div className={`grid gap-8 ${viewMode === 'grid' ? 'md:grid-cols-2 lg:grid-cols-3' : 'max-w-4xl mx-auto'}`}>
          {chapters.map((chapter, index) => {
            const Icon = chapter.icon
            return (
              <motion.div
                key={chapter.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="group"
              >
                <Card className={`glass-card hover-glow cursor-pointer transition-all duration-500 h-full ${
                  viewMode === 'list' ? 'flex flex-row items-center p-6' : ''
                }`}
                onClick={() => handleChapterSelect(chapter.id)}
                >
                  <div className={`${viewMode === 'list' ? 'flex-shrink-0 mr-6' : ''}`}>
                    <div className={`bg-gradient-to-r ${chapter.color} p-4 rounded-2xl text-white shadow-lg group-hover:scale-110 transition-transform duration-300 ${
                      viewMode === 'list' ? 'w-16 h-16 flex items-center justify-center' : 'w-20 h-20 flex items-center justify-center mb-6'
                    }`}>
                      <Icon className={`${viewMode === 'list' ? 'h-8 w-8' : 'h-10 w-10'}`} />
                    </div>
                  </div>
                  
                  <div className={`${viewMode === 'list' ? 'flex-1' : ''}`}>
                    <CardHeader className={`${viewMode === 'list' ? 'p-0 pb-4' : 'pb-4'}`}>
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <Badge variant="secondary" className="mb-2 text-xs">
                            {chapter.difficulty}
                          </Badge>
                          <CardTitle className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                            {chapter.title}
                          </CardTitle>
                          <CardDescription className="font-medium text-base text-muted-foreground">
                            {chapter.subtitle}
                          </CardDescription>
                        </div>
                        {viewMode === 'grid' && (
                          <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                        )}
                      </div>
                    </CardHeader>
                    
                    <CardContent className={`${viewMode === 'list' ? 'p-0' : 'pt-0'}`}>
                      <p className="text-muted-foreground mb-6 leading-relaxed">
                        {chapter.description}
                      </p>
                      
                      <div className={`flex items-center justify-between ${viewMode === 'list' ? 'flex-wrap gap-4' : ''}`}>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>{chapter.readTime}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Eye className="h-4 w-4" />
                            <span>{chapter.words}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center text-primary font-medium text-sm group-hover:translate-x-2 transition-transform">
                          <span>Ler capítulo</span>
                          <ArrowRight className="h-4 w-4 ml-1" />
                        </div>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )

  const FeaturesSection = () => (
    <section className="section-padding">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            <span className="gradient-text">Funcionalidades</span> Avançadas
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Ferramentas modernas para uma experiência de leitura excepcional
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="group"
              >
                <Card className="glass-card hover-glow text-center h-full">
                  <CardHeader>
                    <div className={`bg-gradient-to-r ${feature.color} p-4 rounded-2xl text-white shadow-lg mx-auto mb-4 w-16 h-16 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="h-8 w-8" />
                    </div>
                    <CardTitle className="text-lg font-bold group-hover:text-primary transition-colors">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )

  const AboutSection = () => (
    <section className="section-padding bg-muted/30">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Sobre a <span className="gradient-text">Obra</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed text-pretty">
              Esta obra representa um marco na literatura jurídica brasileira especializada, 
              preenchendo lacuna significativa na intersecção entre o Direito Empresarial de Crise 
              e o Direito da Saúde.
            </p>
            
            <div className="space-y-4 mb-8">
              {[
                'Análise jurisprudencial atualizada',
                'Casos práticos detalhados',
                'Modelos e templates prontos',
                'Estratégias comprovadas'
              ].map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="text-muted-foreground">{item}</span>
                </motion.div>
              ))}
            </div>
            
            <Button className="btn-primary hover-lift">
              <Target className="h-4 w-4 mr-2" />
              Saiba Mais
            </Button>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="relative"
          >
            <div className="glass-card-strong p-8 rounded-3xl">
              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="text-center"
                  >
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-xl mb-3">
                      <stat.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="text-2xl font-bold gradient-text mb-1">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
            
            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/10 rounded-full blur-xl floating-element" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-secondary/10 rounded-full blur-xl floating-element" style={{ animationDelay: '-3s' }} />
          </motion.div>
        </div>
      </div>
    </section>
  )

  const CTASection = () => (
    <section className="section-padding">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-4xl mx-auto"
        >
          <div className="glass-card-strong p-12 rounded-3xl relative overflow-hidden">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 -z-10" />
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Pronto para <span className="gradient-text">Começar</span>?
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 text-pretty">
              Acesse agora o conteúdo completo e transforme sua prática jurídica no setor de saúde
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button 
                size="lg"
                className="btn-primary hover-lift group px-8 py-4 text-lg"
                onClick={() => setCurrentView('chapters')}
              >
                <Zap className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
                Iniciar Leitura Agora
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="btn-secondary hover-lift px-8 py-4 text-lg"
              >
                <Bookmark className="h-5 w-5 mr-2" />
                Salvar para Depois
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )

  if (currentView === 'reader' && currentChapter) {
    return (
      <ChapterReader
        chapterId={currentChapter}
        onBack={handleBackToHome}
        onChapterChange={handleChapterSelect}
      />
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <LoadingScreen />
      
      <AnimatePresence mode="wait">
        {currentView === 'home' && (
          <motion.main
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Header />
            <HeroSection />
            <ChaptersSection />
            <FeaturesSection />
            <AboutSection />
            <CTASection />
          </motion.main>
        )}
        
        {currentView === 'chapters' && (
          <motion.main
            key="chapters"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
          >
            <Header />
            <div className="section-padding">
              <div className="container-custom">
                <div className="text-center mb-12">
                  <h1 className="text-4xl md:text-5xl font-bold mb-4">
                    <span className="gradient-text">Capítulos</span> da Obra
                  </h1>
                  <p className="text-lg text-muted-foreground">
                    Selecione um capítulo para começar a leitura
                  </p>
                </div>
                
                <ChaptersSection />
              </div>
            </div>
          </motion.main>
        )}
      </AnimatePresence>
      
      <SearchModal
        isOpen={showSearch}
        onClose={() => setShowSearch(false)}
        onChapterSelect={handleChapterSelect}
      />
    </div>
  )
}

export default App

