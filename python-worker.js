// Pyodide runs in a worker, keeping the editor responsive.
import { loadPyodide } from 'https://cdn.jsdelivr.net/pyodide/v314.0.8/full/pyodide.mjs';

const ALLOWED = new Set(['numpy','matplotlib','pandas','scipy','scikit-learn','seaborn','sympy']);
let pyodide;
const send = (type, extra = {}) => self.postMessage({ type, ...extra });
try {
  pyodide = await loadPyodide();
  send('ready');
} catch (error) {
  send('load-error', { error: String(error) });
}

async function install(names) {
  const packages = names.filter(name => ALLOWED.has(name));
  if (packages.length === 0) throw new Error('Select a supported library.');
  send('progress', { message: `Downloading ${packages.join(', ')} and dependencies…` });
  await pyodide.loadPackage(packages, {
    messageCallback: message => send('progress', { message }),
    errorCallback: message => send('progress', { message })
  });
  send('installed', { packages });
}

async function run(id, code) {
  const lines = [];
  pyodide.setStdout({ batched: value => lines.push(value) });
  pyodide.setStderr({ batched: value => lines.push(value) });
  let globals;
  try {
    send('progress', { message: 'Checking imports and downloading needed libraries…' });
    await pyodide.loadPackagesFromImports(code);
    // Agg renders without any browser DOM dependency, including inside workers.
    // Set before importing matplotlib, so pyplot never selects an interactive backend.
    globals = pyodide.toPy({ __name__: '__main__' });
    await pyodide.runPythonAsync(`
import os
os.environ['MPLBACKEND'] = 'Agg'
import sys
# Inline charts will be captured after the student's code runs.
`, { globals });
    send('progress', { message: 'Running code…' });
    await pyodide.runPythonAsync(code, { globals });
    // Retrieve all open figures, including code that calls plt.show().
    const plotJson = await pyodide.runPythonAsync(`
import sys, io, base64, json
if 'matplotlib.pyplot' in sys.modules:
    import matplotlib.pyplot as plt
    from matplotlib._pylab_helpers import Gcf
    _plots = []
    for _manager in Gcf.get_all_fig_managers():
        _buffer = io.BytesIO()
        _manager.canvas.figure.savefig(_buffer, format='png', dpi=110, bbox_inches='tight')
        _plots.append(base64.b64encode(_buffer.getvalue()).decode('ascii'))
    plt.close('all')
    _plot_json = json.dumps(_plots)
else:
    _plot_json = '[]'
_plot_json
`, { globals });
    send('result', { id, output: lines.join('\n'), plots: JSON.parse(plotJson || '[]'), error: false });
  } catch (error) {
    send('result', { id, output: [...lines, String(error)].join('\n'), plots: [], error: true });
  } finally {
    if (globals) globals.destroy();
  }
}

self.onmessage = async ({ data }) => {
  if (!pyodide) return;
  try {
    if (data.type === 'install') await install(data.packages);
    if (data.type === 'run') await run(data.id, data.code);
  } catch (error) {
    if (data.type === 'install') send('install-error', { error: String(error) });
    else send('result', { id: data.id, output: String(error), plots: [], error: true });
  }
};
