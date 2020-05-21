import {renderFileToString} from 'https://deno.land/x/dejs@0.6.0/mod.ts';

export async function viewEngineMiddleware(ctx: any, next: any) : Promise <void> {
    ctx.render  =  function(engine: string , view: string,  body: object)  {
        if(typeof engine === "undefined") throw new Error("view engine type is required");
         if(typeof view === "undefined" && typeof body === "undefined") throw new Error("template and data is required");
         switch(typeof engine === "string" && typeof view === "string" && typeof  body === "object" && engine) {
             case "ejs":
               const ejsTemplate : Promise<string> =  renderFileToString(`${Deno.cwd()}/resources/views/${view}.ejs`, body);
               return ejsTemplate;
             case "html":
               const decoded = new TextDecoder("utf-8");
               const file : ArrayBuffer  = Deno.readFileSync(`${Deno.cwd()}/resources/views/${view}.html`);
               const htmlTemplate : string = decoded.decode(file);
               return htmlTemplate;
             default:
               throw new Error("template must be string");
         }
     }
    await next();
}
