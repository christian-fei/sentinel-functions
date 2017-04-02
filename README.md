# sentinel-dashboard

> functions used by [sentinel-dashboard](https://github.com/christian-fei/sentinel-dashboard)


# Installation

Configure the `bucketName` in `config.js` and run:

```
npm run stack:create
```

# Sentinel

Creates the code for the [sentinel](#what-is-a-sentinel).

This function is scheduled to make an http request to an endpoint at a specific time interval.

# Workers

A `worker` is a function that performs a task with the information that it received.

## The CRUD worker

Persists some information in a data store.


# (Not so) FAQ

## What is a sentinel?

A "sentinel" is another word for a function that monitors a web service.

It just makes the specified request to an endpoint.

Then it passes some information (like latency, response time, etc.) to a [`worker`](#workers) responsible for persisting the data.

Namely the [crud-worker](#the-crud-worker).
