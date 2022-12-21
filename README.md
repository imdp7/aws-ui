[![Netlify Status](https://api.netlify.com/api/v1/badges/1b6dfc88-438f-472b-a571-9bdf88964ef6/deploy-status)](https://app.netlify.com/sites/awsui/deploys)

![Screenshot](assets/Screenshots/1.png.png)
![Screenshot](assets/Screenshots/2.png.png)
![Screenshot](assets/Screenshots/3.png.png)
![Screenshot](assets/Screenshots/4.png.png)

# AWS UI React TypeScript Vite template

This is an [AWS UI](https://github.com/aws/awsui-documentation) starter template built using [Vite](https://vitejs.dev/).

Watch [WebDevCon Seattle 2022: Accelerate Building Your Demo Web App With an AWS UI Template](https://broadcast.amazon.com/videos/511621) on Amazon Broadcast for a ~20 minute video explanation.

This project is superseded by https://gitlab.aws.dev/kevhak/cloudscape-react-ts-vite-template after the release of the [Cloudscape Design System](https://cloudscape.design/). See [Announcing Cloudscape Design System, an open source solution for building intuitive web applications](https://aws.amazon.com/about-aws/whats-new/2022/07/cloudscape-design-system-open-source-solution-building-intuitive-web-applications/) for more info.

## What does the template include?

- [AWS UI](https://github.com/aws/awsui-documentation)
- [React](https://reactjs.org/)
- [SASS](https://sass-lang.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [React Router](https://reactrouter.com/)
- [React Redux](https://react-redux.js.org/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [Vitest](https://vitest.dev/)
- [Cypress](https://www.cypress.io/)
- [AWS Cloud Development Kit (CDK)](https://docs.aws.amazon.com/cdk/v2/guide/home.html)
- [AWS Amplify Hosting](https://docs.aws.amazon.com/amplify/latest/userguide/welcome.html)

The full set of Architecture Decision Records (ADRs) can be found in [`docs/adr`](docs/adr).

## Getting started

### Local Development

1. Create the project and access the project directory.

   ```bash
   git clone --depth 1 git@ssh.gitlab.aws.dev:kevhak/awsui-react-ts-vite-template.git my-awsui-app
   cd my-awsui-app
   ```

2. Remove the existing git repository and initialize a new one.

   ```bash
   rm -rf .git
   git init
   ```

3. Install dependencies.

   ```bash
   npm install
   ```

4. Start dev server with hot reload at http://localhost:3000.

   ```bash
   npm run dev
   ```

### AWS Hosting

1. Create AWS CodeCommit and AWS Amplify infrastructure with AWS CDK. Note: The `cdk/lib/cdk-stack.ts` sets the repository name to `my-awsui-app` based on a AWS CloudFormation parameter.

   ```bash
   cd cdk
   npm install
   npm run build
   cdk deploy --parameters RepositoryName=my-awsui-app
   ```

2. Commit all changes and `git push` to CodeCommit to trigger Amplify Hosting. This assumes `us-east-1` and your repository name is `my-awsui-app`.

   ```bash
   cd ..
   git remote add origin codecommit::us-east-1://my-awsui-app
   git add .
   git commit -m "initial commit"
   git push --set-upstream origin main
   ```
