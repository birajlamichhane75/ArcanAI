import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function OnboardingPage() {
  const navigate = useNavigate()
  const { user, setOnboardingData } = useAuth()
  const [websiteUrl, setWebsiteUrl] = useState('')
  const [companyName, setCompanyName] = useState('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setOnboardingData(companyName, websiteUrl)
    navigate('/analysis')
  }

  return (
    <div className="relative min-h-[calc(100vh-65px)] flex items-center justify-center px-6 py-16 overflow-hidden">
      {/* Background orbs */}
      <div className="pointer-events-none absolute w-[500px] h-[500px] rounded-full bg-primary/20 blur-3xl -top-48 -left-32 dark:opacity-[0.06]" />
      <div className="pointer-events-none absolute w-[400px] h-[400px] rounded-full bg-emerald-500/15 blur-3xl bottom-[-10%] -right-32 dark:opacity-[0.05]" />

      <div className="relative w-full max-w-md" style={{ animation: 'fadeup 0.6s ease-out both' }}>
        <div className="rounded-2xl border border-border bg-surface p-8 md:p-10 shadow-sm">
          <div className="mb-8">
            {/* Progress indicator */}
            <div className="flex items-center gap-3 mb-7">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold shadow-sm shadow-primary/20">
                2
              </div>
              <div className="flex-1 h-1.5 rounded-full bg-border overflow-hidden">
                <div className="h-full w-1/2 bg-primary rounded-full shadow-sm shadow-primary/30" />
              </div>
            </div>

            <h1 className="text-2xl font-bold text-text-heading tracking-tight">
              Tell us about your business
            </h1>
            {user?.email && (
              <p className="mt-2 text-sm text-text">
                Welcome, <span className="text-text-heading font-medium">{user.email}</span>
              </p>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="companyName" className="block text-sm font-medium text-text-heading mb-2">
                Company name
              </label>
              <input
                id="companyName"
                type="text"
                required
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="Acme Inc."
                className="w-full px-4 py-3 rounded-xl border border-border bg-bg text-text-heading placeholder:text-text/40 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/50 transition-all duration-200"
              />
            </div>

            <div>
              <label htmlFor="websiteUrl" className="block text-sm font-medium text-text-heading mb-2">
                Website URL
              </label>
              <input
                id="websiteUrl"
                type="url"
                required
                value={websiteUrl}
                onChange={(e) => setWebsiteUrl(e.target.value)}
                placeholder="https://yourcompany.com"
                className="w-full px-4 py-3 rounded-xl border border-border bg-bg text-text-heading placeholder:text-text/40 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/50 transition-all duration-200"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-primary text-white font-semibold shadow-lg shadow-primary/25 hover:bg-primary-dark hover:shadow-xl hover:shadow-primary/30 transition-all duration-200 cursor-pointer"
            >
              Start Analysis
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
