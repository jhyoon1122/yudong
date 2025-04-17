// pages/api/seoul.js

export default async function handler(req, res) {
  const { date, guCode } = req.query;

  if (!date) {
    return res.status(400).json({ error: "Missing 'date' query parameter" });
  }

  const API_KEY = "6d71694172676f6f353466574a6a77"; // 너의 서울시 API 키
  const url = `https://openapi.seoul.go.kr:8088/${API_KEY}/json/SPOP_DAILYSUM_JACHI/1/1000/${date}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    // guCode가 있으면 필터링
    const filtered = guCode
      ? {
          ...data.SPOP_DAILYSUM_JACHI,
          row: data.SPOP_DAILYSUM_JACHI.row.filter(
            (item) => item.SIGNGU_CODE_SE === guCode
          ),
        }
      : data.SPOP_DAILYSUM_JACHI;

    res.status(200).json(filtered);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch from Seoul OpenAPI" });
  }
}
