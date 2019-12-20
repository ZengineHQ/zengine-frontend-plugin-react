import React, { useState, useEffect } from 'react'
import { render } from 'react-dom'
import { znContext } from '@zenginehq/zengine-sdk'

export const App = props => {
  const [context, setContext] = useState()
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (!context) {
      znContext((err, contextData) => {
        if (err) {
          console.error(err)
        }

        setContext(contextData)
      })
    }
  }, [])

  return <main>
    <h1 style={{ textAlign: 'center' }}>Hello Zengine!</h1>
    <button
      onClick={e => setShow(!show)}
      disabled={!context}
    >
      {show ? 'Hide' : 'Show'} Context Data
    </button>
    {show && <pre>{JSON.stringify(context, null, 2)}</pre>}
  </main>
}

render(<App />, document.getElementById('app'))
