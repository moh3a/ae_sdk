# Aliexpress SDK ![npm version](https://img.shields.io/npm/v/ae_sdk?label=)

![Typescript](https://img.shields.io/badge/-TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white)
![CI](https://img.shields.io/github/actions/workflow/status/moh3a/ae_sdk/main.yml?logo=githubactions&logoColor=white&label=CI)
![Publish](https://img.shields.io/github/actions/workflow/status/moh3a/ae_sdk/publish.yml?logo=githubactions&logoColor=white&label=Publish)
[![Downloads](https://img.shields.io/npm/dw/ae_sdk?logo=npm)](https://www.npmjs.com/package/ae_sdk)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/ae_sdk?label=size&logo=npm)](https://bundlephobia.com/package/ae_sdk)
[![License](https://img.shields.io/github/license/moh3a/ae_sdk)](https://github.com/moh3a/ae_sdk/blob/master/LICENSE)

A simple and type-safe SDK for Aliexpress (system tools, dropshipping and affiliate) APIs.

## Introduction

[An overview of the SDK and its features.](https://github.com/moh3a/ae_sdk/blob/main/docs/01-introduction.md)

## Prerequisites

[Check the important steps to take before being able to use this library](https://github.com/moh3a/ae_sdk/blob/main/docs/02-prerequisites.md)

## Installation

```sh
npm install ae_sdk
```

## Basic usage

```ts
// step 1: import the AE client
import { AffiliateClient } from "ae_sdk";

// step 2: initilize the client
const client = new AffiliateClient({
  app_key: "123",
  app_secret: "123456abcdef",
  session: "oauth_access_token",
});

// step 3: you are all set !
const result = await client.featuredPromoInfo({});

console.log(result);
```

[Click here for a more in depth usage guide.](https://github.com/moh3a/ae_sdk/blob/main/docs/03-usage-guide.md)
