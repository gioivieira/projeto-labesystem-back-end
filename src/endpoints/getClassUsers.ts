import { Request, Response } from "express";
import { ClassDatabase } from "../database/class/ClassDatabase";
import InstructorDatabase from "../database/class/InstructorDatabase";
import { StudentsDatabase } from "../database/class/StudentsDatabase";

export const getClassUsers = async (req: Request, res: Response) => {
    
    let errorCode = 400
    let classUsers = []
    let classDB = new ClassDatabase()
    let studentsDB = new StudentsDatabase()
    let instructorsDB = new InstructorDatabase()

    try {
        let allClass = await classDB.getAll()

        for(let classInfos of allClass){
            let students = await studentsDB.getClassStudents("LabeSystem_Students.class_id", `${classInfos.id}`)
            let instructors = await instructorsDB.getClassInstructors("LabeSystem_Instructors.class_id", `${classInfos.id}`)

            classInfos = {
                classInfos,
                students,
                instructors
            }

            classUsers.push(classInfos)
        }

        res.status(200).send(classUsers)
                
    } catch (err: any) {
        res.status(errorCode).send(err.message)
    }
}