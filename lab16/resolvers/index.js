async function getRecordsByField(object, field, context) {
    const fields = {};
    fields[object ] = field;

    let records = [];
    if (field) {
        records = await context.getOne(object, fields);
    } else {
        records = await context.getAll(object);
    }
    return records;
}
async function mutateRecord(object, idField, fields, context) {
    console.log(object);
    // If id specified then we can use only it to search the record, if it isn't then it doesn't matter
    return await context.getOne(object, idField ? idField : fields)
        .then(async records => {
            let targetRecord = {};
            // If the record exists
            if (records.length > 0) {
                // Then update it and return updated variant
                targetRecord = await context.updateOne(object, fields)
                    .then(() => context.getOne(object, fields));
            } else {
                // delete id field from fields object
                delete fields[Object.keys(fields).find(field => fields[field] === idField)];
                //delete fields.Faculty_Id;
                // If there no, insert new one and return it
                targetRecord = await context.insertOne(object, fields)
                    .then(() => context.getOne(object, fields));
            }
            return targetRecord[0];
        });
}
async function deleteRecord(object, id, context) {
    let recordIdObject = {};
    recordIdObject[object] = id;
    let targetFaculty = await context.getOne(object, recordIdObject);
    context.deleteOne(object, id);
    return targetFaculty[0];
}


module.exports = {
    getFaculties: (args, context) => getRecordsByField('Faculty', args.FACULTY, context),
    getPulpits: (args, context) => getRecordsByField('Pulpit', args.PULPIT, context),
    getSubjects: (args, context) => getRecordsByField('Subject', args.SUBJECT, context),
    getTeachers: (args, context) => getRecordsByField('Teacher', args.TEACHER, context),
    getSubjectsByFaculties: async (args, context) => {
        const {faculty} = args;
        return await context.query(
                `SELECT SUBJCET,SUBJECT_NAME,s.PULPIT FROM Subject s
                    JOIN Pulpit p ON s.Pulpit = p.Pulpit 
                    JOIN Faculty f ON p.Faculty = f.Faculty
                    WHERE p.Faculty = '${faculty}';`
            );
    },
    getTeachersByFaculty: async (args, context) => {
        const {faculty} = args;
        return await context.query(
                `SELECT TEACHER,TEACHER_NAME,t.PULPIT FROM Teacher t 
                    JOIN Pulpit p ON t.Pulpit = p.Pulpit 
                    JOIN Faculty f ON p.Faculty = f.Faculty
                    WHERE p.Faculty = '${faculty}';`
            );
    },

    setFaculty: (args, context) => {
        console.log(args);
        let fields = {FACULTY: args.faculty.faculty, FACULTY_NAME: args.faculty.facultyName};
        return mutateRecord('Faculty', fields.Faculty, fields, context);
    },
    setPulpit: async (args, context) => {
        console.log(args);
        let fields = {PULPIT: args.pulpit.pulpit, PULPIT_NAME: args.pulpit.pulpitName, FACULTY: args.pulpit.faculty};
        return mutateRecord('Pulpit', fields.Pulpit, fields, context);
    },
    setSubject: async (args, context) => {
        console.log(args);
        let fields = {SUBJECT: args.subject.subject, SUBJECT_NAME: args.subject.subjectName, PULPIT: args.subject.pulpit};
        return mutateRecord('Subject', fields.Subject, fields, context);
    },
    setTeacher: async (args, context) => {
        console.log(args);
        let fields = {TEACHER: args.teacher.teacher, TEACHER_NAME: args.teacher.teacherName, PULPIT: args.teacher.pulpit};
        return mutateRecord('Teacher', fields.Teacher, fields, context);
    },

    delFaculty: (args, context) => deleteRecord('Faculty', args.id, context),
    delPulpit: (args, context) => deleteRecord('Pulpit', args.id, context),
    delSubject: (args, context) => deleteRecord('Subject', args.id, context),
    delTeacher: (args, context) => deleteRecord('Teacher', args.id, context)
};