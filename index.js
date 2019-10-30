const Joi = require('joi');
const ex = require('express');
const app = ex();
app.use(ex.json());
const port = process.env.port || 3000;
const courses = [{
        id: 1,
        name: 'course1'
    },
    {
        id: 2,
        name: 'course2'
    },
    {
        id: 3,
        name: 'course3'
    }
];

// app.get('/', (req, res) => {
//     res.send('Hi!!');
// });
app.get('/api/courses', (req, res) => {
    res.send(courses);
});
app.post('/api/courses', (req, res) => {
    //if (!req.body.name || req.body.name.length <= 3) return res.status(404).send(`Name required. Must be more than 3 characters`);
    const {
        error
    } = validateCourse(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

app.put('/api/courses/:id', (req, res) => {
    const { //result.error
        error
    } = validateCourse(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send(`Course ID: ${req.params.id} not found`);
    course.name = req.body.name;
    res.send(course);
});

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send(`Course ID: ${req.params.id} not found`);
    res.send(course);
});

app.delete('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send(`Course ID: ${req.params.id} not found`);
    const index = courses.indexOf(course);
    courses.splice(index, 1);
    res.send(course);
});

const validateCourse = (course) => {
    const schema = {
        name: Joi.string().min(3).required()
    }
    return Joi.validate(course, schema);
}
// app.post()
// app.put()
// app.delete()

app.listen(port, () => console.log(`listening on ${port}`));