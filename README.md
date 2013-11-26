Coming Soon Django application for Sitterfied.

Prerequisites
===
* Python (brew install python)
* Postgres (brew install postgres)
* Sass (gem install sass)
* Compass (gem install compass)
* Virtualenv (pip install virtualenv)
* Virtualenv Wrapper (pip install virtualenvwrapper)

Getting Started
===

Once the project has been cloned, perform the following operations:

1. mkvirtualenv sitterfied-coming-soon
1. workon sitterfied-coming-soon
1. export DJANGO_SETTINGS_MODULE=sitterfied.settings.local
1. pip install -r requirements-dev.txt
1. createdb coming-soon
1. python manage.py syncdb
1. python manage.py migrate
1. python manage.py createsuperuser
1. python manage.py collectstatic
1. python manage.py runserver