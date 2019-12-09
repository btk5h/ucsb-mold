import { configure } from "@storybook/react"

import "../src/styles/globalStyles"

// automatically import all files ending in *.stories.js
configure(require.context("../src", true, /\.stories\.tsx$/), module)
