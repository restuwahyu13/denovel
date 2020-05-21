import {renderFileToString} from 'https://deno.land/x/dejs@0.6.0/mod.ts';
import { renderFile } from 'https://deno.land/x/mustache/mod.ts';
import denjucks from "https://deno.land/x/denjucks/mod.js";

export async function viewEngineMiddleware(ctx: any, next: any) : Promise <void> {
    ctx.render  =  function(engine: string , view: string,  body: object)  {
        if(typeof engine === "undefined") throw new Error("view engine type is required");
         if(typeof view === "undefined" && typeof body === "undefined") throw new Error("template and data is required");
         switch(typeof engine === "string" && typeof view === "string" && typeof  body === "object" && engine) {
            case "ejs":
               const ejsTemplate : Promise<string> =  renderFileToString(`${Deno.cwd()}/resources/views/${view}.ejs`, body);
               return ejsTemplate;
            case "njk":
              const nunjucksTemplate : Promise<string> =  denjucks.render(`${Deno.cwd()}/resources/views/${view}.njk`, body);
              return nunjucksTemplate;
            case "mtc":
              const mustacheTemplate : Promise<string> =  renderFile(`${Deno.cwd()}/resources/views/${view}.mustache`, body);
              return mustacheTemplate;
            case "html":
              const decoded = new TextDecoder("utf-8");
              const file : ArrayBuffer  = Deno.readFileSync(`${Deno.cwd()}/resources/views/${view}.html`);
              const htmlTemplate: string = decoded.decode(file);
              return htmlTemplate;
            default:
              throw new TypeError("template must be string");
         }
     }
    await next();
}
