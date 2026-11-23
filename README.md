# PyPlayground

An interactive Python playground for practicing programming and exploring machine learning concepts, hosted entirely on **GitHub Pages**.

Write Python, click **Run code**, and see printed output, errors, and supported Matplotlib charts directly in the browser. No account, Python installation, server, or API key is needed.

## Try it

**Live site:** https://aaron-ragsdale.github.io/PyPlayground/

> The site needs an internet connection on first load to download the Python runtime. Library packages are downloaded when requested, and your browser may cache them.

## Features

- Browser-based Python execution using [Pyodide](https://pyodide.org/) in a Web Worker
- Code editor with line numbers, tab indentation, and **Ctrl/⌘ + Enter** to run
- Text output and Python error messages displayed on the page
- Automatic downloads for compatible imported Python libraries
- One-click library buttons and an **Install all libraries** option
- Inline rendering for supported Matplotlib charts
- Starter exercises for programming and machine learning basics
- **Stop** to terminate a running program and restart the Python worker
- **Clear output** and **Download .py** actions
- Editor contents saved locally in the current browser using `localStorage`

## Supported libraries

The site provides one-click installation for these Pyodide packages:

| Library | Example import | What it helps with |
| --- | --- | --- |
| NumPy | `import numpy as np` | Arrays, vectors, and linear algebra |
| Matplotlib | `import matplotlib.pyplot as plt` | Graphs and plots |
| Pandas | `import pandas as pd` | Tables and datasets |
| SciPy | `import scipy` | Scientific and statistical calculations |
| scikit-learn | `from sklearn.linear_model import LinearRegression` | Machine learning models |
| Seaborn | `import seaborn as sns` | Statistical data visualization |
| SymPy | `import sympy as sp` | Symbolic mathematics |

For common supported imports, simply press **Run code**. Pyodide checks the imports and loads required packages and dependencies automatically. You can also click a library's **+** button to install it ahead of time.

**Recommendation:** Install packages only as needed. **Install all libraries** can trigger a substantial initial download.

### Example: NumPy

```python
import numpy as np

scores = np.array([8, 12, 15, 10])
print("Average:", scores.mean())
```

### Example: Matplotlib

```python
import numpy as np
import matplotlib.pyplot as plt

x = np.linspace(-5, 5, 100)
plt.plot(x, x ** 2)
plt.title("A quadratic function")
plt.xlabel("x")
plt.ylabel("y")
plt.show()
```

The playground is designed to display the resulting graph below the output console.

## Built-in exercises

The exercise selector includes:

1. Hello Python
2. Variables and scalars
3. Vectors and lists
4. Loops
5. Functions
6. Linear predictions
7. NumPy vectors
8. Matplotlib charts
9. Pandas datasets
10. Scikit-learn regression

Choose an exercise and click **Load exercise** to replace the code in the editor with that example. Download your code as `practice.py` if you want to keep a copy.

## How it works

```text
GitHub Pages (static hosting)
    |
    +-- index.html          Editor, controls, starter exercises, and output
    |
    +-- python-worker.js    Pyodide runtime, execution, and package loading
                                  |
                                  +-- Pyodide + supported libraries from CDN
                                  +-- Python runs in the visitor's browser
```

- GitHub Pages serves the static site files.
- A JavaScript Web Worker loads Pyodide (Python compiled to WebAssembly).
- Clicking **Run code** sends the editor content to the worker.
- The worker loads recognized imported packages, runs Python, and returns output and plot images.
- The page displays the results without a separate Python backend.

Library files are loaded into browser memory, and downloads may be stored in the browser cache. They are **not** installed into your computer's regular Python environment or uploaded to this GitHub repository.

## Deploy to GitHub Pages

1. Keep `index.html` and `python-worker.js` in the **same directory** at the root of this repository.
2. Open **Settings → Pages** in GitHub.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Choose your default branch (typically `main`) and **/ (root)**, then save.
5. Open `https://aaron-ragsdale.github.io/PyPlayground/` once deployment finishes.

After changing either file, commit the update to the branch used by GitHub Pages and refresh the published page. A hard refresh can help when the browser is still using cached JavaScript.

To link to this playground from another website, use:

```html
<a href="https://aaron-ragsdale.github.io/PyPlayground/">Practice Python</a>
```

## Current limitations

- An internet connection is needed for initial Pyodide and library downloads.
- Not all Python packages support WebAssembly / Pyodide; packages requiring native system access may not work.
- Interactive `input()` prompts are not implemented.
- Matplotlib uses a noninteractive rendering backend; interactive plotting windows are not supported.
- Restarting or stopping the worker clears its in-memory Python state. Downloaded packages may be reusable from the browser cache.
- There is no user account, hosted notebook storage, or server-side execution.
- User code runs in the browser; it is not a secure environment for granting access to private credentials or secrets.

## Troubleshooting

**Python stays on “Starting Python…”**  
Check your internet connection and browser developer console. The CDN or WebAssembly runtime may be blocked by a browser or network policy.

**Library download fails**  
Retry with a stable connection, and check that the package is supported by Pyodide. Some packages are large.

**Changes don't appear after a GitHub commit**  
Confirm Pages deploys from the branch you edited, allow the deployment to finish, then hard-refresh the page.

**A program runs forever**  
Click **Stop** to terminate the worker. Python will restart; editor text is kept in the page.

## Project goals

PyPlayground is designed as a lightweight companion for learning Python and machine learning fundamentals. Students can explore concepts, modify examples, run code, and immediately see what happens, without installing a local development environment.

Built with [Pyodide](https://pyodide.org/) and GitHub Pages.
