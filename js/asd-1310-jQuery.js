/*
 * Author: Luis Camacho Jr.
 * Full Sail University
 * Course: ASD
 * Term: 1310
 * Project Week 2
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

    $('#storage').on("click", function () {
        if (localStorage.length === 0) {
            alert("No Projects or Ideas have been saved");
        } else {
            window.location = "#viewProjects"
        }
    });

    console.log("addProject page is loaded");

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
});

function storeData(key) {

    if (!key) {
        var id = Math.floor(Math.random() * 100001);
    } else {
        id = key;
    }
    var formItems = {};
    formItems.catType = ["Choose A Category Type:", $(':selected').val()];
    formItems.newID = ["Enter New Project or Idea:", $("#newProject").val()];
    formItems.newNote = ["Enter Note on Project or Idea:", $("#detailTxt").val()];
    formItems.startDate = ["Enter Start Date:", $("#startDate").val()];
    formItems.status = ["Globalize:", $('[name="globalizationOptions"]:checked').val()];
    localStorage.setItem(id, JSON.stringify(formItems));
    console.log(formItems);
    alert("Saving " + formItems.catType[1] + " " + id + "! Select Display Data Link Above To View Or Edit Data!");

    // window.location.reload();

        window.location = '#viewProjects';
        createList();


    $('#projectData')[0].reset();
    // Working on adding effects to Logo
    /*       $('#projectData').fadeOut();
     $('#logoAnimation').delay(800).fadeIn('slow').fadeOut(1000).fadeIn(1000).fadeOut(1000).fadeIn(1000);

     $.fn.slideFadeToggle  = function(speed, easing, callback) {
     return this.animate({opacity: 'toggle', height: 'toggle'}, speed, easing, callback);
     };
     $("#logoAnimation").click(function() {
     if(formItems.catType[1]==="Project"){
     $(this).slideFadeToggle();
     $('#projectData').fadeIn();
     window.location = '#viewProjects';
     createList();
     }else{
     $(this).slideFadeToggle();
     $('#projectData').fadeIn();
     window.location = '#viewIdeas'
     createList();
     return false;
     }
     $('#projectData').fadeIn();


     //  window.location = "#";
     });*/
}



//Third page code for ID:viewProjects - viewIdeas - ViewCompleted
$('#viewProjects').on('pageinit', function () {


    console.log("viewProjects page is Loaded");
    createList();

});

$('#viewProject').on('click', function () {
    if (localStorage.length === 0) {
        alert("No Projects or Ideas have been saved");
    } else {
        window.location = "#viewProjects"
    }
});


//xml loaded via AJAX
$('#viewIdeas').on('pageinit', function () {
    console.log("viewIdeas page is Loaded");
    console.log("click Ideas function");

    alert("XML Data via ajax Loaded");


    $("#ideaJson").empty();

    $.ajax({
        url: "xhr/activity.xml",
        type: "GET",
        dataType: "xml",
        success: function (activityxml, status) {
            console.log(status, activityxml);
            $("#ideaXml").empty();
            $(activityxml).find("Activity").each(function () {
                var item = $(this);
                var makeSubList = $("<li data-theme='a' data-role=''></li>");
                var makeSubLi = $("<li>" + item.find('newID').text() + "</li>");
                var makeLink = $("<a href='#'></a>");

                makeLink.on('click', function () {
                    console.log("Dynamically creating page container for xml details");
                    var newIdeaData = $("<section data-role='page' data-url=CRUD><header data-role='header' data-theme='d'><h1>" + item.find('catType').text() + "</h1><a href='#viewIdeas' data-icon='back' data-iconpos='notext' data-direction='reverse' class='ui-btn-left'>back</a></header><section data-role='content'><ul  data-role='listview' data-theme='d' id='listJson'><li><br>" + item.find('newID').text() + "</li><li><br>" + item.find('newNote').text() + "</li><li><br>" + item.find('startDate').text() + "</li><li><br> " + item.find('status').text() + "</li></ul></section><footer data-role='footer' data-theme='b' data-position='fixed' style='overflow:hidden;'><nav data-role='navbar' data-position='fixed' data-iconpos='bottom'><ul><li><a href='#addProject' class='' data-icon='plus'>Add New</a></li><li><a href='#' class='editData' data-icon='edit'>Edit</a></li><li><a href='#' class='deleteData' data-icon='delete'>Delete</a></ul></nav></footer></section>");

                    newIdeaData.appendTo($.mobile.pageContainer);

                    $.mobile.changePage(newIdeaData);
                    $('.editData').on('click', function(){
                        alert("xml data static edit function disabled");
                    });
                    $('.deleteData').on('click', function(){
                        alert("xml data static delete function disabled");
                    });
                });
                makeLink.html(makeSubLi);
                makeSubList.append(makeLink).appendTo("#ideaXml");
            }); // end of activityxml function
            $('#ideaXml').listview('refresh');
        } //end of success function
    }); //end of ajax
    console.log("AJAX");

}); //end of viewProjects


