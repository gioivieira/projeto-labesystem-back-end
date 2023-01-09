import { Request, Response } from "express";
import { ClassDatabase } from "../database/class/ClassDatabase";
import { StudentsDatabase } from "../database/class/StudentsDatabase";
import { connection } from "../database/data/connection";

export const updateStudentClass = async (req: Request, res: Response): Promise<void> => {
    const studentId = req.params.studentId as string
    const classId = req.body.newClassId as string
    let errorCode = 400

    try {
        const studentDatabase = new StudentsDatabase()
        
        if (!studentId || studentId === ":studentId") {
            errorCode = 422
            throw new Error("Provide student's ID.");
        }

        const studentsList = await studentDatabase.getAll()
        const findStudent = studentsList.find(student => student.id === studentId)

        if (!findStudent) {
            errorCode = 404
            throw new Error("Student's ID not found.");
        }

        if (!classId) {
            errorCode = 422
            throw new Error("Provide new class' ID.");
        }

        const classDataBase = new ClassDatabase()
        const classesList = await classDataBase.getAll()
        const findClass = classesList.find(classes => classes.id === classId)

        if (!findClass) {
            errorCode = 404
            throw new Error("New class' ID not found.");
            
        }

        const className = await connection.select("LabeSystem_Class.name")
        .from("LabeSystem_Class")
        .where("id", findStudent.class_id)

        await studentDatabase.updateInfo(studentId, "class_id", classId)

        const studentUpdated = studentsList.find(student => student.id === studentId)

        const newClassName = await connection.select("LabeSystem_Class.name")
        .from("LabeSystem_Class")
        .where("id", studentUpdated.class_id)

        res.status(200).send(`Student's ID: ${studentId} updated from CLASS ${className[0].name.toUpperCase()} to CLASS ${newClassName[0].name.toUpperCase()}.`)
    } catch (error:any) {
        res.status(errorCode).send(error.message)
    }
}