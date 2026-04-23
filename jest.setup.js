// Prevent .env INIT_TRACER=true from initializing jaeger-client during tests,
// which opens UDP sockets and timers that keep jest from exiting. dotenv
// respects already-set vars, so this empty value wins.
process.env.INIT_TRACER = '';

process.on('unhandledRejection', (reason, p) => {
    console.error('Unhandled Rejection at: Promise', p, 'reason:', reason);
});