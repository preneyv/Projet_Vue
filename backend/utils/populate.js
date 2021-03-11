import faker from "faker"
import Project from "../models/Project.js"

export default function (req, res) {
    let data = []

    for (let i = 0; i < 3; i++) {
        let tags = []
        let jobs = []

        for (let j = 0; j < 5; j++) {
            tags.push(faker.commerce.productAdjective())
            jobs.push(faker.name.jobTitle())
        }
        let el = {
            title: faker.name.title(),
            author: "603c08ff76c5cf37b82d2ba3",
            description: faker.commerce.productDescription(),
            tags,
            licence: "MIT",
            contact: faker.name.findName(),
            links: {},
            jobs,
        }
        data.push(el)
    }
    try {
        Project.insertMany(data, (err, docs) => {
            if (err) res.json(err)
            res.json(docs)
        })
    } catch (e) {
        res.json({ error: e })
    }
}
