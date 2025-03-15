const jwt = require("jsonwebtoken");

export default async function NodePage() {
  const METABASE_SITE_URL = "http://dashboard.explorepi.info";
  const METABASE_SECRET_KEY =
    "5a83db60cdafdc82e6e26058f1e9ec1555475d69b8586c9c0b30fef86d2b623d";

  const payload = {
    resource: { question: 39 },
    params: {},
    exp: Math.round(Date.now() / 1000) + 10 * 60, // 10 minute expiration
  };
  const token = jwt.sign(payload, METABASE_SECRET_KEY);

  const iframeUrl =
    METABASE_SITE_URL +
    "/embed/question/" +
    token +
    "#bordered=true&titled=true";

  const map_payload = {
    resource: { question: 38 },
    params: {},
    exp: Math.round(Date.now() / 1000) + 10 * 60, // 10 minute expiration
  };
  const map_token = jwt.sign(map_payload, METABASE_SECRET_KEY);

  const map_iframeUrl =
    METABASE_SITE_URL +
    "/embed/question/" +
    map_token +
    "#bordered=true&titled=true";

  const rank_payload = {
    resource: { question: 40 },
    params: {},
    exp: Math.round(Date.now() / 1000) + 10 * 60, // 10 minute expiration
  };
  const rank_token = jwt.sign(rank_payload, METABASE_SECRET_KEY);

  const rank_iframeUrl =
    METABASE_SITE_URL +
    "/embed/question/" +
    rank_token +
    "#bordered=true&titled=true";
  return (
    <>
      <iframe src="https://dashboard.explorepi.info/public/question/e1397e29-5c09-4f5f-ab84-ad3dac7de466"  width={"100%"} height={"100%"} />
      <iframe src={"https://dashboard.explorepi.info/public/question/c2b6ebda-3d1c-4af0-a44d-a913f73b9d53"} width={"100%"} height={"100%"} />
      <iframe src="https://dashboard.explorepi.info/public/question/68a7ffb8-bbfe-49b9-9fc0-b3fab5a73d94"  width={"100%"} height={"100%"} />
    </>
  );
}