// JSON loaded via AJAX
$('#viewCompleted').on('pageinit', function () {
    console.log("viewCompleted page is Loaded");
    console.log("click Completed function");
    alert("JSON Data via ajax Loaded");

    //AJAX Shortcut Method
    $.getJSON("xhr/activity.json", function (activities, status) {
        console.log(status, activities);
        //Start off with an empty list every time to get the latest from server
        $('#thinkTankList').empty();

        //add the activity items as list
        $.each(activities, function (i, activity) {
            $('#thinkTankList').append(generateActivityLink(activity));
        });

        //refresh the list view to show the latest changes
        $('#thinkTankList').listview('refresh');

    });
});

//creates a activity link list item

function generateActivityLink(activity) {

    //create link to detail page
    return '<li><a href="javascript:void(0)' + '" onclick="goToActivityDetailPage(\'' + activity.catType + '\',\'' + activity.newID + '\',\'' + activity.newNote + '\',\'' + activity.startDate + '\',\'' + activity.status + '\')">' + activity.newID + '</a></li>';
}

function goToActivityDetailPage(thinkTank, projectName, detailedNotes, initialize, globalize) {

    //create the page html template
    var activityPage = $("<section data-role='page' data-url=CRUD><header data-role='header' data-theme='d'><h1>" + thinkTank + "</h1><a href='#viewCompleted' data-icon='back' data-iconpos='notext' data-direction='reverse' class='ui-btn-left'>back</a></header><section data-role='content'><ul  data-role='listview' data-theme='d' id='listJson'><li><br>" + projectName + "</li><li><br>" + detailedNotes + "</li><li><br>" + initialize + "</li><li><br> " + globalize + "</li></ul></section><footer data-role='footer' data-theme='b' data-position='fixed' style='overflow:hidden;'><nav data-role='navbar' data-position='fixed' data-iconpos='bottom'><ul><li><a href='#addProject' class='' data-icon='plus'>Add New</a></li><li><a href='#' class='editFn' data-icon='edit'>Edit</a></li><li><a href='#' class='deleteFn' data-icon='delete'>Delete</a></ul></nav></footer></section>");

    //append the new page to the page container
    activityPage.appendTo($.mobile.pageContainer);

    //go to the newly created page
    $.mobile.changePage(activityPage);

    $('.editFn').on('click', function(){
        alert("JSON data static edit function disabled");
    });
    $('.deleteFn').on('click', function(){
        alert("JSON data static delete function disabled");
    });
}


