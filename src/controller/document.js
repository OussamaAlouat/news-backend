import Document from '../model/document';

const postDocument = (req, res) => {
    const {title, description, date, content, author, arhiveDate} = req.body;

    //If there are one document with the same title, description, content and author is because is the same document that
    //we will put in our database.
    Document.find({title: title, description: description, author: author, content: content})
        .then((response) => {
            if (response > 0) {
                const errorMessage = 'This document already exists on database';
                res.status(409).json({message: errorMessage});
            }

            const newDocument = new Document({
                title: title,
                description: description,
                date: date,
                content: content,
                author: author,
                arhiveDate: arhiveDate
            });

            newDocument.save((err, data) => {
                if (err) {
                    res.json(err)
                } else {
                    const message = 'Document created correctly';
                    res.status(201).json({message})
                }
            })
        })

};

export {postDocument}