const initMsw = async () => {
  if (import.meta.env.PROD) {
    return;
  }

  const { worker } = await import('./browsers');
  await worker.start({ onUnhandledRequest: 'bypass' });
};

export default initMsw;
