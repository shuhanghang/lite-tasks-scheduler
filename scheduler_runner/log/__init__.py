import io
import sys
import collections

from loguru import logger


class LOGFIFOIO(io.TextIOBase):
    def __init__(self, size=256, *args):
        self.maxsize = size
        io.TextIOBase.__init__(self, *args)
        self.deque = collections.deque()

    def getvalue(self):
        return list(self.deque)

    def write(self, x):
        self.deque.append(x.replace('\n', ''))
        self.shrink()

    def shrink(self):
        if self.maxsize is None:
            return
        size = len(self.deque)
        while size > self.maxsize:
            x = self.deque.popleft()
            size -= len(x)


def init_logger_handler():
    log_capture_list = LOGFIFOIO()
    logger.remove()
    logger.add(log_capture_list)
    logger.add(sys.stdout)
    return log_capture_list
