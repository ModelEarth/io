Install steps for:
<h1>UV python version manager<br>nvm (node and npm)<br>conda and docker notes</h1>

To open local .ipynb files, run `jupyter notebook` after choosing "New Terminal at Folder".
[Github token steps](../../../localsite/start/steps/github-token) - Push files from python or Rust.


## JAMstack and Yarn

We generally focus on [JAM Stack](https://www.cloudflare.com/learning/performance/what-is-jamstack/) development without builds.
When we do build, we'll do so with [Yarn](https://yarnpkg.com/) if the project isn't already using npm.
Yarn syntax is easier and the builds are faster. 

## Start a Virtual Environment 

See the [uv](#uv) steps below if you need to run a different version of python.

Always using a virtualenv is a best-practice for protecting your OS.

	python3 -m venv env
	source env/bin/activate

For Windows,

	python3 -m venv env
	.\env\Scripts\activate


<!--
If pip install doesn't run, and you see (base), then deactivate the conda base environment:

	conda deactivate
-->

## Coding CLI setup

If you're on a new computer, start below with uv (python manager) and nvm (node and npm).

Vibe code with numerous repos and submodules, like in our [webroot](../../../).

[Claude Code CLI](https://www.anthropic.com/claude-code) ($17/month) - Recommended

<!-- 
Run /init to create a CLAUDE.md file with instructions for Claude.

Or /terminal-setup which also adds .claude/settings.json for key commands.
-->

<section id="uv"></section>

## UV - python version manager

On a new Mac, the python3 command works by default (but not the python command).

Commands for [installing UV](https://docs.astral.sh/uv/)

UV is an extremely fast Python package and project manager written in Rust. It replaces separate tools such as pip, pyenv, virtualenv, and pipx with a single program that is 10-100x faster. [Also get Warp](https://mac.install.guide/python/install-uv)

	uv python list

Our older [pyenv and pip notes](https://github.com/ModelEarth/io/blob/main/coders/python/pyenv.md).

## nvm for node and npm

	nvm -v

**To install nvm**
On a Mac since OS X 10.9, first run `touch ~/.zshrc` for variables/path storage and terminal appearance. 
[MacOS/Linux - curl command with bash to install nvm](https://github.com/nvm-sh/nvm).  

[WindowsOS](https://github.com/coreybutler/nvm-windows/releases) - In the .exe installer, first choose C:\Program Files\nvm, then leave syslink default as C:\nvm4w\nodejs to avoid errors from permissions and space in "Program Files". Restart your PowerShell terminal.  

Check if you already have node and npm. If so, it's easiest to AVOID installing nvm, unless you are encountering permission errors.

	node -v
	npm -v


Note: [npmjs.com](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) recommends installing the Node Version Manager [nvm](https://github.com/nvm-sh/nvm) to avoid permission errors when you run npm packages globally.  
Run `nvm ls` to see all the node versions you have installed. 

**For the latest LTS (recommended for most setups):**

	nvm install --lts
	nvm use --lts

Or set a specific version of node:

	nvm install 24.17.0
	nvm use 24.17.0

Either of the above will also install npm.
Run either of the above BEFORE invoking a virtual environment.<!-- was 22.20.0 -->
Prior to 2025 we avoided node v22 because there was a [punycode error](https://stackoverflow.com/questions/68774489/punycode-is-deprecated-in-npm-what-should-i-replace-it-with) in data-commons build.

**If you're not using Node Version Manager (nvm)** (above)
You can [install node/npm directly](https://nodejs.org/en/download). The installer includes the Node.js package manager (npm) within it, so you won't need to install npm separately.  

Skip this if you are using nvm (above). This directly updates your machine to the latest stable version of NodeJS.
<!-- https://askubuntu.com/questions/426750/how-can-i-update-my-nodejs-to-the-latest-version-->

	npm install -g n &&
	sudo n stable



## Python

The following is your OS version (it will differ in your virtual environments)
This will remain an older version that your machine uses:


	python3 --version

In UV you'll manage different python versions.



## Conda

View a list of your conda environments.
If none are found, [download from Anaconda.com](https://www.anaconda.com/download) - Open by clicking the Anaconda app. Reopen your terminals.

	conda env list  

A new install places at:
base * /opt/anaconda3

You can delete any unnecessary ones with `conda remove --name [ENV_NAME] --all`  

You can click your Anaconda app to upgrade, then reopen your terminals.
Or you can try using a cmd to upgrade, but you may need to download.

	conda update -n base -c defaults conda

[Download Anaconda](https://www.anaconda.com/download)

To open, run in the folder containing the .ipynb files you're editing.

	jupyter notebook



To always run conda when opening a terminal. You'll see (base)

	conda config --set auto_activate_base true

Turn off (base). 

	conda config --set auto_activate_base false

<!--
Neither fixes "error: externally-managed-environment"
Use a pyenv virtual environment to resolve.
-->

## Docker

[Docker Desktop download](https://www.docker.com) - Install and you'll see an whale-boat icon. Don't install Docker using Homebrew. Docker for Mac (Docker Desktop) provides better performance and integration with the operating system. 

If the docker cmd is not recognized after installing Docker on a Mac, Create a symbolic link. Then confirm with `docker --version`

	sudo ln -s /Applications/Docker.app/Contents/Resources/bin/docker /usr/local/bin/docker

<!--
On a Mac, if the `docker` cmd is not recognized, go to your **Users\\[username]** folder and edit one of these hidden files corresponding to your command terminal instance: .zshrc, .bash_profile, .bashrc or .profile. Add the path `$HOME/.docker/bin` with these:

	export PATH="/usr/local/bin:$PATH"
	export PATH="$HOME/.docker/bin:$PATH"
-->

If you're transitioning from an old instance of [Docker](https://www.docker.com), you may need to reinstall or do a Docker reboot.

<!--
	docker --version
	docker which


Removed these from end of .zshrc
First maybe from ChatGPT.

export PATH="/usr/local/bin:$PATH"
export PATH="$HOME/.docker/bin:$PATH"

export PATH="$HOME/.docker/bin:$PATH"
-->


<!--
Probably not needed:

Run if your version of conda won't update on your Mac. [source](https://stackoverflow.com/questions/75988022/conda-wont-update-on-macos)

	brew install python &&
	conda install -n base -c defaults 'conda>=24.3.0'

For the python install, you may also need to run:

	xcode-select --install

Type "python" followed by hitting tab key to see your python versions.

Make python3.12 (or a newer version) the main version on your system:

https://stackoverflow.com/questions/74343871/how-do-i-fix-my-python-version-showing-up-in-terminal

	# If you already have a python sym-link or binary file there, rename it
	sudo mv /usr/local/bin/python /usr/local/bin/python-

	# create sym-link to python3.11
	sudo ln -s `which python3.12` /usr/local/bin/python

	# check the version
	python --version
-->

<!--

After running brew install python

Says 3.12, but python --version returns 3.8.5

==> No broken dependents to reinstall!
==> Caveats
==> python@3.12
Python has been installed as
  /usr/local/bin/python3

Unversioned symlinks `python`, `python-config`, `pip` etc. pointing to
`python3`, `python3-config`, `pip3` etc., respectively, have been installed into
  /usr/local/opt/python@3.12/libexec/bin

See: https://docs.brew.sh/Homebrew-and-Python
==> pipx
zsh completions have been installed to:
  /usr/local/share/zsh/site-functions
==> postgresql@14
This formula has created a default database cluster with:
  initdb --locale=C -E UTF-8 /usr/local/var/postgresql@14
For more details, read:
  https://www.postgresql.org/docs/14/app-initdb.html

To start postgresql@14 now and restart at login:
  brew services start postgresql@14
Or, if you don't want/need a background service you can just run:
  /usr/local/opt/postgresql@14/bin/postgres -D /usr/local/var/postgresql@14
 -->

## Github CLI

### Install Chocolatey package manager

For anyone unable to install the Github CLI on their Windows PC using winget, Chocolatey works smoothly. When opening Powershell first, right click Powershell and run as Administrator then run this:

	Set-ExecutionPolicy Bypass -Scope Process -Force
	[System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072
	iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))

### Install GitHub CLI via Chocolatey

	choco install gh -y


**Lock your screen without stopping terminal if you step away:**
On macOS, Command-Control-Q (⌘-⌃-Q)
On Windows, Windows Key + L

**Closeups during meetups**  
Zoom in on PC - Ctrl shift plus  
Zoom in on Mac - scroll wheel after setting a Modifier Key: 
System Settings > Accessibility > Zoom and choose Control or other.

**Prompt shortcuts**
Arrows to return to prior prompts
Ctrl C - Clear prompt

## Speech Input

[Wispr Flow](https://wisprflow.ai) lets your hold your function key for speech input. 

## Check for Viruses

Commands to check for Code CLI hacks. This check if for a March 2026 axios 1.14.1 exploit:

	grep -rH --include="package-lock.json" -E 'axios@?(1\.14\.1|0\.30\.4)|plain-crypto-js' . 2>/dev/null
