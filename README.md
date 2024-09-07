## envclass

- Generates environment class from .env file for Next.js
- Use ENV_PUBLIC for client code, then ENV_SERVER for server side.

- When ENV_SERVER is used on the client side, it will throw an error.
- When following env variables are not added to .env file, it will throw an error before build

#### Install

```bash
npm i -D @iamjam/envclass
```

Then add following script to package.json

```json
{
  "scripts": {
    "envclass": "envclass"
  }
}
```

Finally, run the script

```bash
npm run envclass
```

To generate default options, run

```bash
npx envclass --init
```

For JS transpilation, run

```bash
npx envclass --transpile
# or add to package.json
{
  "scripts": { "envclass": "envclass --transpile" }
}
```

For help, run

```bash
npx envclass -- --help
```

#### Usage

- #1. write variables on .env file

```bash
# client side
NEXT_PUBLIC_COOKIE_NAME=cookie_name

# server side
SERVER_URL=http://localhost:3000

# set NEXT_PUBLIC_ENVIRONMENT as 'dev', 'qa', 'prod', so that a variable can vary as per the environment
# This will set "ENV_PUBLIC.IS_DEV" as true
NEXT_PUBLIC_ENVIRONMENT=dev

# Referring to the 'NEXT_PUBLIC_ENVIRONMENT' variable, following variables will be generated as ENV_SERVER.VARIABLE.
# This comes in handy on controlling SERVER_URL
VARIABLE_DEV=variable_dev
VARIABLE_QA=variable_qa
VARIABLE_PROD=variable_prod

# usable in process.env, but will not be in ENV_SERVER
@env-ignore
IGNORED_VARIABLE=ignored

# or ignore in block
@env-ignore-start
IGNORED_VARIABLE1=ignored_as_well
IGNORED_VARIABLE2=ignored_as_well
@env-ignore-end

# even if it's not defined in .env files, don't throw error on build time
# add the prefix : NULLABLE_
NULLABLE_VARIABLE=nullable
```

- #2. Use it in Next.js

```ts
// Client side
import { ENV_PUBLIC } from "./envclass";

const Component = () => {
  return <div>{ENV_PUBLIC.NEXT_PUBLIC_COOKIE_NAME}</div>;
};
```

// Server side

```ts
import { ENV_SERVER } from "./envclass";
export const getServerSideProps = () => {
  const serverUrl = ENV_SERVER.SERVER_URL;
  fetch(serverUrl);
};
```
