Process
=======

Preparing your database
------------------------

To run this project with results from the AP Elections API, first make sure your environment is probably set up. In your environment, you need the following variables exported:

::

  DATABASE_URL="postgres://localhost:5432/electionnight"
  AP_API_KEY="apapikeyhere"
  PROPUBLICA_CONGRESS_API_KEY="propublicaapikeyhere"

Then, make sure all of your upstream models are properly bootstrapped. There's a catchall command to handle this.

::

  python manage.py bootstrap_electionnight

This will take a while.

Once that's done, you can bootstrap the candidate data and get AP IDs from elex by running

::

  python manage.py bootstrap_elex <election date> --test (if not election night)

If that all goes correctly, you then need to create your configuration files for the live results processing. Run that with this command:

::

  python manage.py bootstrap_results_config <election date>


Results
-------

To hit the AP API live, you can run the following:

::

  python manage.py get_results <election date> --test (if not election night)

This will also record the API hits to :code:`example/static_results/recordings/<election date>` so you can replay them later. If you want to replay a test, just add :code:`--replay` to the command:

::

  python manage.py get_results <election date> --test --replay

Separately, you can run a process that will (at a slower pace) update our Vote models and republish the HTML templates so that the prebaked tables are up-to-date:

::

  python manage.py bootstrap_results_db <election date>

