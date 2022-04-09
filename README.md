# Tier Assignment - Adam Starak

## Technology

- Docker
- NestJS
- GraphQL

## Prerequisites

Docker and Make

## Installation

Depending on the stage please run in your terminal either `make dev.build` or `make prod.build`

## Running the app

To start the app please run `make dev.run` or `make prod.run`.

## Tests

To run tests please run either `make test` or `make test.e2e`.

## Documentation

After you run a docker container you can head overt to GraphQL playground on `http://localhost:3000/graphql`


## Help

type `make help` to see all available commands.


# Project description

I chose to create the application with NestJS because it's flexible and easily extendable.
Moreover, it has a great support of GraphQL.

The application is split into three modules:

- Tier, responsible for fetching data from GBFS API.
- Aggregation, responsible for clustering vehicle data.
- AggregatedVehicles, responsible for generating GraphQL schemas.

## Features

- Filtering by range
- Filtering by coordinates
- Clustering data
- Retrieving vehicle data (for example: pricing, range, coordinates)

## Optimizations

I noticed that the API call to gather information about free bikes is really slow.
Thus, I implemented a simple in-memory caching mechanism to improve the execution time.
Currently, TTL is set to rather low value. But, it can be easily adjustable.

Also, I added a powerful package `supercluster` to efficiently cluster vehicle data.