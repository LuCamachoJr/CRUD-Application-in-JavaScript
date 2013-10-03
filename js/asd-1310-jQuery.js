/*
 * Author: Luis Camacho Jr.
 * Full Sail University
 * Course: ASD
 * Term: 1310
 * Project Week 2
 * Reference js from previous courses
 * refactor functions using jquery
 */

function testData() {

    console.log(json);
    for (var n in json) {
        var id = Math.floor(Math.random() * 10000002);
        localStorage.setItem(id, JSON.stringify(json[n]));
        console.log(json[n]);
        createList();
    }
}

function createList() {
    $("#clearList").empty();
    for (var i = 0, j = localStorage.length; i < j; i++) {
        var key = localStorage.key(i);
        var item = JSON.parse(localStorage.getItem(key));
        console.log(item);
        console.log(key);

        var makeSubList = '<ul data-role="listview" data-filter="true">';
        makeSubList += '<li>';
        makeSubList += '<h3>' + item.catType[1] + '</h3>';
        makeSubList += '<p>' + item.catType[0] + '</p>';
        makeSubList += '</li>';
        makeSubList += '</ul>';
        var makeLink = $("<a href='#' id='" + key + "'>Edit Data 123</a>");
        makeLink.on('click', function () {
            console.log("This is my key: " + this.id);
        });
        makeSubList.appendTo("#dynamic");
    }
    $('.editData').on('click', function () {});
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
        createList();
        return false;
    });

}

$("a[href='#viewProjects']").on('click', function () {
    if (localStorage.length === 0) {
        alert("There is no Data in Local Storage. JSON Test Data Being Loaded");
        //testData function utilizes json.js file to populate the form with Data.
        //For testing purposes.
        testData();
    } else {
        createList();
    }
});

function editData() {
    $('.editData').on('click', function () {
        console.log('test' + this.id);
    });
}

$('#pageOne').on('pageinit', function () {
    //code needed for home page goes here
    console.log("pageOne page is Loaded");
});

$('#viewProject').on("click", function () {
    console.log("click Projects function");
    if (localStorage.length === 0) {
        alert("There is no Data in Local Storage. JSON Test Data Being Loaded");
        //testData function utilizes json.js file to populate the form with Data.
        //For testing purposes.
        testData();
    } else {
        createList();
    }
    //load json data via ajax
    //activate edit functions
});

$("a[href='#viewIdeas']").on("click", function () {
    console.log("click Ideas function");
    if (localStorage.length === 0) {
        alert("There is no Data in Local Storage. XML Test Data Being Loaded");
        //testData function utilizes json.js file to populate the form with Data.
        //For testing purposes.
        //testData();
    }
});

$("a[href='#viewCompleted']").on("click", function () {
    console.log("click Completed function");
    if (localStorage.length === 0) {
        alert("There is no Data in Local Storage. YAML Test Data Being Loaded");
        //testData function utilizes json.js file to populate the form with Data.
        //For testing purposes.
        //testData();
    }
});

$("#testData").on("click", function () {
    for (var n in json) {
        var id = Math.floor(Math.random() * 10000002);
        localStorage.setItem(id, JSON.stringify(json[n]));
        console.log(id);
    }
});

$('#addProject').on('pageinit', function () {
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
        alert("Saving " + formItems.catType[1] + " " + id + "! Select Display Data Link Above To View Or Edit Data!");
        $('#projectData').fadeOut();
        $('#logoAnimation').delay(800).fadeIn('slow').fadeOut(3000).fadeIn(3000).fadeOut(3000).fadeIn(3000);
        $.fn.slideFadeToggle = function (speed, easing, callback) {
            return this.animate({
                opacity: 'toggle',
                height: 'toggle'
            }, speed, easing, callback);
        };
        $("#logoAnimation").click(function () {
            $(this).slideFadeToggle();
        });

        $('#storage').on('click', function () {
            if (formItems.catType[1] === "Project") {
                window.location = '#viewProjects'
                createList();
            } else {
                window.location = '#viewIdeas'
                createList();
                return false;
            }

            $('#projectData').fadeIn();
        });
    }
});

