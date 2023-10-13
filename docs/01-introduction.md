# Aliexpress SDK ![npm version](https://img.shields.io/npm/v/ae_sdk?label=)

## Overview

Aliexpress launched a new open platform to consume their APIs. They fully migrated and upgraded their services from the old [Taobao Open Platform](https://developers.aliexpress.com) to the new [Open Platform for International Developers](https://openservice.aliexpress.com). The issue is, with this update, [they have yet to release a Node.js SDK](https://openservice.aliexpress.com/doc/doc.htm?nodeId=27493&docId=118729#/?docId=1371).

## Features

This library is an unofficial and **simple** SDK that can do the following:

- Compose a request, generate an encryption (method signature) and interprete the response.
- Pass the right parameters for your API call with type safe methods.
- Currently supports the **system tools for authentication**, **Affiliate API** and **Dropshipping API**.

## Installation

```sh
# using npm
npm i ae_sdk

# using pnpm
pnpm add ae_sdk

# using yarn
yarn add ae_sdk
```
