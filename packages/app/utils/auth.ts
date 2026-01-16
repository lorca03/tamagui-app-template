'use client'

/**
 * Auth DEMO (sin backend).
 *
 * - Guarda usuarios y sesión en localStorage.
 * - No es seguro para producción.
 * - Mantiene una interfaz simple (signUp/signIn/signOut/getSession).
 */

type DemoUser = {
  id: string
  email: string
  password: string
  name?: string
  created_at: string
}

type DemoSession = {
  user: {
    id: string
    email: string
    user_metadata: {
      name?: string
    }
  }
  access_token: string
}

const USERS_KEY = 'demo_users'
const SESSION_KEY = 'demo_session'

function safeParse<T>(value: string | null): T | null {
  if (!value) return null
  try {
    return JSON.parse(value) as T
  } catch {
    return null
  }
}

function getUsers(): DemoUser[] {
  const users = safeParse<DemoUser[]>(localStorage.getItem(USERS_KEY))
  return Array.isArray(users) ? users : []
}

function setUsers(users: DemoUser[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

function setSession(session: DemoSession) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(session))
}

export async function signUp(email: string, password: string, name?: string) {
  const normalizedEmail = email.trim().toLowerCase()
  if (!normalizedEmail) return { data: null, error: { message: 'Email requerido' } }
  if (!password) return { data: null, error: { message: 'Contraseña requerida' } }

  const users = getUsers()
  const exists = users.some((u) => u.email === normalizedEmail)
  if (exists) return { data: null, error: { message: 'Ese email ya existe' } }

  const user: DemoUser = {
    id: crypto.randomUUID(),
    email: normalizedEmail,
    password,
    name,
    created_at: new Date().toISOString(),
  }

  setUsers([user, ...users])

  const session: DemoSession = {
    user: {
      id: user.id,
      email: user.email,
      user_metadata: { name: user.name },
    },
    access_token: 'demo-token',
  }

  setSession(session)
  return { data: { session }, error: null }
}

export async function signIn(email: string, password: string) {
  const normalizedEmail = email.trim().toLowerCase()
  const users = getUsers()
  const user = users.find((u) => u.email === normalizedEmail)
  if (!user || user.password !== password) {
    return { data: null, error: { message: 'Email o contraseña incorrectos' } }
  }

  const session: DemoSession = {
    user: {
      id: user.id,
      email: user.email,
      user_metadata: { name: user.name },
    },
    access_token: 'demo-token',
  }

  setSession(session)
  return { data: { session, user }, error: null }
}

export async function signOut() {
  localStorage.removeItem(SESSION_KEY)
  return { error: null }
}

export async function getSession() {
  const session = safeParse<DemoSession>(localStorage.getItem(SESSION_KEY))
  return { data: { session }, error: null }
}
