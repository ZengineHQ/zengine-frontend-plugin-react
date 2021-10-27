import React, { useState, useEffect, createContext } from 'react'
import * as Firebase from 'firebase'
import { useZengineContext } from '@zenginehq/react-sdk'

const defaultFirebaseContext = {
  title: '',
}

export const convertUndefinedPropsToNull = (obj) => {
  if (obj == null) return null

  if (Array.isArray(obj)) {
    return obj.map((el) => convertUndefinedPropsToNull(el))
  }

  if (typeof obj === 'object') {
    return Object.keys(obj).reduce(
      (newObj, key) => ({
        ...newObj,
        [key]: convertUndefinedPropsToNull(obj[key]),
      }),
      {},
    )
  }

  return obj
}
export const FirebaseContext = createContext()

export const FirebaseProvider = ({ children, noloader, LoadingStateComponent }) => {
  /**
   * @type {[Firebase, Function]}
   */
  const [firebaseRef, setFirebaseRef] = useState()
  const [context, setContext] = useState(null)

  const { context: { plugin: { firebaseUrl, firebaseAuthToken } = {}, workspace: { id: workspaceId } = {} } = {} } = useZengineContext()

  useEffect(() => {
    ;(async () => {
      if (firebaseUrl && workspaceId) {
        const fbRef = new Firebase(`${firebaseUrl}/workspace/${workspaceId}/`)
        if (firebaseAuthToken) {
          fbRef.authWithCustomToken(firebaseAuthToken, (error) => {
            if (error) {
              console.log('Firebase Login Failed!', error)
            }

            setFirebaseRef(fbRef)
          })
        }
      }
    })()
  }, [firebaseAuthToken, firebaseUrl])

  useEffect(() => {
    if (firebaseRef && workspaceId) {
      firebaseRef.on('value', (snap) => {
        const val = snap.val()

        if (val) {
          setContext(val)
        } else {
          setContext(defaultFirebaseContext)
        }
      })
    }
  }, [firebaseRef, workspaceId])

  return (
    <FirebaseContext.Provider value={[context, firebaseRef]}>
      {noloader || context ? children : LoadingStateComponent || <h3 className="text-yellow-500 text-center">Loading Firebase Data...</h3>}
    </FirebaseContext.Provider>
  )
}
/**
 * Helpers for firebase interactions
 * @param {Firebase} fbRef
 */
export const fb = (fbRef) => ({
  update: (segments = [], value) => {
    let ref = fbRef

    for (const segment of segments) {
      ref = ref.child(segment)
    }

    return new Promise((resolve, reject) => ref.update(convertUndefinedPropsToNull(value), (err) => (err ? reject(err) : resolve())))
  },
  remove: (segments = []) => {
    let ref = fbRef

    for (const segment of segments) {
      ref = ref.child(segment)
    }

    return new Promise((resolve, reject) => ref.remove((err) => (err ? reject(err) : resolve())))
  },
  at: (segments = []) => {
    let ref = fbRef

    for (const segment of segments) {
      ref = ref.child(segment)
    }

    return ref
  },
})
