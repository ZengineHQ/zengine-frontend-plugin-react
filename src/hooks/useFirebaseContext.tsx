import { useContext } from 'react'
import { FirebaseContext } from '../context'

/**
 * @returns {[any, Firebase]}
 */
export const useFirebaseContext = () => useContext(FirebaseContext)
