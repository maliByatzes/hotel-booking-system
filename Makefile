
docker-up:
	docker compose up -d
	sleep 3

docker-reset:
	docker compose down
	make docker-up

docker-stop:
	docker compose stop

docker-start:
	docker compose start

.PHONY: docker-up docker-reset docker-stop docker-start
