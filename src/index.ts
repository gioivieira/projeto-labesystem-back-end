import app from "./app";
import { createStudent } from "./endpoints/createStudent";
import { searchStudents } from "./endpoints/searchStudents";
import { createClass } from "./endpoints/createClass";
import { searchClass } from "./endpoints/searchClass";
import { createInstructor } from "./endpoints/createInstructor";
import { getAllInstructors } from "./endpoints/getAllInstructors";
import { updateStudentClass } from "./endpoints/updateStudentClass";
import { updateInstructorClass } from "./endpoints/updateInstructorClass";
import { updateClassModule } from "./endpoints/updateClassModule";
import { getStudentsByHobbies } from "./endpoints/getStudentsByHobbies";
import { getUsersZodiacSigns } from "./endpoints/getUsersZodiacSigns";
import { getClassUsers } from "./endpoints/getClassUsers";


//Get All Instructors
app.get("/instructors", getAllInstructors)

//Create Instructor
app.post("/instructors", createInstructor)

//Update Instructor's Class
app.patch("/instructors/:instructor_id", updateInstructorClass)

//Search Students
app.get("/students", searchStudents)

//Create Student
app.post("/students", createStudent)

//Update Student's Class
app.patch("/students/:studentId", updateStudentClass)

//Get Users Zodiac Signs
app.get("/students_intructors_signs", getUsersZodiacSigns)

//Get Students By Hobbies
app.get("/hobbies", getStudentsByHobbies)

//Search Active Classes
app.get("/class", searchClass)

//Get Students and Instructors By Class
app.get("/class/users", getClassUsers)

//Create Class
app.post("/class/create", createClass)

//Update Class Module
app.patch("/class/update/:id_class", updateClassModule)






