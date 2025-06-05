#!/usr/bin/env bash
#   Use this script to test if a given TCP host/port are available

# The MIT License (MIT)
# https://github.com/vishnubob/wait-for-it

set -e

TIMEOUT=15
QUIET=0
HOST=""
PORT=""

while [[ $# -gt 0 ]]; do
    case "$1" in
        -h|--host)
            HOST="$2"
            shift 2
            ;;
        -p|--port)
            PORT="$2"
            shift 2
            ;;
        -t|--timeout)
            TIMEOUT="$2"
            shift 2
            ;;
        -q|--quiet)
            QUIET=1
            shift
            ;;
        --)
            shift
            break
            ;;
        *)
            break
            ;;
    esac
done

if [[ "$HOST" == "" || "$PORT" == "" ]]; then
    echo "Usage: $0 -h host -p port [-t timeout] [-- command args]"
    exit 1
fi

for i in $(seq $TIMEOUT); do
    if nc -z "$HOST" "$PORT"; then
        if [[ $QUIET -ne 1 ]]; then
            echo "Host $HOST:$PORT is available after $i seconds."
        fi
        exec "$@"
        exit 0
    fi
    sleep 1
done

echo "Timeout after $TIMEOUT seconds waiting for $HOST:$PORT"
exit 1 