import { spawnSync } from 'node:child_process';
import { existsSync, copyFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
const root = fileURLToPath(new URL('../', import.meta.url));
const win = process.platform === 'win32';
function run(command, args, cwd = root, shell = false) {
  const result = spawnSync(command, args, { cwd, stdio: 'inherit', shell });
  if (result.error || result.status !== 0) {
    console.error(result.error?.message ?? `${command} failed.`);
    process.exit(result.status || 1);
  }
}
const candidates = win ? [['py', '-3'], ['python'], ['python3']] : [['python3'], ['python']];
const python = candidates.find(([cmd, ...args]) => {
  const result = spawnSync(cmd, [...args, '-c', 'import sys; sys.exit(0 if sys.version_info >= (3,10) else 1)'], { stdio: 'ignore' });
  return !result.error && result.status === 0;
});
if (!python) { console.error('Install Python 3.10 or newer, enable PATH, and retry.'); process.exit(1); }
const [major, minor] = process.versions.node.split('.').map(Number);
if (major < 20 || (major === 20 && minor < 19) || major === 21 || (major === 22 && minor < 12)) {
  console.error('Install Node.js 22.12+ (or 20.19+) and retry.'); process.exit(1);
}
const front = path.join(root, 'frontend');
run(win ? 'npm.cmd' : 'npm', [existsSync(path.join(front, 'package-lock.json')) ? 'ci' : 'install'], front, win);
const backend = path.join(root, 'backend');
const venvPython = path.join(backend, '.venv', win ? 'Scripts/python.exe' : 'bin/python');
if (!existsSync(venvPython)) run(python[0], [...python.slice(1), '-m', 'venv', '.venv'], backend);
run(venvPython, ['-m', 'pip', 'install', '-r', 'requirements.txt'], backend);
if (!existsSync(path.join(backend, '.env'))) copyFileSync(path.join(backend, '.env.example'), path.join(backend, '.env'));
console.log('\nSetup complete. Run npm run dev from the NeedMatch folder.');
