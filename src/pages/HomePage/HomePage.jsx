import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAuthStore } from '../../store/authStore'
import './HomePage.css'

const HomePage = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { isAuthenticated } = useAuthStore()
  const rootRef = useRef(null)

  const handleGetStarted = () => {
    navigate(isAuthenticated ? '/menu' : '/menu-auth')
  }

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const fine = window.matchMedia('(pointer: fine)').matches
    const cleanups = []
    let rafCursor = 0

    const q = (sel) => root.querySelector(sel)
    const qa = (sel) => Array.from(root.querySelectorAll(sel))

    /* 1. Text split animation */
    qa('[data-split]').forEach((el) => {
      const text = el.textContent
      el.textContent = ''
      ;[...text].forEach((ch, i) => {
        const span = document.createElement('span')
        span.className = 'char'
        span.textContent = ch === ' ' ? ' ' : ch
        span.style.transitionDelay = `${i * 0.05}s`
        el.appendChild(span)
      })
    })
    requestAnimationFrame(() => {
      qa('.char').forEach((c) => c.classList.add('in'))
    })

    if (!reduceMotion && fine) {
      /* 7. Custom cursor with lerp */
      const dot = q('.cursor-dot')
      const ring = q('.cursor-ring')
      const ringText = q('.cursor-text')
      let mx = window.innerWidth / 2
      let my = window.innerHeight / 2
      let rx = mx
      let ry = my

      const onMove = (e) => {
        mx = e.clientX
        my = e.clientY
        if (dot) dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`
      }
      window.addEventListener('mousemove', onMove)
      cleanups.push(() => window.removeEventListener('mousemove', onMove))

      const loopCursor = () => {
        rx += (mx - rx) * 0.18
        ry += (my - ry) * 0.18
        if (ring) ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`
        rafCursor = requestAnimationFrame(loopCursor)
      }
      rafCursor = requestAnimationFrame(loopCursor)

      qa('[data-cursor], a, button').forEach((el) => {
        const enter = () => {
          ring && ring.classList.add('is-active')
          if (ringText) ringText.textContent = el.getAttribute('data-cursor') || ''
        }
        const leave = () => {
          ring && ring.classList.remove('is-active')
          if (ringText) ringText.textContent = ''
        }
        el.addEventListener('mouseenter', enter)
        el.addEventListener('mouseleave', leave)
        cleanups.push(() => {
          el.removeEventListener('mouseenter', enter)
          el.removeEventListener('mouseleave', leave)
        })
      })

      /* 2. Magnetic buttons / cards */
      qa('.magnetic').forEach((el) => {
        const strength = el.classList.contains('rd-card') ? 0.12 : 0.3
        const move = (e) => {
          const r = el.getBoundingClientRect()
          const x = e.clientX - (r.left + r.width / 2)
          const y = e.clientY - (r.top + r.height / 2)
          el.style.transform = `translate(${x * strength}px, ${y * strength}px)`
        }
        const reset = () => { el.style.transform = '' }
        el.addEventListener('mousemove', move)
        el.addEventListener('mouseleave', reset)
        cleanups.push(() => {
          el.removeEventListener('mousemove', move)
          el.removeEventListener('mouseleave', reset)
        })
      })
    }

    /* Scroll-based parallax + horizontal pin (rAF throttled) */
    if (!reduceMotion) {
      const heroBlob = q('.hero-blob')
      const featStroke = q('.section-title-stroke')
      const howSection = q('.how')
      const howTrack = q('.how-track')
      const howBar = q('.how-progress-bar')
      let ticking = false

      const onScrollFrame = () => {
        const scrollY = window.scrollY

        if (heroBlob) {
          heroBlob.style.transform = `translateY(calc(-50% + ${scrollY * 0.4}px))`
        }
        if (featStroke) {
          const rect = featStroke.parentElement.getBoundingClientRect()
          const rel = window.innerHeight - rect.top
          featStroke.style.transform = `translateX(${-rel * 0.08}px)`
        }
        if (howSection && howTrack) {
          const sectRect = howSection.getBoundingClientRect()
          const scrollable = howSection.offsetHeight - window.innerHeight
          const progressed = Math.min(Math.max(-sectRect.top, 0), scrollable)
          const pct = scrollable > 0 ? progressed / scrollable : 0
          const maxX = howTrack.scrollWidth - window.innerWidth
          howTrack.style.transform = `translateX(${-pct * maxX}px)`
          if (howBar) howBar.style.width = `${pct * 100}%`
        }
        ticking = false
      }

      const onScroll = () => {
        if (!ticking) {
          requestAnimationFrame(onScrollFrame)
          ticking = true
        }
      }
      window.addEventListener('scroll', onScroll, { passive: true })
      cleanups.push(() => window.removeEventListener('scroll', onScroll))
      onScrollFrame()
    }

    /* 5. Counter animation */
    const observers = []
    const animateCounter = (el) => {
      const target = parseInt(el.dataset.target, 10)
      const suffix = el.dataset.suffix || ''
      const dur = 1800
      const start = performance.now()
      const tick = (now) => {
        const p = Math.min((now - start) / dur, 1)
        const eased = 1 - Math.pow(1 - p, 3)
        el.textContent = Math.floor(eased * target).toLocaleString('ru-RU') + suffix
        if (p < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    }
    if (!reduceMotion) {
      const counterObs = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            animateCounter(e.target)
            counterObs.unobserve(e.target)
          }
        })
      }, { threshold: 0.5 })
      qa('.counter').forEach((c) => counterObs.observe(c))
      observers.push(counterObs)
    } else {
      qa('.counter').forEach((c) => {
        c.textContent = parseInt(c.dataset.target, 10).toLocaleString('ru-RU') + (c.dataset.suffix || '')
      })
    }

    /* AI card shimmer -> loaded */
    const aiCard = q('.ai-card')
    if (aiCard) {
      const aiObs = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setTimeout(() => aiCard.classList.add('loaded'), reduceMotion ? 0 : 1200)
            aiObs.unobserve(e.target)
          }
        })
      }, { threshold: 0.4 })
      aiObs.observe(aiCard)
      observers.push(aiObs)
    }

    return () => {
      cancelAnimationFrame(rafCursor)
      cleanups.forEach((fn) => fn())
      observers.forEach((o) => o.disconnect())
    }
  }, [])

  return (
    <div className="home-redesign" ref={rootRef}>
      <div className="cursor-dot" />
      <div className="cursor-ring"><span className="cursor-text">VIEW</span></div>

      {/* HERO */}
      <section className="hero">
        <div className="hero-blob" />
        <span className="label hero-est">{t('home.est')}</span>

        <div className="hero-content">
          <h1 className="hero-title">
            <span className="line-main" data-split>AskChef</span>
            <span className="line-sub">
              {t('home.subtitleLine1')}<br />{t('home.subtitleLine2')}
            </span>
          </h1>

          <div className="hero-cta">
            <button
              className="rd-btn rd-btn-primary magnetic"
              data-cursor="OPEN"
              onClick={handleGetStarted}
            >
              <span>{t('home.getStarted')}</span>
            </button>
            <button
              className="rd-btn rd-btn-secondary magnetic"
              data-cursor="VIEW"
              onClick={() => navigate('/recipes')}
            >
              <span>{t('home.learnMore')}</span>
            </button>
          </div>
        </div>

      </section>
      <div className="marquee">
        <div className="marquee-track">
          <span>{t('home.marquee')}</span>
          <span>{t('home.marquee')}</span>
        </div>
      </div>

      {/* FEATURES */}
      <section className="features">
        <div className="section-head">
          <span className="section-title-stroke">{t('home.featuresStroke')}</span>
          <span className="section-title-solid">{t('home.featuresTitle')}</span>
        </div>

        <div className="bento">
          <div className="rd-card big magnetic" data-speed="0.04" data-cursor="OPEN" onClick={handleGetStarted}>
            <div className="card-icon">
              <svg viewBox="0 0 24 24"><path d="M3 6h18M3 12h18M3 18h12" strokeLinecap="round" /></svg>
            </div>
            <div className="card-body">
              <h3>{t('home.features.menuPlanning.title')}</h3>
              <p>{t('home.features.menuPlanning.description')}</p>
            </div>
          </div>

          <div className="rd-card tall magnetic" data-speed="0.08" data-cursor="OPEN" onClick={() => navigate('/recipes')}>
            <div className="card-icon">
              <svg viewBox="0 0 24 24"><path d="M4 19V5a2 2 0 0 1 2-2h11l3 3v13M8 7h6M8 11h8M8 15h5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </div>
            <div className="card-body">
              <h3>{t('home.features.recipeDatabase.title')}</h3>
              <p>{t('home.features.recipeDatabase.description')}</p>
            </div>
          </div>

          <div className="rd-card small magnetic" data-speed="0.06" data-cursor="OPEN" onClick={handleGetStarted}>
            <div className="card-icon">
              <svg viewBox="0 0 24 24"><path d="M12 3v3M12 18v3M3 12h3M18 12h3M6 6l2 2M16 16l2 2M18 6l-2 2M8 16l-2 2M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </div>
            <div className="card-body">
              <h3>{t('home.features.aiAssistant.title')}</h3>
              <p>{t('home.features.aiAssistant.description')}</p>
            </div>
          </div>

          <div className="rd-card small magnetic" data-speed="0.1" data-cursor="OPEN" onClick={handleGetStarted}>
            <div className="card-icon">
              <svg viewBox="0 0 24 24"><path d="M6 6h15l-1.5 9h-12zM6 6 5 3H2M9 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM18 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </div>
            <div className="card-body">
              <h3>{t('home.features.shoppingList.title')}</h3>
              <p>{t('home.features.shoppingList.description')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="how">
        <div className="how-sticky">
          <div className="how-head"><h2>{t('home.howTitle')}</h2></div>
          <div className="how-progress"><div className="how-progress-bar" /></div>
          <div className="how-track">
            {['one', 'two', 'three'].map((key, i) => (
              <div className="step" key={key}>
                <span className="step-num">{`0${i + 1}`}</span>
                <div className="step-text">
                  <h3>{t(`home.steps.${key}.title`)}</h3>
                  <p>{t(`home.steps.${key}.description`)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI HIGHLIGHT */}
      <section className="ai">
        <div className="ai-left">
          <h2>{t('home.ai.titleLine1')}<br />{t('home.ai.titleLine2')}</h2>
          <p className="ai-desc">{t('home.ai.description')}</p>
          <div className="ai-stats">
            <div>
              <div className="stat-num counter" data-target="12500">0</div>
              <div className="stat-label">{t('home.ai.statRecipes')}</div>
            </div>
            <div>
              <div className="stat-num counter" data-target="48000" data-suffix="+">0</div>
              <div className="stat-label">{t('home.ai.statUsers')}</div>
            </div>
          </div>
        </div>

        <div className="ai-card">
          <div className="ai-card-img" />
          <div className="ai-card-line" />
          <div className="ai-card-line w70" />
          <div className="ai-card-line w40" />
          <div className="ai-card-content">
            <h4>{t('home.ai.cardTitle')}</h4>
            <p>{t('home.ai.cardMeta')}</p>
            <div className="ai-card-tags">
              <span>{t('home.ai.tagVegan')}</span>
              <span>{t('home.ai.tagFast')}</span>
              <span>{t('home.ai.tagSeasonal')}</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage
