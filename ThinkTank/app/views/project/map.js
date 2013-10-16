function(doc) {
  if (doc._id.substr(0, 8) === "project:") {
    emit(doc._id.substr(8), {
    "catType": doc.catType,
    "newID": doc.newID,
    "newNote": doc.newNote,
    "startDate": doc.startDate,
    "status": doc.status
    });
  }
};