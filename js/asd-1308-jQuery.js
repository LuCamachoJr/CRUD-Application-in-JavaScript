/*
 * Author: Luis Camacho Jr.
 * Full Sail University
 * Course: ASD
 * Term: 1310
 * Project Week 2
 * Reference js from previous courses
 * refactor functions using jquery
 */
function testData(){
   /* $.each(json.json, function(key,val){
        console.log(val.catType);
    });*/
    console.log(json);
    for(var n in json){
        var id = Math.floor(Math.random()*10000002);
        localStorage.setItem(id, JSON.stringify(json[n]));
        console.log(json[n]);
        createList();
    }
}



function createList(){
    $("#clearList").empty();

  //  $("#clearList").append("<a href="#" id="clearStored">Clear Stored Data</a>");

    for (var i= 0, j=localStorage.length; i<j ; i++){
        var key = localStorage.key(i);
        var item = JSON.parse(localStorage.getItem(key));
        console.log(item);
        console.log(key);
       // for (var n in item){}
      //var collapsible=$('#clearlist');
        var makeSubList = '<ul data-role="listview" data-filter="true">';
            makeSubList+='<li>';
            makeSubList+='<h3>' + item.catType[1] + '</h3>';
            makeSubList+='<p>' + item.catType[0] + '</p>';
            makeSubList+='</li>';
        makeSubList+='</ul>';

            //makeSubList+='</ul>';
     //   var makeSubList = $("<li data-role=''"+item.startDate[1]+" ID "+key+"></li>");
     /*   var makeSubLi = /*item[n][0] + " " + item[n][1];

            $("<h3>"+item.catType[1]+"</h3>"+
            "<p>"+item.catType[1]+"<p>"+
            "<h3>"+item.newID[0]+"</h3>"+
            "<p>"+item.newID[1]+"</p>"+
            "<h3>"+item.newNote[0]+"</h3>"+
            "<p>"+item.newNote[1]+"</p>"+
            "<h3>"+item.startDate[0]+"</h3>"+
            "<p>"+item.startDate[1]+"</p>"+
            "<h3>"+item.status[0]+"</h3>"+
            "<p>"+item.status[1]+"</p>"+
            "<a href='#' class='editData' data-role='' id='"+key+"'>Edit Data</a>"+
            "<br>"+"<br>"+
            "<a href='#' data-icon='' data-role='' class='deleteData' id='"+key+"'>Delete Data</a>"+
            "<br>"+"<br>");*/



        var makeLink = $("<a href='#' id='"+key+"'>Edit Data 123</a>");
        makeLink.on('click', function(){
            console.log("This is my key: "+this.id);


        });



      //  $('#dynamic').html(makeSubList);

        // $("#clearList").append("<a href="#" id="clearStored">Clear Stored Data</a>");
       // $("#clearList").append("<li data-role='' data-filter=''></li>");
       // makeLink.html(makeSubLi);
     //   collapsible.append(makeSubList);
      //  collapsible.trigger('create');
       // makeSubList.listview('refresh');
        makeSubList.appendTo("#dynamic");

      /*  var separate = $('<hr>');
        separate.attr("id","editItemSeparator");
        makeSubList.append(separate);*/
       // $("#mylist").append("<li data-role='list-divider'>"+ item.cat + "</li>");
     // end for loop
    }



   // $("#clearList").find("ul").listview('refresh');
    //  });  // end storage.on
    //editData();
   // deleteData();
    $('.editData').on('click', function(){


    });
    $(".deleteData").on('click', function () {
        //   deleteData();
        console.log('test' + this.id);
        var ask = confirm("Are you sure you want to delete Client Data?");
        if (ask) {

            localStorage.removeItem(this.id);



            alert("Client Data Deletion Process Complete!");


        } else {
            alert("Client Deletion Process Canceled.")
        }
        //  });

        createList();
        return false;


  });

    }



$("a[href='#viewProjects']").on('click', function(){
    if (localStorage.length === 0) {
        alert("There is no Data in Local Storage. JSON Test Data Being Loaded");
        //testData function utilizes json.js file to populate the form with Data.
        //For testing purposes.
        testData();

    }else{
        //  $('#clearList').listview('refresh');
        createList();
    }
});


function editData(){
    $('.editData').on('click', function(){




        console.log('test'+this.id);
    });



}

