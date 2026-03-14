'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

type Mode = 'login' | 'register' | 'forgot'
type Role = 'acheteur' | 'producteur'
type Step = 1 | 2

export default function ConnexionPage() {
  const router = useRouter()
  const [mode, setMode] = useState<Mode>('login')
  const [step, setStep] = useState<Step>(1)
  const [role, setRole] = useState<Role>('acheteur')
  const [prenom, setPrenom] = useState('')
  const [nom, setNom] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  const passwordStrength = (p: string) => {
    let score = 0
    if (p.length >= 8) score++
    if (/[A-Z]/.test(p)) score++
    if (/[0-9]/.test(p)) score++
    if (/[^A-Za-z0-9]/.test(p)) score++
    if (p.length >= 12) score++
    return score
  }

  const strengthLabel = ['', 'Faible', 'Moyen', 'Bon', 'Fort', 'Très fort']
  const strengthColor = ['', '#ef4444', '#f97316', '#eab308', '#22c55e', '#16a34a']
  const ps = passwordStrength(password)

  const handleLogin = async () => {
    setLoading(true)
    setError('')
    console.log('Tentative connexion:', email)
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password })
      console.log('Résultat:', data, error)
      if (error) {
        setError('Erreur: ' + error.message)
      } else {
        router.push('/')
        router.refresh()
      }
    } catch(e) {
      console.log('Exception:', e)
      setError('Erreur réseau - vérifiez votre connexion')
    }
    setLoading(false)
  }

  const handleRegisterStep1 = () => {
    if (!prenom || !nom || !email || password.length < 6) {
      setError('Veuillez remplir tous les champs.')
      return
    }
    setError('')
    setStep(2)
  }

  const handleRegisterStep2 = async () => {
    setLoading(true)
    setError('')
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { prenom, nom, role } }
      })
      if (error) {
        setError(error.message)
      } else {
        setMessage('Compte créé ! Vous pouvez maintenant vous connecter.')
        setMode('login')
        setStep(1)
      }
    } catch(e) {
      setError('Erreur réseau')
    }
    setLoading(false)
  }

  const handleForgot = async () => {
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/callback`
    })
    if (error) {
      setError(error.message)
    } else {
      setMessage('Email de réinitialisation envoyé !')
    }
    setLoading(false)
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ background: 'white', borderRadius: '16px', padding: '40px', width: '100%', maxWidth: '420px', boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}>
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div style={{ fontSize: '36px', marginBottom: '8px' }}>🌿</div>
          <h1 style={{ margin: 0, fontSize: '22px', color: '#2d4a1e', fontWeight: '700' }}>Le Panier Vert</h1>
          <p style={{ margin: '4px 0 0', color: '#666', fontSize: '14px' }}>
            {mode === 'login' && 'Connectez-vous à votre compte'}
            {mode === 'register' && `Créer votre compte — Étape ${step}/2`}
            {mode === 'forgot' && 'Réinitialiser votre mot de passe'}
          </p>
        </div>

        {error && <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px', padding: '12px', marginBottom: '16px', color: '#dc2626', fontSize: '14px' }}>{error}</div>}
        {message && <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '8px', padding: '12px', marginBottom: '16px', color: '#16a34a', fontSize: '14px' }}>{message}</div>}

        {mode === 'login' && (
          <>
            <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} style={inputStyle} />
            <div style={{ position: 'relative' }}>
              <input type={showPassword ? 'text' : 'password'} placeholder="Mot de passe" value={password} onChange={e => setPassword(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleLogin()} style={{ ...inputStyle, paddingRight: '44px' }} />
              <button onClick={() => setShowPassword(!showPassword)} style={eyeBtn}>{showPassword ? '🙈' : '👁️'}</button>
            </div>
            <button onClick={handleLogin} disabled={loading} style={primaryBtn}>{loading ? 'Connexion...' : 'Se connecter'}</button>
            <div style={{ textAlign: 'center', margin: '16px 0', color: '#999', fontSize: '13px' }}>ou</div>
            <button onClick={() => supabase.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: `${window.location.origin}/auth/callback` } })} style={googleBtn}>
              🔍 &nbsp;Continuer avec Google
            </button>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px' }}>
              <button onClick={() => { setMode('forgot'); setError(''); setMessage('') }} style={linkBtn}>Mot de passe oublié ?</button>
              <button onClick={() => { setMode('register'); setStep(1); setError(''); setMessage('') }} style={linkBtn}>Créer un compte →</button>
            </div>
          </>
        )}

        {mode === 'register' && step === 1 && (
          <>
            <div style={{ display: 'flex', gap: '12px' }}>
              <input type="text" placeholder="Prénom" value={prenom} onChange={e => setPrenom(e.target.value)} style={inputStyle} />
              <input type="text" placeholder="Nom" value={nom} onChange={e => setNom(e.target.value)} style={inputStyle} />
            </div>
            <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} style={inputStyle} />
            <div style={{ position: 'relative' }}>
              <input type={showPassword ? 'text' : 'password'} placeholder="Mot de passe" value={password} onChange={e => setPassword(e.target.value)} style={{ ...inputStyle, paddingRight: '44px' }} />
              <button onClick={() => setShowPassword(!showPassword)} style={eyeBtn}>{showPassword ? '🙈' : '👁️'}</button>
            </div>
            {password && (
              <div style={{ marginTop: '-8px', marginBottom: '12px' }}>
                <div style={{ display: 'flex', gap: '4px', marginBottom: '4px' }}>
                  {[1,2,3,4,5].map(i => <div key={i} style={{ height: '4px', flex: 1, borderRadius: '2px', background: i <= ps ? strengthColor[ps] : '#e5e7eb' }} />)}
                </div>
                <span style={{ fontSize: '12px', color: strengthColor[ps] }}>{strengthLabel[ps]}</span>
              </div>
            )}
            <button onClick={handleRegisterStep1} style={primaryBtn}>Suivant →</button>
            <div style={{ textAlign: 'center', marginTop: '16px' }}>
              <button onClick={() => { setMode('login'); setError('') }} style={linkBtn}>← Retour à la connexion</button>
            </div>
          </>
        )}

        {mode === 'register' && step === 2 && (
          <>
            <p style={{ margin: '0 0 16px', color: '#555', fontSize: '14px' }}>Je m'inscris en tant que :</p>
            <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
              {(['acheteur', 'producteur'] as Role[]).map(r => (
                <button key={r} onClick={() => setRole(r)} style={{ flex: 1, padding: '16px', borderRadius: '10px', cursor: 'pointer', textAlign: 'center', border: role === r ? '2px solid #4a7c2f' : '2px solid #e5e7eb', background: role === r ? '#f0fdf4' : 'white', color: role === r ? '#2d4a1e' : '#555' }}>
                  <div style={{ fontSize: '24px', marginBottom: '4px' }}>{r === 'acheteur' ? '🛒' : '🌱'}</div>
                  <div style={{ fontWeight: '600' }}>{r === 'acheteur' ? 'Acheteur' : 'Producteur'}</div>
                  <div style={{ fontSize: '12px', marginTop: '4px' }}>{r === 'acheteur' ? 'Je commande des produits locaux' : 'Je vends ma production'}</div>
                </button>
              ))}
            </div>
            <button onClick={handleRegisterStep2} disabled={loading} style={primaryBtn}>{loading ? 'Création...' : 'Créer mon compte'}</button>
            <div style={{ textAlign: 'center', marginTop: '16px' }}>
              <button onClick={() => setStep(1)} style={linkBtn}>← Retour</button>
            </div>
          </>
        )}

        {mode === 'forgot' && (
          <>
            <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} style={inputStyle} />
            <button onClick={handleForgot} disabled={loading} style={primaryBtn}>{loading ? 'Envoi...' : 'Envoyer le lien'}</button>
            <div style={{ textAlign: 'center', marginTop: '16px' }}>
              <button onClick={() => { setMode('login'); setError(''); setMessage('') }} style={linkBtn}>← Retour à la connexion</button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

const inputStyle: React.CSSProperties = { width: '100%', padding: '12px 14px', marginBottom: '12px', borderRadius: '8px', border: '1.5px solid #e5e7eb', fontSize: '15px', outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit' }
const primaryBtn: React.CSSProperties = { width: '100%', padding: '13px', borderRadius: '8px', border: 'none', background: '#4a7c2f', color: 'white', fontSize: '15px', fontWeight: '600', cursor: 'pointer', marginTop: '4px' }
const googleBtn: React.CSSProperties = { width: '100%', padding: '12px', borderRadius: '8px', border: '1.5px solid #e5e7eb', background: 'white', fontSize: '15px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }
const linkBtn: React.CSSProperties = { background: 'none', border: 'none', color: '#4a7c2f', fontSize: '13px', cursor: 'pointer', textDecoration: 'underline', padding: 0 }
const eyeBtn: React.CSSProperties = { position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px', marginTop: '-6px' }
