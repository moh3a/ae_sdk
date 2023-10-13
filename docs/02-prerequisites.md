# Aliexpress SDK ![npm version](https://img.shields.io/npm/v/ae_sdk?label=)

Before you can start using this SDK you should start with the following steps:

## Become a developer

You must have an Aliexpress account or create one, and then register as a developer through [this link](https://openservice.aliexpress.com/).
[For more details](https://openservice.aliexpress.com/doc/doc.htm?nodeId=27493&docId=118729#/?docId=1362).

## Register an application

After creating your developer account, you can start registering a new applicationon by following the steps details in the [following link](https://openservice.aliexpress.com/doc/doc.htm?nodeId=27493&docId=118729#/?docId=1361).

## Retrieve App Key and App Secret

Once your application is registered, the `app_key` and `app_secret` are assigned to the application automatically. These parameters must be included in every AE API request.
For more details on how to retrieve them, [visit](https://openservice.aliexpress.com/doc/doc.htm?nodeId=27493&docId=118729#/?docId=1360).

## Retrieve the access token

In order to access Aliexpress sellers’ business data, the application needs to get the authorization from sellers, and you need to guide them to complete the flow of “using Aliexpress seller account to log in and authorize”.
Follow the steps detailed in [this link](https://openservice.aliexpress.com/doc/doc.htm?nodeId=27493&docId=118729#/?docId=1364) to get your access token. It must included in every AE API request.
