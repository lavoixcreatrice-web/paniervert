// lib/auth.ts
// Toutes les fonctions d'authentification Panier Vert

import { supabase } from './supabase'

// ── Types ────────────────────────────────────────────────────

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

// ── Connexion email + mot de passe ───────────────────────────

export async function signInWithEmail(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  if (error) throw error
  return data
}

// ── Connexion Google ─────────────────────────────────────────

export async function signInWithGoogle() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
    },
  })
  if (error) throw error
  return data
}

// ── Inscription acheteur ─────────────────────────────────────

export async function signUpAcheteur(
  email: string,
  password: string,
  nom: string,
  prenom: string
) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        role: 'acheteur',
        nom,
        prenom,
      },
      emailRedirectTo: `${window.location.origin}/auth/callback`,
    },
  })
  if (error) throw error

  // Mettre à jour le profil avec nom/prénom
  if (data.user) {
    await supabase
      .from('users')
      .update({ nom, prenom })
      .eq('id', data.user.id)
  }

  return data
}

// ── Inscription producteur (5 étapes) ────────────────────────

export async function signUpProducteur(
  email: string,
  password: string,
  profil: {
    nom: string
    prenom: string
    telephone: string
  },
  ferme: {
    nom: string
    type: string
    ville: string
    region: string
    description: string
  },
  abonnement: 'gratuit' | 'starter' | 'pro' | 'premium'
) {
  // 1. Créer le compte auth
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { role: 'producteur', ...profil },
      emailRedirectTo: `${window.location.origin}/auth/callback`,
    },
  })
  if (error) throw error
  if (!data.user) throw new Error('Erreur lors de la création du compte')

  // 2. Mettre à jour le profil user
  await supabase
    .from('users')
    .update({ ...profil })
    .eq('id', data.user.id)

  // 3. Créer la fiche producteur
  const slug = ferme.nom
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

  const { error: prodError } = await supabase
    .from('producteurs')
    .insert({
      user_id: data.user.id,
      nom: ferme.nom,
      slug,
      type: ferme.type,
      ville: ferme.ville,
      region: ferme.region,
      description: ferme.description,
      email_contact: email,
      telephone: profil.telephone,
      abonnement,
    })

  if (prodError) throw prodError

  return data
}

// ── Déconnexion ──────────────────────────────────────────────

export async function signOut() {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

// ── Réinitialisation mot de passe ────────────────────────────

export async function resetPassword(email: string) {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/auth/reset-password`,
  })
  if (error) throw error
}

// ── Récupérer le profil complet ──────────────────────────────

export async function getUserProfile(userId: string): Promise<UserProfile | null> {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single()

  if (error) return null
  return data as UserProfile
}

// ── Récupérer la session courante ────────────────────────────

export async function getSession() {
  const { data: { session } } = await supabase.auth.getSession()
  return session
}
