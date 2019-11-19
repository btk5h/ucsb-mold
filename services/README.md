# sbcourses backend

The backend that powers the sbcourses web app.

## Getting Started

### Prerequisites

- [An AWS account](https://aws.amazon.com/)
- [The Serverless CLI installed on your computer](https://serverless.com/framework/docs/providers/aws/guide/installation/)
  - Make sure you configure serverless to use your AWS credentials.
    [Tutorial](https://serverless.com/framework/docs/providers/aws/guide/credentials/)
- [A UCSB developer account](https://developer.ucsb.edu/)
- [An approved UCSB App](https://developer.ucsb.edu/creating-your-first-app)
  - Your app must at least have access to
    `Academics - Academic Quarter Calendar` and `Academic - Curriculums`

### Environment Setup

Log into your AWS account and navigate to
[AWS Systems Manager](https://us-west-2.console.aws.amazon.com/systems-manager/parameters?region=us-west-2).
Ensure that the region is `us-west-2 (Oregon)`, as this is where the backend resources will be deployed.

Create a standard tier String parameter called `sbcourses-consumer-key`. The value of this parameter should match
the consumer key of [your approved UCSB App](https://developer.ucsb.edu/user/me/apps). Do the same thing for the
parameter `sbcourses-consumer-secret`, substituting your app's consumer secret token.

### Deployment

To deploy all of the sbcourses services, run the following command in your terminal:

```
./deploy_all
```

This will run `sls deploy -v` in all of the service directories in the correct order, ensuring all backend services
are deployed correctly.

If you need to update an individual backend service in the future, you can run `sls deploy -v` in the directory
of the service you want to update.

### Frontend Configuration

Once you have deployed the backend, there should be a line in your terminal output that looks like

```
ServiceEndpoint: <url to your backend>
```

In order for the web app to know what backend endpoint to call, you will need to create an environment variable
containing this url. The easiest way to do this would be to create a `.env.development.local` file in the root
sbcourses directory (NOT the services directory!) with the contents:

```
REACT_APP_API_ENDPOINT=<url to your backend>
```
