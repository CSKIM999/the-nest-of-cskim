if (process.env.NODE_ENV === "production") {
  // process.env.NODE_ENV => 지금 환경변수가 LOCAL 이라면 development,
  // 배포후라면 production 반환
  module.exports = require("./prod");
} else {
  // dev admin password보호를 위해 Local 모드일때만 password 가 노출된 ./dev 에서 가져오기
  module.exports = require("./dev");
}
