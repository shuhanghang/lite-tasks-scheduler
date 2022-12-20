"""Handler for jobs endpoint."""

import json

from ndscheduler.server.handlers import base

from ndscheduler.corescheduler.utils import modify_job_config, get_job_config_content


class ConfigHandler(base.BaseHandler):

    def put(self):
        """Modifies a config of job.

        Handles an endpoint:
            PUT /api/v1/config
        """
        request_json = json.loads(self.request.body)
        job_config_path = request_json.get('job_config_bind')
        job_config_content = request_json.get('job_config_content')
        if job_config_path and job_config_content:
            result = modify_job_config(job_config_path, job_config_content)
            response = {
                'code': result['code'],
                'msg': result['msg']}
            if result['code'] == 200:
                self.set_status(200)
                self.finish(response)
            else:
                self.set_status(400)
                self.finish(response)
        else:
            response = {
                'code': 400,
                'msg': 'Parameter error.'}
            self.set_status(400)
            self.finish(response)

    def get(self):
        """Modifies a config of job.

        Handles two endpoints:
            GET /api/v1/config

        """
        if config_path := self.get_argument('config_bind'):
            result = get_job_config_content(config_path)
            response = {
                'code': result['code'],
                'msg': result['msg']}
            if result['code'] == 200:
                self.set_status(200)
                self.finish(response)
            else:
                self.set_status(400)
                self.finish(response)
        else:
            response = {
                'code': 400,
                'msg': 'No query parameter config_bind.'}
            self.set_status(400)
            self.finish(response)