/*function deleteData(){
    console.log('Test'+this.id);
    var ask = confirm("Are you sure you want to delete Client Data?");
    if(ask){
        localStorage.removeItem(this.id);

        alert("Client Data Deletion Process Complete!");



    }else{
        alert("Client Deletion Process Canceled.")
    }
    //  });
    //$("#clearList").listview('refresh');
    createList();

}*/


    $('#pageOne').on('pageinit', function(){
    //code needed for home page goes here
    console.log("pageOne page is Loaded");
});
    $('#viewProject').on("click", function(){
        console.log("click Projects function");
        if (localStorage.length === 0) {
            alert("There is no Data in Local Storage. JSON Test Data Being Loaded");
            //testData function utilizes json.js file to populate the form with Data.
            //For testing purposes.
           testData();

        }else{
          //  $('#clearList').listview('refre');
            createList();
        }

        //load json data via ajax

        //activate edit functions
 /*       $("").on("click", function(){

        });
        //activate delete functions
        $("").on("click", function(){

        });*/
    });
/*$('#viewProjects').on('pageinit', function(){
    $(".deleteData").on('click',function(){
        console.log('test'+this.id);
        var ask = confirm("Are you sure you want to delete Client Data?");
        if(ask){
            localStorage.removeItem(this.id);

            alert("Client Data Deletion Process Complete!");



        }else{
            alert("Client Deletion Process Canceled.")
        }
        //  });
        //$("#clearList").listview('refresh');
createList();
    });

});*/

$("a[href='#viewIdeas']").on("click", function(){
    console.log("click Ideas function");
    if (localStorage.length === 0) {
        alert("There is no Data in Local Storage. XML Test Data Being Loaded");
        //testData function utilizes json.js file to populate the form with Data.
        //For testing purposes.
        //testData();
    }
});

$("a[href='#viewCompleted']").on("click", function(){
    console.log("click Completed function");
    if (localStorage.length === 0) {
        alert("There is no Data in Local Storage. YAML Test Data Being Loaded");
        //testData function utilizes json.js file to populate the form with Data.
        //For testing purposes.
        //testData();
    }
});

$("#testData").on("click", function(){
    for(var n in json){
        var id = Math.floor(Math.random()*10000002);
        localStorage.setItem(id, JSON.stringify(json[n]));
        console.log(id);
    }
});



$('#addProject').on('pageinit', function(){

    console.log("addProject page is loaded");

    var dForm = $('#projectData');

    dForm.validate({
        invalidHandler: function(form, validator) {
        },
        submitHandler: function() {
     dForm.serializeArray();
            storeData();

            console.log(dForm.serializeArray());
           // var id = Math.floor(Math.random() * 100001);
          //  localStorage.setItem(id, JSON.stringify(data));
            console.log(dForm);
        }
    });
    function storeData() {
        var id = Math.floor(Math.random() * 100001);
        var formItems = {};
        formItems.catType = ["Choose A Category Type:", $(':selected').val()];
        formItems.newID = ["Enter New Project or Idea:", $("#newProject").val()];
        formItems.newNote = ["Enter Note on Project or Idea:", $("#detailTxt").val()];
        formItems.startDate = ["Enter Start Date:", $("#startDate").val()];
        formItems.status = ["Globalize:", $('[name="globalizationOptions"]:checked').val()];
        localStorage.setItem(id, JSON.stringify(formItems));
        console.log(formItems);
        alert("Saving "+formItems.catType[1]+" "+id+"! Select Display Data Link Above To View Or Edit Data!");
$('#projectData').fadeOut();
        $('#logoAnimation').delay(800).fadeIn('slow').fadeOut(3000).fadeIn(3000).fadeOut(3000).fadeIn(3000);

        $.fn.slideFadeToggle  = function(speed, easing, callback) {
            return this.animate({opacity: 'toggle', height: 'toggle'}, speed, easing, callback);
        };
        $("#logoAnimation").click(function() {
            $(this).slideFadeToggle();
        });




    $('#storage').on('click', function(){
        if(formItems.catType[1]==="Project"){
        window.location = '#viewProjects'
            createList();
        }else{
            window.location = '#viewIdeas'
            createList();
            return false;
        }

$('#projectData').fadeIn();

    });
    }
});




                // var toStore = JSON.stringify(data);*/



               // return false;
                //console.log("Saved item " + index + " to storage with id = " + id);


          /*  $.each(data, function(i, obj){
                localStorage.setItem(obj.name, obj.value);
            });*/
            //storeData(data);
           // console.log(formItems);
         /*   $("a[href='#storage']").on('click', function(){

                for (var i= 0, j=localStorage.length; i<j ; i++){
                    var key = localStorage.key(i);
                    var item = JSON.parse(localStorage.getItem(key));
                    console.log(item);
                    console.log(key);
                }
            });*/






    $("#errorDialog1").on('click', function(){
        if(localStorage.length === 0){
            alert("There is no data to clear.")
            location.reload();
        }else{
            localStorage.clear();
            alert("All Form Data Has Been Deleted!");
            location.reload();

        }
    });
