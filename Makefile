help: # Show this help (based on comments, generated using grep and sed)
	@cat Makefile | grep  '^[^[:space:]][^#]*#' \
		 | sed -r 's/^([^:]+).*#\s*(.*)/\1                             \2/' \
		 | sed -r 's/(.{30})\s*(\w.+)/\1 \2/'

.PHONY: dev.build dev.run prod.build prod.run

down: # Stops container
	docker stop tierAdamStarak

dev.build: # Builds dev image
	docker build -t tier:dev --target dev .

dev.run: # Starts dev environment from docker image.
	docker run -d -p 3000:3000 --name tierAdamStarak tier:dev

prod.build: # Builds prod image
	docker build -t tier:prod --target prod .

prod.run: # Start prod environment from docker image
	docker run -it -p 3000:3000 tier:prod
