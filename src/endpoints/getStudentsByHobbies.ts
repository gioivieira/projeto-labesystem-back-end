import { Request, Response } from "express";
import { connection } from "../database/data/connection";

export const getStudentsByHobbies = async (req: Request, res: Response): Promise<void> => {
    let errorCode = 400
    let hobby = req.query.hobby as string

    try {
        if (!hobby) {
            hobby = "%"
        }

        let searchHobby = await connection("LabeSystem_Hobbies")
        .select()
        .where('hobby_name', 'like', `%${hobby}%`)

        if (searchHobby.length < 1) {
            errorCode = 404
            throw new Error("No hobbies found with the given search parameter.");
        }

        for (let i = 0; i < searchHobby.length; i++) {
            let searchStudents = await connection.select("LabeSystem_Students_Hobbies.student_id", "LabeSystem_Students.name")
            .from("LabeSystem_Students_Hobbies")
            .where('hobby_id', `${searchHobby[i].id}`)
            .join("LabeSystem_Students", "LabeSystem_Students_Hobbies.student_id", "=", "LabeSystem_Students.id")

            searchHobby[i].students = searchStudents
        }

        res.status(200).send(searchHobby)

    } catch (error:any) {
       res.status(errorCode).send(error.message) 
    }
}