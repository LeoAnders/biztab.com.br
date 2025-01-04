import useSWR from "swr";
import styles from "./Page.module.css";

import {
  FaCheckCircle,
  FaExclamationTriangle,
  FaTools,
  FaTimesCircle,
} from "react-icons/fa";

async function fetchAPI(key) {
  const response = await fetch(key);
  const responseBody = await response.json();
  return responseBody;
}

export default function StatusPage() {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Current Status</h1>
      <UpdateAt />
      <div className={styles.card}>
        <LegendBar />
        <DatabaseVersion />
        <MaxConnections />
        <OpenConnections />
      </div>
    </div>
  );
}

function LegendBar() {
  return (
    <div className={styles.legendBar}>
      {legendItems.map((item) => (
        <div className={styles.legendItem} key={item.status}>
          {item.icon}
          <span className={styles.legendText}>{item.label}</span>
        </div>
      ))}
    </div>
  );
}

function UpdateAt() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 5000,
  });

  const updateAtText =
    isLoading || !data
      ? "..."
      : new Date(data.update_at).toLocaleString("pt-BR");

  return <div className={styles.row}>Last Updated at {updateAtText}</div>;
}

function DatabaseVersion() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 5000,
  });

  const databaseVersionText =
    isLoading || !data ? "..." : data.dependencies.database.version;

  const status = isLoading || !data ? "loading" : "ok";

  return (
    <div className={styles.row}>
      Database Version:
      <span className={styles.value}>{databaseVersionText}</span>
      {getStatusIcon(status)}
    </div>
  );
}

function MaxConnections() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 5000,
  });

  const maxConnectionsText =
    isLoading || !data ? "..." : data.dependencies.database.max_connections;

  const status = isLoading || !data ? "loading" : "ok";

  return (
    <div className={styles.row}>
      Max Connections:
      <span className={styles.value}>{maxConnectionsText}</span>
      {getStatusIcon(status)}
    </div>
  );
}

function OpenConnections() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 5000,
  });

  const openConnectionsText =
    isLoading || !data ? "..." : data.dependencies.database.opened_connections;

  const isOverloaded =
    data &&
    data.dependencies.database.opened_connections >
      data.dependencies.database.max_connections * 0.9;

  const status = isLoading || !data ? "loading" : isOverloaded ? "warn" : "ok";

  return (
    <div className={styles.row}>
      Open Connections:
      <span className={styles.value}>{openConnectionsText}</span>
      {getStatusIcon(status)}
    </div>
  );
}

function getStatusIcon(status) {
  switch (status) {
    case "ok":
      return <FaCheckCircle style={{ color: "green", marginLeft: "10px" }} />;
    case "warn":
      return (
        <FaExclamationTriangle
          style={{ color: "orange", marginLeft: "10px" }}
        />
      );
    case "maintain":
      return <FaTools style={{ color: "blue", marginLeft: "10px" }} />;
    case "error":
      return <FaTimesCircle style={{ color: "red", marginLeft: "10px" }} />;
    default:
      return null;
  }
}

const legendItems = [
  {
    status: "ok",
    icon: <FaCheckCircle style={{ color: "green" }} />,
    label: "No Issue",
  },
  {
    status: "warn",
    icon: <FaExclamationTriangle style={{ color: "orange" }} />,
    label: "Warning",
  },
  {
    status: "maintain",
    icon: <FaTools style={{ color: "blue" }} />,
    label: "Maintenance",
  },
  {
    status: "error",
    icon: <FaTimesCircle style={{ color: "red" }} />,
    label: "Error",
  },
];
