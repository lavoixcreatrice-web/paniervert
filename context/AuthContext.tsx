'use client'
import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { User, Session } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export type Role = 'acheteur' | 'producteur' | 'livreur' | 'admin'

export interface UserProfile {
  id: string
  email: string
  nom?: string
  prenom?: string
  telephone?: string
  avatar_url?: string
  role: Role
  created_at: string
}

interface AuthContextType {
  user: User | null
  session: Session | null
  profile: UserProfile | null
  loading: boolean
  isProducteur: boolean
  isLivreur: boolean
  isAdmin: boolean
  refreshProfile: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null, session: null, profile: null, loading: true,
  isProducteur: false, isLivreur: false, isAdmin: false,
  refreshProfile: async () => {},
})

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)

  const loadProfile = async (userId: string) => {
    const { data } = await supabase.from('users').select('*').eq('id', userId).single()
    setProfile(data as UserProfile)
  }

  const refreshProfile = async () => { if (user) await loadProfile(user.id) }

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setUser(session?.user ?? null)
      if (session?.user) loadProfile(session.user.id)
      setLoading(false)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session)
      setUser(session?.user ?? null)
      if (session?.user) { await loadProfile(session.user.id) } else { setProfile(null) }
      setLoading(false)
    })
    return () => subscription.unsubscribe()
  }, [])

  return (
    <AuthContext.Provider value={{
      user, session, profile, loading,
      isProducteur: profile?.role === 'producteur',
      isLivreur: profile?.role === 'livreur',
      isAdmin: profile?.role === 'admin',
      refreshProfile,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() { return useContext(AuthContext) }

export function useRequireAuth(requiredRole?: string) {
  const auth = useAuth()
  const router = useRouter()
  useEffect(() => {
    if (!auth.loading && !auth.user) router.push('/connexion')
    if (!auth.loading && requiredRole && auth.profile?.role !== requiredRole) router.push('/')
  }, [auth.loading, auth.user, auth.profile, requiredRole, router])
  return auth
}
