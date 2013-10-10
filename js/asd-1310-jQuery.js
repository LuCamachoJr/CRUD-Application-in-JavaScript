/*
 * Author: Luis Camacho Jr.
 * Full Sail University
 * Course: ASD
 * Term: 1310
 * Project Week 2
 * Reference js from previous courses
 * refactor functions using jquery
 */

//First page code for ID:pageOne
$('#pageOne').on('pageinit', function(){
    //code needed for home page goes here
    console.log("pageOne page is Loaded");
});


//Second page code for ID:addProject Form
$('#addProject').on('pageinit', function(){
    $('.ui-block-a').on("click", function(){
        window.location="#pageOne"
    });

    $('.ui-block-b').on("click", function(){
        $('#projectData')[0].reset();
    });

    $('#storage').on("click", function(){
        if (localStorage.length === 0) {
            alert("No Projects or Ideas have been saved");
        }else{
            window.location="#viewProjects"
        }
    });

    console.log("addProject page is loaded");

    var dForm = $('#projectData');

    dForm.validate({
        invalidHandler: function(form, validator) {
        },
        submitHandler: function() {
            dForm.serializeArray();
                storeData();

            console.log(dForm.serializeArray());
            console.log(dForm);
        }

    });
    //$('#projectData')[0].reset();
});
function storeData(key) {

    if(!key){
        var id = Math.floor(Math.random() * 100001);
    }else{
        id=key;
    }
    var formItems = {};
    formItems.catType = ["Choose A Category Type:", $(':selected').val()];
    formItems.newID = ["Enter New Project or Idea:", $("#newProject").val()];
    formItems.newNote = ["Enter Note on Project or Idea:", $("#detailTxt").val()];
    formItems.startDate = ["Enter Start Date:", $("#startDate").val()];
    formItems.status = ["Globalize:", $('[name="globalizationOptions"]:checked').val()];
    localStorage.setItem(id, JSON.stringify(formItems));
    console.log(formItems);
    alert("Saving "+formItems.catType[1]+" "+id+"! Select Display Data Link Above To View Or Edit Data!");

    // window.location.reload();
    if(formItems.catType[1]==="Project"){

      //  $('#projectData')[0].reset();
        window.location = '#viewProjects';
        createList();

    }else{
     //   $('#projectData')[0].reset();
        window.location = '#viewIdeas';

        return false;
    }
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

    $('#storage').on('click', function(){
        if(formItems.catType[1]==="Project"){
            window.location = '#viewProjects';

        }else{
            window.location = '#viewIdeas'

            return false;
        }
    });

}



//Third page code for ID:viewProjects - viewIdeas - ViewCompleted
$('#viewProjects').on('pageinit', function () {
    if (localStorage.length === 0) {
        alert("No Projects or Ideas have been saved");

    }

    console.log("viewProjects page is Loaded");
    createList();

          });


$('#viewIdeas').on('pageinit', function(){
    console.log("viewIdeas page is Loaded");
        console.log("click Ideas function");
        if (localStorage.length === 0) {
            alert("There is no Data in Local Storage. XML Test Data Being Loaded");

            //testData function utilizes activities.json file to populate the form with Data.
            //For testing purposes.
            //testData();

        $("#ideaJson").empty();

        $.ajax({
            url: "xhr/activity.json",
            type: "GET",
            dataType: "json",
            success: function(activities, status){
                console.log(status, activities);
                //Start off with an empty list every time to get the latest from server
                $('#ideaJson').empty();

                //add the activity items as list
                $.each(activities, function(i, activity){
                    $('#ideaJson').append(generateActivityLink(activity));
                });

                //refresh the list view to show the latest changes
                $('#ideaJson').listview('refresh');

            }

        });
            console.log("AJAX");
        }
});

//global ajax setting
$.ajaxSetup({
    error: function(err){
        console.log("error", err);
    }

});

// JSON and YMAL loaded via AJAX
$('#viewCompleted').on('pageinit', function(){
    console.log("viewCompleted page is Loaded");
        console.log("click Completed function");
        if (localStorage.length === 0) {
            alert("There is no Data in Local Storage. YAML Test Data Being Loaded");
            //testData function utilizes activities.json file to populate the form with Data.
            //For testing purposes.
            //testData();
            $.getJSON("xhr/activity.json", function(activities){
                //Start off with an empty list every time to get the latest from server
                $('#thinkTankList').empty();

                //add the activity items as list
                $.each(activities, function(i, activity){
                    $('#thinkTankList').append(generateActivityLink(activity));
                });

                //refresh the list view to show the latest changes
                $('#thinkTankList').listview('refresh');

            });
        }
});

