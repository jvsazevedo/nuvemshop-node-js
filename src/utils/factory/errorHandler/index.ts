export function parseError(e: any) {
  const error = {
      success: false,
      response: {
          msg: '',
          error: {}
      }
  }
  if (!e.response) {
      error.response.msg = e.message || e;
  } else {
      error.response.error =
          e.response.data
              ? e.response.data
              : e.response;
  }
  return error;
}