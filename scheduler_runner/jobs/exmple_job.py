"""A sample job that prints string."""

import time
from ndscheduler.corescheduler import job
from scheduler_runner.log import init_logger_handler
from scheduler_runner.tasks_module.task1.main import run_task


class ExmpleJob(job.JobBase):

    @classmethod
    def meta_info(cls):
        return {
            'job_class_string': '%s.%s' % (cls.__module__, cls.__name__),
            'notes': 'This will print a string in your shell. Check it out!',
            'arguments': [
                # argument1
                {'type': 'string', 'description': 'First argument'},

                # argument2
                {'type': 'string', 'description': 'Second argument'}
            ],
            'example_arguments': '["first argument AA", "second argument BB"]'
        }

    def register_info(self, *args, **kwargs):
        self.task_name = 'Exmple Task'
        self.log_list = init_logger_handler()
        self.start_time = time.strftime("%Y-%m-%d %H:%M:%S")
        self.result = run_task()
        self.end_time = time.strftime("%Y-%m-%d %H:%M:%S")

    def run(self, *args, **kwargs):
        self.register_info(*args, **kwargs)
        return {
            'result': self.result,
            'task_name': self.task_name,
            'task_start_time': self.start_time,
            'task_end_time': self.end_time,
            'log': self.log_list.getvalue()
        }


if __name__ == "__main__":
    job = ExmpleJob.create_test_instance()
    job.run()
