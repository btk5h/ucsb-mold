# Project MOLD

MOLD (Mapache On-Line Data) aims to be a complete overhaul of [GOLD](https://my.sa.ucsb.edu/gold/).

## Getting Started

In order to start working on MOLD, clone the repository and install dependencies using
[yarn](https://yarnpkg.com/). Note: There is also a `setup-workspace` script that downloads UCSB's API docs
and generates their typescript types.

```
git clone https://github.com/btk5h/ucsb-mold.git
cd ucsb-mold
yarn install
yarn setup-workspace
```

You will also need to deploy an instance of the backend to your AWS account. Refer to the
[services README](services/README.md) for more details.

This project uses [Create React App](https://github.com/facebook/create-react-app).

To run the app locally in development mode:

```
yarn start
```

To build the production version of the app to the `build` folder

```
yarn build
```
