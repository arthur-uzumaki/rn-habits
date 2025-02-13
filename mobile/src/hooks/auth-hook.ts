import { useContext } from 'react'
import {
  AuthContext,
  type AuthContextProviderData,
} from '~/contexts/auth-provider-context'

export function useAuth(): AuthContextProviderData {
  const context = useContext(AuthContext)
  return context
}