$("#errorDialog1").on('click', function () {
    if (localStorage.length === 0) {
        alert("There is no data to clear.")
        location.reload();
    } else {/*
     * Author: Luis Camacho Jr.
     * Full Sail University
     * Course: ASD
     * Term: 1310
     * Project Week 2
     * Reference js from previous courses
     * refactor functions using jquery
     */

        function testData() {

            console.log(json);
            for (var n in json) {
                var id = Math.floor(Math.random() * 10000002);
                localStorage.setItem(id, JSON.stringify(json[n]));
                console.log(json[n]);
                createList();
            }
        }

        function createList() {
            $("#clearList").empty();



            for (var i = 0, j = localStorage.length; i < j; i++) {
                var key = localStorage.key(i);
                var item = JSON.parse(localStorage.getItem(key));
                console.log(item);
                console.log(key);

                var makeSubList = '<ul data-role="listview" data-filter="true">';
                makeSubList += '<li>';
                makeSubList += '<h3>' + item.catType[1] + '</h3>';
                makeSubList += '<p>' + item.catType[0] + '</p>';
                makeSubList += '</li>';
                makeSubList += '</ul>';




                var makeLink = $("<a href='#' id='" + key + "'>Edit Data 123</a>");
                makeLink.on('click', function () {
                    console.log("This is my key: " + this.id);
                });
                makeSubList.appendTo("#dynamic");
            }
            $('.editData').on('click', function () {});
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

                createList();
                return false;


            });

        }



        $("a[href='#viewProjects']").on('click', function () {
            if (localStorage.length === 0) {
                alert("There is no Data in Local Storage. JSON Test Data Being Loaded");
                //testData function utilizes json.js file to populate the form with Data.
                //For testing purposes.
                testData();

            } else {

                createList();
            }
        });


        function editData() {
            $('.editData').on('click', function () {




                console.log('test' + this.id);
            });



        }



        $('#pageOne').on('pageinit', function () {
            //code needed for home page goes here
            console.log("pageOne page is Loaded");
        });
        $('#viewProject').on("click", function () {
            console.log("click Projects function");
            if (localStorage.length === 0) {
                alert("There is no Data in Local Storage. JSON Test Data Being Loaded");
                //testData function utilizes json.js file to populate the form with Data.
                //For testing purposes.
                testData();

            } else {

                createList();
            }

            //load json data via ajax

            //activate edit functions

        });


        $("a[href='#viewIdeas']").on("click", function () {
            console.log("click Ideas function");
            if (localStorage.length === 0) {
                alert("There is no Data in Local Storage. XML Test Data Being Loaded");
                //testData function utilizes json.js file to populate the form with Data.
                //For testing purposes.
                //testData();
            }
        });

        $("a[href='#viewCompleted']").on("click", function () {
            console.log("click Completed function");
            if (localStorage.length === 0) {
                alert("There is no Data in Local Storage. YAML Test Data Being Loaded");
                //testData function utilizes json.js file to populate the form with Data.
                //For testing purposes.
                //testData();
            }
        });

        $("#testData").on("click", function () {
            for (var n in json) {
                var id = Math.floor(Math.random() * 10000002);
                localStorage.setItem(id, JSON.stringify(json[n]));
                console.log(id);
            }
        });

        $('#addProject').on('pageinit', function () {

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
                alert("Saving " + formItems.catType[1] + " " + id + "! Select Display Data Link Above To View Or Edit Data!");
                $('#projectData').fadeOut();
                $('#logoAnimation').delay(800).fadeIn('slow').fadeOut(3000).fadeIn(3000).fadeOut(3000).fadeIn(3000);

                $.fn.slideFadeToggle = function (speed, easing, callback) {
                    return this.animate({
                        opacity: 'toggle',
                        height: 'toggle'
                    }, speed, easing, callback);
                };
                $("#logoAnimation").click(function () {
                    $(this).slideFadeToggle();
                });

                $('#storage').on('click', function () {
                    if (formItems.catType[1] === "Project") {
                        window.location = '#viewProjects'
                        createList();
                    } else {
                        window.location = '#viewIdeas'
                        createList();
                        return false;
                    }

                    $('#projectData').fadeIn();

                });
            }
        });

        $("#errorDialog1").on('click', function () {
            if (localStorage.length === 0) {
                alert("There is no data to clear.")
                location.reload();
            } else {
                localStorage.clear();
                alert("All Form Data Has Been Deleted!");
                location.reload();

            }
        });
        $("#clearStored").on('click', function () {
            if (localStorage.length === 0) {
                alert("There is no data to clear.")
            } else {
                localStorage.clear();

                location.reload();
                alert("All Client Data Has Been Deleted!");
                return false;
            }
        });
        localStorage.clear();
        alert("All Form Data Has Been Deleted!");
        location.reload();

    }
});
$("#clearStored").on('click', function () {
    if (localStorage.length === 0) {
        alert("There is no data to clear.")
    } else {
        localStorage.clear();

        location.reload();
        alert("All Client Data Has Been Deleted!");
        return false;
    }
});