
# Metric Streams (Beta)

| ::note::Metrics are currently available in Beta. If you are interested in using this feature, complete the following form (link: https://forms.gle/JaNpz8HpX5QUkxLX7), and someone from Auth0 will reach out to you.   |
| :---- |

## Overview {#overview}

Real-time monitoring of your Auth0 service is now available through metrics streams, allowing you to proactively identify issues, accelerate troubleshooting, and implement timely solutions. Our first metric stream provides direct visibility into your API usage within Datadog.  You may also now stream Metrics to OpenTelemetry Connectors, allowing visualizations in New Relic, Grafana Cloud, and Splunk. Track critical metrics like request volume, error rates, and rate limit occurrences to optimize your Auth0 API integration and ensure smooth operation.

## Use Cases {#use-cases}

Metric Streams deliver insights into Auth0 API responses (see Metric Types) in general, and the failure status of rate limited APIs and Endpoints API in particular.  This can assist Auth0 customers with:

* **Visualize of Overall Traffic Health**  
* **Determine which APIs or Endpoints are the root cause of failures**

Additional insights we hope to deliver over time (but could potentially be extracted from the supplied data):

* RPS of APIs / Endpoints protected by Rate Limits, so that customers can set warnings with an RPS is within a certain threshold of the limit  
* Monthly Peak, Average, and 9xth percentile \+ time spent between certain thresholds, so that customers determine their preferred rate limit tier.


In the future, we may expand this to other monitoring use cases.

## Metric Types {#metric-types}

### Metric Name:  auth0.api\_request.count {#metric-name:-auth0.api_request.count}

| Tag Name | Required | Description |
| :---- | :---- | :---- |
| api | ✅ | The API that was called. |
| operation\_name | ✅ | The operation name, composed of HTTP method and path. |
| operation\_result | ✅ | The result of the API operation. |
| tenant | ✅ | The tenant the request to routed to |
| failure\_code | ❌ | The failure code, if the operation failed and the reason is available. |
| country\_code | ❌ | Country ISO code determined from the IP address. |
| client\_id | ❌ | Client ID (Authentication API only). |
| connection\_id | ❌ | Connection ID (Authentication API only). |
| grant\_type | ❌ | OAuth2 grant type (Authentication API only). |
| batch\_seq | ✅ | Sequence number of the same metric sent to Datadog with the same tags for the same timestamp. |
|  |  |  |

⚠️When working with metric streams, it’s important to be aware that certain tags can potentially lead to high cardinality in your metrics data. Specifically, \`client\_id\` and \`connection\_id\` are known to have the potential for high cardinality in environments with a large number of unique clients or frequent connection changes. This can lead to increased monitoring costs, performance issues, and potentially reduced observability.

⚠️⚠️ API calls cached or blocked by WAF at the Auth0 edge won’t be delivered in metrics streams to protect our system and metrics destinations from overload.

#### Enum Definitions {#enum-definitions}

This section defines the possible values for the enum types used in the auth0\_response metric.

##### Api {#api}

This enum specifies the different Auth0 APIs that can be called.

| Field name | Description |
| :---- | :---- |
| AUTHENTICATION | Authentication API |
| MANAGEMENT | Management API |

##### OperationResult {#operationresult}

Indicates the overall outcome of an API operation, categorized according to the response.

| Field name | Description |
| :---- | :---- |
| SUCCESS | Any request that resulted in a successful operation. |
| FAILURE | Any request that resulted in a client-side or server-side error. |

##### FailureCode {#failurecode}

Provides specific reasons for the API operation failures when the operation\_result is FAILURE. It should only be populated in failure cases.

| Field name | Description |
| :---- | :---- |
| RATE\_LIMIT | Request exceeded the number permitted by the Rate Limit Policy |
| ANOMALY\_DETECTION | Blocked by anomaly detection or attack protection. |
| CLIENT\_SERVER\_ERROR | Client or Server Error |

# Set up Datadog Metrics Streaming {#set-up-datadog-metrics-streaming}

### Before you begin {#before-you-begin}

Metric streams are facilitated by the [Auth0 Management API](https://auth0.com/docs/api/management/v2). Before you can set up a metric stream, you need to create a machine-to-machine (M2M) application and authenticate with a Management API token.  For more information, review [Management API Access Tokens](https://auth0.com/docs/secure/tokens/access-tokens/management-api-access-tokens).

1. Navigate to [Dashboard \> Applications \> Applications](https://manage.auth0.com/#/applications) and select **Create Application**.  
2. Enter a descriptive name for your application and choose **Machine to Machine Applications**. Then, select **Create**.  
3. Select the API you want to call from your application. In this case, use the **Auth0 Management API**.  
4. Choose the permissions that you want to be issued as part of your application's access token, then select **Authorize**. For testing purposes, select:  
   * read:event\_streams, create:event\_streams, update:event\_streams, delete:event\_streams, read:event\_deliveries, update:event\_deliveries  
5. Navigate to the **Settings** tab to gather your **Client ID**, **Client Secret**, and **Domain**.  
6. Review [Get Management API Access Tokens](https://auth0.com/docs/secure/tokens/access-tokens/management-api-access-tokens/get-management-api-access-tokens-for-production) to retrieve and store your access token.

### Datadog Prerequisites {#datadog-prerequisites}

Before setting up a metric stream with Datadog, ensure you have the following:

* **A Datadog account:** You will need an active Datadog account. If you don’t have one, visit [Get Started with Datadog](https://www.datadoghq.com/) to sign up.  
* **A Datadog API key:** Auth0 needs a valid Datadog API key to authenticate and send data to your Datadog account. You can generate an API key within your Datadog account settings. For more information, visit [API Keys and Application Keys](https://docs.datadoghq.com/account_management/api-app-keys/).


### Create the Datadog Metric Stream {#create-the-datadog-metric-stream}

Metric streams allow you to send real-time performance and operational data from your Auth0 tenant to Datadog for monitoring, analysis, and alerting.

To set up a Datadog metric stream, you can use the Auth0 Management API (via Auth0 CLI API commands). You will need your Datadog API key and the Datadog site for your region.

Auth0 CLI

```
auth0 api post metric-streams \
  --data '{
    "name": "<your-metric-stream-name>",
    "subscriptions": [{ "metric_type": "metrics_bridge.api_request" }],
    "destination": {
      "type": "datadog",
      "configuration": {
        "api_key": "<your-datadog-api-key>",
        "site": "app.datadoghq.com"
      }
    }
  }'
