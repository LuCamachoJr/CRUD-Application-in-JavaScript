/*
 * Author: Luis Camacho Jr.
 * Full Sail University
 * Course: ASD
 * Term: 1310
 * Project Week 4
 * Reference js from previous courses
 * refactor functions using jquery
 */


//global ajax setting
$.ajaxSetup({
    error: function (err) {
        console.log("error", err);
    }
});

//First page code for ID:pageOne
$('#pageOne').on('pageinit', function () {
    //code needed for home page goes here
    console.log("pageOne page is Loaded");
});


//Second page code for ID:addProject Form
$('#addProject').on('pageinit', function () {
    $('.ui-block-a').on("click", function () {
        window.location = "#pageOne"
    });

    $('.ui-block-b').on("click", function () {
        $('#projectData')[0].reset();
    });
    //CouchDb plugin .info creates object which I used dor data counter
    $('#storage').on("click", function () {
        $.couch.db("asdi").info({
            success: function (data) {
                console.log(data);
                if (data.doc_count === 0) {
                    console.log(data.doc_count);
                    alert("No Projects or Ideas have been saved");
                } else {
                    alert("Activities saved in Database: " + data.doc_count + " ");
                    //window.location = "#viewCompleted"
                    console.log(data.doc_count);
                }
            }
        });
    });

    console.log("addProject page is loaded");
    validateSubmit();
});

function validateSubmit() {
    ///MAKE FUNCTION FOR VALIDATOR AND SUBMIT HANDLER FOR NEW & EDITFN TO SOLVE CONFLICT OF SUBMIT HANDLER
    var dForm = $('#projectData');

    dForm.validate({
        invalidHandler: function (form, validator) {},

        submitHandler: function () {
            dForm.serializeArray();
            storeData();

            console.log(dForm.serializeArray());
            console.log(dForm);
        }

    });
}

function storeData() {
    var formItems = {};
    //formItems._id = $(':selected').val()+":"+$("#newProject").val();
    formItems.catType = ["Choose A Category Type:", $(':selected').val()];
    formItems.newID = ["Enter New Project or Idea:", $("#newProject").val()];
    formItems.newNote = ["Enter Note on Project or Idea:", $("#detailTxt").val()];
    formItems.startDate = ["Enter Start Date:", $("#startDate").val()];
    formItems.status = ["Globalize:", $('[name="globalizationOptions"]:checked').val()];
    $.couch.db("asdi").saveDoc(formItems, {
        success: function (data) {
            console.log(data);
            console.log(formItems);
            alert("Saving " + formItems.catType[1] + " " + formItems.newID[1] + "! Select Display Data Link Above To View Or Edit Data!");

            // window.location.reload();
            dynamicData();
            window.location = '#viewCompleted';
            $('#projectData')[0].reset();

        }
    });
}

//Third page code for ID:viewProjects - viewIdeas - viewCompleted
$('#viewProjects').on('pageinit', function () {


    console.log("viewProjects page is Loaded");
});

$('#viewProject').on('click', function () {


    $.couch.db("asdi").info({
        success: function (data) {
            console.log(data);
            if (data.doc_count === 0) {
                console.log(data.doc_count);
                alert("No Projects or Ideas have been saved");
            } else {
                window.location = "#viewProjects"
                console.log(data.doc_count);
            }
        }
    });
});

// JSON loaded via CouchDB Plugin
$('#viewCompleted').on('pageinit', function () {
    console.log("viewActivities page is Loaded");
    console.log("click Completed function");
    alert("CouchDB call loading JSON Data");
    dynamicData();
    $('#dataCounter').on("click", function () {
        $.couch.db("asdi").info({
            success: function (data) {
                console.log(data);
                if (data.doc_count === 0) {
                    console.log(data.doc_count);
                    alert("No Projects or Ideas have been saved");
                } else {
                    alert("Activities saved in Database: " + data.doc_count + " ");
                    // window.location = "#viewCompleted"
                    console.log(data.doc_count);
                }
            }
        });
    });
});

