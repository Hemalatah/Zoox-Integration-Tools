$(document).ready(function(){
    // get the json data urls
    const users_url = 'https://jsonplaceholder.typicode.com/users';
    const posts_url = 'https://jsonplaceholder.typicode.com/posts';
    //init function
    loadData();

    //using fetch api to render the data
    function loadData() {
        fetch(posts_url)
        .then(data => { return data.json() })
        .then(res => {
            res.sort(function(a, b){
                if(a.title < b.title) { return -1; }
                if(a.title > b.title) { return 1; }
                return 0;
            })
            for(var i = 0; i < res.length; i++) {
                renderitem(res[i]);
            }
            
        })
        .catch(err => {
            $("#ajax-content").append("<h4>No results, Sorry!!!</h4>");
        })
    }

    //capitalize the title
    function toTitleCase(str) {
        return str.replace(/\w\S*/g, function(txt){
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    }

    // render each post with the body
    function renderitem(item) {
        var title = item.title;
        title = toTitleCase(title);
        var body = item.body;
        body = body.charAt(0).toUpperCase() + body.substr(1).toLowerCase();;
        $("#ajax-content").append("<li class='list' id='" + item.id + "'>" + title + "</li>");
        //get the body of the posts
        $("#ajax-content li").click(function(){
            if(this.id == item.id && $("#"+this.id).children().length == 0) {
                $(this).append("<h4 class='box' id='body" + this.id + "'></h4>");

                $("#body"+this.id).append("<p><em>" + body + "</em></p><h4>User Info:</h4>");
                
                //get the user info
                fetch(users_url)
                .then(data => { return data.json() })
                .then(res => {
                    for(var i = 0; i < res.length; i++) {
                        var resItem = res[i];
                        if (resItem.id == item.userId) {
                           $("#body"+this.id).append("<ul><li>Name: " + resItem.name + "</li>" + "<li>Email: " + resItem.email + "</li>" + "<li>User Name: " + resItem.username + "</li>" + "<li>City: " + resItem.address.city + "</li>" + "<li>Website: " + resItem.website + "</li></ul");
                        }
                    }
                })
            }
            else {
                if(this.id == item.id && $("#"+this.id).children().length > 0) {
                    $("#body"+this.id).toggle();
                }
            }
            //console.log(this.id);
        });
    }

    $(".glyphicon-remove").click(function() {
        console.log('hi');
        $("#myInput").val('');
        loadData();
    })
    
    //filter the search
    $("#myInput").on("keyup", function() {
        $('#ajax-content').empty();
        var value = $(this).val().toLowerCase();
        fetch(posts_url)
        .then(data => { return data.json() })
        .then(res => {
            var arr = [];
            var currentId = 0;
            for (var i = 0; i < res.length; i++) {
                if(value == res[i].title) {
                    if (res[i].id >= currentId) {
                        arr.unshift(res[i]);
                        currentId = res[i].id;
                    }
                    else {
                        arr.push(res[i]);
                    }
                }
                else if (res[i].title.indexOf(value) > -1) {
                    arr.push(res[i]);
                }
            }
            for(var j = 0; j < arr.length; j++) {renderitem(arr[j]);
            }
            
        })
    });
});

