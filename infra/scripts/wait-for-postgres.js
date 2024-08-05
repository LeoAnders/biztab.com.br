const { exec } = require('child_process');

async function checkPostgres() {
  const ora = (await import('ora')).default;

  const spinner = ora({
    text: "Waiting for Postgres to accept connections...",
    color: 'green'
  }).start();

  exec('docker exec postgres-dev pg_isready --host localhost', handleReturn);
  function handleReturn(error, stdout) {

    if (stdout.search("accepting connections") === -1) {
      spinner.text = "Waiting for Postgres to accept connections...";
      setTimeout(() => exec('docker exec postgres-dev pg_isready', handleReturn), 1000);
      return;
    }

    spinner.succeed("🚀 Postgres is ready and accepting connections\n");
  }
}

checkPostgres();