# sbcourses

## Getting Started

In order to start working on sbcourses, clone the repository and install dependencies using
[yarn](https://yarnpkg.com/). Note: There is also a `setup-workspace` script that downloads UCSB's API docs
and generates their typescript types.

```
git clone https://github.com/btk5h/sbcourses.git
cd sbcourses
yarn install
yarn setup-workspace
```

You will also need to deploy an instance of the backend to your AWS account. Refer to the
[services README](services/README.md) for more details.

You will need to set an environment variable containing the base url of the backend as `REACT_APP_API_ENDPOINT`.
You can do this by creating a `.env.development.local` file with the contents

```
REACT_APP_API_ENDPOINT=https://example-api-endpoint.amazonaws.com/dev/
```

replacing `https://example-api-endpoint.amazonaws.com/dev/` with a link to your backend.

This project uses [Create React App](https://github.com/facebook/create-react-app).

To run the app locally in development mode:

```
yarn start
```

To build the production version of the app to the `build` folder

```
yarn build
```
