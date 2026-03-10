'use client'
import { useState } from 'react'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import Link from 'next/link'

type Mode = 'connexion' | 'inscription' | 'mot-de-passe'

export default function ConnexionPage() {
  const [mode, setMode] = useState<Mode>('connexion')
  const [typeCompte, setTypeCompte] = useState<'acheteur' | 'vendeur'>('acheteur')
  const [etape, setEtape] = useState(1)
  const [succes, setSucces] = useState(false)

  // Champs formulaire
  const [email, setEmail] = useState('')
  const [motDePasse, setMotDePasse] = useState('')
  const [nom, setNom] = useState('')
  const [prenom, setPrenom] = useState('')
  const [telephone, setTelephone] = useState('')
  const [ville, setVille] = useState('')
  const [afficherMDP, setAfficherMDP] = useState(false)

  const handleConnexion = (e: React.FormEvent) => {
    e.preventDefault()
    setSucces(true)
    setTimeout(() => { window.location.href = '/' }, 2000)
  }

  const handleInscription = (e: React.FormEvent) => {
    e.preventDefault()
    if (etape === 1) { setEtape(2); return }
    setSucces(true)
    setTimeout(() => { window.location.href = '/' }, 2000)
  }

  const inputStyle = {
    width: '100%', padding: '13px 16px', borderRadius: 10,
    border: '2px solid #e8e0d0', background: 'white',
    fontFamily: 'system-ui', fontSize: 15, color: '#1a1a1a',
    outline: 'none', boxSizing: 'border-box' as const,
    transition: 'border-color 0.2s'
  }

  const labelStyle = {
    display: 'block', fontFamily: 'system-ui', fontSize: 13,
    fontWeight: 600, color: '#555', marginBottom: 6
  }

  if (succes) {
    return (
      <div style={{ minHeight: '100vh', background: '#f5f0e8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', padding: 40 }}>
          <div style={{ fontSize: 72, marginBottom: 20 }}>🎉</div>
          <h2 style={{ fontSize: 28, fontWeight: 700, color: '#1a3a15', marginBottom: 8 }}>
            {mode === 'connexion' ? 'Bienvenue !' : 'Compte créé !'}
          </h2>
          <p style={{ fontFamily: 'system-ui', color: '#666', fontSize: 16 }}>
            Redirection en cours...
          </p>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f5f0e8', fontFamily: 'Georgia, serif' }}>
      <Nav page="connexion" />

      <div style={{ maxWidth: 500, margin: '40px auto', padding: '0 24px 60px' }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>🧺</div>
          <h1 style={{ fontSize: 26, fontWeight: 700, color: '#1a3a15' }}>Panier Vert</h1>
          <p style={{ fontFamily: 'system-ui', color: '#888', fontSize: 14 }}>Marché local de l'Estrie</p>
        </div>

        {/* Carte principale */}
        <div style={{ background: 'white', borderRadius: 20, padding: '32px', boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}>

          {/* ====== MODE CONNEXION ====== */}
          {mode === 'connexion' && (
            <>
              <h2 style={{ fontSize: 22, fontWeight: 700, color: '#1a1a1a', marginBottom: 6 }}>Se connecter</h2>
              <p style={{ fontFamily: 'system-ui', color: '#888', fontSize: 14, marginBottom: 28 }}>
                Accédez à votre compte Panier Vert
              </p>

              <form onSubmit={handleConnexion}>
                <div style={{ marginBottom: 18 }}>
                  <label style={labelStyle}>Courriel</label>
                  <input
                    type="email" value={email} onChange={e => setEmail(e.target.value)}
                    placeholder="vous@exemple.com" required style={inputStyle}
                    onFocus={e => (e.target.style.borderColor = '#1a3a15')}
                    onBlur={e => (e.target.style.borderColor = '#e8e0d0')}
                  />
                </div>

                <div style={{ marginBottom: 8 }}>
                  <label style={labelStyle}>Mot de passe</label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type={afficherMDP ? 'text' : 'password'} value={motDePasse}
                      onChange={e => setMotDePasse(e.target.value)}
                      placeholder="••••••••" required style={inputStyle}
                      onFocus={e => (e.target.style.borderColor = '#1a3a15')}
                      onBlur={e => (e.target.style.borderColor = '#e8e0d0')}
                    />
                    <button type="button" onClick={() => setAfficherMDP(!afficherMDP)} style={{
                      position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
                      background: 'none', border: 'none', cursor: 'pointer', fontSize: 18, color: '#888'
                    }}>
                      {afficherMDP ? '🙈' : '👁️'}
                    </button>
                  </div>
                </div>

                <div style={{ textAlign: 'right', marginBottom: 24 }}>
                  <button type="button" onClick={() => setMode('mot-de-passe')} style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    color: '#1a3a15', fontFamily: 'system-ui', fontSize: 13, fontWeight: 600
                  }}>
                    Mot de passe oublié ?
                  </button>
                </div>

                <button type="submit" style={{
                  width: '100%', padding: '14px', borderRadius: 12, border: 'none',
                  background: '#1a3a15', color: '#f5e6c8',
                  fontFamily: 'system-ui', fontSize: 16, fontWeight: 700, cursor: 'pointer',
                  marginBottom: 16, transition: 'opacity 0.2s'
                }}>
                  Se connecter →
                </button>

                {/* Séparateur */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                  <div style={{ flex: 1, height: 1, background: '#e8e0d0' }} />
                  <span style={{ fontFamily: 'system-ui', fontSize: 12, color: '#aaa' }}>ou</span>
                  <div style={{ flex: 1, height: 1, background: '#e8e0d0' }} />
                </div>

                {/* Google */}
                <button type="button" style={{
                  width: '100%', padding: '12px', borderRadius: 12,
                  border: '2px solid #e8e0d0', background: 'white',
                  fontFamily: 'system-ui', fontSize: 14, fontWeight: 600,
                  cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, color: '#1a1a1a'
                }}>
                  <span style={{ fontSize: 20 }}>G</span> Continuer avec Google
                </button>
              </form>

              <p style={{ textAlign: 'center', marginTop: 24, fontFamily: 'system-ui', fontSize: 14, color: '#888' }}>
                Pas encore de compte ?{' '}
                <button onClick={() => setMode('inscription')} style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: '#1a3a15', fontWeight: 700, fontSize: 14
                }}>
                  Créer un compte →
                </button>
              </p>
            </>
          )}

          {/* ====== MODE INSCRIPTION ====== */}
          {mode === 'inscription' && (
            <>
              {/* Type de compte */}
              <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
                {(['acheteur', 'vendeur'] as const).map(t => (
                  <button
                    key={t}
                    onClick={() => setTypeCompte(t)}
                    style={{
                      flex: 1, padding: '12px', borderRadius: 12, cursor: 'pointer',
                      border: typeCompte === t ? '2px solid #1a3a15' : '2px solid #e8e0d0',
                      background: typeCompte === t ? '#1a3a15' : 'white',
                      color: typeCompte === t ? '#f5e6c8' : '#888',
                      fontFamily: 'system-ui', fontSize: 14, fontWeight: 600, transition: 'all 0.2s'
                    }}
                  >
                    {t === 'acheteur' ? '🛒 Acheteur' : '🌾 Vendeur'}
                  </button>
                ))}
              </div>

              {/* Étapes */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24 }}>
                {[1, 2].map(e => (
                  <div key={e} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{
                      width: 28, height: 28, borderRadius: '50%', display: 'flex',
                      alignItems: 'center', justifyContent: 'center',
                      background: etape >= e ? '#1a3a15' : '#e8e0d0',
                      color: etape >= e ? '#f5e6c8' : '#aaa',
                      fontFamily: 'system-ui', fontSize: 13, fontWeight: 700
                    }}>{e}</div>
                    {e < 2 && <div style={{ flex: 1, width: 60, height: 2, background: etape > e ? '#1a3a15' : '#e8e0d0' }} />}
                  </div>
                ))}
                <span style={{ fontFamily: 'system-ui', fontSize: 12, color: '#888', marginLeft: 4 }}>
                  {etape === 1 ? 'Informations' : 'Confirmation'}
                </span>
              </div>

              <h2 style={{ fontSize: 20, fontWeight: 700, color: '#1a1a1a', marginBottom: 20 }}>
                {etape === 1 ? 'Créer un compte' : 'Confirmer votre compte'}
              </h2>

              <form onSubmit={handleInscription}>
                {etape === 1 && (
                  <>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
                      <div>
                        <label style={labelStyle}>Prénom</label>
                        <input value={prenom} onChange={e => setPrenom(e.target.value)}
                          placeholder="Marie" required style={inputStyle}
                          onFocus={e => (e.target.style.borderColor = '#1a3a15')}
                          onBlur={e => (e.target.style.borderColor = '#e8e0d0')} />
                      </div>
                      <div>
                        <label style={labelStyle}>Nom</label>
                        <input value={nom} onChange={e => setNom(e.target.value)}
                          placeholder="Tremblay" required style={inputStyle}
                          onFocus={e => (e.target.style.borderColor = '#1a3a15')}
                          onBlur={e => (e.target.style.borderColor = '#e8e0d0')} />
                      </div>
                    </div>

                    <div style={{ marginBottom: 16 }}>
                      <label style={labelStyle}>Courriel</label>
                      <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                        placeholder="vous@exemple.com" required style={inputStyle}
                        onFocus={e => (e.target.style.borderColor = '#1a3a15')}
                        onBlur={e => (e.target.style.borderColor = '#e8e0d0')} />
                    </div>

                    <div style={{ marginBottom: 16 }}>
                      <label style={labelStyle}>Téléphone</label>
                      <input type="tel" value={telephone} onChange={e => setTelephone(e.target.value)}
                        placeholder="(819) 555-1234" style={inputStyle}
                        onFocus={e => (e.target.style.borderColor = '#1a3a15')}
                        onBlur={e => (e.target.style.borderColor = '#e8e0d0')} />
                    </div>

                    <div style={{ marginBottom: 16 }}>
                      <label style={labelStyle}>Ville</label>
                      <select value={ville} onChange={e => setVille(e.target.value)} required style={inputStyle}>
                        <option value="">Choisir une ville...</option>
                        {['Magog', 'Compton', 'Sherbrooke', 'Orford', 'Bromont', 'Waterloo', 'Dunham', 'Austin', 'Autre'].map(v => (
                          <option key={v}>{v}</option>
                        ))}
                      </select>
                    </div>

                    <div style={{ marginBottom: 24 }}>
                      <label style={labelStyle}>Mot de passe</label>
                      <div style={{ position: 'relative' }}>
                        <input type={afficherMDP ? 'text' : 'password'} value={motDePasse}
                          onChange={e => setMotDePasse(e.target.value)}
                          placeholder="8 caractères minimum" required minLength={8} style={inputStyle}
                          onFocus={e => (e.target.style.borderColor = '#1a3a15')}
                          onBlur={e => (e.target.style.borderColor = '#e8e0d0')} />
                        <button type="button" onClick={() => setAfficherMDP(!afficherMDP)} style={{
                          position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
                          background: 'none', border: 'none', cursor: 'pointer', fontSize: 18, color: '#888'
                        }}>
                          {afficherMDP ? '🙈' : '👁️'}
                        </button>
                      </div>
                      {/* Force du mot de passe */}
                      {motDePasse && (
                        <div style={{ display: 'flex', gap: 4, marginTop: 8 }}>
                          {[1,2,3,4].map(i => (
                            <div key={i} style={{
                              flex: 1, height: 4, borderRadius: 2,
                              background: motDePasse.length >= i * 2 ? (motDePasse.length >= 8 ? '#166534' : '#f59e0b') : '#e8e0d0'
                            }} />
                          ))}
                          <span style={{ fontSize: 11, fontFamily: 'system-ui', color: '#888', marginLeft: 4 }}>
                            {motDePasse.length < 4 ? 'Faible' : motDePasse.length < 8 ? 'Moyen' : 'Fort'}
                          </span>
                        </div>
                      )}
                    </div>
                  </>
                )}

                {etape === 2 && (
                  <div style={{ textAlign: 'center', padding: '20px 0' }}>
                    <div style={{ fontSize: 64, marginBottom: 16 }}>📧</div>
                    <h3 style={{ fontSize: 18, fontWeight: 700, color: '#1a1a1a', marginBottom: 8, fontFamily: 'system-ui' }}>
                      Vérifiez votre courriel
                    </h3>
                    <p style={{ fontFamily: 'system-ui', color: '#666', fontSize: 14, lineHeight: 1.7, marginBottom: 24 }}>
                      Un courriel de confirmation a été envoyé à<br />
                      <strong style={{ color: '#1a3a15' }}>{email}</strong>
                    </p>
                    <div style={{ background: '#f5f0e8', borderRadius: 12, padding: '16px', marginBottom: 24 }}>
                      <p style={{ fontFamily: 'system-ui', fontSize: 13, color: '#666' }}>
                        ✓ Compte : <strong>{typeCompte === 'acheteur' ? 'Acheteur' : 'Vendeur'}</strong><br />
                        ✓ Nom : <strong>{prenom} {nom}</strong><br />
                        ✓ Ville : <strong>{ville}</strong>
                      </p>
                    </div>
                  </div>
                )}

                <button type="submit" style={{
                  width: '100%', padding: '14px', borderRadius: 12, border: 'none',
                  background: '#1a3a15', color: '#f5e6c8',
                  fontFamily: 'system-ui', fontSize: 16, fontWeight: 700, cursor: 'pointer',
                  marginBottom: 16
                }}>
                  {etape === 1 ? 'Continuer →' : '✓ Créer mon compte'}
                </button>

                {etape === 2 && (
                  <button type="button" onClick={() => setEtape(1)} style={{
                    width: '100%', padding: '12px', borderRadius: 12,
                    border: '2px solid #e8e0d0', background: 'white',
                    fontFamily: 'system-ui', fontSize: 14, cursor: 'pointer', color: '#666'
                  }}>
                    ← Modifier mes informations
                  </button>
                )}
              </form>

              {etape === 1 && (
                <p style={{ textAlign: 'center', marginTop: 20, fontFamily: 'system-ui', fontSize: 14, color: '#888' }}>
                  Déjà un compte ?{' '}
                  <button onClick={() => setMode('connexion')} style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    color: '#1a3a15', fontWeight: 700, fontSize: 14
                  }}>
                    Se connecter →
                  </button>
                </p>
              )}

              {typeCompte === 'vendeur' && etape === 1 && (
                <div style={{ marginTop: 16, background: '#e8f5e9', borderRadius: 12, padding: '12px 14px' }}>
                  <p style={{ fontFamily: 'system-ui', fontSize: 12, color: '#166534' }}>
                    🌾 Vous serez redirigé vers le formulaire complet d'inscription vendeur après la création de votre compte.
                  </p>
                </div>
              )}
            </>
          )}

          {/* ====== MOT DE PASSE OUBLIÉ ====== */}
          {mode === 'mot-de-passe' && (
            <>
              <button onClick={() => setMode('connexion')} style={{
                background: 'none', border: 'none', cursor: 'pointer',
                color: '#888', fontFamily: 'system-ui', fontSize: 13, marginBottom: 20,
                display: 'flex', alignItems: 'center', gap: 6
              }}>
                ← Retour
              </button>

              <div style={{ textAlign: 'center', marginBottom: 24 }}>
                <div style={{ fontSize: 48, marginBottom: 12 }}>🔑</div>
                <h2 style={{ fontSize: 22, fontWeight: 700, color: '#1a1a1a', marginBottom: 8 }}>Mot de passe oublié</h2>
                <p style={{ fontFamily: 'system-ui', color: '#888', fontSize: 14 }}>
                  Entrez votre courriel pour recevoir un lien de réinitialisation
                </p>
              </div>

              <form onSubmit={e => { e.preventDefault(); setSucces(true) }}>
                <div style={{ marginBottom: 24 }}>
                  <label style={labelStyle}>Courriel</label>
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                    placeholder="vous@exemple.com" required style={inputStyle}
                    onFocus={e => (e.target.style.borderColor = '#1a3a15')}
                    onBlur={e => (e.target.style.borderColor = '#e8e0d0')} />
                </div>
                <button type="submit" style={{
                  width: '100%', padding: '14px', borderRadius: 12, border: 'none',
                  background: '#1a3a15', color: '#f5e6c8',
                  fontFamily: 'system-ui', fontSize: 16, fontWeight: 700, cursor: 'pointer'
                }}>
                  Envoyer le lien →
                </button>
              </form>
            </>
          )}
        </div>

        {/* Sécurité */}
        <div style={{ textAlign: 'center', marginTop: 20, fontFamily: 'system-ui', fontSize: 12, color: '#aaa' }}>
          🔒 Connexion sécurisée · Vos données sont protégées
        </div>
      </div>

      <Footer />
    </div>
  )
}
