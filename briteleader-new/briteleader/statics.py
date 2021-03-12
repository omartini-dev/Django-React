import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
# AWS CONFIGURATION
AWS_S3_OBJECT_PARAMETERS = {
    'Expires': 'Thu, 31 Dec 2099 20:00:00 GMT',
    'CacheControl': 'max-age=94608000',
}

AWS_STORAGE_BUCKET_NAME = 'soleo-coming-static'
AWS_S3_REGION_NAME = 'us-east-1'  # e.g. us-east-2
AWS_ACCESS_KEY_ID = 'AKIAIM2IV5UMCCFKML7A'
AWS_SECRET_ACCESS_KEY = 'EBfmjMRkWJgWJN+dmI3KeIEqf8STONrFITuosqEi'
AWS_PRELOAD_METADATA = True
AWS_QUERYSTRING_AUTH = True

# AWS_STORAGE_BUCKET_NAME = 'briteleaders-static-001'
# AWS_S3_REGION_NAME = 'us-east-2'  # e.g. us-east-2
# AWS_ACCESS_KEY_ID = 'AKIA3Z6GU4WNT4YRMHUI'
# AWS_SECRET_ACCESS_KEY = 'drX1cgquXEVF3po8uvZyVnowXtrWcGEZPVvOlCuH'
# AWS_PRELOAD_METADATA = True
# AWS_QUERYSTRING_AUTH = True

# Tell django-storages the domain to use to refer to static files.
AWS_S3_CUSTOM_DOMAIN = '%s.s3.amazonaws.com' % AWS_STORAGE_BUCKET_NAME

STATICFILES_LOCATION = 'static'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfile')
STATICFILES_STORAGE = 'custom_storages.StaticStorage'
STATIC_URL = AWS_S3_CUSTOM_DOMAIN + 'static/'
STATICFILES_STORAGE = 'storages.backends.s3boto3.S3Boto3Storage'
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'


MEDIAFILES_LOCATION = 'media'
DEFAULT_FILE_STORAGE = 'custom_storages.MediaStorage'

MEDIA_URL = AWS_S3_CUSTOM_DOMAIN + 'media/'
MEDIA_ROOT = MEDIA_URL
STATIC_URL = AWS_S3_CUSTOM_DOMAIN + 'static/'
STATIC_URL = '/static/'
ADMIN_MEDIA_PREFIX = STATIC_URL + 'admin/'

MEDIA_URL_PATH = 'static/'