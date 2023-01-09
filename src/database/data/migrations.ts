import { connection } from "./connection"

const printError = (error: any) => { console.log(error.sqlMessage || error.message) }

const createTable = async () => await connection.raw(`
    CREATE TABLE IF NOT EXISTS LabeSystem_Class (
        id VARCHAR(80) PRIMARY KEY,
        name VARCHAR(80) UNIQUE NOT NULL,
        module ENUM('0', '1', '2', '3', '4', '5', '6') DEFAULT '0'
    );    

    CREATE TABLE IF NOT EXISTS LabeSystem_Students (
        id VARCHAR(80) PRIMARY KEY,
        name VARCHAR(180) NOT NULL,
        email VARCHAR(80) UNIQUE NOT NULL,
        birth_date DATE NOT NULL,
        class_id VARCHAR(80),
        FOREIGN KEY (class_id) REFERENCES LabeSystem_Class (id)
    );

    CREATE TABLE IF NOT EXISTS LabeSystem_Instructors (
        id VARCHAR(80) PRIMARY KEY,
        name VARCHAR(180) NOT NULL,
        email VARCHAR(80) UNIQUE NOT NULL,
        birth_date DATE NOT NULL,
        class_id VARCHAR(80),
        FOREIGN KEY (class_id) REFERENCES LabeSystem_Class (id)
    );

    CREATE TABLE IF NOT EXISTS LabeSystem_Hobbies (
        id VARCHAR(80) PRIMARY KEY,
        hobby_name VARCHAR(180) UNIQUE NOT NULL
    );

    CREATE TABLE IF NOT EXISTS LabeSystem_Expertise (
        id VARCHAR(80) PRIMARY KEY,
        expertise_name ENUM("React", "Redux", "CSS", "Testes Unitários", "TypeScript", "Programação Orientada a Objetos", "Backend") NOT NULL 
    );

    CREATE TABLE IF NOT EXISTS LabeSystem_Students_Hobbies (
        id VARCHAR(80) PRIMARY KEY, 
        student_id VARCHAR(80) NOT NULL,
        hobby_id VARCHAR(80) NOT NULL,
        FOREIGN KEY (student_id) REFERENCES LabeSystem_Students (id),
        FOREIGN KEY (hobby_id) REFERENCES LabeSystem_Hobbies (id)
    );

    CREATE TABLE IF NOT EXISTS LabeSystem_Instructors_Expertise (
        id VARCHAR(80) PRIMARY KEY,
        instructor_id VARCHAR(80) NOT NULL,
        expertise_id VARCHAR(80) NOT NULL,
        FOREIGN KEY (instructor_id) REFERENCES LabeSystem_Instructors (id),
        FOREIGN KEY (expertise_id) REFERENCES LabeSystem_Expertise (id)
    );


`).then(() => console.log('Tabelas criadas.')).catch(printError)

