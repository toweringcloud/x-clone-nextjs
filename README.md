# x-clone-nextjs

realtime social network service (mini twitter clone)

## features

### user authentication

-   sign-up
    ![Alt text](https://github.com/toweringcloud/x-clone-nextjs/blob/main/demo/snapshot0.png?raw=true)

-   sign-in
    ![Alt text](https://github.com/toweringcloud/x-clone-nextjs/blob/main/demo/snapshot1.png?raw=true)

### user profile

-   profile
    ![Alt text](https://github.com/toweringcloud/x-clone-nextjs/blob/main/demo/snapshot2.png?raw=true)

-   profile edit
    ![Alt text](https://github.com/toweringcloud/x-clone-nextjs/blob/main/demo/snapshot3.png?raw=true)

### tweets crud

-   tweet list & add
    ![Alt text](https://github.com/toweringcloud/x-clone-nextjs/blob/main/demo/snapshot4.png?raw=true)

-   tweet detail & comment add/remove
    ![Alt text](https://github.com/toweringcloud/x-clone-nextjs/blob/main/demo/snapshot5.png?raw=true)

-   tweet search by keyword
    ![Alt text](https://github.com/toweringcloud/x-clone-nextjs/blob/main/demo/snapshot6.png?raw=true)

## how to run

### setup

-   install nodejs platform (v18 or later)

```
$ node -v
v18.20.4
```

-   install required packages

```
$ npm install
```

### config

-   set runtime environment for development (local)

```
$ cat .env
COOKIE_NAME="..."
COOKIE_PASSWORD="..."
```

-   set runtime environment for production (vercel)

```
$ cat .env.prd
COOKIE_NAME="..."
COOKIE_PASSWORD="..."
POSTGRES_PRISMA_URL="..."
POSTGRES_URL_NON_POOLING="..."
```

### launch

-   run service in development mode

```
$ npm run dev
```

-   run service in production mode

```
$ npm run build
$ npm start
```
