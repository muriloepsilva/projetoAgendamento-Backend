export const ok = (data) => STATUS_CODE_FORMAT(200, data);
export const noContent = (data) => STATUS_CODE_FORMAT(204, data);
export const badRequest = (data) => STATUS_CODE_FORMAT(400, data);
export const notFound = (data) => STATUS_CODE_FORMAT(404, data);

export const STATUS_CODE_FORMAT = (code, data) => ({
  code,
  message: data,
});
