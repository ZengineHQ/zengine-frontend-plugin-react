import React, { useState, useEffect } from 'react'
import { render } from 'react-dom'
import { useZengineContext, ZnContextProvider } from '@zenginehq/react-sdk'

export const App = props => {
  const { context, triggerContextRefresh } = useZengineContext()
  const [show, setShow] = useState(false)

  useEffect(() => {
    // logs context whenever it updates
    console.log(context)
  }, [context])

  return <main>
    <h1 style={{ textAlign: 'center' }}>Hello Zengine!</h1>
    <button onClick={e => triggerContextRefresh()}>Refresh Context</button>
    <button onClick={e => setShow(!show)}>
      {show ? 'Hide' : 'Show'} Context Data
    </button>
    {show && <pre>{JSON.stringify(context, null, 2)}</pre>}
  </main>
}

render(
  <ZnContextProvider>
    <App />
  </ZnContextProvider>,
  document.getElementById('app')
)
