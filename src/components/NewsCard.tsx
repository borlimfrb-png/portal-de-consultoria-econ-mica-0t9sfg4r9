import { Link } from 'react-router-dom'
import { Clock, ExternalLink, Sparkles } from 'lucide-react'
import { NewsArticle } from '@/types'

interface NewsCardProps {
  article: NewsArticle
  isNew?: boolean
  className?: string
}

export default function NewsCard({ article, isNew = false, className = '' }: NewsCardProps) {
  const categoryLabels: Record<
    string,
    { label: string; bg: string; text: string; initial: string }
  > = {
    reforma_tributaria: {
      label: 'Reforma Tributária',
      bg: 'bg-[#B8892F]/15',
      text: 'text-[#8A631B]',
      initial: 'RT',
    },
    economia: {
      label: 'Economia',
      bg: 'bg-[#0B1F3A]/10',
      text: 'text-[#0B1F3A]',
      initial: 'EC',
    },
    mercados: {
      label: 'Mercados',
      bg: 'bg-emerald-100',
      text: 'text-emerald-800',
      initial: 'MK',
    },
    politica_fiscal: {
      label: 'Política Fiscal',
      bg: 'bg-indigo-100',
      text: 'text-indigo-900',
      initial: 'PF',
    },
  }

  const cat = categoryLabels[article.category] || {
    label: article.category,
    bg: 'bg-slate-100',
    text: 'text-slate-800',
    initial: 'N',
  }

  // Format date dd/mm/aaaa
  let displayDate = article.published_at
  try {
    const d = new Date(article.published_at.replace(' ', 'T'))
    if (!isNaN(d.getTime())) {
      displayDate = d.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      })
    }
  } catch {
    /* intentionally ignored */
  }

  return (
    <article
      className={`group flex flex-col bg-white rounded-lg border border-[#E5E0D6] overflow-hidden card-subtle-shadow card-hover-lift hover:border-[#B8892F] relative transition-all duration-300 ${
        isNew ? 'ring-2 ring-[#B8892F] animate-pulse' : ''
      } ${className}`}
    >
      {/* Image or Gradient Placeholder */}
      <Link
        to={`/noticias/${article.slug || article.id}`}
        className="block relative aspect-[16/9] overflow-hidden bg-[#0B1F3A]"
      >
        {article.image_url ? (
          <img
            src={article.image_url}
            alt={article.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#0B1F3A] to-[#183863] flex items-center justify-center">
            <span className="font-serif text-4xl font-bold text-[#B8892F]/60 tracking-wider">
              {cat.initial}
            </span>
          </div>
        )}

        {/* Category Badge Floating on Image */}
        <div className="absolute top-3 left-3">
          <span
            className={`inline-flex items-center px-2.5 py-1 rounded text-[10px] font-mono font-bold uppercase tracking-wider backdrop-blur-md bg-white/90 shadow-sm ${cat.text}`}
          >
            {cat.label}
          </span>
        </div>

        {article.ai_analysis && (
          <div className="absolute top-3 right-3 bg-[#0B1F3A]/90 text-[#D4A853] px-2 py-0.5 rounded text-[10px] font-mono flex items-center gap-1 shadow">
            <Sparkles className="w-3 h-3 text-[#B8892F]" />
            <span>Síntese IA</span>
          </div>
        )}
      </Link>

      {/* Content Container */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Title */}
          <h3 className="font-serif text-base font-bold text-[#0B1F3A] mb-2 leading-snug line-clamp-2 group-hover:text-[#B8892F] transition-colors">
            <Link to={`/noticias/${article.slug || article.id}`}>{article.title}</Link>
          </h3>

          {/* AI Summary / Lead */}
          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
            {article.summary}
          </p>
        </div>

        {/* Footer Meta Row */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-mono">
          <span className="truncate max-w-[120px]" title={article.source}>
            {article.source}
          </span>

          <div className="flex items-center gap-2">
            <span>{displayDate}</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-slate-400" />
              {article.read_time_minutes || 3} min
            </span>
          </div>
        </div>
      </div>
    </article>
  )
}
