
## pyenv (old) - for multiple versions of python

We're using UV instead

Install before python (and pip)
Each Python version pyenv installs comes with its own pip

Check if you have pyenv installed:

	pyenv --version

List the Python versions installed on your machine.  
If it's python 2 or older, best to upgrade your machine's OS.

	ls -l /usr/local/bin/python*


### For WindowsOS - Run PowerShell as Administrator

	Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope LocalMachine -Force

IMPORTANT: After these installs, you'll need to revert back to more secure settings with:

	Set-ExecutionPolicy -ExecutionPolicy Restricted -Scope LocalMachine -Force


### Install on Windows (pyenv-win)

Invoke-WebRequest -UseBasicParsing -Uri "https://raw.githubusercontent.com/pyenv-win/pyenv-win/master/pyenv-win/install-pyenv-win.ps1" -OutFile "./install-pyenv-win.ps1"; &"./install-pyenv-win.ps1"


Download a python version and set it as your machine's global default:

	pyenv install 3.12.2
	pyenv global 3.12.2


### Install on MacOS

If pyenv is not installed, you can [install pyenv with homebrew](https://mac.install.guide/python/install-pyenv) or [with pip on Windows](https://github.com/pyenv-win/pyenv-win?tab=readme-ov-file#installation)


Sample of running python 3.10 for [Exiobase sankey trade data](https://github.com/ModelEarth/Mapping-global-ghg-emissions):

pyenv local 3.10  # Creates .python-version

	pyenv install 3.10  # Skip if you've already installed
	pyenv local 3.10
	python3.10 -m venv env  # Before re-running, delete the existing env folder, or skip this line and reuse the env folder.
	source env/bin/activate  # On Windows .\env\Scripts\activate
	python --version

Even in a virtual environment, "pyenv global" will update your machine.
[For OpenWebUI projects](/projects/location/setup) you can use the technique above to use Python 3.11.
Python 3.12 was not compatible with the OpenWebUI build as of Jul 22, 2024.

If you need to use a prior version of Python,  
view what's installed `pyenv virtualenvs`
Here's an alternative to `-m venv env`

	pyenv install 3.7.17
	pyenv local 3.7.17
	pyenv virtualenv 3.7.17 myenv
	pyenv activate myenv

To delete the current pyenv environment use `pyenv deactivate` since you won't have a myenv folder.

## pip

pip is installed automatically with Python (including with pyenv above)

How to stop your virtual environment and update pip.  
Once in a virtual environment, avoid appending 3 (as in pip3 or python3) .

	ctrl-c
	python3 -m pip install --upgrade pip
	pip -V


<!--
To check which shell you are using:

	echo $SHELL

If your shell is zsh, open .zshrc in your home directory. Add at the end of the file:
Wasn't in there, and currently running python 3.12

	export PATH="/Users/Library/Python/3.9/bin:$PATH"

Replace with the actual path where your python pip scripts are located.

Close the current and open a new terminal window for the updated configuration.
Type `echo $PATH` to verify.
-->


The following can be deleted.
Where Homebrew is installed on a Mac...

==> Checking for `sudo` access (which may request your password)...
Password:
==> This script will install:
/opt/homebrew/bin/brew
/opt/homebrew/share/doc/homebrew
/opt/homebrew/share/man/man1/brew.1
/opt/homebrew/share/zsh/site-functions/_brew
/opt/homebrew/etc/bash_completion.d/brew
/opt/homebrew
/etc/paths.d/homebrew
==> The following new directories will be created:
/opt/homebrew/bin
/opt/homebrew/etc
/opt/homebrew/include
/opt/homebrew/lib
/opt/homebrew/sbin
/opt/homebrew/share
/opt/homebrew/var
/opt/homebrew/opt
/opt/homebrew/share/zsh
/opt/homebrew/share/zsh/site-functions
/opt/homebrew/var/homebrew
/opt/homebrew/var/homebrew/linked
/opt/homebrew/Cellar
/opt/homebrew/Caskroom
/opt/homebrew/Frameworks
==> The Xcode Command Line Tools will be installed.