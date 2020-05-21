import Controller from './Controller.ts';
import { database } from '../../vendor/package/denovel/_database.ts';

export class Home extends Controller {

    /**
     * Set the output of index function
     * @param {any}
     * @return {any} abstract of index function
     */

    async index({response, render} : any){
        const denovel = database.collection("denovel");
        const datas = await denovel.find({ example: { $ne: null } });
        response.body =  await render("ejs", "index", { datas });
    }

    /**
     * Get the input of get function
     * @param {any}
     * @return {any} abstract of get function
     */

    async get({response, render}: any){
        const denovel = database.collection("denovel");
        const datas = await denovel.find({ example: { $ne: null } });
        response.body = await render("ejs", "index", { datas });
    }

    /**
     * Post the input of post function
     * @param {any}
     * @return {any} abstract of post function
     */

    async post({request, response, render}: any){
        const body = await request.body();
        const value = body.value.get("example");
        const denovel = database.collection("denovel");
        const data = await denovel.insertOne({
          example: value
        });

        const datas = await denovel.find({ example: { $ne: null } });
        response.body = await render("ejs", "index", { datas });
    }

    /**
     * Edit the input of edit function
     * @param {any}
     * @return {any} abstract of edit function
     */

    async edit({request, response, params, render}: any){
        const denovel = database.collection("denovel");
        const datas = await denovel.findOne({ _id: { "$oid": params.id } });
        response.body = await render("ejs", "edit", { datas });
    }

    /**
     * Put the input of put function
     * @param {any}
     * @return {any} abstract of put function
     */

    async put({request, response, params}: any){
        const body = await request.body();
        const value = body.value.get("example");
        const denovel = database.collection("denovel");
        const { matchedCount, modifiedCount, upsertedId } = await denovel.updateOne(
          { _id: { "$oid": params.id } },
          { $set: { example: value } }
        );

        response.body = {
            success: true,
            message: "Data updated succesfully!",
            data: params.id,
        }
    }

    /**
     * Delete the input of delete function
     * @param {any}
     * @return {any} abstract of delete function
     */

    async delete({request, response, params}: any){
        const denovel = database.collection("denovel");
        await denovel.deleteOne({ _id: { "$oid": params.id} });

        response.body = {
            success: true,
            message: "Data deleted succesfully!",
            data: params.id,
        }
    }
}
