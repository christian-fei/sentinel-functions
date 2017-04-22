# sentinel-dashboard

> functions used by [sentinel-dashboard](https://github.com/christian-fei/sentinel-dashboard)


# Requirements

- [Configured](http://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-started.html) aws-cli
- Node 7+ *(tested with 7.9.0)*


# Setup

1. `git clone git@github.com:christian-fei/sentinel-functions.git`
2. Open `config.js` and change the `bucketName`


# Installation

```
npm run stack:create
```

It takes about **10 seconds** to setup (with AWS account configured):

```
~/D/p/sentinel-functions (master ⚡) time npm run stack:create

> sentinel-functions@1.0.0 stack:create /Users/saiph/Documents/projects/sentinel-functions
> provisioning/create-stack

-> created bucket
-> created code zip
-> created code
-> created role
-> using arn arn:aws:iam::518086975627:role/sentinel-role
-> successfully created stack!
        9.83 real         0.89 user         0.10 sys
~/D/p/sentinel-functions (master ⚡)
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