//R for read code functionality

/*$.getJSON("js/activity.json", function(activities){
    //Start off with an empty list every time to get the latest from server
    $('#thinkTankList').empty();

    //add the activity items as list
    $.each(activities, function(i, activity){
        $('#thinkTankList').append(generateActivityLink(activity));
    });

    //refresh the list view to show the latest changes
    $('#thinkTankList').listview('refresh');

});*/

//creates a activity link list item
function generateActivityLink(activity){

    //debugger;
    return '<li><a href="javascript:void(0)'
        + '" onclick="goToActivityDetailPage(\''
        + activity.catType
        + '\',\''
        + activity.newID +'\',\''+ activity.newNote +'\',\''+ activity.startDate +'\',\''+ activity.status +'\')">'
        + activity.newID
        + '</a></li>';
}

function goToActivityDetailPage(thinkTank,projectName,detailedNotes,intalize,globalize ){

    //create the page html template
    var activityPage = $("<section data-role='page' data-url=CRUD><header data-role='header' data-theme='d'><h1>"
        + thinkTank + "</h1><a href='#viewCompleted' data-icon='back' data-iconpos='notext' data-direction='reverse' class='ui-btn-left'>back</a></header><section data-role='content'><ul  data-role='listview' data-theme='d' id='listJson'><li><br>"
        + projectName + "</li><li><br>"
        + detailedNotes + "</li><li><br>"
        + intalize + "</li><li><br> "
        + globalize + "</li></ul></section><footer data-role='footer' data-theme='b' data-position='fixed' style='overflow:hidden;'><nav data-role='navbar' data-position='fixed' data-iconpos='bottom'><ul><li><a href='#addProject' class='' data-icon='plus'>Add New</a></li><li><a href='#' class='editFn' data-icon='edit'>Edit</a></li><li><a href='#' class='deleteFn' data-icon='delete'>Delete</a></ul></nav></footer></section>");

    //append the new page to the page container
    activityPage.appendTo( $.mobile.pageContainer );

    //go to the newly created page
    $.mobile.changePage( activityPage );
}


//End of R code
function createList(){
$("#formList").empty();
$.each(localStorage, function(i){
    var key = localStorage.key(i);
    var item = JSON.parse(localStorage.getItem(key));
    console.log(item);
    console.log(key);

    var makeSubList = $("<li data-theme='a' data-role=''"+item.startDate[1]+" ID "+key+"></li>");
    var makeSubLi = $(
        "<h1>"+item.catType[1]+"</h1>"+

        "<li>"+item.newID[1]+"</li>"+

        "<li>"+item.newNote[1]+"</li>"+

        "<li>"+item.startDate[1]+"</li>"+

        "<li>"+item.status[1]+"</li>"+
        "<a href='#addProject' class='editData' data-role='' id='"+key+"'>Edit Data</a>"+
        "<br>"+"<br>"+
        "<a href='#' data-icon='' data-role='' class='deleteData' id='"+key+"'>Delete Data</a>"+
        "<br>"+"<br>");

    var makeLink = $("<a href='#' id='"+key+"'>Edit Data 123</a>");
    makeLink.on('click', function(){
        console.log("This is my key: "+this.id);
    });
    makeLink.html(makeSubLi);
    makeSubList.append(makeLink).appendTo("#formList");


    //Delete Function
    $('.deleteData').on('click', function(e){
        e.preventDefault();
        var ask = confirm("Are you sure you want to delete Data?");
        if(ask){
            localStorage.removeItem(this.id);
            alert("Data Deletion Process Complete!");
            location.reload();
        }else{
            alert("Data Deletion Process Canceled.")
        }
    });
    // End of Delete function

    //Edit Function
    $('.editData').on('click', function(){
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

        $('#submitDataForm').on('click', function(){

         storeData(key);
            location.reload();
            console.log(key);
            window.location = '#viewProjects';

        });


    });

});
$("#formList").listview('refresh');


}










