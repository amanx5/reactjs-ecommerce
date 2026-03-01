export enum HttpStatus {
  // =============================
  // 2xx Success
  // =============================

  /**
   * 200 OK
   * - Use when request succeeded and you are returning data.
   * - Example: fetching products, cart items, user profile.
   */
  OK = 200,

  /**
   * 201 Created
   * - Use when a new resource is successfully created.
   * - Example: creating order, user registration, adding new product.
   */
  CREATED = 201,

  /**
   * 202 Accepted
   * - Use when request is accepted but processed asynchronously.
   * - Example: background job triggered, payment processing started.
   */
  ACCEPTED = 202,

  /**
   * 204 No Content
   * - Use when operation succeeded but no response body is returned.
   * - MUST NOT include JSON body.
   * - Example: delete item, update without returning data.
   */
  NO_CONTENT = 204,

  // =============================
  // 3xx Redirection
  // =============================

  /**
   * 304 Not Modified
   * - Use for caching scenarios.
   * - Example: client sends ETag/If-Modified-Since and resource hasn't changed.
   */
  NOT_MODIFIED = 304,

  // =============================
  // 4xx Client Errors (Client mistake)
  // =============================

  /**
   * 400 Bad Request
   * - Use when request format is invalid or required data is missing.
   * - Example: invalid JSON body, missing required field.
   */
  BAD_REQUEST = 400,

  /**
   * 401 Unauthorized
   * - Use when authentication is required or token is invalid.
   * - Example: missing/expired JWT token.
   */
  UNAUTHORIZED = 401,

  /**
   * 403 Forbidden
   * - Use when user is authenticated but not allowed to access resource.
   * - Example: normal user trying to access admin route.
   */
  FORBIDDEN = 403,

  /**
   * 404 Not Found
   * - Use when requested resource does not exist.
   * - Example: product ID not found, cart item not found.
   */
  NOT_FOUND = 404,

  /**
   * 409 Conflict
   * - Use when request conflicts with current state.
   * - Example: duplicate email, product out of stock, already exists.
   */
  CONFLICT = 409,

  /**
   * 422 Unprocessable Entity
   * - Use when validation fails but request format is correct.
   * - Example: password too short, invalid email format.
   */
  UNPROCESSABLE_ENTITY = 422,

  // =============================
  // 5xx Server Errors (Server fault)
  // =============================

  /**
   * 500 Internal Server Error
   * - Use for unexpected server failures.
   * - Example: unhandled exception, database crash.
   */
  INTERNAL_SERVER_ERROR = 500,

  /**
   * 502 Bad Gateway
   * - Use when upstream service fails.
   * - Example: payment gateway failure, external API error.
   */
  BAD_GATEWAY = 502,

  /**
   * 503 Service Unavailable
   * - Use when server is temporarily unavailable.
   * - Example: maintenance mode, DB unavailable.
   */
  SERVICE_UNAVAILABLE = 503,
}
