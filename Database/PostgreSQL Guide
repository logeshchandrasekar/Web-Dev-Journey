# PostgreSQL Installation & GUI Setup Guide

A complete, from-scratch guide to installing **PostgreSQL** and its GUI client, **pgAdmin**,
on Windows, macOS, and Linux — plus how to verify everything works, connect the GUI to your
server, and fix the handful of setup issues almost everyone hits the first time.

## Table of Contents

- [Overview](#overview)
- [1. Installing PostgreSQL](#1-installing-postgresql)
  - [Windows](#windows)
  - [macOS](#macos)
  - [Linux (Ubuntu/Debian)](#linux-ubuntudebian)
- [2. Verifying the Installation (psql)](#2-verifying-the-installation-psql)
- [3. Installing pgAdmin (GUI)](#3-installing-pgadmin-gui)
- [4. Connecting pgAdmin to Your Server](#4-connecting-pgadmin-to-your-server)
- [5. Creating Your First Database & Table](#5-creating-your-first-database--table)
- [6. Essential psql Commands Cheat Sheet](#6-essential-psql-commands-cheat-sheet)
- [7. Troubleshooting](#7-troubleshooting)
- [8. Key Defaults & Config Notes](#8-key-defaults--config-notes)
- [9. Alternative GUIs](#9-alternative-guis)
- [10. Uninstalling](#10-uninstalling)
- [Additional Resources](#additional-resources)

---

## Overview

**PostgreSQL** ("Postgres") is a free, open-source relational database — the same
technology behind a huge share of production backend systems. **pgAdmin** is its official
graphical client: a browser-based (but locally-installed) interface for browsing tables,
running queries, and managing your server without typing raw SQL into a terminal every
time.

This guide installs both, in this order:

1. PostgreSQL itself (the actual database server)
2. pgAdmin (the GUI that connects *to* that server)

You need both — pgAdmin is just a window into a PostgreSQL server; it doesn't work on its
own.

---

## 1. Installing PostgreSQL

### Windows

1. Go to **[postgresql.org/download/windows](https://www.postgresql.org/download/windows/)**
   and click **Download the installer** (this links to the EnterpriseDB installer, the
   standard choice on Windows).
2. Run the downloaded `.exe` file.
3. Through the installer wizard:
   - **Installation directory** — the default (`C:\Program Files\PostgreSQL\<version>`) is
     fine.
   - **Components** — leave everything checked. This installer conveniently **bundles
     pgAdmin 4** along with PostgreSQL itself, so Section 3 below may already be done for
     you on Windows.
   - **Data directory** — default is fine.
   - **Password** — you'll be asked to set a password for the default superuser account,
     `postgres`. **Write this down somewhere safe** — you'll need it constantly.
   - **Port** — default is `5432`. Leave it unless you have a specific reason to change it.
   - **Locale** — default is fine.
4. Finish the installer. At the end, it may offer to launch **Stack Builder** (for
   additional extensions) — you can safely skip this for now.
5. PostgreSQL is now installed as a **Windows service**, meaning it starts automatically
   in the background every time you boot your computer — you don't need to manually start
   it.

### macOS

You have two good options — pick one:

**Option A — Postgres.app (simplest, GUI-first)**

1. Download it from **[postgresapp.com](https://postgresapp.com)**.
2. Drag it into your `Applications` folder and open it.
3. Click **Initialize** to create a new server — it starts immediately, and starts
   automatically whenever you open the app.
4. Follow the app's own prompt to add `psql` to your terminal's `PATH` (it shows you a
   one-line command to paste into your terminal — do this so `psql` works from any
   terminal window).

**Option B — Homebrew (terminal-first, common among developers)**

```bash
brew install postgresql@16
brew services start postgresql@16
```

`brew services start` runs PostgreSQL as a background service, so — like the Windows
service above — it's running automatically without you needing to launch anything manually.

### Linux (Ubuntu/Debian)

```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
```

This installs the server and starts it automatically as a system service. Confirm it's
running:

```bash
sudo systemctl status postgresql
```

Unlike Windows/macOS, Linux's PostgreSQL install creates a Linux **user account** called
`postgres` that owns the database — you'll typically connect through it like this:

```bash
sudo -i -u postgres psql
```

From inside that `psql` prompt, set a password for the `postgres` database role (not the
same thing as the Linux user, even though they share a name) so you can connect normally
from pgAdmin or other tools later:

```sql
ALTER USER postgres PASSWORD 'your_new_password';
```

Type `\q` to exit `psql` afterward.

---

## 2. Verifying the Installation (psql)

`psql` is PostgreSQL's command-line client — regardless of your OS, confirm it works before
moving on to the GUI:

```bash
psql --version
```

You should see something like `psql (PostgreSQL) 16.x`. If you get a "command not found" /
"not recognized" error, see [Troubleshooting](#7-troubleshooting) below — this is almost
always a `PATH` issue, not a broken install.

Now connect to the server itself:

```bash
psql -U postgres -h localhost
```

- `-U postgres` — connect as the `postgres` superuser
- `-h localhost` — connect to the server running on this machine

Enter the password you set during installation. If you land on a prompt that looks like:

```
postgres=#
```

**PostgreSQL is installed and running correctly.** Type `\q` to exit.

---

## 3. Installing pgAdmin (GUI)

> **Windows users:** if you used the EnterpriseDB installer above, pgAdmin 4 is very likely
> already installed — check your Start Menu before installing it again.

### Windows / macOS

1. Go to **[pgadmin.org/download](https://www.pgadmin.org/download/)**.
2. Choose your OS and download the installer.
3. Run it and accept the defaults throughout.
4. Launch **pgAdmin 4** from your Start Menu / Applications folder. It opens as a
   full application window, but runs a small local web server behind the scenes — this is
   normal and by design, not a bug.

### Linux (Ubuntu/Debian)

pgAdmin publishes its own apt repository:

```bash
curl -fsS https://www.pgadmin.org/static/packages_pgadmin_org.pub | sudo gpg --dearmor -o /usr/share/keyrings/packages-pgadmin-org.gpg
sudo sh -c 'echo "deb [signed-by=/usr/share/keyrings/packages-pgadmin-org.gpg] https://ftp.postgresql.org/pub/pgadmin/pgadmin4/apt/$(lsb_release -cs) pgadmin4 main" > /etc/apt/sources.list.d/pgadmin4.list'
sudo apt update
sudo apt install pgadmin4-desktop
```

`pgadmin4-desktop` gives you a normal application window. (A `pgadmin4-web` variant also
exists, meant for shared/server installs accessed via a browser by multiple people — for
a personal learning setup, `pgadmin4-desktop` is what you want.)

On first launch, pgAdmin will ask you to set a **master password** — this is separate from
your PostgreSQL/`postgres` password, and only protects pgAdmin's own saved connection list
on this machine. Choose something you'll remember; it's local to pgAdmin, not sent
anywhere.

---

## 4. Connecting pgAdmin to Your Server

1. Open pgAdmin. In the left sidebar, right-click **Servers** → **Register** → **Server...**
2. On the **General** tab: give it any name you like — e.g. `Local PostgreSQL`.
3. Switch to the **Connection** tab and fill in:

   | Field | Value |
   |-------|---------|
   | Host name/address | `localhost` |
   | Port | `5432` (or whatever you chose during install) |
   | Maintenance database | `postgres` |
   | Username | `postgres` |
   | Password | the password you set during installation |
   | Save password? | check this box so you don't re-enter it every time |

4. Click **Save**.

If the connection succeeds, you'll see your new server appear in the sidebar, and you can
expand it: **Server → Databases → postgres → Schemas → public → Tables** — currently empty,
which is expected for a fresh install.

If it fails, jump to [Troubleshooting](#7-troubleshooting) — this step is the single most
common place first-time setups go wrong.

---

## 5. Creating Your First Database & Table

Confirm everything works end-to-end by creating something real.

**Using pgAdmin (GUI):**

1. Right-click **Databases** → **Create** → **Database...**
2. Name it `learning_db` → **Save**.
3. Expand `learning_db` → right-click **Schemas → public → Tables** → **Create → Table...**
4. Name it `users`, then add columns on the **Columns** tab (e.g. `id` as an `int4` with
   "Is primary key?" checked, `name` as `varchar`).
5. Save, then right-click the new `users` table → **View/Edit Data → All Rows** to confirm
   it's really there and query-able.

**Using psql (CLI) — the same result, in SQL:**

```bash
psql -U postgres -h localhost
```

```sql
CREATE DATABASE learning_db;
\c learning_db

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL
);

INSERT INTO users (name) VALUES ('Test User');
SELECT * FROM users;
```

Seeing your row printed back confirms your entire setup — server, connection, and
GUI-or-CLI access — is working correctly.

---

## 6. Essential psql Commands Cheat Sheet

These `psql`-specific "meta-commands" (all start with a backslash) are worth keeping handy:

| Command | What it does |
|---------|----------------|
| `\l` | List all databases |
| `\c dbname` | Connect to a different database |
| `\dt` | List tables in the current database |
| `\d tablename` | Show a table's columns, types, and constraints |
| `\du` | List all roles/users |
| `\conninfo` | Show current connection details (host, port, user, database) |
| `\q` | Quit `psql` |
| `\?` | Show all available meta-commands |
| `\h COMMAND` | Show SQL syntax help for a specific SQL command, e.g. `\h CREATE TABLE` |

---

## 7. Troubleshooting

**`psql: command not found` / `'psql' is not recognized` (Windows)**
`psql` isn't on your system `PATH`. On Windows, add PostgreSQL's `bin` folder (typically
`C:\Program Files\PostgreSQL\<version>\bin`) to your `PATH` environment variable, then open
a **new** terminal window (existing ones won't pick up the change).

**`password authentication failed for user "postgres"`**
You're entering the wrong password, or none was set correctly during install. Reset it:
- macOS/Windows: reinstall, or use pgAdmin (once connected via another method) to right-click
  the `postgres` role → **Properties** → **Definition** tab → set a new password.
- Linux: `sudo -i -u postgres psql`, then `ALTER USER postgres PASSWORD 'new_password';`

**pgAdmin says "Unable to connect to server" / "Connection refused"**
The PostgreSQL server itself likely isn't running. Check:
- Windows: open **Services** (search it in the Start Menu), find `postgresql-x64-<version>`,
  confirm its status is "Running" — start it if not.
- macOS (Homebrew): `brew services list` — restart with `brew services restart postgresql@16`.
- macOS (Postgres.app): just reopen the app.
- Linux: `sudo systemctl status postgresql` — start with `sudo systemctl start postgresql`.

**`port 5432 already in use`**
Another PostgreSQL instance (or something else) is already using that port. Either stop the
other process, or install/configure this instance to use a different port (e.g. `5433`) and
use that port number everywhere in this guide instead.

**pgAdmin opens but looks stuck on a loading/spinner screen**
pgAdmin runs a small local web server internally — this is occasionally slow to start the
very first time. Wait a few seconds; if it persists, restart pgAdmin.

**Forgot your pgAdmin master password (not the same as the postgres password)**
This only protects pgAdmin's local saved-connections file, not your actual data. You can
reset it by clearing pgAdmin's local configuration/storage from its settings, or
reinstalling pgAdmin — your PostgreSQL server and its data are completely unaffected either
way, since pgAdmin is just a client.

---

## 8. Key Defaults & Config Notes

| Setting | Default |
|---------|-----------|
| Port | `5432` |
| Default superuser | `postgres` |
| Default maintenance database | `postgres` (always exists, safe to connect to before creating your own) |
| Config file location (Linux) | `/etc/postgresql/<version>/main/postgresql.conf` |
| Data directory (Windows) | `C:\Program Files\PostgreSQL\<version>\data` |

You generally won't need to touch the config file as a beginner — the defaults are sensible
for local development.

---

## 9. Alternative GUIs

pgAdmin is the *official* GUI and the one this guide sets up, but it's not the only option
worth knowing about:

| Tool | Notes |
|------|---------|
| **DBeaver** | Free, supports many database engines beyond just Postgres — good if you'll also touch MySQL/SQLite later |
| **TablePlus** | Clean, fast interface; free tier has some limits |
| **Beekeeper Studio** | Open-source, lightweight, SQL-editor-focused |

Any of these connect to the same PostgreSQL server using the same host/port/username/
password from Section 4 — the server itself doesn't care which client you use.

---

## 10. Uninstalling

- **Windows:** Use *Add or Remove Programs* → uninstall both "PostgreSQL" and "pgAdmin 4"
  (if installed separately) — this does **not** automatically delete the data directory;
  remove that manually afterward if you want a completely clean slate.
- **macOS (Homebrew):** `brew uninstall postgresql@16` (add `brew services stop postgresql@16`
  first).
- **macOS (Postgres.app):** just delete it from `Applications`.
- **Linux:** `sudo apt remove --purge postgresql postgresql-contrib pgadmin4-desktop`

---

## Additional Resources

- Official PostgreSQL documentation: <https://www.postgresql.org/docs/>
- Official pgAdmin documentation: <https://www.pgadmin.org/docs/>
- PostgreSQL downloads: <https://www.postgresql.org/download/>
- pgAdmin downloads: <https://www.pgadmin.org/download/>
