import os

import dj_database_url

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


SECRET_KEY = os.getenv("SECRET_KEY", "SECRET")

DEBUG = True

ALLOWED_HOSTS = ["*"]

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.humanize",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "rest_framework",
    "corsheaders",
    "entity",
    "geography",
    "government",
    "election",
    "almanac",
    "vote",
    "aploader",
    "electionnight",
]

MIDDLEWARE = [
    "django.middleware.gzip.GZipMiddleware",
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.cache.UpdateCacheMiddleware",
    "django.middleware.common.CommonMiddleware",
    # 'django.middleware.cache.FetchFromCacheMiddleware',
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "exampleapp.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ]
        },
    }
]

WSGI_APPLICATION = "exampleapp.wsgi.application"


DATABASES = {}
if "DATABASE_URL" in os.environ:
    DATABASES["default"] = dj_database_url.config()
else:
    DATABASES["default"] = {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": os.path.join(BASE_DIR, "db.sqlite3"),
    }


AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator"
    },
    {"NAME": "django.contrib.auth.password_validation.MinimumLengthValidator"},
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator"
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator"
    },
]


LANGUAGE_CODE = "en-us"

TIME_ZONE = "UTC"

USE_I18N = True

USE_L10N = True

USE_TZ = True


STATIC_URL = "/static/"
STATIC_ROOT = os.path.join(BASE_DIR, "staticfiles")

CORS_ORIGIN_ALLOW_ALL = True
CORS_ALLOW_HEADERS = (
    "accept",
    "access-control-allow-origin",
    "accept-encoding",
    "authorization",
    "content-type",
    "dnt",
    "origin",
    "user-agent",
    "x-csrftoken",
    "x-requested-with",
)

CACHES = {
    "default": {
        "BACKEND": "django.core.cache.backends.filebased.FileBasedCache",
        "LOCATION": os.path.join(BASE_DIR, "tmp/django_cache"),
    }
}

#########################
# electionnight settings

CENSUS_API_KEY = os.getenv("CENSUS_API_KEY", None)

ELECTIONNIGHT_SECRET_KEY = "aewgrstdyfugiop"
ELECTIONNIGHT_AWS_ACCESS_KEY_ID = os.getenv("AWS_ACCESS_KEY_ID", None)
ELECTIONNIGHT_AWS_SECRET_ACCESS_KEY = os.getenv("AWS_SECRET_ACCESS_KEY", None)
ELECTIONNIGHT_AWS_REGION = "us-east-2"
# ELECTIONNIGHT_AWS_S3_BUCKET = "interactives.politico.com"
ELECTIONNIGHT_AWS_S3_BUCKET = "staging.interactives.politico.com"
ELECTIONNIGHT_CLOUDFRONT_ALTERNATE_DOMAIN = ""
ELECTIONNIGHT_S3_UPLOAD_ROOT = ""
ELECTIONNIGHT_RESULTS_STATIC_DIR = "static_results"
ELECTIONNIGHT_AWS_S3_STATIC_ROOT = (
    "https://s3.amazonaws.com/staging.interactives.politico.com"
)
# ELECTIONNIGHT_AWS_S3_STATIC_ROOT = "https://www.politico.com"
CIVIC_TWITTER_CONSUMER_KEY = os.getenv("CIVIC_TWITTER_CONSUMER_KEY")
CIVIC_TWITTER_CONSUMER_SECRET = os.getenv("CIVIC_TWITTER_CONSUMER_SECRET")
CIVIC_TWITTER_ACCESS_TOKEN_KEY = os.getenv("CIVIC_TWITTER_ACCESS_TOKEN_KEY")
CIVIC_TWITTER_ACCESS_TOKEN_SECRET = os.getenv(
    "CIVIC_TWITTER_ACCESS_TOKEN_SECRET"
)
CIVIC_SLACK_TOKEN = os.getenv("CIVIC_SLACK_TOKEN")


STATICFILES_DIRS = [os.path.join(BASE_DIR, ELECTIONNIGHT_RESULTS_STATIC_DIR)]