//Dynamically Creates new links and detail page when new CouchDB document is created
function dynamicData() {
    $.couch.db("asdi").view("app/project", {
        success: function (activities) {
            console.log(activities);
            //Start off with an empty list every time to get the latest from server
            $('#thinkTankList').empty();

            //add the activity items as list
            $.each(activities.rows, function (i, activity) {
                console.log(activity);

                $('#thinkTankList').append(generateActivityLink(activity));
            });

            //refresh the list view to show the latest changes
            $('#thinkTankList').listview('refresh');
        }
    });
}

// CouchDB plugin Bulk Remove to Delete Entire Database Function
$('#deleteAll').on('click', function (e) {
    e.preventDefault();
    $.each(activities.rows, function (i, activity) {
        console.log(activity);
        var deleteBulk = {};
        deleteBulk._id = activity.value._id;
        deleteBulk._rev = activity.value._rev;
        console.log(deleteBulk);
    });
    var ask = confirm("WARNING ARE YOU SURE YOU WANT TO DELETE ENTIRE DATABASE");
    if (ask) {
        $.couch.db("asdi").bulkRemove({
            "docs": deleteBulk
        }, {
            success: function (data) {
                console.log(data);

                alert("Entire Database Deletion Process Complete!");
                // dynamicData();
                window.location = "#pageOne";

            },
            error: function (status) {
                console.log(status);
            }
        });
    } else {
        alert("Database Deletion Process Canceled.")
    }
});

//creates a activity link list item
function generateActivityLink(activity) {

    //create link to detail page
    return '<li><a href="javascript:void(0)' + '" onclick="goToActivityDetailPage(\'' + activity.value._id + '\',\'' + activity.value._rev + '\',\'' + activity.value.catType[1] + '\',\'' + activity.value.newID[1] + '\',\'' + activity.value.newNote[1] + '\',\'' + activity.value.startDate[1] + '\',\'' + activity.value.status[1] + '\')">' + activity.value.newID[1] + '</a></li>';
}

