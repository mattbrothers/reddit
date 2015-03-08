var xmlhttp = new XMLHttpRequest();
var url = "http://www.reddit.com/r/pics/.json";

xmlhttp.onreadystatechange=function() {
    if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
        myFunction(xmlhttp.responseText);
    }
};
xmlhttp.open("GET", url, true);
xmlhttp.send();

function myFunction(response) {
    var content = JSON.parse(response);
    var lightbox = document.getElementById("lightbox");
    var posts = content.data.children;
    var item = document.createElement("li");
    var image = document.createElement("img");
    var counter = 0;
    validPosts = [];

    for(var i = 0; i < posts.length; i++) {
        if (content.data.children[i].data.url.indexOf("jpg") != -1) {
            validPosts.push(content.data.children[i].data);
        }
    }

    var imageTitle = validPosts[counter].title;
    item.innerHTML = imageTitle;
    item.appendChild(image);
    lightbox.appendChild(item);

    
    var imageUrl = validPosts[counter].url;
    image.setAttribute("src", imageUrl);

    var prev = document.getElementById("prev");
    var next = document.getElementById("next");

    prev.onclick = function() {
        if (counter <= 0) {
            counter = validPosts.length - 1;
        }
        else {
            counter--;
        }
        item.innerHTML = validPosts[counter].title;
        item.appendChild(image);
        image.src = validPosts[counter].url;
    }

    next.onclick = function() {
        if (counter >= validPosts.length - 1) {
            counter = 0;
        }
        else {
            counter++;
        }
        item.innerHTML = validPosts[counter].title;
        item.appendChild(image);
        image.src = validPosts[counter].url;
    };
}
