// pages/api/seoul.js

export default async function handler(req, res) {
  const { start, end, date } = req.query;

  if (!start || !end || !date) {
    return res.status(400).json({
      error: "start, end, date 쿼리 파라미터는 필수입니다."
    });
  }

  const API_KEY = "6d71694172676f6f353466574a6a77";
  const url = `https://openapi.seoul.go.kr/api/${API_KEY}/json/SPOP_DAILYSUM_JACHI/1/100/${date}`; // 100개로 제한

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 7000); // 7초 타임아웃

  try {
    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeout);

    const text = await response.text();

    if (!response.ok || !text.includes("SPOP_DAILYSUM_JACHI")) {
      return res.status(502).json({
        error: "서울시 OpenAPI 응답 오류 또는 해당 날짜 데이터 없음",
        status: response.status,
        body: text
      });
    }

    const data = JSON.parse(text);
    res.status(200).json(data);
  } catch (err) {
    clearTimeout(timeout);
    console.error("서울시 OpenAPI 호출 실패:", err.message);
    res.status(500).json({
      error: "서울시 OpenAPI 호출 실패",
      details: err.message || "Unknown error"
    });
  }
}
