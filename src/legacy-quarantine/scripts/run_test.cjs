const cp = require('child_process');
const child = cp.spawn('node', ['dist/server.cjs']);
setTimeout(() => {
  child.kill();
}, 2000);
child.stdout.on('data', data => console.log('OUT:', data.toString()));
child.stderr.on('data', data => console.log('ERR:', data.toString()));
child.on('close', code => console.log('EXIT:', code));
