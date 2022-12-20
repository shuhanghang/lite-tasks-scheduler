"""Settings to override default settings."""

import logging

# from loguru import logger

#
# Override settings
#
DEBUG = False
AUTORELOAD = True
HTTP_PORT = 8888
HTTP_ADDRESS = '0.0.0.0'

TIMEZONE = 'Asia/Shanghai'
#
# Set logging level
#
logging.getLogger().setLevel(logging.INFO)

JOB_CLASS_PACKAGES = ['scheduler_runner.jobs']