function goToActivityDetailPage(thinkTankId, thinkTankRev, thinkTank, projectName, detailedNotes, initialize, globalize) {

    //create the page html template
    var activityPage = $("<section data-role='page' data-url=CRUD><header data-role='header' data-theme='d'><h1>" + thinkTank + "</h1><a href='#viewCompleted' data-icon='back' data-iconpos='notext' data-direction='reverse' class='ui-btn-left'>back</a></header><section data-role='content'><ul  data-role='listview' data-theme='d' id='listJson'><li><br>" + projectName + "</li><li><br>" + detailedNotes + "</li><li><br>" + initialize + "</li><li><br> " + globalize + "</li></ul></section><footer data-role='footer' data-theme='b' data-position='fixed' style='overflow:hidden;'><nav data-role='navbar' data-position='fixed' data-iconpos='bottom'><ul><li><a href='#addProject' class='' data-icon='plus'>Add New</a></li><li><a href='#addProjectB' class='editFn' data-id=" + thinkTankId + " data-icon='edit'>Edit</a></li><li><a href='#' class='deleteFn' data-rev=" + thinkTankRev + " data-id=" + thinkTankId + " data-icon='delete'>Delete</a></ul></nav></footer></section>");

    //append the new page to the page container
    activityPage.appendTo($.mobile.pageContainer);

    //go to the newly created page
    $.mobile.changePage(activityPage);
    // Edit Function attaches _id & rev to edit button dynamically to page detail's edit button in Nav bar
    $('.editFn').on('click', function () {

        var activityEdit = thinkTankId;

        alert("Edit data");

        console.log(activityEdit);
        $.couch.db("asdi").openDoc(activityEdit, {
            success: function (data) {
                console.log(data);
                $('#categoryTypeB').val(data.catType[1]).change();
                $('#newProjectB').val(data.newID[1]);
                $('#detailTxtB').val(data.newNote[1]);
                $('#startDateB').val(data.startDate[1]);
                var rb = $('input:radio[name=globalizationOptionsB]');
                //  $(rb).checkboxradio("clear");
                for (var a = 0; a < rb.length; a++) {

                    if (rb[a].value == "Post to Twitter" && data.status[1] == "Post to Twitter") {
                        //  rb[a].val("checked", true);
                        //Set JQM radio based on value & val
                        $(rb[a]).prop('checked', true).checkboxradio("refresh");
                        //Un-check JQM radio based on value & val
                        $('input:radio#pvtChoiceB').prop('checked', false).checkboxradio("refresh")
                        console.log(rb[a]);
                    } else if (rb[a].value == "Keep it Private" && data.status[1] == "Keep it Private") {
                        //Set JQM radio based on value & val
                        $(rb[a]).prop('checked', true).checkboxradio("refresh");
                        //Un-check JQM radio based on value & val
                        $('input:radio#ProjectTwitterB').prop('checked', false).checkboxradio("refresh");
                        //  $('label[for="pvtChoiceB"]').attr('data-icon', 'radio-on');
                        console.log(rb[a]);

                    }
                }
                // JQM radio checked status
                console.log($('input:radio[name=globalizationOptionsB]').prop("checked"));
                console.log(rb);
                // rb.filter(data.status[1]).attr('checked', true);
                console.log(data.status[1]);

            },
            error: function (status) {
                console.log(status);
            }
        });
        var dForm = $('#projectDataB');

        dForm.validate({
            invalidHandler: function (form, validator) {},

            submitHandler: function () {
                var activitySaveUpdated = {};
                activitySaveUpdated._id = thinkTankId;
                activitySaveUpdated._rev = thinkTankRev;
                //formItems._id = $(':selected').val()+":"+$("#newProject").val();
                activitySaveUpdated.catType = ["Choose A Category Type:", $('#categoryTypeB').val()];
                activitySaveUpdated.newID = ["Enter New Project or Idea:", $("#newProjectB").val()];
                activitySaveUpdated.newNote = ["Enter Note on Project or Idea:", $("#detailTxtB").val()];
                activitySaveUpdated.startDate = ["Enter Start Date:", $("#startDateB").val()];
                activitySaveUpdated.status = ["Globalize:", $('[name="globalizationOptionsB"]:checked').val()];
                $.couch.db("asdi").saveDoc(activitySaveUpdated, {
                    success: function (data) {
                        console.log(data);
                        console.log(activitySaveUpdated.catType);
                        //storeData();
                        //  location.reload();
                        console.log(data);
                        dynamicData();
                        window.location = '#viewCompleted';
                        $('#projectDataB')[0].reset();
                    },
                    error: function (status) {
                        console.log(status);
                        console.log("Response Text: conflict, reason: Document update conflict.");
                        console.log("Used CouchDB plugin Save Updated Document call, refresh page, researching CouchDB documentation");
                    }
                });
            }

        });

    });

    // Delete Function attaches _id & rev to delete button dynamically to page detail's delete button in Nav bar
    $('.deleteFn').on('click', function (e) {
        var activityDel = {};
        activityDel._id = thinkTankId;
        activityDel._rev = thinkTankRev;
        e.preventDefault();
        var ask = confirm("Are you sure you want to delete Data?");
        if (ask) {
            $.couch.db("asdi").removeDoc(activityDel, {
                success: function (data) {
                    console.log(data);
                    //$('#thinkTankList').empty();
                    alert("Data Deletion Process Complete!");
                    dynamicData();
                    window.location = "#viewCompleted";
                    //
                },
                error: function (status) {
                    console.log(status);
                }
            });
        } else {
            alert("Data Deletion Process Canceled.")
        }
    });
}