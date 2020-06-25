# <img src="/public/yay-fox.gif" alt="Yay Fox gif" /> React-on-Rails SPA <img src="/public/yay-fox.gif" alt="Yay Fox gif" />

## Setup

_We recommend using the following:_<br />
&nbsp; &nbsp; [`rbenv`](https://github.com/rbenv/rbenv) _- Ruby version manager_<br />
&nbsp; &nbsp; [`nvm`](https://github.com/creationix/nvm) _-Node version manager_<br />
&nbsp; &nbsp; [`Homebrew`](https://brew.sh/) _- package manager_

* `cd` into the project directory

* Install Ruby v2.5.0 and gems
    ```xml
    rbenv install 2.5.0
    rbenv local 2.5.0
    gem install bundler
    bundle install
    ```

* Install Node v11.10.0, Yarn, and packages
    ```xml
    nvm install 11.10.0
    brew install yarn --ignore-dependencies
    yarn install
    ```

* Generate a Rails Master Key
    * run the following to generate the Rails Master Key and files, and<br />open the new `/config/credentials.yml.enc` file in Vim

        ```xml
        EDITOR=vim rails credentials:edit
        ```

    * the file should show your new `secret_key_base`

    * type `:wq` and press `[RETURN/ENTER]` to save and exit

* Create an `.env` file
    * create a duplicate of `.env.example` and name it `.env`

    * replace the `RAILS_MASTER_KEY` value with your new Master Key (found in `/config/master.key`)

    * update the `POSTGRES_USERNAME` value to your Postgres username

    * update the `BASE_URL` value (if required, depending on your setup)


* Create databases
    ```xml
    rails db:create
    rails db:migrate
    rails db:seed
    ```

## Running Locally

### Running using [foreman](https://github.com/ddollar/foreman)

_**PLEASE NOTE:** per_ `foreman`_'s docs we recommend installing the gem in your home or user directory_

* `cd` into your home or user directory

* Install `foreman`

    ```xml
    gem install foreman
    ```

* `cd` back into the project directory

* Start `foreman`, which runs the `Procfile.dev` and will start a [Rails](https://github.com/rails/rails) server and [Webpacker](https://github.com/rails/webpacker)

    ```xml
    foreman start -f Procfile.dev
    ```

### Running Rails and Webpacker separately

* Open a new window/tab/pane in Terminal

    * `cd` into the project directory

    * Start a [Rails](https://github.com/rails/rails) server

        ```xml
        bundle exec rails server -p 3000
        ```

* Open another new window/tab/pane in Terminal

    * `cd` into the project directory

    * Start [Webpacker](https://github.com/rails/webpacker)

        ```xml
        bin/webpack-dev-server
        ```

### Troubleshooting

* Upgrade Yarn if getting non-deterministic issues when installing, starting the servers, compiling,...

    ```xml
    yarn upgrade
    ```

## :star: Collaborators :star:

[ChiefDakota](https://github.com/ChiefDakota)<br />
[DenisePillette](https://github.com/DenisePillette)

## License

React-on-Rails SPA is licensed under the [MIT License](https://opensource.org/licenses/MIT).<br />
See `LICENSE` for the full license text.
