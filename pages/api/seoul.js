// pages/api/seoul.js

export default async function handler(req, res) {
  const { start, end, date } = req.query;

  if (!start || !end || !date) {
    return res.status(400).json({
      error: "start, end, date 파라미터는 필수입니다."
    });
  }

  const API_KEY = "6d71694172676f6f353466574a6a77";
  const url = `https://openapi.seoul.go.kr:8088/${API_KEY}/json/SPOP_DAILYSUM_JACHI/1/1000/${date}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "서울시 OpenAPI 호출 실패" });
  }
}