const insertData = async () => await connection.raw(`
    INSERT INTO LabeSystem_Class VALUES ('0000000000000', 'Undefined', '0');
    INSERT INTO LabeSystem_Class VALUES ('1571118682648', 'Barros', '6');
    INSERT INTO LabeSystem_Class VALUES ('1571118682649', 'Jemison', '6');
    INSERT INTO LabeSystem_Class VALUES ('1571118682650', 'Lamarr', '6');
    INSERT INTO LabeSystem_Class VALUES ('1571118682651', 'Davis', '2');
    INSERT INTO LabeSystem_Class VALUES ('1571118682652', 'Hooks', '4');
    INSERT INTO LabeSystem_Class VALUES ('1571118682653', 'Gonzaga', '0');
    INSERT INTO LabeSystem_Class VALUES ('1571118682654', 'Penha', '3');
    INSERT INTO LabeSystem_Class VALUES ('1571118682655', 'Amaral', '0');

    INSERT INTO LabeSystem_Students VALUES ('1571118685482', 'Francine Hahn', 'fran_hahn@hotmail.com', '1991-06-04', '1571118682648');
    INSERT INTO LabeSystem_Students VALUES ('1571118685874', 'Giovana Inez Vieira', 'gioivieira@gmail.com', '1999-04-01', '1571118682648');
    INSERT INTO LabeSystem_Students VALUES ('1571118687457', 'Maria Fernandez de Moura Ferro', 'mariafmferro@gmail.com', '1995-10-07', '1571118682648');
    INSERT INTO LabeSystem_Students VALUES ('1571118684578', 'Marcos Silva Rodrigues', 'marcosr@yahoo.com.br', '1988-11-10', '1571118682653');
    INSERT INTO LabeSystem_Students VALUES ('1571118683154', 'Regina Santos Ferreira', 'reginasferreira@gmail.com', '1978-07-07', '1571118682650');
    INSERT INTO LabeSystem_Students VALUES ('1571118688934', 'João Ricardo Guerra', 'joaoguerra@outlook.com', '1988-12-15', '1571118682654');
    INSERT INTO LabeSystem_Students VALUES ('1571118684575', 'Fernanda Cristina Pereira', 'fernandacpereira@hotmail.com', '2001-07-09', '1571118682649');

    INSERT INTO LabeSystem_Instructors VALUES ('1571118685489', 'Junior Prado', 'junior.prado@labenu.com', '1990-03-10', '1571118682648');
    INSERT INTO LabeSystem_Instructors VALUES ('1571118685899', 'Fayra Miranda', 'fayra.miranda@labenu.com', '1994-02-10', '1571118682648');
    INSERT INTO LabeSystem_Instructors VALUES ('1571118689985', 'Maju Baraldi', 'maju.baraldi@labenu.com', '1997-05-11', '1571118682650');
    INSERT INTO LabeSystem_Instructors VALUES ('1571118688745', 'Israel Cordeiro', 'israel.cordeiro@labenu.com', '1995-05-07', '1571118682649');
    INSERT INTO LabeSystem_Instructors VALUES ('1571118686575', 'Andrea Soares', 'andrea.soares@labenu.com', '1990-05-15', '1571118682653');
    INSERT INTO LabeSystem_Instructors VALUES ('1571118683345', 'Pedro Santos', 'pedro.santos@labenu.com', '1980-03-17', '1571118682654');
    INSERT INTO LabeSystem_Instructors VALUES ('1571118686854', 'Gabriel Ferreira', 'gabriel.ferreira@labenu.com', '1995-12-01', '1571118682651');

    INSERT INTO LabeSystem_Hobbies VALUES ('1571118682578', 'Ler');
    INSERT INTO LabeSystem_Hobbies VALUES ('1571118682232', 'Ver série');
    INSERT INTO LabeSystem_Hobbies VALUES ('1571118686568', 'Viajar');
    INSERT INTO LabeSystem_Hobbies VALUES ('1571118681127', 'Pescar');
    INSERT INTO LabeSystem_Hobbies VALUES ('1571118681348', 'Desenhar');
    INSERT INTO LabeSystem_Hobbies VALUES ('1571118688775', 'Cantar');

    INSERT INTO LabeSystem_Expertise VALUES ('1571118778555', 'Typescript');
    INSERT INTO LabeSystem_Expertise VALUES ('1571118878599', 'Backend');
    INSERT INTO LabeSystem_Expertise VALUES ('1571118872021', 'React');
    INSERT INTO LabeSystem_Expertise VALUES ('1571118874157', 'Redux');
    INSERT INTO LabeSystem_Expertise VALUES ('1571118871003', 'Programação Orientada a Objetos');
    INSERT INTO LabeSystem_Expertise VALUES ('1571118878897', 'Testes Unitários');

    INSERT INTO LabeSystem_Students_Hobbies VALUES ('1571118687788', '1571118685482', '1571118682578');
    INSERT INTO LabeSystem_Students_Hobbies VALUES ('1571118687682', '1571118685482', '1571118682232');
    INSERT INTO LabeSystem_Students_Hobbies VALUES ('1571118687772', '1571118685482', '1571118686568');
    INSERT INTO LabeSystem_Students_Hobbies VALUES ('1571118689988', '1571118685874', '1571118682232');
    INSERT INTO LabeSystem_Students_Hobbies VALUES ('1571118121333', '1571118685874', '1571118689987');
    INSERT INTO LabeSystem_Students_Hobbies VALUES ('1571118682323', '1571118687457', '1571118681348');
    INSERT INTO LabeSystem_Students_Hobbies VALUES ('1571118878783', '1571118687457', '1571118682232');
    INSERT INTO LabeSystem_Students_Hobbies VALUES ('1571455455453', '1571118687457', '1571118682578');
    INSERT INTO LabeSystem_Students_Hobbies VALUES ('1571118684041', '1571118684578', '1571118682232');
    INSERT INTO LabeSystem_Students_Hobbies VALUES ('1571118685200', '1571118683154', '1571118689987');
    INSERT INTO LabeSystem_Students_Hobbies VALUES ('1571118688897', '1571118688934', '1571118681127');
    INSERT INTO LabeSystem_Students_Hobbies VALUES ('1571118687152', '1571118684575', '1571118686568');

    INSERT INTO LabeSystem_Instructors_Expertise VALUES ('1571118879578', '1571118685489', '1571118878599');
    INSERT INTO LabeSystem_Instructors_Expertise VALUES ('1571545645645', '1571118685899', '1571118872021');
    INSERT INTO LabeSystem_Instructors_Expertise VALUES ('1571455557894', '1571118688745', '1571118874157');
    INSERT INTO LabeSystem_Instructors_Expertise VALUES ('1571557645645', '1571118686575', '1571118871003');
    INSERT INTO LabeSystem_Instructors_Expertise VALUES ('1571547775645', '1571118683345', '1571118872021');
    INSERT INTO LabeSystem_Instructors_Expertise VALUES ('1571745649989', '1571118686854', '1571118878599');
    INSERT INTO LabeSystem_Instructors_Expertise VALUES ('1571888455845', '1571118688745', '1571118878897');
    INSERT INTO LabeSystem_Instructors_Expertise VALUES ('1583245445345', '1571118685489', '1571118778555');
    INSERT INTO LabeSystem_Instructors_Expertise VALUES ('1583245447725', '1571118686575', '1571118878897');
    INSERT INTO LabeSystem_Instructors_Expertise VALUES ('1583879544758', '1571118689985', '1571118874157');
`).then(() => console.log('Dados inseridos.')).catch(printError)

const finish = async () => await connection.destroy()

createTable().then(insertData).finally(finish)