$("#clearStored").on('click', function(){
    if(localStorage.length === 0){
        alert("There is no data to clear.")
    }else{
        localStorage.clear();

        location.reload();
        alert("All Client Data Has Been Deleted!");
        return false;
    }
});
         /*   var makeSubList = $("<li></li>");
            var makeSubLi = $( "<h3>"+item.iname[1]+"</h3>"+
                "<p><strong>"+item.category[1]+"</strong></p>"+
                "<p>"+item.quantity[1]+"</p>" +
                "<p>"+item.notes[1]+"</p>" );
            var makeLink = $("<a href='#' id='"+key+"'>Edit</a>");
            makeLink.on('click', function(){
                console.log("This is my key: "+this.id);
            });
            makeLink.html(makeSubLi);
            makeSubList.append(makeLink).appendTo("#itemList");
        }; // end for loop
        $("ul").listview('refresh');*/

     // end storage.on


   /* $.each(jsonItems.items, function (index, singleItem) {
        var _id = Math.floor(Math.random() * 100001);
        var toStore = JSON.stringify(singleItem);
        localStorage.setItem(_id, toStore);
        console.log("Saved item " + index + " to storage with _id = " + _id);
    });*/

    //any other code needed for addItem page goes here




//
//
//
//
//
// HTML file
// Sorting snippet for date and alphabet http://jsfiddle.net/s2JxC/7/
// include date sort for list divider or collapsible

/*<select id="test">
 <option selected="selected" value="date">Date</option>
 <option value="alphabetically">Alphabetically</option>
 </select>


 <ul id="list">
 <li><p class="name">Peter</p><span class="date">10.12.12</span></li>
 <li><p class="name">Mary</p><span class="date">06.01.13</span></li>
 <li><p class="name">Paul</p><span class="date">19.12.12</span></li>
 <li><p class="name">Allen</p><span class="date">21.12.12</span></li>
 <li><p class="name">James</p><span class="date">03.01.13</span></li>
 <li><p class="name">Vicki</p><span class="date">12.01.13</span></li>
 <li><p class="name">Brock</p><span class="date">01.01.13</span></li>
 <li><p class="name">Dana</p><span class="date">31.12.12</span></li>
 <li><p class="name">Frank</p><span class="date">16.12.12</span></li>
 <li><p class="name">Gil</p><span class="date">09.01.13</span></li>
 <li><p class="name">Helen</p><span class="date">14.01.13</span></li>
 </ul>*/

// function
/*
 function sortDateDescending(a, b) {
 var date1 = $(a).find(".date").text();
 date1 = date1.split('.');
 date1 = new Date(date1[2], date1[1] - 1, date1[0]);
 var date2 = $(b).find(".date").text();
 date2 = date2.split('.');
 date2 = new Date(date2[2], date2[1] - 1, date2[0]);
 return date1 < date2 ? 1 : -1;
 }

 function sortNameAscending(a, b) {
 var date1 = $(a).find(".name").text();
 var date2 = $(b).find(".name").text();
 return date1 > date2 ? 1 : -1;
 }

 $(document).ready(function () {
 var desc = false;
 document.getElementById("test").onchange = function () {
 if (document.getElementById("test").value == "alphabetically") {
 $('ul > li').sort(sortNameAscending).appendTo('ul');
 } else if (document.getElementById("test").value == "date") {
 $('ul > li').sort(sortDateDescending).appendTo('ul');
 }
 return false;
 };

 //Sorts descending based on value of date as default.
 $('ul > li').sort(sortDateDescending).appendTo('ul');
 });
 */


