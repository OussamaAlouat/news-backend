import Document from '../model/document';

const postDocument = (req, res) => {
    const {title, description, date, content, author, archiveDate, isArchived} = req.body;

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
                    archiveDate: archiveDate,
                    isArchived: isArchived
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

    const {state} = req.query;

    if (state === 'archived') {
        Document.find({isArchived: true})
            .then((response) => {
                res.status(200).json({data: response})
            })
    } else {
        if (state === 'new') {
            Document.find({isArchived: false})
                .then((response) => {
                    res.status(200).json({data: response})
                })
        } else {
            Document.find()
                .then((response) => {
                    res.status(200).json({data: response})
                })
        }
    }
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
    const {id} = req.query;
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

const updateOneDocument = (req, res) => {
    const {id, title, description, content, archiveDate, isArchived} = req.body;
    Document.findByIdAndUpdate(id, {
        title: title,
        description: description,
        content: content,
        archiveDate: archiveDate,
        isArchived: isArchived
    }).then((result) => {
        const response = {
            message: "Document updated"
        };

        res.status(200).json(response);
    }).catch((err) => {
        const response = {
            message: "Document not found"
        };
        res.status(200).json(response);
    })
};

export {
    postDocument,
    getAllDocuments,
    getOneDocument,
    removeOneDocument,
    updateOneDocument
}