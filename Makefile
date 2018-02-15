test:
	pytest -v

ship:
	python setup.py sdist bdist_wheel
	twine upload dist/* --skip-existing

dev:
	gulp --cwd electionnight/staticapp/

database:
	dropdb electionnight --if-exists
	createdb electionnight
