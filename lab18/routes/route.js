const  express = require('express');
const router = express.Router();
const  db = require('../config/database');
const  Auditorium_type = require('../models/auditorium_type');
const  Faculty = require('../models/faculty');
const  Pulpit = require('../models/pulpit');
const  Subject = require('../models/subject');
const  Auditorium = require('../models/auditorium');


//get
router.get('/faculties',(req,res)=>Faculty.findAll()
    .then(faculties=>{
        console.log(faculties);
        res.json(faculties)
    }).catch(err=>console.log(err)));
router.get('/auditoriumstypes',(req,res)=>Auditorium_type.findAll()
    .then(auditorium_type=>{
        console.log(auditorium_type);
        res.json(auditorium_type);
    }).catch(err=>console.log(err)));
router.get('/pulpits',(req,res)=>Pulpit.findAll()
    .then(pulpit=>{
        console.log(pulpit);
        res.json(pulpit);
    }).catch(err=>console.log(err)));
router.get('/subjects',(req,res)=>Subject.findAll()
    .then(subject=>{
        console.log(subject);
        res.json(subject);
    }).catch(err=>console.log(err)));
router.get('/subjects',(req,res)=>Subject.findAll()
    .then(subject=>{
        console.log(subject);
        res.json(subject);
    }).catch(err=>console.log(err)));
router.get('/auditoriums',(req,res)=>Auditorium.findAll()
    .then(auditorium=>{
        console.log(auditorium);
        res.json(auditorium);
    }).catch(err=>console.log(err)));


//post
router.post('/faculties',(req,res)=>{
    let {faculty, faculty_name} = req.body;
    Faculty.create({
        faculty : faculty,
        faculty_name : faculty_name
    })
        .then(elem=>{
            res.json(elem);
        })
        .catch(err=> res.json({error:err.toString()}))
});
router.post('/auditoriumstypes',(req,res)=>{
    let {auditorium_type, auditorium_type_name} = req.body;
    Auditorium_type.create({
        auditorium_type : auditorium_type,
        auditorium_type_name : auditorium_type_name
    })
        .then(elem=>{
            res.json(elem);
        })
        .catch(err=> res.json({error:err.toString()}))
});
router.post('/pulpits',(req,res)=>{
    let {pulpit, pulpit_name, faculty} = req.body;
    Pulpit.create({
        pulpit : pulpit,
        pulpit_name : pulpit_name,
        faculty : faculty
    })
        .then(elem=>{
            res.json(elem);
        })
        .catch(err=> res.json({error:err.toString()}))
});
router.post('/subjects',(req,res)=>{
    let {subject, subject_name, pulpit} = req.body;
    Subject.create({
        subject : subject,
        subject_name : subject_name,
        pulpit : pulpit
    })
        .then(elem=>{
            res.json(elem);
        })
        .catch(err=> res.json({error:err.toString()}))
});
router.post('/auditoriums',(req,res)=>{
    let {auditorium, auditorium_name,auditorium_capacity,auditorium_type} = req.body;
    Auditorium.create({
        auditorium : auditorium,
        auditorium_name : auditorium_name,
        auditorium_capacity : auditorium_capacity,
        auditorium_type : auditorium_type
    })
        .then(elem=>{
            res.json(elem);
        })
        .catch(err=> res.json({error:err.toString()}))
});

//put
router.put('/faculties',(req,res)=>{
    let {faculty, faculty_name} = req.body;
    Faculty.update(
    {
        faculty : faculty,
        faculty_name : faculty_name
    },
    {
        where:{faculty:faculty}
    })
        .then(elem=>{
            res.json(elem);
        })
        .catch(err=> res.json({error:err.toString()}))
});
router.put('/auditoriumstypes',(req,res)=>{
    let {auditorium_type, auditorium_typename} = req.body;
    Auditorium_type.update(
        {
            auditorium_type: auditorium_type,
            auditorium_typename : auditorium_typename
        },
        {
            where:{auditorium_type:auditorium_type}
        })
        .then(elem=>{
            res.json(elem);
        })
        .catch(err=> res.json({error:err.toString()}))
});
router.put('/pulpits',(req,res)=>{
    let {auditorium_type, auditorium_typename} = req.body;
    Pulpit.update(
        {
            Pulpit: Pulpit,
            Pulpit_name : Pulpit_name,
            Faculty : Faculty
        },
        {
            where:{Pulpit:Pulpit}
        })
        .then(elem=>{
            res.json(elem);
        })
        .catch(err=> res.json({error:err.toString()}))
});
router.put('/subjects',(req,res)=>{
    let {subject, subject_name, pulpit} = req.body;
    Subject.update({
        subject : subject,
        subject_name : subject_name,
        pulpit : pulpit},
        {
            where:{subject:subject}
        })
        .then(elem=>{
            res.json(elem);
        })
        .catch(err=> res.json({error:err.toString()}))
});
router.put('/auditoriums',(req,res)=>{
    let {auditorium, auditorium_name,auditorium_capacity,auditorium_type} = req.body;
    Auditorium.update({
        auditorium : auditorium,
        auditorium_name : auditorium_name,
        auditorium_capacity : auditorium_capacity,
        auditorium_type : auditorium_type
    },
        {
            where :{auditorium:auditorium}
        })
        .then(elem=>{
            res.json(elem);
        })
        .catch(err=> res.json({error:err.toString()}))
});
router.delete('/pulpits/:id',(req,res)=>{
   let id = req.params.id;
   Pulpit.destroy({where:{Pulpit: id}})
       .then(elem=>{
       res.json('deleted'+elem +'row');
       })
       .catch(err=> res.json({error:err.toString()}))
});
router.delete('/subjects/:id',(req,res)=>{
    let id = req.params.id;
    Subject.destroy({where:{subject: id}})
        .then(elem=>{
            res.json('deleted'+elem +'row');
        })
        .catch(err=> res.json({error:err.toString()}))
});
router.delete('/faculties/:id',(req,res)=>{
    let id = req.params.id;
    Faculty.destroy({where:{faculty: id}})
        .then(elem=>{
            res.json('deleted'+elem +'row');
        })
        .catch(err=> res.json({error:err.toString()}))
});
router.delete('/faculties/:id',(req,res)=>{
    let id = req.params.id;
    Faculty.destroy({where:{faculty: id}})
        .then(elem=>{
            res.json('deleted'+elem +'row');
        })
        .catch(err=> res.json({error:err.toString()}))
});
router.delete('/auditoriums/:id',(req,res)=>{
    let id = req.params.id;
    Auditorium.destroy({where:{auditorium: id}})
        .then(elem=>{
            res.json('deleted'+elem +'row');
        })
        .catch(err=> res.json({error:err.toString()}))
});
module.exports = router;