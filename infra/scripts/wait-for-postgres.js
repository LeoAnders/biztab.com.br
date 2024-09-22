const { exec } = require("node:child_process");

const NOT_FOUND = -1;
const RETRY_TIME_LIMIT = 60_000;

let spinner;
const timeOut = {
  id: undefined,
  done: false,
};

async function checkPostgres() {
  if (timeOut.done) {
    return spinner.fail("postgres connection time out");
  }

  function handleReturn(error, stdout) {
    if (stdout.search("accepting connections") === NOT_FOUND) {
      checkPostgres();

      return;
    }

    spinner.succeed("🚀 postgress is ready and accepting connections");

    clearTimeout(timeOut.id);
  }

  exec("docker exec postgres-dev pg_isready --host localhost", handleReturn);
}

async function run() {
  const ora = (await import("ora")).default;

  spinner = ora({
    text: "waiting postgres to accept connections",
    color: "white",
  }).start();

  timeOut.id = setTimeout(() => {
    timeOut.done = true;
  }, RETRY_TIME_LIMIT);

  checkPostgres(spinner);
}

run();
