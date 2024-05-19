
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

server:
	pnpm start

backup:
	docker exec -i hotel-postgres pg_dump -U admin hoteldb > postgres-backup.sql

.PHONY: docker-up docker-reset docker-stop docker-start server backup
