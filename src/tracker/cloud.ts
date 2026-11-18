import { initializeApp } from 'firebase/app'
import {
  GoogleAuthProvider,
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  type User,
} from 'firebase/auth'
import { collection, deleteDoc, doc, getFirestore, onSnapshot, setDoc } from 'firebase/firestore'
import { profile } from '../data'
import type { Application, InterviewNote, TrackerData } from './model'

const config = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

export const isTrackerConfigured = Boolean(config.apiKey && config.authDomain && config.projectId && config.appId)

export const allowedEmail = profile.email

const app = isTrackerConfigured ? initializeApp(config) : null
const auth = app ? getAuth(app) : null
const db = app ? getFirestore(app) : null

export const signIn = async () => {
  if (!auth) return
  await signInWithPopup(auth, new GoogleAuthProvider())
}

export const signOutTracker = async () => {
  if (!auth) return
  await signOut(auth)
}

export const watchAuth = (onChange: (user: User | null) => void) => {
  if (!auth) return () => {}
  return onAuthStateChanged(auth, onChange)
}

export const watchData = (uid: string, onChange: (data: TrackerData) => void) => {
  if (!db) return () => {}
  let applications: Application[] = []
  let interviews: InterviewNote[] = []
  const emit = () => onChange({ applications, interviews })
  const unsubApplications = onSnapshot(collection(db, 'users', uid, 'applications'), (snapshot) => {
    applications = snapshot.docs.map((item) => item.data() as Application)
    emit()
  })
  const unsubInterviews = onSnapshot(collection(db, 'users', uid, 'interviews'), (snapshot) => {
    interviews = snapshot.docs.map((item) => item.data() as InterviewNote)
    emit()
  })
  return () => {
    unsubApplications()
    unsubInterviews()
  }
}

export const saveApplication = (uid: string, item: Application) => {
  if (!db) return Promise.resolve()
  return setDoc(doc(db, 'users', uid, 'applications', item.id), item)
}

export const removeApplication = (uid: string, id: string) => {
  if (!db) return Promise.resolve()
  return deleteDoc(doc(db, 'users', uid, 'applications', id))
}

export const saveInterview = (uid: string, item: InterviewNote) => {
  if (!db) return Promise.resolve()
  return setDoc(doc(db, 'users', uid, 'interviews', item.id), item)
}

export const removeInterview = (uid: string, id: string) => {
  if (!db) return Promise.resolve()
  return deleteDoc(doc(db, 'users', uid, 'interviews', id))
}
