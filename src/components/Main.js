import React from 'react'

import '@zenginehq/zengine-ui/style.css'
import { useFirebaseContext } from '../hooks'

export const Main = () => {
  const [firebaseData] = useFirebaseContext()
  return (
    <>
      <div className="container">
        <div className="jumbotron">
          <h1 className="display-6">Welcome to a React Frontend Plugin</h1>
          <p className="lead">This implementation show firebase and react components from Zengine</p>
          <hr className="my-4" />
          <p>
            For full list of components goto:
            <a href={'https://zenginehq.github.io/plugin-sdk/?path=/story/components-molecules-datefield--default'}>
              https://zenginehq.github.io/plugin-sdk/?path=/story/components-molecules-datefield--default
            </a>
          </p>
          <h2>Firebase Data</h2>
          <pre>{JSON.stringify(firebaseData)}</pre>
        </div>
      </div>
    </>
  )
}