```

If successful, this call returns the following JSON object containing the details of your newly created Datadog metric stream. This structure will include an id and status.

```
{
  "id": "mst_...",
  "status": "enabled",
  "name": "<your-metric-stream-name>",
  "created_at": "...",
  "updated_at": "...",
  "destination": {
    "type": "datadog",
    "configuration": {
      "api_key": "***",
      "site": "datadoghq.com"
    }
  }
}

```

After the stream is active, you should begin to see ApiEvent metrics appearing in your Datadog account. You can then configure dashboards, monitors, and alerts based on this data within Datadog. Refer to the Datadog documentation for information on exploring and utilizing your metric data.

### Disable the Datadog Metric Stream {#disable-the-datadog-metric-stream}

After creating the metric stream, you can disable it to no longer send metric data to your configured Datadog account.

To disable the stream, retrieve the metric stream ID that was returned when you created it (as shown in the example response above). Then, you can use the Auth0 CLI or Auth0 Management API to update the stream’s status to disabled.

```
auth0 api patch /api/v2/metric-streams/${METRIC_STREAM_ID} \
  --data '{"status":"disabled"}'
```

The output from this call should confirm the event stream was updated to status:disabled**,** and the Datadog configuration is in place. 

### Retrieve  {#retrieve}

After you create a metric stream, you can verify that the stream exists using the following command:

```
auth0 api get /api/v2/metric-streams
```

### DataDog Dashboard Templates {#datadog-dashboard-templates}

[Metrics Private Beta ](https://drive.google.com/drive/folders/1mIuqETXLyVC3AmHgVQdrlNHsbJrJZXuo?usp=drive_link)[https://drive.google.com/drive/folders/1mIuqETXLyVC3AmHgVQdrlNHsbJrJZXuo?usp=drive\_link](https://drive.google.com/drive/folders/1mIuqETXLyVC3AmHgVQdrlNHsbJrJZXuo?usp=drive_link)

# Set up Metrics Streaming via OpenTelemetry Connectors {#set-up-metrics-streaming-via-opentelemetry-connectors}

This is intended to allow anyone to send metrics via OTEL connector, which will allow you to visualize metrics in the following Observability tool (as examples): 

* Cloudwatch (future release)  
* Prometheus (via OpenTelemetry Collector) – Public Beta 1.X (fast follow)  
* Azure Monitor (future release)  
* Grafana  
* New Relic  
* Splunk

## Grafana Cloud

### Get Endpoint and Token

1. Go to your dashboard  
2. Open the menu and click on Connections=\>Add new connection  
   ![][image1]  
3. From the list of Featured connections click on OpenTelemetry (or type OpenTelemetry in the search box)  
   ![][image2]

4. Click on OpenTelemtry SDK \=\> Language Other \=\> Next  
   ![][image3]

5. In “Choose your infrastructure” click on Other \=\> Next  
   ![][image4]

6. In “Choose your instrumentation method” click on OpenTelemetry Collector \=\> Next  
   ![][image5]

7. Finally, in the “Instrumentation Instructions”:  
   1. Create a new token. Set a name for the token and click “Create token”  
      ![][image6]

   2. Copy the Endpoint from the header “`OTEL_EXPORTER_OTLP_ENDPOINT`” in the generated configuration block. You will need this to configure the metrics stream

   3. Copy the Token from the “`OTEL_EXPORTER_OTLP_HEADERS`” header. The value of the header has the following format: “`Authorization=Basic%20TOKEN`” you just need to copy the TOKEN from that header as you will need that to configure the stream

### Set up the stream

```shell
auth0 api post metric-streams \
  --data '{
    "name": "<your-metric-stream-name>",
    "subscriptions": [{ "metric_type": "metrics_bridge.api_request" }],
    "destination": {
      "type": "otlp",
      "configuration": {
        "endpoint": "<grafana-cloud-otlp-endpoint>",
        "protocol": "http",
        "auth_type": "api_key",
        "api_key": "Basic <your-grafana-cloud-token>",
        "auth_header_name": "Authorization"
      }
    }
  }'
