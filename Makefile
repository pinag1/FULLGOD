# Caminho para os ficheiros .env
ENV_DEV=.env.dev
ENV_PROD=.env.prod

# Docker Compose files
COMPOSE_BASE=docker-compose.yml
COMPOSE_DEV=docker-compose.dev.yml
COMPOSE_PROD=docker-compose.prod.yml

# Comandos
up-dev:
	docker-compose --env-file $(ENV_DEV) -f $(COMPOSE_BASE) -f $(COMPOSE_DEV) up --build

up-dev-d:
	docker-compose --env-file $(ENV_DEV) -f $(COMPOSE_BASE) -f $(COMPOSE_DEV) up -d --build

down:
	docker-compose -f $(COMPOSE_BASE) down

up-prod:
	docker-compose --env-file $(ENV_PROD) -f $(COMPOSE_BASE) -f $(COMPOSE_PROD) up --build -d

logs:
	docker-compose logs -f

restart:
	docker-compose --env-file $(ENV_DEV) -f $(COMPOSE_BASE) -f $(COMPOSE_DEV) restart

clean:
	docker-compose down -v --remove-orphans
	docker system prune -f
