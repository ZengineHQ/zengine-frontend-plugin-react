import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';
import { useZengineContext, ZnContextProvider } from '@zenginehq/react-sdk';
import { znMessage, znPluginData } from '@zenginehq/zengine-sdk';
import '@zenginehq/zengine-ui/style.css';
import { Button } from '@zenginehq/zengine-ui-react';

export const App = props => {
	const { context, triggerContextRefresh } = useZengineContext();
	const [show, setShow] = useState(false);

	useEffect(() => {
		// logs context whenever it updates
		console.log(context);
	}, [context]);

	const getBackend = () => {
		znPluginData({
			namespace: context.plugin.namespace,
			method: 'get',
			route: '/your-backend-service-route',
			options: {
				params: {
					id: context.workspace.forms[0].id
				}
			}
		}).then(() => {
			znMessage('Backend Service Success', 'saved');
		}).catch(() => {
			znMessage('Backend Service Fail', 'error');
		});
	};

  // use any bootstrap 4 classes + zengine-ui components! 👍 👌
	return <main className='p-3'>
		<h1 style={{ textAlign: 'center' }}>Hello Zengine!</h1>
		<ul className="list-inline">
			<li className="list-inline-item">
				<Button theme="secondary" onClick={e => triggerContextRefresh()}>Refresh Context</Button>
			</li>
			<li className="list-inline-item">
				<Button theme="primary" onClick={e => setShow(!show)}>
					{show ? 'Hide' : 'Show'} Context Data
				</Button>
			</li>
			<li className="list-inline-item">
				<Button theme="success" onClick={e => getBackend()}>
				Query Backend
				</Button>
			</li>
		</ul>
		{show && <pre>{JSON.stringify(context, null, 2)}</pre>}
	</main>;
};

render(
	<ZnContextProvider>
		<App />
	</ZnContextProvider>,
	document.getElementById('app')
);
