FROM python:3.9.6-slim as builder
ENV PATH="/home/venv/bin:$PATH"
WORKDIR /home
COPY . .
RUN python3 -m venv venv
RUN pip3 install -r requirements.txt -i https://pypi.douban.com/simple

FROM python:3.9.6-slim as release
ENV PATH="/home/venv/bin:$PATH"
ENV TZ=Asia/Shanghai
ENV PYTHONOPTIMIZE=1
WORKDIR /home
COPY --from=builder /home /home
CMD [ "sh", "entrypoint.sh" ]