function createList() {
    $("#formList").empty();
    $.each(localStorage, function (i) {
        var key = localStorage.key(i);
        var item = JSON.parse(localStorage.getItem(key));
        console.log(item);
        console.log(key);

        var makeSubList = $("<li data-theme='a' data-role=''" + item.startDate[1] + " ID " + key + "></li>");
        var makeSubLi = $(
            "<h1>" + item.catType[1] + "</h1>" +
                "<li>" + item.newID[1] + "</li>");
        var makeLink = $("<a href='#' id='" + key + "'>Edit Data 123</a>");
        makeLink.on('click', function () {
            console.log("This is my key: " + this.id);
            var newFormData = $("<section data-role='page' data-url=CRUD><header data-role='header' data-theme='d'><h1>" + item.catType[1] + "</h1><a href='#viewCompleted' data-icon='back' data-iconpos='notext' data-direction='reverse' class='ui-btn-left'>back</a></header><section data-role='content'><ul  data-role='listview' data-theme='d' id='listJson'><li><br>" + item.newID[1] + "</li><li><br>" + item.newNote[1] + "</li><li><br>" + item.startDate[1] + "</li><li><br> " + item.status[1] + "</li></ul></section><footer data-role='footer' data-theme='b' data-position='fixed' style='overflow:hidden;'><nav data-role='navbar' data-position='fixed' data-iconpos='bottom'><ul><li><a href='#addProject' class='' data-icon='plus'>Add New</a></li><li><a href='#addProject' class='editData' id='" + key + "' data-icon='edit'>Edit</a></li><li><a href='#' class='deleteData' id='" + key + "' data-icon='delete'>Delete</a></ul></nav></footer></section>");

            newFormData.appendTo($.mobile.pageContainer);

            $.mobile.changePage(newFormData);

            //Delete Function
            $('.deleteData').on('click', function (e) {
                e.preventDefault();
                var ask = confirm("Are you sure you want to delete Data?");
                if (ask) {
                    localStorage.removeItem(this.id);
                    alert("Data Deletion Process Complete!");
                    location.reload();
                } else {
                    alert("Data Deletion Process Canceled.")
                }
            });
            // End of Delete function

            //Edit Function
            $('.editData').on('click', function () {
                // e.preventDefault();
                console.log(this.id);
                var key = (this.id);
                console.log(key);
                var value = localStorage.getItem(this.id);
                console.log(value);
                var item = JSON.parse(value);
                console.log(item);
                $('#categoryType').val(item.catType[1]);
                $('#newProject').val(item.newID[1]);
                $('#detailTxt').val(item.newNote[1]);
                $('#startDate').val(item.startDate[1]);
                $('[name="globalizationOptions"]').val(item.status[1]);

                console.log(item.status[1]);

                $('#submitDataForm').on('click', function () {

                    storeData(key);
                    location.reload();
                    console.log(key);
                    window.location = '#viewProjects';

                });
            });
        });
        makeLink.html(makeSubLi);
        makeSubList.append(makeLink).appendTo("#formList");

        $("#formList").listview('refresh');

        //Delete Function
        $('.deleteData').on('click', function (e) {
            e.preventDefault();
            var ask = confirm("Are you sure you want to delete Data?");
            if (ask) {
                localStorage.removeItem(this.id);
                alert("Data Deletion Process Complete!");
                location.reload();
            } else {
                alert("Data Deletion Process Canceled.")
            }
        });
        // End of Delete function

        //Edit Function
        $('.editData').on('click', function () {
            // e.preventDefault();
            console.log(this.id);
            var key = (this.id);
            console.log(key);
            var value = localStorage.getItem(this.id);
            console.log(value);
            var item = JSON.parse(value);
            console.log(item);
            $('#categoryType').val(item.catType[1]);
            $('#newProject').val(item.newID[1]);
            $('#detailTxt').val(item.newNote[1]);
            $('#startDate').val(item.startDate[1]);
            $('[name="globalizationOptions"]').val(item.status[1]);

            console.log(item.status[1]);

            $('#submitDataForm').on('click', function () {

                storeData(key);
                location.reload();
                console.log(key);
                window.location = '#viewProjects';

            });


        });

    });
}