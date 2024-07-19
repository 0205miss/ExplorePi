import { Card, CardBody, CardHeader } from "@nextui-org/react";

export default function BlockChainData({ data, transcript }) {
  const totalpioneer = Number.parseInt(
    data.lockuptime[0].no_lock +
      data.lockuptime[0].oneyear +
      data.lockuptime[0].sixmonths +
      data.lockuptime[0].threeyear +
      data.lockuptime[0].twoweek
  ).toLocaleString("en-US");
  return (
    <Card>
      <CardHeader>24 hr Blockchain Statistic</CardHeader>
      <CardBody>
        <div className="flex">
          <table className="table-auto w-1/2">
            <thead>
              <tr>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{transcript.Metrics.TotalAccount}</td>
                <td>
                  {Number.parseInt(data.metric.TotalAccount).toLocaleString(
                    "en-US"
                  )}
                </td>
              </tr>
              <tr>
                <td>{transcript.Metrics.TotalPioneer}</td>
                <td>{totalpioneer}</td>
              </tr>
              <tr>
                <td>{transcript.Metrics.MigratedPi}</td>
                <td>
                  {Number.parseFloat(data.metric.TotalPi).toLocaleString(
                    "en-US",
                    {
                      maximumFractionDigits: 7,
                    }
                  )}{" "}
                  Pi
                </td>
              </tr>
              <tr>
                <td>Active Pioneer</td>
                <td>
                  {data.daily.active}
                </td>
              </tr>
            </tbody>
          </table>
          <table className="table-auto w-1/2">
            <thead>
              <tr>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>AvG. Block Time</td>
                <td>
                  {" "}
                  {parseFloat(data.daily["block_time"]).toString() + "s"}
                </td>
              </tr>
              <tr>
                <td>TPS</td>
                <td>
                  {parseFloat((parseFloat(data.daily.tps) / 86400).toFixed(1))}
                </td>
              </tr>
              <tr>
                <td>OPS</td>
                <td>
                  {parseFloat((parseFloat(data.daily.ops) / 86400).toFixed(1))}
                </td>
              </tr>
              <tr>
                <td>Block</td>
                <td>{data.daily.total_block}</td>
              </tr>
              <tr>
                <td>Transactions</td>
                <td>{data.daily.tps}</td>
              </tr>
              <tr>
                <td>Operations</td>
                <td>{data.daily.ops}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </CardBody>
    </Card>
  );
}
