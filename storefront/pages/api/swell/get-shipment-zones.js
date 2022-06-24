import { swellNodeClient } from "../../../libs/swell-node";

const SWELL_ZONE_ID = "available";

export default async function GetShipmentZones(req, res) {
  let { zones } = await swellNodeClient.get("/settings/shipments");

  const zone = zones?.find((z) => z.id === SWELL_ZONE_ID);

  if (!zone) {
    res.status(404).end();
    return;
  }

  res.send(zone.rules?.map((r) => r.country)).end();
}
