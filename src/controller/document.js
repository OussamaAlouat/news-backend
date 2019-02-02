import Document from '../model/document';

const postDocument = (req, res) => {
    const {title, description, date, content, author, arhiveDate} = req.body;

    //If there are one document with the same title, description, content and author is because is the same document that
    //we will put in our database.
    Document.find({title: title, description: description, author: author, content: content})
        .then((response) => {
            if (response.length > 0) {
                const errorMessage = 'This document already exists on database';
                res.status(409).json({message: errorMessage});
            } else {
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

            }
        })


};
const getAllDocuments = (req, res) => {
    Document.find()
        .then((response) => {
            res.status(200).json({data: response})
        })
};

const getOneDocument = (req, res) => {
    const {id} = req.body;
    Document.findById(id)
        .then((result) => {
            res.status(200).json({data: result});
        })
        .catch((err) => {
            res.status(200).json({data: []})
        })
};

const removeOneDocument = (req, res) => {
    const {id} = req.body;
    Document.findByIdAndRemove(id)
        .then((result) => {
            const response = {
                message: 'Document was delete',
                document_id: result._id
            };

            res.status(200).json({response});
        })
        .catch((err) => {
            res.status(200).json({message: 'Document not found'})
        })
};

export {
    postDocument,
    getAllDocuments,
    getOneDocument,
    removeOneDocument
}