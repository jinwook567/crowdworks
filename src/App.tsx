import { type Props as WorkspaceProps } from "./workspace/Workspace";
import Workspace from "./workspace/Workspace";
import { parse } from "./parsers/json";
import { useEffect, useState } from "react";

function App() {
  const json = fetch("/1.report.json").then((response) => response.json());

  const [data, setData] = useState<WorkspaceProps | null>(null);

  useEffect(() => {
    json.then((v) => setData(parse(v)));
  }, []);

  if (!data) return <div>fetching...</div>;
  return <Workspace {...data} />;
}

export default App;
