"""Run the scheduler process."""

from ndscheduler.server import server

class SimpleServer(server.SchedulerServer):

    def post_scheduler_start(self):
        # New user experience! Make sure we have at least 1 job to demo!
        # jobs = self.scheduler_manager.get_jobs()
        # print(jobs)
        # if len(jobs) == 0:
        #     self.scheduler_manager.add_job(
        #         job_class_string='scheduler_runner.jobs.exmple_job.ExmpleJob',
        #         job_config_class_string='scheduler_runner.configs.exmple_job_config',
        #         name='My Awesome Job',
        #         pub_args=['first parameter', {'second parameter': 'Maybe a dict'}],
        #         minute='*/1')
        pass


if __name__ == "__main__":
    SimpleServer.run()
