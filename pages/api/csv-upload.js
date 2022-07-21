import { axiosInstance } from "axios.config"
import { getSession } from "next-auth/react"
import middleware from 'middleware/middleware'
import nextConnect from 'next-connect'
// import { parse } from "papaparse"
import { withCSV } from 'with-csv'
import { toFormData, toFormData2 } from "utils"
import fs from 'fs'
import csvParser from "csv-parser"
import _ from "lodash"
import { BASE_URL } from "configs"
import { URLSearchParams } from "url"



const handler = nextConnect()
handler.use(middleware)

handler.post(async (req, res) => {
    try {


        let session = await getSession({ req })

        let file = req.files.file?.length > 0 ? req.files.file[0] : null
        // if(file.headers['content-type'] != 'text/csv'){
        //     res.status(406).json({ message:"Invalid CSV file"})
        //     return
        // }



        var records = await withCSV(file.path).query().toJSON()
        records = JSON.parse(records)
        console.log(records)

        // records = [ { 'name': 'vendor type 1' }, { 'name': 'vendor type 2' } ]

        if (session.accessToken) {
            await Promise.all(records?.map(async (item, id) => {

                let _res = await axiosInstance.post('/api/settings/vendor-type', toFormData(item), {
                    headers: {
                        'Authorization': 'Bearer ' + session.accessToken
                    }
                })
                console.log(_res)

            }))
            res.status(200).json({ message: "success" })
        }
    }
    catch (e) {
        console.log(e)
    }


})

export const config = {
    api: {
        bodyParser: false,
    },
}


export default handler