```

## New Relic

### Get Endpoint and Token

1. Go to New Relic’s OTLP doc and select the corresponding **endpoint** according to your location: [https://docs.newrelic.com/docs/opentelemetry/best-practices/opentelemetry-otlp/\#configure-endpoint-port-protocol](https://docs.newrelic.com/docs/opentelemetry/best-practices/opentelemetry-otlp/#configure-endpoint-port-protocol). For instance for US it would be “[https://otlp.nr-data.net](https://otlp.nr-data.net)”. You need to save it as you will need it to set the metrics stream.

2. Go to your dashboard \=\> click on your user name \=\> API Keys  
   ![][image7]

3. Click on Create a Key, and select Key Type \= “Ingest \- License”  
   ![][image8]

4. Set the key name and an optional note and click on Create a Key.  
   ![][image9]

5. After the last step you will be able to see and copy your Api Key. This will be showed only once, so make sure to copy it and store it safely as you will need it to configure the metrics stream  
   ![][image10]

### Set up the stream

```shell
auth0 api post metric-streams \
  --data '{
    "name": "<your-metric-stream-name>",
    "subscriptions": [{ "metric_type": "metrics_bridge.api_request" }],
    "destination": {
      "type": "otlp",
      "configuration": {
        "endpoint": "<new-relic-otlp-endpoint>",
        "protocol": "http",
        "auth_type": "api_key",
        "api_key": "<your-new-relic-ingest-token>",
        "auth_header_name": "api-key"
      }
    }
  }'
