"""Settings for unit tests."""

DEBUG = True
AUTORELOAD = True
DATABASE_CLASS = 'ndscheduler.corescheduler.datastore.providers.sqlite.DatastoreSqlite'
DATABASE_CONFIG_DICT = {
    # Use in-memory sqlite for unit tests
}
