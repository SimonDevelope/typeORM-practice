import * as Koa from "koa";

export = cors;

/**
 * CORS middleware factory.
 * @param options - Configuration options.
 * @returns cors middleware
 */
declare function cors(options?: cors.Options): Koa.Middleware;

declare namespace cors {
  /**
   * Middleware configration options.
   */
  interface Options {
    /**
     * `Access-Control-Allow-Origin`, default is request Origin header.
     *
     * @remarks
     * If a function is provided, it will be called for each request with
     * the koa context object. It may return a string or a promise that
     * will resolve with a string.
     */
    origin?:
      | ((ctx: Koa.Context) => string)
      | ((ctx: Koa.Context) => PromiseLike<string>)
      | string
      | undefined;

    /**
     * `Access-Control-Allow-Methods`, default is
     * 'GET,HEAD,PUT,POST,DELETE,PATCH'
     */
    allowMethods?: string[] | string | undefined;

    /**
     * `Access-Control-Expose-Headers`
     */
    exposeHeaders?: string[] | string | undefined;

    /**
     * `Access-Control-Allow-Headers`
     */
    allowHeaders?: string[] | string | undefined;

    /**
     * `Access-Control-Max-Age` in seconds
     */
    maxAge?: number | string | undefined;

    /**
     * `Access-Control-Allow-Credentials`
     */
    credentials?: boolean | undefined;

    /**
     * Add set headers to `err.header` if an error is thrown
     */
    keepHeadersOnError?: boolean | undefined;
  }
}
