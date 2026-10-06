import { spawn, spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
const root = fileURLToPath(new URL('../', import.meta.url));
const win = process.platform === 'win32';
const backend = path.join(root, 'backend');
const frontend = path.join(root, 'frontend');
const python = path.join(backend, '.venv', win ? 'Scripts/python.exe' : 'bin/python');
const vite = path.join(frontend, 'node_modules/vite/bin/vite.js');
if (!existsSync(python) || !existsSync(vite)) { console.error('Run npm run setup first.'); process.exit(1); }
const children = [];
let stopping = false;
function stop(code = 0) {
  if (stopping) return;
  stopping = true;
  for (const child of children) {
    if (!child.pid) continue;
    if (win) spawnSync('taskkill', ['/pid', String(child.pid), '/T', '/F'], { stdio: 'ignore' });
    else child.kill('SIGTERM');
  }
  process.exit(code);
}
function launch(command, args, cwd) {
  const child = spawn(command, args, { cwd, stdio: 'inherit' });
  children.push(child);
  child.on('error', error => { console.error(error.message); stop(1); });
  child.on('exit', code => { if (!stopping) stop(code ?? 1); });
}
process.on('SIGINT', () => stop());
process.on('SIGTERM', () => stop());
launch(python, ['-m', 'uvicorn', 'app.main:app', '--reload', '--host', '127.0.0.1', '--port', '8000'], backend);
launch(process.execPath, [vite], frontend);
console.log('Frontend: http://127.0.0.1:8443 | API docs: http://127.0.0.1:8000/docs');
console.log('Press Ctrl+C to stop both services.');
