import json

from redis import Redis
from redis.exceptions import RedisError

from app.core.config import CACHE_TTL_SECONDS, REDIS_URL

redis_client = Redis.from_url(
    REDIS_URL,
    decode_responses=True,
    socket_connect_timeout=1,
    socket_timeout=1,
)


def get_cached_json(key: str) -> dict | None:
    try:
        value = redis_client.get(key)
        return json.loads(value) if value else None
    except (RedisError, json.JSONDecodeError):
        return None


def set_cached_json(key: str, value: dict) -> None:
    try:
        redis_client.set(key, json.dumps(value), ex=CACHE_TTL_SECONDS)
    except RedisError:
        pass


def delete_cached_value(key: str) -> None:
    try:
        redis_client.delete(key)
    except RedisError:
        pass
