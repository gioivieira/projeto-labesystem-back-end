import { Request, Response } from "express";
import { StudentsDatabase } from "../database/class/StudentsDatabase";
import { connection } from "../database/data/connection";

export const searchStudents = async (req: Request, res: Response): Promise<void> => {
    let search = req.query.search as string
    let errorCode = 400

    try {
        const studentDatabase = new StudentsDatabase()

        if (!search) {
            search = "%"
        }

        let students = await studentDatabase.searchFor("name", "like", `%${search}%`)

        for (let i = 0; i < students.length; i++) {
            const className = await connection.select("LabeSystem_Class.name")
            .from("LabeSystem_Class")
            .where("id", students[i].class_id)

            students[i].class = className[0].name

            const hobbies = await connection.select("LabeSystem_Hobbies.hobby_name")
            .from("LabeSystem_Students_Hobbies")
            .join("LabeSystem_Hobbies", "LabeSystem_Hobbies.id", "=", "LabeSystem_Students_Hobbies.hobby_id")
            .where('student_id', students[i].id)

            let studentHobbies = []

            for (let y = 0; y < hobbies.length; y++) {
                studentHobbies.push(hobbies[y].hobby_name)
            }

            students[i].hobbies = studentHobbies

        }

        if (students.length < 1) {
            errorCode = 404
            throw new Error("No students found with the given search parameter.");

        }
        
        res.status(200).send(students)

    } catch (error: any) {
        res.status(500).send(error.message)
    }
}