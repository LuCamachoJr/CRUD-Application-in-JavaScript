function(doc) {
  if (doc._id.substr(0, 8) === "project:"||"idea:") {
    emit(doc._id.substr(8), {
    "_id": doc._id,
    "_rev": doc._rev,
    "catType": doc.catType,
    "newID": doc.newID,
    "newNote": doc.newNote,
    "startDate": doc.startDate,
    "status": doc.status
    });
  }
};