const ERRORS = {
  BAD_REQUEST: {
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
  METHOD_NOT_ALLOWED: {
    statusCode: 405,
    message: "허용되지 않은 메소드입니다.",
  },
  NOT_ACCEPTABLE: {
    statusCode: 406,
    message: "요청한 형식으로 응답할 수 없습니다.",
  },
  REQUEST_TIMEOUT: {
    statusCode: 408,
    message: "서버가 요청을 처리하는 데 허용된 시간보다 오래 걸렸습니다.",
  },
  CONFLICT: {
    statusCode: 409,
    message: "요청한 리소스가 이미 존재합니다.",
  },
  GONE: {
    statusCode: 410,
    message: "해당 웹페이지가 더 이상 존재하지 않습니다.",
  },
  URI_TOO_LONG: {
    statusCode: 414,
    message: "요청 URI가 너무 깁니다.",
  },
  UNSUPPORTED_MEDIA_TYPE: {
    statusCode: 415,
    message: "서버에서 지원하지 않는 형식입니다.",
  },
  INTERNAL_SERVER_ERROR: {
    statusCode: 500,
    message: "서버 내부 오류가 발생했습니다.",
  },
  BAD_GATEWAY: {
    statusCode: 502,
    message: "상위 서버로부터 잘못된 응답을 받았습니다.",
  },
  SERVICE_UNAVAILABLE: {
    statusCode: 503,
    message: "서버에 접속자가 많아 요청을 처리할 수 없습니다.",
  },
  HTTP_VERSION_NOT_SUPPORTED: { 
    statusCode: 505,
    message: "지원되지 않는 HTTP 버전입니다.",
  },
};

module.exports = ERRORS;
