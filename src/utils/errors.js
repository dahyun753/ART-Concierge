const ERRORS = {
  INVALID_INPUT: {
    statusCode: 400,
    message: "잘못된 요청입니다. 요청 형식을 확인해주세요.",
  },
  UNAUTHORIZED_ACCESS: {
    statusCode: 401,
    message: "인증이 필요합니다. 로그인 정보를 확인해주세요.",
  },
  FORBIDDEN: {
    statusCode: 403,
    message: "접근이 거부되었습니다. 접근 권한을 확인해주세요.",
  },
  NOT_FOUND: {
    statusCode: 404,
    message: "요청한 리소스를 찾을 수 없습니다.",
  },
  NOT_ACCEPTABLE: {
    statusCode: 406,
    message: "요청한 형식으로 응답할 수 없습니다.",
  },
  INTERNAL_SERVER_ERROR: {
    statusCode: 500,
    message: "서버 내부 오류가 발생했습니다.",
  },
  BAD_GATE: {
    statusCode: 502,
    message: "상위 서버로부터 잘못된 응답을 받았습니다.",
  },
};

module.exports = ERRORS;