```

## Splunk

### Get Endpoint and Token

1. Go to Splunk’s OTLP doc and get the OTLP metrics **endpoint** [https://help.splunk.com/en/splunk-observability-cloud/manage-data/splunk-distribution-of-the-opentelemetry-collector/get-started-with-the-splunk-distribution-of-the-opentelemetry-collector/collector-components/exporters/otlphttp-exporter](https://help.splunk.com/en/splunk-observability-cloud/manage-data/splunk-distribution-of-the-opentelemetry-collector/get-started-with-the-splunk-distribution-of-the-opentelemetry-collector/collector-components/exporters/otlphttp-exporter). As of today, that endpoint is https://ingest.\<realm\>.signalfx.com/v2/datapoint/otlp, where REALM depends on which Splunk Observabilty Cloud your organization is hosted (us1, eu0, etc).  
   Copy that endpoint as you will need it later to set up the metrics stream.

2. According to [Splunk Docs](https://dev.splunk.com/observability/docs/datamodel/ingest/?_gl=1*rfpxyx*_gcl_aw*R0NMLjE3NjM1NTc0MTkuQ2p3S0NBaUE4dlhJQmhBdEVpd0FmM0ItZzdJdXlkM2VYUFBXem5KRHhvRkdOV2JZelB2TlpBRTZMLTN3eEp4Z3p3Tldvc2FyLUVjVlJCb0NYSlVRQXZEX0J3RQ..*_gcl_au*NjUwMTkwMjgwLjE3NjE3NTI1Mjg.*FPAU*NjUwMTkwMjgwLjE3NjE3NTI1Mjg.*_ga*NjE1MDUxOTc2LjE3NjE3NTI1Mjk.*_ga_5EPM2P39FV*czE3NjM1NTczOTMkbzEwJGcxJHQxNzYzNTU3OTAxJGo2MCRsMCRoMTI2Nzc0MDMxMQ..*_fplc*eThYOG92WkI0bEhkOVFzRWhXN1JQQm1PN3FPNURBY0NWRndveUhTc3pZQXpYcjRYN2RNaVRTT3NhanVHQUFnM042cUoyZUlWSW1kRTE4Q2d6dUl5ZEQ1ZWh1TjlZNk9jdXNmWDI0R28lMkJkOXZpTjlJWG1iUlpPMXYybGVEYWclM0QlM0Q.#Send-data-points), now we need an Org Access Token in which one of authScopes array elements is INGEST. 

3. Navigate to Splunk Observability Cloud main menu \=\> Settings \=\> Access Token \=\> New Token

4. Name the token and set authorization scope. Remember that Authorization Scope must contain INGEST.

5. Set expiration data and click Create. Securely store the token value as you will need it to set up the metrics stream.

### Set up the stream

```shell
auth0 api post metric-streams --data '{
    "name": "<your-metric-stream-name>",
    "subscriptions": [{ "metric_type": "metrics_bridge.api_request" }],
    "destination": {
      "type": "otlp",
      "configuration": {
        "endpoint": "<splunk-otlp-endpoint>",
        "protocol": "http",
        "auth_type": "api_key",
        "api_key": "<your-splunk-ingest-token>",
        "auth_header_name": "X-SF-TOKEN"
      }
    }
  }'
```

`auth0 api post metric-streams \`  
  `--data '{`  
    `"name": "<your-metric-stream-name>",`  
    `"subscriptions": [{ "metric_type": "metrics_bridge.api_request" }],`  
    `"destination": {`  
      `"type": "otlp",`  
      `"configuration": {`  
        `“endpoint”: “<splunk-otlp-endpoint>”`  
        `"protocol": "http",`  
        `"auth_type": "api_key",`  
        `"api_key": "<your-splunk-ingest-token>",`  
        `"auth_header_name": "X-SF-TOKEN",`  
      `}`  
    `}`  
  `}'`

NOTE TO CHECK

# A note on the Cardinality of Metrics {#a-note-on-the-cardinality-of-metrics}

Below is a description of the expected cardinality of each tag, including the potential for high cardinality. Understanding these factors will help you optimize your monitoring and avoid unexpected costs due to excessive unique time series.

| Tag Name | Cardinality Expectations |
| ----- | ----- |
| api | Low cardinality. Expected values include "AUTHENTICATION" and "MANAGEMENT." |
| operation\_name | Medium cardinality. Varies depending on the number of API operations performed. |
| operation\_result | Low cardinality. Expected values include "SUCCESS" and "FAILURE." |
| tenant | Medium cardinality. Depends on the number of tenants tracked. |
| failure\_code | Low cardinality. Only populated on failures. Expected values include "GLOBAL\_RATE\_LIMIT," "OPERATION\_RATE\_LIMIT," "ANOMALY\_DETECTION," and "OTHER." |
| country\_code | Medium to High cardinality. Depends on the global distribution of users. |
| client\_id | High cardinality potential. Every unique client ID generates a new time series. Limit the number of unique clients tracked if possible (will depend on the configuration of each tenant). |
| connection\_id | High cardinality potential. Every unique connection ID generates a new time series. Similar to client\_id, be aware of the number of unique connections (will depend on the configuration of each tenant). |
| grant\_type | Low to Medium cardinality. Limited number of OAuth2 grant types. |
| batch\_seq | Low cardinality. This tag is used to force Datadog to aggregate metrics with the same tags and timestamp, preventing replacement.  This is a temporary tag used during the private beta and will be removed once full aggregation is implemented on our end. After that, only one metric with a given combination of tags will be sent. |

⚠️When working with metric streams, it’s important to be aware that certain tags can potentially lead to high cardinality in your metrics data. Specifically, \`client\_id\` and \`connection\_id\` are known to have the potential for high cardinality in environments with a large number of unique clients or frequent connection changes. This can lead to increased monitoring costs.  


[image1]: 

[image2]: 
