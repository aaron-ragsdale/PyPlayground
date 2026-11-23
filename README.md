# Python Playground for ML Basics

A static Python practice lab for GitHub Pages. No Python server, account, or API key required. Uses [Pyodide](https://pyodide.org/) to execute Python in a browser Web Worker.

## Install on GitHub Pages

Upload **both** files into the same directory in your `MLBasics` repository:

- `python-practice.html` (editor, exercises, charts, buttons)
- `python-worker.js` (Python runtime and package loading)

Add this link in your existing `index.html`:

```html
<a href="python-practice.html">Practice Python</a>
```

Commit changes and visit `https://YOUR-USERNAME.github.io/MLBasics/python-practice.html` after GitHub Pages updates. GitHub Pages should serve from the branch/folder you configured in repository Settings → Pages.

## Library downloads

Students can `import numpy`, `import matplotlib.pyplot`, `import pandas`, `import scipy`, `import sklearn`, `import seaborn`, or `import sympy`. Pyodide automatically downloads recognized packages and their dependencies when students click **Run code**. Alternatively, click an individual library button or **Install all libraries**. The corresponding Pyodide packages are `numpy`, `matplotlib`, `pandas`, `scipy`, `scikit-learn`, `seaborn`, `sympy`.

Downloaded packages may be reused by the browser cache. Initial loads require internet access and some packages are large. Avoid using Install all on slow connections: students only need packages required for their exercise.

Matplotlib charts are captured as PNG images and displayed under text output; the runtime uses the noninteractive Agg backend in a Web Worker. `input()` and interactive chart windows are not supported in this version. Not every pip package supports WebAssembly. **Stop** restarts the Python runtime, so packages may need loading again (browser cache usually helps).

## Included exercises

Hello Python; variables and scalars; vectors and lists; loops; functions; linear predictions; NumPy vectors; Matplotlib charts; Pandas datasets; scikit-learn regression.

The page saves the current editor text in this browser's local storage. It does not upload student code to a server. Third-party Pyodide runtime and packages download from a CDN.
